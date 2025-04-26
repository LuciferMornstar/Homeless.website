import { NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const caseId = searchParams.get('caseId');
  const goalStatus = searchParams.get('status');
  const category = searchParams.get('category');
  
  try {
    let query = `
      SELECT g.*,
        pt.ProgressDate,
        pt.MilestoneAchieved,
        pt.Notes as ProgressNotes,
        pt.SupportProvided,
        c.Status as CaseStatus,
        c.CaseWorkerID
      FROM UserGoals g
      LEFT JOIN ProgressTracking pt ON g.GoalID = pt.GoalID
      LEFT JOIN CaseManagement c ON g.CaseID = c.CaseID
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND g.UserID = ?';
      params.push(userId);
    }

    if (caseId) {
      query += ' AND g.CaseID = ?';
      params.push(caseId);
    }

    if (goalStatus) {
      query += ' AND g.Status = ?';
      params.push(goalStatus);
    }

    if (category) {
      query += ' AND g.Category = ?';
      params.push(category);
    }

    query += ' ORDER BY g.Priority DESC, g.TargetDate ASC';

    const goals = await executeQuery(query, params);
    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch progress data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      caseId,
      goalTitle,
      description,
      category,
      priority,
      targetDate,
      milestones = [],
      supportNeeded
    } = body;

    // Create goal and its milestones in a transaction
    const queries = [
      {
        query: `
          INSERT INTO UserGoals (
            UserID, CaseID, GoalTitle,
            Description, Category, Priority,
            TargetDate, Status, SupportNeeded,
            DateCreated
          ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?, NOW())
        `,
        params: [
          userId,
          caseId,
          goalTitle,
          description,
          category,
          priority,
          targetDate,
          supportNeeded
        ]
      }
    ];

    // Add milestone tracking entries
    milestones.forEach((milestone: string) => {
      queries.push({
        query: `
          INSERT INTO ProgressTracking (
            GoalID, UserID, MilestoneDescription,
            Status, DateCreated
          ) VALUES (LAST_INSERT_ID(), ?, ?, 'Pending', NOW())
        `,
        params: [userId, milestone]
      });
    });

    // Create notification for case worker if assigned
    if (caseId) {
      queries.push({
        query: `
          INSERT INTO RealTimeNotifications (
            UserID, Title, Message,
            NotificationType, RelatedEntityID,
            RelatedEntityType, Priority,
            DateCreated
          ) SELECT 
            CaseWorkerID,
            'New Goal Added',
            ?,
            'Goal',
            LAST_INSERT_ID(),
            'Goal',
            'Medium',
            NOW()
          FROM CaseManagement
          WHERE CaseID = ?
        `,
        params: [
          `New goal added for case: ${goalTitle}`,
          caseId
        ]
      });
    }

    const results = await executeTransaction(queries);
    const goalId = results[0].insertId;

    return NextResponse.json({ id: goalId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      goalId,
      userId,
      progressUpdate,
      milestoneAchieved,
      supportProvided,
      notes
    } = body;

    // Record progress update
    const result = await executeQuery(
      `INSERT INTO ProgressTracking (
        GoalID, UserID, ProgressDate,
        MilestoneAchieved, Notes,
        SupportProvided, DateRecorded
      ) VALUES (?, ?, NOW(), ?, ?, ?, NOW())`,
      [
        goalId,
        userId,
        milestoneAchieved,
        notes,
        supportProvided
      ]
    );

    // Check if all milestones are achieved
    const milestones = await executeQuery(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN Status = 'Achieved' THEN 1 ELSE 0 END) as achieved
      FROM ProgressTracking
      WHERE GoalID = ?`,
      [goalId]
    );

    // Update goal status if all milestones achieved
    if (milestones[0].total === milestones[0].achieved) {
      await executeQuery(
        `UPDATE UserGoals SET
          Status = 'Completed',
          CompletionDate = NOW()
        WHERE GoalID = ?`,
        [goalId]
      );

      // Create celebration notification
      await executeQuery(
        `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'Goal Achieved! 🎉', ?,
          'Achievement', ?, 'Goal',
          'High', NOW())`,
        [
          userId,
          `Congratulations! You've achieved your goal: ${progressUpdate}`,
          goalId
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}