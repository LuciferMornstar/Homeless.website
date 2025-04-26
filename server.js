import express from 'express';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import mysql from 'mysql2/promise';
import ccxt from 'ccxt';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306, // Adding explicit port configuration
  user: process.env.DB_USER || 'dbu5385048',
  password: process.env.DB_PASSWORD || 'Z9EYceyh28Up9kH',
  database: process.env.DB_NAME || 'dbs14137291',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    // Enable SSL but don't verify the certificate
    rejectUnauthorized: false
  },
  connectTimeout: 30000, // Increase connection timeout to 30 seconds
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000 // 10 seconds
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Function to test database connection
const testDatabaseConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database!');
    connection.release();
    return true;
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    if (error.code === 'ENOTFOUND') {
      console.error('Could not resolve database hostname. Please check DNS or try using IP address if available.');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused. Please check if database server is running and accessible.');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('Access denied. Please check your username and password.');
    }
    return false;
  }
};

// Attempt connection on startup
testDatabaseConnection();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname)));

// Test database connection
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 as connection_test');
    res.json({ 
      success: true, 
      message: 'Database connection successful', 
      data: rows 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed', 
      error: error.message 
    });
  }
});

// Example API endpoint for organizations
app.get('/api/organizations', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Organizations');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch organizations', 
      error: error.message 
    });
  }
});

// Example API endpoint for contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, urgency, contactNumber, preferredContactMethod, bestTimeToContact } = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO ContactMessages 
      (Name, Email, Subject, MessageContent, Urgency, ContactNumber, PreferredContactMethod, BestTimeToContact) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, subject, message, urgency || 'Medium', contactNumber, preferredContactMethod || 'Email', bestTimeToContact]
    );
    
    res.json({ 
      success: true, 
      message: 'Contact message submitted successfully', 
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit contact form', 
      error: error.message 
    });
  }
});

// Existing API routes
app.get('/api/price/:exchange', async (req, res) => {
  const exchangeParam = req.params.exchange;
  const rawPair = req.query.pair;
  if (!rawPair) {
    return res.status(400).json({ error: 'Missing pair' });
  }
  // Manual HTTP fetch for Coinbase public spot price
  if (exchangeParam === 'coinbase') {
    try {
      const symbol = rawPair.replace(/USDT$/i, '-USD');
      const url = `https://api.coinbase.com/v2/prices/${symbol}/spot`;
      const response = await axios.get(url);
      const data = response.data;
      return res.json({ price: parseFloat(data.data.amount) });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  // Use CCXT for other exchanges
  const exchangeId = req.params.exchange;
  if (!ccxt[exchangeId]) {
    return res.status(400).json({ error: 'Unsupported exchange' });
  }
  try {
    const client = new ccxt[exchangeId]();
    const market = rawPair.includes('/')
      ? rawPair
      : `${rawPair.slice(0, -4)}/${rawPair.slice(-4)}`;
    const ticker = await client.fetchTicker(market);
    res.json({ price: ticker.last });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unified orderbook depth endpoint
app.get('/api/depth/:exchange', async (req, res) => {
  const exchangeParam = req.params.exchange;
  const rawPair = req.query.pair;
  const exchangeId = exchangeParam === 'coinbase' ? 'coinbasepro' : exchangeParam;
  if (!ccxt[exchangeId] || !rawPair) {
    return res.status(400).json({ error: 'Unsupported exchange or missing pair' });
  }
  try {
    const client = new ccxt[exchangeId]();
    // Construct market symbol; convert USDT -> USD for Coinbase Pro
    let market;
    if (exchangeId === 'coinbasepro') {
      const base = rawPair.replace(/USDT$/i, '');
      market = rawPair.includes('/')
        ? rawPair.replace(/USDT/i, 'USD')
        : `${base}/USD`;
    } else {
      market = rawPair.includes('/')
        ? rawPair
        : `${rawPair.slice(0, -4)}/${rawPair.slice(-4)}`;
    }
    const orderbook = await client.fetchOrderBook(market, 5);
    const bid = orderbook.bids.length ? orderbook.bids[0][0] : null;
    const ask = orderbook.asks.length ? orderbook.asks[0][0] : null;
    res.json({ bid, ask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to list dog images from assets/dogs
app.get('/api/dogs', async (req, res) => {
  try {
    const dirPath = path.join(__dirname, 'assets', 'dogs');
    const files = await fs.promises.readdir(dirPath);
    const images = files.filter(f => /\.(jpe?g|png|gif)$/i.test(f));
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API endpoint for shelters
app.get('/api/shelters', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM EmergencyShelters');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching shelters:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch shelters', error: error.message });
  }
});

// API endpoint for mental health resources
app.get('/api/mental-health-resources', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM MentalHealthResources');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching mental health resources:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch mental health resources', error: error.message });
  }
});

// API endpoint for dog-friendly resources
app.get('/api/dog-friendly-resources', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM DogFriendlyResources');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching dog-friendly resources:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dog-friendly resources', error: error.message });
  }
});

// API endpoint for service dogs
app.get('/api/service-dogs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Dogs');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching service dogs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch service dogs', error: error.message });
  }
});

// API endpoint for fetching contact details
app.get('/api/contact-details', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SiteContactDetails WHERE IsActive = TRUE ORDER BY DisplayOrder');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching contact details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contact details', error: error.message });
  }
});

// API endpoint for posting feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { userId, organizationId, feedbackText, rating, contactEmail, subject } = req.body;

    const [result] = await pool.query(
      `INSERT INTO Feedback (UserID, OrganizationID, FeedbackText, Rating, ContactEmail, Subject) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, organizationId, feedbackText, rating, contactEmail, subject]
    );

    res.json({ success: true, message: 'Feedback submitted successfully', data: { id: result.insertId } });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Failed to submit feedback', error: error.message });
  }
});

// API endpoint for fetching mental health assessments
app.get('/api/mental-health-assessments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM MentalHealthAssessments WHERE IsCompleted = TRUE');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching mental health assessments:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch mental health assessments', error: error.message });
  }
});

// API endpoint for posting mental health assessment responses
app.post('/api/mental-health-assessment-responses', async (req, res) => {
  try {
    const { userId, assessmentType, questionText, responseText } = req.body;

    const [result] = await pool.query(
      `INSERT INTO UserAssessmentResponses (UserID, AssessmentType, QuestionText, ResponseText) 
      VALUES (?, ?, ?, ?)`,
      [userId, assessmentType, questionText, responseText]
    );

    res.json({ success: true, message: 'Response submitted successfully', data: { id: result.insertId } });
  } catch (error) {
    console.error('Error submitting assessment response:', error);
    res.status(500).json({ success: false, message: 'Failed to submit assessment response', error: error.message });
  }
});

// API endpoint for food banks
app.get('/api/foodbanks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM FoodBanks WHERE IsVerified = TRUE');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching food banks:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch food banks', error: error.message });
  }
});
app.post('/api/foodbanks', async (req, res) => {
  try {
    const { Name, Address, City, State, ZipCode, Phone, Email, Website, OpeningHours, Requirements, AvailableItems, Notes, Latitude, Longitude } = req.body;
    const [result] = await pool.query(
      `INSERT INTO FoodBanks (Name, Address, City, State, ZipCode, Phone, Email, Website, OpeningHours, Requirements, AvailableItems, Notes, IsVerified, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?)`,
      [Name, Address, City, State, ZipCode, Phone, Email, Website, OpeningHours, Requirements, AvailableItems, Notes, Latitude, Longitude]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding food bank:', error);
    res.status(500).json({ success: false, message: 'Failed to add food bank', error: error.message });
  }
});

// API endpoint for addiction services
app.get('/api/addiction-services', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM AddictionServices WHERE IsVerified = TRUE');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching addiction services:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch addiction services', error: error.message });
  }
});
app.post('/api/addiction-services', async (req, res) => {
  try {
    const { Name, ServiceType, Description, Address, City, State, ZipCode, Phone, Email, Website, ServicesOffered, EligibilityCriteria, ReferralProcess } = req.body;
    const [result] = await pool.query(
      `INSERT INTO AddictionServices (Name, ServiceType, Description, Address, City, State, ZipCode, Phone, Email, Website, ServicesOffered, EligibilityCriteria, ReferralProcess, IsVerified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, TRUE)`,
      [Name, ServiceType, Description, Address, City, State, ZipCode, Phone, Email, Website, ServicesOffered, EligibilityCriteria, ReferralProcess]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding addiction service:', error);
    res.status(500).json({ success: false, message: 'Failed to add addiction service', error: error.message });
  }
});

// API endpoint for events
app.get('/api/events', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Events');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
});
app.post('/api/events', async (req, res) => {
  try {
    const { Title, Description, Location, DateTime, OrganizationID, EventType, Capacity, RegistrationRequired, ContactPerson, ContactEmail, ContactPhone, IsRecurring, RecurrencePattern, ImageURL } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Events (Title, Description, Location, DateTime, OrganizationID, EventType, Capacity, RegistrationRequired, ContactPerson, ContactEmail, ContactPhone, IsRecurring, RecurrencePattern, ImageURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [Title, Description, Location, DateTime, OrganizationID, EventType, Capacity, RegistrationRequired, ContactPerson, ContactEmail, ContactPhone, IsRecurring, RecurrencePattern, ImageURL]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ success: false, message: 'Failed to add event', error: error.message });
  }
});

// API endpoint for needs
app.get('/api/needs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Needs');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching needs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch needs', error: error.message });
  }
});
app.post('/api/needs', async (req, res) => {
  try {
    const { Description, NeedType, OrganizationID, ContactPerson } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Needs (Description, NeedType, OrganizationID, ContactPerson, Fulfilled) VALUES (?, ?, ?, ?, FALSE)`,
      [Description, NeedType, OrganizationID, ContactPerson]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding need:', error);
    res.status(500).json({ success: false, message: 'Failed to add need', error: error.message });
  }
});

// API endpoint for benefits/entitlements
app.get('/api/benefits', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM BenefitsEntitlements');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching benefits:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch benefits', error: error.message });
  }
});

// API endpoint for volunteers
app.get('/api/volunteers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Volunteers');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch volunteers', error: error.message });
  }
});
app.post('/api/volunteers', async (req, res) => {
  try {
    const { UserID, SkillsExperience, Availability, PreferredActivities, DBS, DBSCertificateNumber, DBSIssueDate, EmergencyContactName, EmergencyContactPhone, EmergencyContactRelationship, TrainingCompleted, Notes, StartDate, Status, HoursCommitment } = req.body;
    const [result] = await pool.query(
      `INSERT INTO Volunteers (UserID, SkillsExperience, Availability, PreferredActivities, DBS, DBSCertificateNumber, DBSIssueDate, EmergencyContactName, EmergencyContactPhone, EmergencyContactRelationship, TrainingCompleted, Notes, StartDate, Status, HoursCommitment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [UserID, SkillsExperience, Availability, PreferredActivities, DBS, DBSCertificateNumber, DBSIssueDate, EmergencyContactName, EmergencyContactPhone, EmergencyContactRelationship, TrainingCompleted, Notes, StartDate, Status, HoursCommitment]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding volunteer:', error);
    res.status(500).json({ success: false, message: 'Failed to add volunteer', error: error.message });
  }
});

// API endpoint for case management
app.get('/api/case-management', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM CaseManagement');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching case management:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch case management', error: error.message });
  }
});
app.post('/api/case-management', async (req, res) => {
  try {
    const { UserID, CaseWorkerID, OpenDate, CloseDate, Status, PrimaryNeed, SecondaryNeeds, Notes, ActionPlan, NextAppointment, Priority, ReferralSource, HasConsentForm, ConsentFormDate, DataSharingConsent, LastContactDate } = req.body;
    const [result] = await pool.query(
      `INSERT INTO CaseManagement (UserID, CaseWorkerID, OpenDate, CloseDate, Status, PrimaryNeed, SecondaryNeeds, Notes, ActionPlan, NextAppointment, Priority, ReferralSource, HasConsentForm, ConsentFormDate, DataSharingConsent, LastContactDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [UserID, CaseWorkerID, OpenDate, CloseDate, Status, PrimaryNeed, SecondaryNeeds, Notes, ActionPlan, NextAppointment, Priority, ReferralSource, HasConsentForm, ConsentFormDate, DataSharingConsent, LastContactDate]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error('Error adding case management record:', error);
    res.status(500).json({ success: false, message: 'Failed to add case management record', error: error.message });
  }
});

// API endpoint for social media links
app.get('/api/social-media-links', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM SocialMediaLinks WHERE IsActive = TRUE ORDER BY DisplayOrder');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching social media links:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch social media links', error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Database connection initialized to ${dbConfig.host}`);
});