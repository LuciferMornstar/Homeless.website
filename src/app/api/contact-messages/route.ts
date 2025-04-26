import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

const CONTACT_EMAILS = {
  'General': 'info@homeless.website',
  'Help': 'helpme@homeless.website',
  'Dogs': 'dogs@homeless.website',
  'Volunteer': 'volunteer@homeless.website'
};

const CONTACT_PHONE = '+447853811172';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const messageId = searchParams.get('messageId');
  const category = searchParams.get('category');
  const unreadOnly = searchParams.get('unreadOnly') === 'true';
  
  try {
    let query = 'SELECT * FROM ContactMessages WHERE 1=1';
    const params: any[] = [];

    if (messageId) {
      query += ' AND MessageID = ?';
      params.push(messageId);
    }

    if (category) {
      query += ' AND Category = ?';
      params.push(category);
    }

    if (unreadOnly) {
      query += ' AND IsRead = FALSE';
    }

    query += ' ORDER BY DateSent DESC';

    const messages = await executeQuery(query, params);
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      subject,
      messageContent,
      category = 'General Inquiry',
      urgency = 'Medium',
      contactNumber = CONTACT_PHONE,
      preferredContactMethod = 'Email',
      bestTimeToContact
    } = body;

    // Validate required fields
    if (!name || !email || !messageContent) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    const result = await executeQuery(
      `INSERT INTO ContactMessages (
        Name, Email, Subject, MessageContent,
        Category, Urgency, ContactNumber,
        PreferredContactMethod, BestTimeToContact,
        DateSent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        name,
        email,
        subject,
        messageContent,
        category,
        urgency,
        contactNumber,
        preferredContactMethod,
        bestTimeToContact
      ]
    );

    // Create notification for urgent messages
    if (urgency === 'High' || urgency === 'Emergency') {
      await executeQuery(
        `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          Priority, DateCreated
        ) VALUES (?, ?, 'Contact', ?, NOW())`,
        [
          `Urgent Contact Message: ${subject || category}`,
          `New urgent message from ${name}`,
          urgency === 'Emergency' ? 'Critical' : 'High'
        ]
      );
    }

    // Determine which email to route to based on category
    const routingEmail = CONTACT_EMAILS[category] || CONTACT_EMAILS['General'];

    // Return success with routing information
    return NextResponse.json({
      id: result.insertId,
      routedTo: routingEmail
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { messageId, isRead, responseContent } = body;

    if (responseContent) {
      const result = await executeQuery(
        `UPDATE ContactMessages SET
          IsRead = TRUE,
          ResponseSent = TRUE,
          ResponseContent = ?,
          ResponseDate = NOW()
        WHERE MessageID = ?`,
        [responseContent, messageId]
      );
    } else {
      const result = await executeQuery(
        `UPDATE ContactMessages SET
          IsRead = ?
        WHERE MessageID = ?`,
        [isRead, messageId]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}