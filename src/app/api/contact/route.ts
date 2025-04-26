import { NextRequest, NextResponse } from 'next/server';
import db, { query, execute } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface ContactMessage extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export async function GET() {
  try {
    const messages = await query<ContactMessage[]>(
      'SELECT * FROM ContactMessages ORDER BY createdAt DESC'
    );

    return NextResponse.json({
      success: true,
      data: messages
    });
  } catch (error) {
    console.error('Failed to fetch contact messages:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ 
        success: false, 
        error: 'All fields are required' 
      }, { status: 400 });
    }

    const result = await execute(
      'INSERT INTO ContactMessages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Failed to send message:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}