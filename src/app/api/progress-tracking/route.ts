import { NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/db';

// Define interfaces for type safety
interface Goal {
  GoalID: number;
  UserID: string;
  CaseID?: number;
  GoalTitle: string;
  Description: string;
  Category: string;
  Priority: string;
  TargetDate: Date;
  Status: string;
  SupportNeeded: string;
  DateCreated: Date;
  CompletionDate?: Date;
  ProgressDate?: Date;
  MilestoneAchieved?: string;
  ProgressNotes?: string;
  SupportProvided?: string;
  CaseStatus?: string;
  CaseWorkerID?: string;
}

interface ProgressMilestone {
  total: number;
  achieved: number;
}

// Interface for single transaction result
interface TransactionResult {
  insertId: number;
  affectedRows: number;
  changedRows?: number;
}

// Function to get the first result with proper typing
function getFirstResult<T>(results: any[]): T {
  return results[0] as T;
}

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

    // Updated to use object parameter format
    const goals = await executeQuery<Goal[]>({
      query,
      values: params
    });
    
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

    // Execute the transaction and handle the results safely
    const results = await executeTransaction(queries);
    const firstResult = getFirstResult<TransactionResult>(results);
    const goalId = firstResult.insertId;

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
    // Updated to use object parameter format
    await executeQuery({
      query: `INSERT INTO ProgressTracking (
        GoalID, UserID, ProgressDate,
        MilestoneAchieved, Notes,
        SupportProvided, DateRecorded
      ) VALUES (?, ?, NOW(), ?, ?, ?, NOW())`,
      values: [
        goalId,
        userId,
        milestoneAchieved,
        notes,
        supportProvided
      ]
    });

    // Check if all milestones are achieved
    // Updated to use object parameter format
    const milestones = await executeQuery<ProgressMilestone[]>({
      query: `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN Status = 'Achieved' THEN 1 ELSE 0 END) as achieved
      FROM ProgressTracking
      WHERE GoalID = ?`,
      values: [goalId]
    });

    // Update goal status if all milestones achieved
    if (milestones[0].total === milestones[0].achieved) {
      // Updated to use object parameter format
      await executeQuery({
        query: `UPDATE UserGoals SET
          Status = 'Completed',
          CompletionDate = NOW()
        WHERE GoalID = ?`,
        values: [goalId]
      });

      // Create celebration notification
      // Updated to use object parameter format
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'Goal Achieved! 🎉', ?,
          'Achievement', ?, 'Goal',
          'High', NOW())`,
        values: [
          userId,
          `Congratulations! You've achieved your goal: ${progressUpdate}`,
          goalId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}