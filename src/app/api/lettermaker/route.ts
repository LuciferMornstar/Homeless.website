import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET endpoint to fetch letter templates
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const templateType = searchParams.get('type');
    
    let query = 'SELECT * FROM LetterTemplates WHERE IsActive = TRUE';
    const params: any[] = [];
    
    if (templateType) {
      query += ' AND TemplateType = ?';
      params.push(templateType);
    }
    
    query += ' ORDER BY TemplateName ASC';
    
    const [templates] = await pool.query(query, params);
    
    return NextResponse.json({ 
      success: true, 
      data: templates 
    });
  } catch (error: any) {
    console.error('Error fetching letter templates:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch letter templates', 
      error: error.message 
    }, { status: 500 });
  }
}

// POST endpoint to generate and save a letter
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      userId, 
      letterType, 
      letterContent, 
      recipientName, 
      recipientAddress 
    } = body;
    
    // Validation
    if (!letterContent) {
      return NextResponse.json({ 
        success: false, 
        message: 'Letter content is required' 
      }, { status: 400 });
    }
    
    const [result] = await pool.query(
      `INSERT INTO GeneratedLetters 
      (UserID, LetterType, LetterContent, RecipientName, RecipientAddress) 
      VALUES (?, ?, ?, ?, ?)`,
      [userId || null, letterType, letterContent, recipientName || null, recipientAddress || null]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Letter generated and saved successfully', 
      data: { 
        letterId: result.insertId,
        letterContent,
        dateGenerated: new Date().toISOString()
      } 
    });
  } catch (error: any) {
    console.error('Error generating letter:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to generate letter', 
      error: error.message 
    }, { status: 500 });
  }
}