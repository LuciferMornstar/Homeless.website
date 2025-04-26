import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Define the allowed category types to improve type safety
type ContactCategory = 'General' | 'Help' | 'Dogs' | 'Volunteer' | string;

const CONTACT_EMAILS: Record<string, string> = {
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

    // Updated to use object parameter format
    const messages = await executeQuery({
      query,
      values: params
    });
    
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
      category = 'General Inquiry' as ContactCategory,
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

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number}>({
      query: `INSERT INTO ContactMessages (
        Name, Email, Subject, MessageContent,
        Category, Urgency, ContactNumber,
        PreferredContactMethod, BestTimeToContact,
        DateSent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      values: [
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
    });

    // Create notification for urgent messages
    if (urgency === 'High' || urgency === 'Emergency') {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          Priority, DateCreated
        ) VALUES (?, ?, 'Contact', ?, NOW())`,
        values: [
          `Urgent Contact Message: ${subject || category}`,
          `New urgent message from ${name}`,
          urgency === 'Emergency' ? 'Critical' : 'High'
        ]
      });
    }

    // Determine which email to route to based on category
    const routingEmail = CONTACT_EMAILS[category as string] || CONTACT_EMAILS['General'];

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
      await executeQuery({
        query: `UPDATE ContactMessages SET
          IsRead = TRUE,
          ResponseSent = TRUE,
          ResponseContent = ?,
          ResponseDate = NOW()
        WHERE MessageID = ?`,
        values: [responseContent, messageId]
      });
    } else {
      await executeQuery({
        query: `UPDATE ContactMessages SET
          IsRead = ?
        WHERE MessageID = ?`,
        values: [isRead, messageId]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}