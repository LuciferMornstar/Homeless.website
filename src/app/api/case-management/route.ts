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

    // Updated to use object parameter format
    const cases = await executeQuery({
      query,
      values: params
    });
    
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
      mentalHealthAssessmentId,
      dogId
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
        values: [userId, caseWorkerId, primaryNeed, secondaryNeeds]
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
        values: [mentalHealthAssessmentId]
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
        values: [dogId]
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
      values: [
        caseWorkerId,
        `New case assigned: ${primaryNeed} support needed`
      ]
    });

    // Add type definition for MySQL insert result
    interface MySQLInsertResult {
      insertId: number;
      affectedRows: number;
    }

    const results = await executeTransaction<MySQLInsertResult>(queries);
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

    // Updated to use object parameter format
    const result = await executeQuery({
      query: `UPDATE CaseManagement SET
        Status = ?,
        CaseWorkerID = ?,
        CloseDate = ?,
        SecondaryNeeds = ?,
        LastUpdated = NOW()
      WHERE CaseID = ?`,
      values: [
        status,
        newCaseWorkerId,
        closeDate,
        updateData.secondaryNeeds,
        caseId
      ]
    });

    // If case worker changed, notify new case worker
    if (newCaseWorkerId) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'Case Transferred', ?,
          'Case', ?, 'Case',
          'High', NOW())`,
        values: [
          newCaseWorkerId,
          `Case ${caseId} has been transferred to you`,
          caseId
        ]
      });
    }

    // If case closed, create summary notification
    if (status === 'Closed') {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES ('Case Closed', ?,
          'Case', ?, 'Case',
          'Medium', NOW())`,
        values: [
          `Case ${caseId} has been closed`,
          caseId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update case' }, { status: 500 });
  }
}