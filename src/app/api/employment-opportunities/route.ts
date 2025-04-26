import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Define interface for employment opportunities
interface EmploymentOpportunity {
  JobID: number;
  OrganizationID: string;
  Title: string;
  Description: string;
  Type: 'Job' | 'Training' | 'Volunteer';
  Location: string;
  ContactInformation: string;
  ApplicationProcess: string;
  DatePosted: Date;
  ExpiryDate: Date;
  IsVerified: boolean;
}

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

    // Updated to use object parameter format
    const opportunities = await executeQuery<EmploymentOpportunity[]>({
      query,
      values: params
    });
    
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

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO EmploymentOpportunities (
        OrganizationID, Title, Description,
        Type, Location, ContactInformation,
        ApplicationProcess, DatePosted,
        ExpiryDate, IsVerified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, FALSE)`,
      values: [
        organizationId,
        title,
        description,
        type,
        location,
        contactInformation,
        applicationProcess,
        expiryDate
      ]
    });

    // Create notification for new opportunities
    await executeQuery({
      query: `INSERT INTO RealTimeNotifications (
        Title, Message, NotificationType,
        RelatedEntityID, RelatedEntityType,
        Priority, DateCreated
      ) VALUES (
        'New Employment Opportunity',
        ?, 'Employment', ?, 'Job',
        'Medium', NOW()
      )`,
      values: [
        `New ${type.toLowerCase()} opportunity: ${title} in ${location}`,
        result.insertId
      ]
    });

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add opportunity' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { opportunityId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE EmploymentOpportunities SET
        Title = ?,
        Description = ?,
        Type = ?,
        Location = ?,
        ContactInformation = ?,
        ApplicationProcess = ?,
        ExpiryDate = ?,
        IsVerified = FALSE
      WHERE JobID = ?`,
      values: [
        updateData.title,
        updateData.description,
        updateData.type,
        updateData.location,
        updateData.contactInformation,
        updateData.applicationProcess,
        updateData.expiryDate,
        opportunityId
      ]
    });

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
    // Updated to use object parameter format
    const opportunity = await executeQuery<{OrganizationID: string}[]>({
      query: 'SELECT OrganizationID FROM EmploymentOpportunities WHERE JobID = ?',
      values: [opportunityId]
    });

    if (opportunity.length === 0 || opportunity[0].OrganizationID !== organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Updated to use object parameter format
    await executeQuery({
      query: 'DELETE FROM EmploymentOpportunities WHERE JobID = ?',
      values: [opportunityId]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete opportunity' }, { status: 500 });
  }
}