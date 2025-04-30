import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Define interface for educational resources
interface EducationalResource {
  ResourceID: number;
  Title: string;
  Description: string;
  Category: string;
  SkillLevel: string;
  ContentType: string;
  Duration: string;
  IsOnline: boolean;
  Location?: string;
  Provider: string;
  AccessibilityFeatures?: string;
  StartDate?: Date;
  EndDate?: Date;
  MaxParticipants?: number;
  Cost: number;
  FundingAvailable: boolean;
  Tags?: string;
  Prerequisites?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const skillLevel = searchParams.get('skillLevel');
  const accessibility = searchParams.get('accessibility');
  const location = searchParams.get('location');
  
  try {
    let query = `
      SELECT r.*,
        GROUP_CONCAT(DISTINCT t.TagName) as Tags,
        GROUP_CONCAT(DISTINCT p.PrerequisiteName) as Prerequisites
      FROM EducationalResources r
      LEFT JOIN ResourceTags t ON r.ResourceID = t.ResourceID
      LEFT JOIN ResourcePrerequisites p ON r.ResourceID = p.ResourceID
      WHERE r.IsActive = TRUE
    `;
    const params: any[] = [];

    if (category) {
      query += ' AND r.Category = ?';
      params.push(category);
    }

    if (skillLevel) {
      query += ' AND r.SkillLevel = ?';
      params.push(skillLevel);
    }

    if (accessibility) {
      query += ' AND r.AccessibilityFeatures LIKE ?';
      params.push(`%${accessibility}%`);
    }

    if (location) {
      query += ' AND (r.Location = ? OR r.IsOnline = TRUE)';
      params.push(location);
    }

    query += ' GROUP BY r.ResourceID ORDER BY r.Priority DESC';

    // Updated to use object parameter format
    const resources = await executeQuery<EducationalResource[]>({
      query,
      values: params
    });
    
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch educational resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      skillLevel,
      contentType,
      duration,
      isOnline,
      location,
      provider,
      accessibilityFeatures,
      prerequisites = [],
      tags = [],
      startDate,
      endDate,
      maxParticipants,
      cost,
      fundingAvailable
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO EducationalResources (
        Title, Description, Category,
        SkillLevel, ContentType, Duration,
        IsOnline, Location, Provider,
        AccessibilityFeatures, StartDate,
        EndDate, MaxParticipants,
        Cost, FundingAvailable,
        DateAdded, IsActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
      values: [
        title,
        description,
        category,
        skillLevel,
        contentType,
        duration,
        isOnline,
        location,
        provider,
        accessibilityFeatures,
        startDate,
        endDate,
        maxParticipants,
        cost,
        fundingAvailable
      ]
    });

    // Add tags
    for (const tag of tags) {
      await executeQuery({
        query: 'INSERT INTO ResourceTags (ResourceID, TagName) VALUES (?, ?)',
        values: [result.insertId, tag]
      });
    }

    // Add prerequisites
    for (const prereq of prerequisites) {
      await executeQuery({
        query: 'INSERT INTO ResourcePrerequisites (ResourceID, PrerequisiteName) VALUES (?, ?)',
        values: [result.insertId, prereq]
      });
    }

    // Create notification for free/funded opportunities
    if (cost === 0 || fundingAvailable) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'New Training Opportunity',
          ?, 'Education', ?, 'Training',
          'Medium', NOW()
        )`,
        values: [
          `New ${fundingAvailable ? 'funded' : 'free'} training available: ${title}`,
          result.insertId
        ]
      });
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create educational resource' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { resourceId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE EducationalResources SET
        Title = ?,
        Description = ?,
        Category = ?,
        SkillLevel = ?,
        ContentType = ?,
        Duration = ?,
        IsOnline = ?,
        Location = ?,
        Provider = ?,
        AccessibilityFeatures = ?,
        StartDate = ?,
        EndDate = ?,
        MaxParticipants = ?,
        Cost = ?,
        FundingAvailable = ?,
        LastUpdated = NOW()
      WHERE ResourceID = ?`,
      values: [
        updateData.title,
        updateData.description,
        updateData.category,
        updateData.skillLevel,
        updateData.contentType,
        updateData.duration,
        updateData.isOnline,
        updateData.location,
        updateData.provider,
        updateData.accessibilityFeatures,
        updateData.startDate,
        updateData.endDate,
        updateData.maxParticipants,
        updateData.cost,
        updateData.fundingAvailable,
        resourceId
      ]
    });

    // Update tags if provided
    if (updateData.tags) {
      await executeQuery({
        query: 'DELETE FROM ResourceTags WHERE ResourceID = ?',
        values: [resourceId]
      });
      
      for (const tag of updateData.tags) {
        await executeQuery({
          query: 'INSERT INTO ResourceTags (ResourceID, TagName) VALUES (?, ?)',
          values: [resourceId, tag]
        });
      }
    }

    // Update prerequisites if provided
    if (updateData.prerequisites) {
      await executeQuery({
        query: 'DELETE FROM ResourcePrerequisites WHERE ResourceID = ?',
        values: [resourceId]
      });
      
      for (const prereq of updateData.prerequisites) {
        await executeQuery({
          query: 'INSERT INTO ResourcePrerequisites (ResourceID, PrerequisiteName) VALUES (?, ?)',
          values: [resourceId, prereq]
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update educational resource' }, { status: 500 });
  }
}

// Track user progress in educational resources
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      resourceId,
      completionStatus,
      assessmentScore,
      feedback
    } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `INSERT INTO UserEducationProgress (
        UserID, ResourceID, StartDate,
        CompletionStatus, CompletionDate,
        AssessmentScore, Feedback
      ) VALUES (?, ?, NOW(), ?, CASE WHEN ? = 'Completed' THEN NOW() ELSE NULL END, ?, ?)
      ON DUPLICATE KEY UPDATE
        CompletionStatus = VALUES(CompletionStatus),
        CompletionDate = VALUES(CompletionDate),
        AssessmentScore = VALUES(AssessmentScore),
        Feedback = VALUES(Feedback)`,
      values: [
        userId,
        resourceId,
        completionStatus,
        completionStatus,
        assessmentScore,
        feedback
      ]
    });

    // If completed, create achievement notification
    if (completionStatus === 'Completed') {
      const resource = await executeQuery<{Title: string}[]>({
        query: 'SELECT Title FROM EducationalResources WHERE ResourceID = ?',
        values: [resourceId]
      });

      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'Course Completed! 🎓', ?,
          'Achievement', ?, 'Education',
          'High', NOW())`,
        values: [
          userId,
          `Congratulations! You've completed: ${resource[0].Title}`,
          resourceId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}