import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'Job', 'Training', 'Volunteer'
  const organization = searchParams.get('organization');
  const location = searchParams.get('location');
  
  try {
    let query = 'SELECT * FROM EmploymentOpportunities WHERE ExpiryDate > CURDATE()';
    const params: any[] = [];

    if (type) {
      query += ' AND Type = ?';
      params.push(type);
    }

    if (organization) {
      query += ' AND OrganizationID = ?';
      params.push(organization);
    }

    if (location) {
      query += ' AND Location LIKE ?';
      params.push(`%${location}%`);
    }

    query += ' ORDER BY DatePosted DESC';

    const opportunities = await executeQuery(query, params);
    return NextResponse.json(opportunities);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      organizationId,
      title,
      description,
      type,
      location,
      contactInformation,
      applicationProcess,
      expiryDate
    } = body;

    const result = await executeQuery<any>(
      `INSERT INTO EmploymentOpportunities (
        OrganizationID, Title, Description,
        Type, Location, ContactInformation,
        ApplicationProcess, DatePosted,
        ExpiryDate, IsVerified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, FALSE)`,
      [
        organizationId,
        title,
        description,
        type,
        location,
        contactInformation,
        applicationProcess,
        expiryDate
      ]
    );

    // Create notification for new opportunities
    await executeQuery(
      `INSERT INTO RealTimeNotifications (
        Title, Message, NotificationType,
        RelatedEntityID, RelatedEntityType,
        Priority, DateCreated
      ) VALUES (
        'New Employment Opportunity',
        ?, 'Employment', ?, 'Job',
        'Medium', NOW()
      )`,
      [
        `New ${type.toLowerCase()} opportunity: ${title} in ${location}`,
        result.insertId
      ]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add opportunity' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { opportunityId, ...updateData } = body;

    const result = await executeQuery(
      `UPDATE EmploymentOpportunities SET
        Title = ?,
        Description = ?,
        Type = ?,
        Location = ?,
        ContactInformation = ?,
        ApplicationProcess = ?,
        ExpiryDate = ?,
        IsVerified = FALSE
      WHERE JobID = ?`,
      [
        updateData.title,
        updateData.description,
        updateData.type,
        updateData.location,
        updateData.contactInformation,
        updateData.applicationProcess,
        updateData.expiryDate,
        opportunityId
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update opportunity' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const opportunityId = searchParams.get('opportunityId');
  const organizationId = searchParams.get('organizationId'); // For verification

  try {
    // Verify the organization owns this opportunity
    const opportunity = await executeQuery(
      'SELECT OrganizationID FROM EmploymentOpportunities WHERE JobID = ?',
      [opportunityId]
    );

    if (opportunity.length === 0 || opportunity[0].OrganizationID !== organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await executeQuery(
      'DELETE FROM EmploymentOpportunities WHERE JobID = ?',
      [opportunityId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete opportunity' }, { status: 500 });
  }
}