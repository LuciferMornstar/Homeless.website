import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Define interface for healthcare resources
interface HealthcareResource {
  ResourceID: number;
  ResourceName: string;
  ServiceType: string;
  Description: string;
  Address: string;
  Latitude: number;
  Longitude: number;
  ContactNumber: string;
  Email: string;
  Website?: string;
  OpeningHours: string;
  ProvidesEmergencyCare: boolean;
  AcceptingNewPatients: boolean;
  AcceptsWalkIns: boolean;
  NHSFunded: boolean;
  RegistrationRequirements?: string;
  IDRequirements?: string;
  InterpreterAvailable: boolean;
  MentalHealthSupport: boolean;
  SubstanceAbuseSupport: boolean;
  DateAdded: Date;
  LastUpdated?: Date;
  IsActive: boolean;
  distance?: number;
  AvailableServices?: string;
  AccessibilityFeatures?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '5'; // Default 5km radius
  const serviceType = searchParams.get('type');
  const emergency = searchParams.get('emergency') === 'true';
  const registering = searchParams.get('registering') === 'true';
  const walkin = searchParams.get('walkin') === 'true';
  
  try {
    let query = `
      SELECT h.*,
      (6371 * acos(
        cos(radians(?)) * 
        cos(radians(Latitude)) * 
        cos(radians(Longitude) - radians(?)) + 
        sin(radians(?)) * 
        sin(radians(Latitude))
      )) AS distance,
        GROUP_CONCAT(DISTINCT s.ServiceName) as AvailableServices,
        GROUP_CONCAT(DISTINCT a.AccessibilityFeature) as AccessibilityFeatures
      FROM HealthcareResources h
      LEFT JOIN HealthcareServices s ON h.ResourceID = s.ResourceID
      LEFT JOIN HealthcareAccessibility a ON h.ResourceID = a.ResourceID
      WHERE h.IsActive = TRUE
    `;
    const params: any[] = [lat, lng, lat];

    if (serviceType) {
      query += ' AND h.ServiceType = ?';
      params.push(serviceType);
    }

    if (emergency) {
      query += ' AND h.ProvidesEmergencyCare = TRUE';
    }

    if (registering) {
      query += ' AND h.AcceptingNewPatients = TRUE';
    }

    if (walkin) {
      query += ' AND h.AcceptsWalkIns = TRUE';
    }

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    } else {
      query += ' ORDER BY h.ResourceName';
    }

    query += ' GROUP BY h.ResourceID';

    // Updated to use object parameter format
    const resources = await executeQuery<HealthcareResource[]>({
      query,
      values: params
    });
    
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch healthcare resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      resourceName,
      serviceType,
      description,
      address,
      latitude,
      longitude,
      contactNumber,
      email,
      website,
      openingHours,
      providesEmergencyCare,
      acceptingNewPatients,
      acceptsWalkIns,
      nhsFunded,
      services = [],
      accessibilityFeatures = [],
      registrationRequirements,
      idRequirements,
      interpreterAvailable,
      mentalHealthSupport,
      substanceAbuseSupport
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO HealthcareResources (
        ResourceName, ServiceType, Description,
        Address, Latitude, Longitude,
        ContactNumber, Email, Website,
        OpeningHours, ProvidesEmergencyCare,
        AcceptingNewPatients, AcceptsWalkIns,
        NHSFunded, RegistrationRequirements,
        IDRequirements, InterpreterAvailable,
        MentalHealthSupport, SubstanceAbuseSupport,
        DateAdded, IsActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
      values: [
        resourceName,
        serviceType,
        description,
        address,
        latitude,
        longitude,
        contactNumber,
        email,
        website,
        openingHours,
        providesEmergencyCare,
        acceptingNewPatients,
        acceptsWalkIns,
        nhsFunded,
        registrationRequirements,
        idRequirements,
        interpreterAvailable,
        mentalHealthSupport,
        substanceAbuseSupport
      ]
    });

    // Add services
    for (const service of services) {
      await executeQuery({
        query: 'INSERT INTO HealthcareServices (ResourceID, ServiceName) VALUES (?, ?)',
        values: [result.insertId, service]
      });
    }

    // Add accessibility features
    for (const feature of accessibilityFeatures) {
      await executeQuery({
        query: 'INSERT INTO HealthcareAccessibility (ResourceID, AccessibilityFeature) VALUES (?, ?)',
        values: [result.insertId, feature]
      });
    }

    // Create notification for new NHS services
    if (nhsFunded && acceptingNewPatients) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'New NHS Healthcare Service',
          ?, 'Healthcare', ?, 'Medical',
          'High', NOW()
        )`,
        values: [
          `New NHS healthcare service available: ${resourceName} - Now accepting new patients`,
          result.insertId
        ]
      });
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create healthcare resource' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { resourceId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE HealthcareResources SET
        ResourceName = ?,
        ServiceType = ?,
        Description = ?,
        Address = ?,
        Latitude = ?,
        Longitude = ?,
        ContactNumber = ?,
        Email = ?,
        Website = ?,
        OpeningHours = ?,
        ProvidesEmergencyCare = ?,
        AcceptingNewPatients = ?,
        AcceptsWalkIns = ?,
        NHSFunded = ?,
        RegistrationRequirements = ?,
        IDRequirements = ?,
        InterpreterAvailable = ?,
        MentalHealthSupport = ?,
        SubstanceAbuseSupport = ?,
        LastUpdated = NOW()
      WHERE ResourceID = ?`,
      values: [
        updateData.resourceName,
        updateData.serviceType,
        updateData.description,
        updateData.address,
        updateData.latitude,
        updateData.longitude,
        updateData.contactNumber,
        updateData.email,
        updateData.website,
        updateData.openingHours,
        updateData.providesEmergencyCare,
        updateData.acceptingNewPatients,
        updateData.acceptsWalkIns,
        updateData.nhsFunded,
        updateData.registrationRequirements,
        updateData.idRequirements,
        updateData.interpreterAvailable,
        updateData.mentalHealthSupport,
        updateData.substanceAbuseSupport,
        resourceId
      ]
    });

    // Update services if provided
    if (updateData.services) {
      await executeQuery({
        query: 'DELETE FROM HealthcareServices WHERE ResourceID = ?',
        values: [resourceId]
      });
      
      for (const service of updateData.services) {
        await executeQuery({
          query: 'INSERT INTO HealthcareServices (ResourceID, ServiceName) VALUES (?, ?)',
          values: [resourceId, service]
        });
      }
    }

    // Update accessibility features if provided
    if (updateData.accessibilityFeatures) {
      await executeQuery({
        query: 'DELETE FROM HealthcareAccessibility WHERE ResourceID = ?',
        values: [resourceId]
      });
      
      for (const feature of updateData.accessibilityFeatures) {
        await executeQuery({
          query: 'INSERT INTO HealthcareAccessibility (ResourceID, AccessibilityFeature) VALUES (?, ?)',
          values: [resourceId, feature]
        });
      }
    }

    // If registration status changed, create notification
    if (updateData.previousAcceptingNewPatients === false && 
        updateData.acceptingNewPatients === true) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'Healthcare Registration Update',
          ?, 'Healthcare', ?, 'Medical',
          'High', NOW()
        )`,
        values: [
          `${updateData.resourceName} is now accepting new patients`,
          resourceId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update healthcare resource' }, { status: 500 });
  }
}

// Track user healthcare interactions and needs
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      resourceId,
      interactionType,
      notes,
      followUpNeeded,
      followUpDate,
      urgencyLevel,
      healthIssues = []
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO UserHealthcareInteractions (
        UserID, ResourceID, InteractionType,
        Notes, FollowUpNeeded, FollowUpDate,
        UrgencyLevel, DateRecorded
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      values: [
        userId,
        resourceId,
        interactionType,
        notes,
        followUpNeeded,
        followUpDate,
        urgencyLevel
      ]
    });

    // Record health issues
    for (const issue of healthIssues) {
      await executeQuery({
        query: `INSERT INTO UserHealthIssues (
          UserID, InteractionID, HealthIssue,
          Status, DateIdentified
        ) VALUES (?, ?, ?, 'Active', NOW())`,
        values: [userId, result.insertId, issue]
      });
    }

    // Create follow-up reminder if needed
    if (followUpNeeded && followUpDate) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated, ScheduledDate
        ) VALUES (?, 'Healthcare Follow-up Reminder', ?,
          'Healthcare', ?, 'Medical',
          ?, NOW(), ?)`,
        values: [
          userId,
          `Follow-up appointment needed at ${resourceId}`,
          result.insertId,
          urgencyLevel === 'High' ? 'High' : 'Medium',
          followUpDate
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record healthcare interaction' }, { status: 500 });
  }
}