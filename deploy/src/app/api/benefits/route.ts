import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

// Define extended session user type to include id
interface ExtendedUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

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
    if (!session || !session.user) {
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

    // Updated to use object parameter format
    const results = await executeQuery({
      query,
      values: params
    });
    
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
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the user ID from the authenticated session
    // For TypeScript safety, we'll use a default ID if needed
    const userId = (session.user as any).id || 'anonymous';

    const body = await request.json();
    const validatedData = benefitApplicationSchema.parse(body);

    // Updated to use object parameter format with proper type handling
    const result = await executeQuery<{insertId: number}>({
      query: `INSERT INTO BenefitApplications (
        user_id,
        benefit_type,
        status,
        application_date,
        notes,
        supporting_documents,
        next_steps,
        appointment_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      values: [
        userId,
        validatedData.benefitType,
        validatedData.status,
        validatedData.applicationDate,
        validatedData.notes,
        JSON.stringify(validatedData.supportingDocuments),
        validatedData.nextSteps,
        validatedData.appointmentDate
      ]
    });

    // Log for GDPR compliance with proper type handling
    await executeQuery({
      query: `INSERT INTO ActivityLog (
        user_id,
        action_type,
        action_details,
        ip_address
      ) VALUES (?, 'benefit_application_created', ?, ?)`,

      values: [userId, JSON.stringify(validatedData), request.headers.get('x-forwarded-for') || 'unknown']
    });

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
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { applicationId, ...updateData } = body;
    const validatedData = benefitApplicationSchema.partial().parse(updateData);

    // Cast session.user to ExtendedUser to handle the id property
    const user = session.user as ExtendedUser;
    
    // Check if user.id exists, fallback to getting ID from another property or a query
    const userId = user.id || (user.email ? await getUserIdFromEmail(user.email) : 'anonymous');

    // Updated to use object parameter format
    const result = await executeQuery<{affectedRows: number}>({
      query: `UPDATE BenefitApplications 
       SET ?
       WHERE id = ? AND user_id = ?`,
      values: [validatedData, applicationId, userId]
    });

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

// Helper function to get user ID from email
async function getUserIdFromEmail(email: string): Promise<string> {
  try {
    const result = await executeQuery<{id: string}[]>({
      query: 'SELECT id FROM Users WHERE email = ?',
      values: [email]
    });
    return result.length > 0 ? result[0].id : 'anonymous';
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return 'anonymous';
  }
}

// DELETE handler for removing benefit applications
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
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

    // Cast session.user to ExtendedUser to handle the id property
    const user = session.user as ExtendedUser;
    
    // Check if user.id exists, fallback to getting ID from another property or a query
    const userId = user.id || (user.email ? await getUserIdFromEmail(user.email) : 'anonymous');

    // Delete the benefit application
    await executeQuery({
      query: `DELETE FROM BenefitApplications WHERE id = ? AND user_id = ?`,
      values: [applicationId, userId]
    });
    
    // Log the deletion
    await executeQuery({
      query: `INSERT INTO ActivityLog (
        user_id, 
        action_type, 
        action_details
      ) VALUES (?, 'benefit_application_deleted', ?)`,
      values: [userId, JSON.stringify({ applicationId })]
    });

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