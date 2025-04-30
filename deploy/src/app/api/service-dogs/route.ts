import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

interface QueryResult {
  insertId?: number;
  affectedRows?: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const dogId = searchParams.get('dogId');
  const status = searchParams.get('status');
  const trainingLevel = searchParams.get('trainingLevel');
  
  try {
    let query = `
      SELECT d.*,
        GROUP_CONCAT(DISTINCT s.SpecialtyArea) as Specialties,
        GROUP_CONCAT(DISTINCT t.TrainingCertification) as Certifications,
        w.LastCheckupDate,
        w.LastVetVisit,
        w.NextVetVisit,
        w.CurrentHealthStatus,
        w.VaccinationStatus
      FROM ServiceDogs d
      LEFT JOIN DogSpecialties s ON d.DogID = s.DogID
      LEFT JOIN DogTraining t ON d.DogID = t.DogID
      LEFT JOIN DogWelfare w ON d.DogID = w.DogID
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND d.HandlerID = ?';
      params.push(userId);
    }

    if (dogId) {
      query += ' AND d.DogID = ?';
      params.push(dogId);
    }

    if (status) {
      query += ' AND d.Status = ?';
      params.push(status);
    }

    if (trainingLevel) {
      query += ' AND d.TrainingLevel = ?';
      params.push(trainingLevel);
    }

    query += ' GROUP BY d.DogID ORDER BY d.RegistrationDate DESC';

    // Updated to use object parameter format
    const dogs = await executeQuery({
      query,
      values: params
    });
    return NextResponse.json(dogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service dog information' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      handlerId,
      name,
      breed,
      dateOfBirth,
      microchipNumber,
      registrationNumber,
      trainingLevel,
      status,
      emergencyContact,
      specialties = [],
      certifications = [],
      healthInfo,
      photoUrl,
      notes
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<QueryResult>({
      query: `INSERT INTO ServiceDogs (
        HandlerID, Name, Breed,
        DateOfBirth, MicrochipNumber,
        RegistrationNumber, TrainingLevel,
        Status, EmergencyContact,
        PhotoURL, Notes,
        RegistrationDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      values: [
        handlerId,
        name,
        breed,
        dateOfBirth,
        microchipNumber,
        registrationNumber,
        trainingLevel,
        status,
        emergencyContact,
        photoUrl,
        notes
      ]
    });

    // Add specialties
    for (const specialty of specialties) {
      // Updated to use object parameter format
      await executeQuery({
        query: 'INSERT INTO DogSpecialties (DogID, SpecialtyArea) VALUES (?, ?)',
        values: [result.insertId, specialty]
      });
    }

    // Add certifications
    for (const cert of certifications) {
      // Updated to use object parameter format
      await executeQuery({
        query: 'INSERT INTO DogTraining (DogID, TrainingCertification, DateCertified) VALUES (?, ?, NOW())',
        values: [result.insertId, cert]
      });
    }

    // Initialize welfare tracking
    // Updated to use object parameter format
    await executeQuery({
      query: `INSERT INTO DogWelfare (
        DogID, LastCheckupDate,
        CurrentHealthStatus,
        VaccinationStatus,
        FeedingSchedule,
        ExerciseSchedule,
        GroomingSchedule,
        DateCreated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      values: [
        result.insertId,
        healthInfo.lastCheckup,
        'Healthy', // Default status
        healthInfo.vaccinations,
        healthInfo.feeding,
        healthInfo.exercise,
        healthInfo.grooming
      ]
    });

    // Create notification for handler
    // Updated to use object parameter format
    await executeQuery({
      query: `INSERT INTO RealTimeNotifications (
        UserID, Title, Message,
        NotificationType, RelatedEntityID,
        RelatedEntityType, Priority,
        DateCreated
      ) VALUES (?, 'Service Dog Registration Complete', ?,
        'Dog', ?, 'ServiceDog',
        'High', NOW())`,
      values: [
        handlerId,
        `${name} has been registered as your service dog. Please review the care guidelines.`,
        result.insertId
      ]
    });

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register service dog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { dogId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE ServiceDogs SET
        Name = ?,
        TrainingLevel = ?,
        Status = ?,
        EmergencyContact = ?,
        PhotoURL = ?,
        Notes = ?,
        LastUpdated = NOW()
      WHERE DogID = ?`,
      values: [
        updateData.name,
        updateData.trainingLevel,
        updateData.status,
        updateData.emergencyContact,
        updateData.photoUrl,
        updateData.notes,
        dogId
      ]
    });

    // Update specialties if provided
    if (updateData.specialties) {
      // Updated to use object parameter format
      await executeQuery({
        query: 'DELETE FROM DogSpecialties WHERE DogID = ?',
        values: [dogId]
      });
      
      for (const specialty of updateData.specialties) {
        // Updated to use object parameter format
        await executeQuery({
          query: 'INSERT INTO DogSpecialties (DogID, SpecialtyArea) VALUES (?, ?)',
          values: [dogId, specialty]
        });
      }
    }

    // Add new certifications if provided
    if (updateData.newCertifications) {
      for (const cert of updateData.newCertifications) {
        // Updated to use object parameter format
        await executeQuery({
          query: 'INSERT INTO DogTraining (DogID, TrainingCertification, DateCertified) VALUES (?, ?, NOW())',
          values: [dogId, cert]
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update service dog information' }, { status: 500 });
  }
}

// Update dog welfare information
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      dogId,
      checkupDate,
      healthStatus,
      issues = [],
      vaccinations = [],
      vetVisitDate,
      nextVisitDate,
      vetNotes
    } = body;

    // Update welfare record
    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE DogWelfare SET
        LastCheckupDate = ?,
        CurrentHealthStatus = ?,
        LastVetVisit = ?,
        NextVetVisit = ?,
        VetNotes = ?,
        LastUpdated = NOW()
      WHERE DogID = ?`,
      values: [
        checkupDate,
        healthStatus,
        vetVisitDate,
        nextVisitDate,
        vetNotes,
        dogId
      ]
    });

    // Record health issues if any
    for (const issue of issues) {
      // Updated to use object parameter format
      await executeQuery({
        query: `INSERT INTO DogHealthIssues (
          DogID, HealthIssue,
          DateIdentified, Status,
          Notes
        ) VALUES (?, ?, NOW(), 'Active', ?)`,
        values: [dogId, issue.type, issue.notes]
      });
    }

    // Update vaccinations
    for (const vacc of vaccinations) {
      // Updated to use object parameter format
      await executeQuery({
        query: `INSERT INTO DogVaccinations (
          DogID, VaccinationType,
          DateAdministered, ExpiryDate,
          VetName
        ) VALUES (?, ?, ?, ?, ?)`,
        values: [
          dogId,
          vacc.type,
          vacc.date,
          vacc.expiry,
          vacc.vetName
        ]
      });
    }

    // Create reminder for next vet visit
    if (nextVisitDate) {
      // Updated to use object parameter format
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated, ScheduledDate
        ) SELECT 
          HandlerID,
          'Upcoming Vet Visit',
          ?,
          'Dog', ?,
          'ServiceDog',
          'High',
          NOW(),
          DATE_SUB(?, INTERVAL 1 WEEK)
        FROM ServiceDogs
        WHERE DogID = ?`,
        values: [
          `Reminder: Vet visit scheduled for your service dog`,
          dogId,
          nextVisitDate,
          dogId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update dog welfare information' }, { status: 500 });
  }
}