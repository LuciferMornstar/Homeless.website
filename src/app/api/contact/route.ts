import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, urgency, contactNumber, preferredContactMethod, bestTimeToContact } = body;
    
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json({ 
        success: false, 
        message: 'Name, email and message are required fields' 
      }, { status: 400 });
    }
    
    const [result] = await pool.query(
      `INSERT INTO ContactMessages 
      (Name, Email, Subject, MessageContent, Urgency, ContactNumber, PreferredContactMethod, BestTimeToContact) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name, 
        email, 
        subject || 'General Inquiry', 
        message, 
        urgency || 'Medium', 
        contactNumber || null, 
        preferredContactMethod || 'Email', 
        bestTimeToContact || null
      ]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Contact message submitted successfully', 
      data: { id: result.insertId }
    });
  } catch (error: any) {
    console.error('Error submitting contact form:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit contact form', 
      error: error.message 
    }, { status: 500 });
  }
}