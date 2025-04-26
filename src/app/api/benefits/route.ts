import { NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

// Validation schemas
const benefitApplicationSchema = z.object({
  benefitType: z.string(),
  status: z.enum(['pending', 'approved', 'rejected', 'in_review']),
  applicationDate: z.string(),
  notes: z.string().optional(),
  supportingDocuments: z.array(z.string()).optional(),
  nextSteps: z.string().optional(),
  appointmentDate: z.string().optional()
});

const financialAssistanceSchema = z.object({
  assistanceType: z.string(),
  amount: z.number(),
  frequency: z.enum(['one_time', 'weekly', 'monthly', 'quarterly', 'annually']),
  startDate: z.string(),
  endDate: z.string().optional(),
  status: z.enum(['active', 'pending', 'expired', 'suspended']),
  provider: z.string(),
  notes: z.string().optional()
});

// GET handler for retrieving benefits applications
export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    let query = `
      SELECT 
        ba.*,
        JSON_ARRAYAGG(JSON_OBJECT(
          'type', fa.assistance_type,
          'amount', fa.amount,
          'status', fa.status
        )) as financial_assistance
      FROM BenefitApplications ba
      LEFT JOIN FinancialAssistance fa ON ba.user_id = fa.user_id
      WHERE ba.user_id = ?
    `;
    const params = [userId];

    if (status) {
      query += ' AND ba.status = ?';
      params.push(status);
    }

    query += ' GROUP BY ba.id';

    const results = await executeQuery(query, params);
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error fetching benefits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch benefits data' },
      { status: 500 }
    );
  }
}

// POST handler for creating new benefit applications
export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = benefitApplicationSchema.parse(body);

    const result = await executeQuery(
      `INSERT INTO BenefitApplications (
        user_id,
        benefit_type,
        status,
        application_date,
        notes,
        supporting_documents,
        next_steps,
        appointment_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        session.user.id,
        validatedData.benefitType,
        validatedData.status,
        validatedData.applicationDate,
        validatedData.notes,
        JSON.stringify(validatedData.supportingDocuments),
        validatedData.nextSteps,
        validatedData.appointmentDate
      ]
    );

    // Log for GDPR compliance
    await executeQuery(
      `INSERT INTO ActivityLog (
        user_id,
        action_type,
        action_details,
        ip_address
      ) VALUES (?, 'benefit_application_created', ?, ?)`,
      [session.user.id, JSON.stringify(validatedData), request.headers.get('x-forwarded-for') || 'unknown']
    );

    return NextResponse.json({
      message: 'Benefit application created successfully',
      applicationId: result.insertId
    });
  } catch (error) {
    console.error('Error creating benefit application:', error);
    return NextResponse.json(
      { error: 'Failed to create benefit application' },
      { status: 500 }
    );
  }
}

// PATCH handler for updating benefit applications
export async function PATCH(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { applicationId, ...updateData } = body;
    const validatedData = benefitApplicationSchema.partial().parse(updateData);

    const result = await executeQuery(
      `UPDATE BenefitApplications 
       SET ?
       WHERE id = ? AND user_id = ?`,
      [validatedData, applicationId, session.user.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Application not found or unauthorized' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Benefit application updated successfully'
    });
  } catch (error) {
    console.error('Error updating benefit application:', error);
    return NextResponse.json(
      { error: 'Failed to update benefit application' },
      { status: 500 }
    );
  }
}

// DELETE handler for removing benefit applications
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    // Start transaction
    const queries = [
      {
        query: `DELETE FROM BenefitApplications WHERE id = ? AND user_id = ?`,
        params: [applicationId, session.user.id]
      },
      {
        query: `INSERT INTO ActivityLog (user_id, action_type, action_details) VALUES (?, 'benefit_application_deleted', ?)`,
        params: [session.user.id, JSON.stringify({ applicationId })]
      }
    ];

    await executeTransaction(queries);

    return NextResponse.json({
      message: 'Benefit application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting benefit application:', error);
    return NextResponse.json(
      { error: 'Failed to delete benefit application' },
      { status: 500 }
    );
  }
}