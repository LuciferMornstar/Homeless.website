import { NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const caseWorkerId = searchParams.get('caseWorkerId');
  const status = searchParams.get('status');
  const primaryNeed = searchParams.get('primaryNeed');
  
  try {
    let query = `
      SELECT c.*,
        u.FirstName as UserFirstName,
        u.LastName as UserLastName,
        u.ContactPreference as UserContactPreference,
        u.HasDog as UserHasDog,
        cw.FirstName as CaseWorkerFirstName,
        cw.LastName as CaseWorkerLastName
      FROM CaseManagement c
      JOIN Users u ON c.UserID = u.UserID
      LEFT JOIN Users cw ON c.CaseWorkerID = cw.UserID
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND c.UserID = ?';
      params.push(userId);
    }

    if (caseWorkerId) {
      query += ' AND c.CaseWorkerID = ?';
      params.push(caseWorkerId);
    }

    if (status) {
      query += ' AND c.Status = ?';
      params.push(status);
    }

    if (primaryNeed) {
      query += ' AND c.PrimaryNeed = ?';
      params.push(primaryNeed);
    }

    query += ' ORDER BY c.OpenDate DESC';

    const cases = await executeQuery(query, params);
    return NextResponse.json(cases);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cases' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      caseWorkerId,
      primaryNeed,
      secondaryNeeds,
      notes,
      mentalHealthAssessmentId, // Optional: link to recent assessment
      dogId // Optional: if user has a service dog
    } = body;

    // Start a transaction for creating the case and related records
    const queries = [
      {
        query: `
          INSERT INTO CaseManagement (
            UserID, CaseWorkerID, OpenDate,
            Status, PrimaryNeed, SecondaryNeeds
          ) VALUES (?, ?, CURDATE(), 'Open', ?, ?)
        `,
        params: [userId, caseWorkerId, primaryNeed, secondaryNeeds]
      }
    ];

    // If there's a mental health assessment, link it
    if (mentalHealthAssessmentId) {
      queries.push({
        query: `
          UPDATE MentalHealthAssessments
          SET LinkedToCaseID = LAST_INSERT_ID()
          WHERE AssessmentID = ?
        `,
        params: [mentalHealthAssessmentId]
      });
    }

    // If there's a service dog, update dog welfare tracking
    if (dogId) {
      queries.push({
        query: `
          INSERT INTO ServiceDogWelfareConcerns (
            DogID, CaseID, Status, DateReported
          ) VALUES (?, LAST_INSERT_ID(), 'New', CURDATE())
        `,
        params: [dogId]
      });
    }

    // Create notification for case worker
    queries.push({
      query: `
        INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'New Case Assigned', ?,
          'Case', LAST_INSERT_ID(), 'Case',
          'High', NOW())
      `,
      params: [
        caseWorkerId,
        `New case assigned: ${primaryNeed} support needed`
      ]
    });

    const results = await executeTransaction(queries);
    const caseId = results[0].insertId;

    return NextResponse.json({ id: caseId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create case' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      caseId,
      status,
      newCaseWorkerId,
      closeDate,
      ...updateData
    } = body;

    const result = await executeQuery(
      `UPDATE CaseManagement SET
        Status = ?,
        CaseWorkerID = ?,
        CloseDate = ?,
        SecondaryNeeds = ?,
        LastUpdated = NOW()
      WHERE CaseID = ?`,
      [
        status,
        newCaseWorkerId,
        closeDate,
        updateData.secondaryNeeds,
        caseId
      ]
    );

    // If case worker changed, notify new case worker
    if (newCaseWorkerId) {
      await executeQuery(
        `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'Case Transferred', ?,
          'Case', ?, 'Case',
          'High', NOW())`,
        [
          newCaseWorkerId,
          `Case ${caseId} has been transferred to you`,
          caseId
        ]
      );
    }

    // If case closed, create summary notification
    if (status === 'Closed') {
      await executeQuery(
        `INSERT INTO RealTimeNotifications (
          Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES ('Case Closed', ?,
          'Case', ?, 'Case',
          'Medium', NOW())`,
        [
          `Case ${caseId} has been closed`,
          caseId
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}