import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const benefitType = searchParams.get('benefitType');
  const status = searchParams.get('status');
  const includeHistory = searchParams.get('includeHistory') === 'true';
  
  try {
    let query = `
      SELECT b.*,
        GROUP_CONCAT(DISTINCT d.DocumentType) as RequiredDocuments,
        GROUP_CONCAT(DISTINCT p.PaymentDate) as PaymentDates,
        GROUP_CONCAT(DISTINCT p.Amount) as PaymentAmounts
      FROM BenefitApplications b
      LEFT JOIN BenefitDocuments d ON b.ApplicationID = d.ApplicationID
      LEFT JOIN BenefitPayments p ON b.ApplicationID = p.ApplicationID
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND b.UserID = ?';
      params.push(userId);
    }

    if (benefitType) {
      query += ' AND b.BenefitType = ?';
      params.push(benefitType);
    }

    if (status) {
      query += ' AND b.Status = ?';
      params.push(status);
    }

    if (!includeHistory) {
      query += ' AND b.Status NOT IN ("Rejected", "Withdrawn", "Expired")';
    }

    query += ' GROUP BY b.ApplicationID ORDER BY b.ApplicationDate DESC';

    // Updated to use object parameter format
    const benefits = await executeQuery({
      query,
      values: params
    });
    
    return NextResponse.json(benefits);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch benefits information' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      benefitType,
      description,
      amount,
      frequency,
      startDate,
      documents = [],
      notes,
      priority,
      assistanceNeeded
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<any>({
      query: `INSERT INTO BenefitApplications (
        UserID, BenefitType, Description,
        Amount, Frequency, StartDate,
        Status, Notes, Priority,
        AssistanceNeeded, ApplicationDate
      ) VALUES (?, ?, ?, ?, ?, ?, 'Pending', ?, ?, ?, NOW())`,
      values: [
        userId,
        benefitType,
        description,
        amount,
        frequency,
        startDate,
        notes,
        priority,
        assistanceNeeded
      ]
    });

    // Record required documents
    for (const doc of documents) {
      await executeQuery({
        query: `INSERT INTO BenefitDocuments (
          ApplicationID, DocumentType,
          Required, Status,
          DateRequested
        ) VALUES (?, ?, TRUE, 'Pending', NOW())`,
        values: [result.insertId, doc]
      });
    }

    // Create task for case worker if assistance needed
    if (assistanceNeeded) {
      await executeQuery({
        query: `INSERT INTO CaseWorkerTasks (
          ApplicationID, TaskType,
          Description, Priority,
          DueDate, Status,
          DateCreated
        ) VALUES (?, 'Benefit Application', ?, ?, DATE_ADD(NOW(), INTERVAL 3 DAY), 'Pending', NOW())`,
        values: [
          result.insertId,
          `Assist with ${benefitType} application`,
          priority
        ]
      });
    }

    // Create notification
    await executeQuery({
      query: `INSERT INTO RealTimeNotifications (
        UserID, Title, Message,
        NotificationType, RelatedEntityID,
        RelatedEntityType, Priority,
        DateCreated
      ) VALUES (?, 'Benefit Application Started', ?,
        'Benefit', ?, 'Application',
        'High', NOW())`,
      values: [
        userId,
        `Your ${benefitType} application has been started. Please provide the required documents.`,
        result.insertId
      ]
    });

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create benefit application' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { applicationId, ...updateData } = body;

    // Updated to use object parameter format
    const result = await executeQuery({
      query: `UPDATE BenefitApplications SET
        Status = ?,
        Amount = ?,
        StartDate = ?,
        EndDate = ?,
        Notes = ?,
        LastUpdated = NOW()
      WHERE ApplicationID = ?`,
      values: [
        updateData.status,
        updateData.amount,
        updateData.startDate,
        updateData.endDate,
        updateData.notes,
        applicationId
      ]
    });

    // Update document status if provided
    if (updateData.documents) {
      for (const doc of updateData.documents) {
        await executeQuery({
          query: `UPDATE BenefitDocuments SET
            Status = ?,
            DateSubmitted = CASE WHEN ? = 'Submitted' THEN NOW() ELSE NULL END,
            Notes = ?
          WHERE ApplicationID = ? AND DocumentType = ?`,
          values: [
            doc.status,
            doc.status,
            doc.notes,
            applicationId,
            doc.type
          ]
        });
      }
    }

    // Record payment if approved
    if (updateData.status === 'Approved' && updateData.amount) {
      await executeQuery({
        query: `INSERT INTO BenefitPayments (
          ApplicationID, Amount,
          PaymentDate, Status,
          Notes
        ) VALUES (?, ?, ?, 'Scheduled', ?)`,
        values: [
          applicationId,
          updateData.amount,
          updateData.startDate,
          'Initial payment after approval'
        ]
      });
    }

    // Create notification based on status change
    let notificationTitle, notificationMessage;
    switch (updateData.status) {
      case 'Approved':
        notificationTitle = 'Benefit Application Approved! 🎉';
        notificationMessage = `Your ${updateData.benefitType} application has been approved. Payments will start from ${updateData.startDate}.`;
        break;
      case 'Rejected':
        notificationTitle = 'Benefit Application Update';
        notificationMessage = `Your ${updateData.benefitType} application was not approved. Please check the notes for more information.`;
        break;
      default:
        notificationTitle = 'Benefit Application Update';
        notificationMessage = `Your ${updateData.benefitType} application status has been updated to ${updateData.status}.`;
    }

    await executeQuery({
      query: `INSERT INTO RealTimeNotifications (
        UserID, Title, Message,
        NotificationType, RelatedEntityID,
        RelatedEntityType, Priority,
        DateCreated
      ) SELECT 
        UserID,
        ?,
        ?,
        'Benefit',
        ?,
        'Application',
        'High',
        NOW()
      FROM BenefitApplications
      WHERE ApplicationID = ?`,
      values: [
        notificationTitle,
        notificationMessage,
        applicationId,
        applicationId
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update benefit application' }, { status: 500 });
  }
}

// Record benefit payments and track financial assistance
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      applicationId,
      paymentAmount,
      paymentDate,
      paymentType,
      reference,
      notes
    } = body;

    // Updated to use object parameter format with proper typing
    const result = await executeQuery<{insertId: number}>({
      query: `INSERT INTO BenefitPayments (
        ApplicationID, Amount,
        PaymentDate, PaymentType,
        Reference, Status,
        Notes, DateRecorded
      ) VALUES (?, ?, ?, ?, ?, 'Completed', ?, NOW())`,
      values: [
        applicationId,
        paymentAmount,
        paymentDate,
        paymentType,
        reference,
        notes
      ]
    });

    // Update total received in application
    await executeQuery({
      query: `UPDATE BenefitApplications SET
        TotalReceived = TotalReceived + ?,
        LastPaymentDate = ?,
        LastUpdated = NOW()
      WHERE ApplicationID = ?`,
      values: [paymentAmount, paymentDate, applicationId]
    });

    // Create payment notification
    await executeQuery({
      query: `INSERT INTO RealTimeNotifications (
        UserID, Title, Message,
        NotificationType, RelatedEntityID,
        RelatedEntityType, Priority,
        DateCreated
      ) SELECT 
        UserID,
        'Benefit Payment Received',
        ?,
        'Payment',
        ?,
        'Benefit',
        'Medium',
        NOW()
      FROM BenefitApplications
      WHERE ApplicationID = ?`,
      values: [
        `Payment of £${paymentAmount} received for your ${paymentType}`,
        result.insertId,
        applicationId
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to record benefit payment' }, { status: 500 });
  }
}