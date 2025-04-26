import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const letterId = searchParams.get('letterId');
  const letterType = searchParams.get('type');
  
  try {
    let query = `
      SELECT l.*,
        lt.TemplateName,
        lt.TemplateType,
        lt.TemplateContent
      FROM GeneratedLetters l
      LEFT JOIN LetterTemplates lt ON l.LetterType = lt.TemplateType
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND l.UserID = ?';
      params.push(userId);
    }

    if (letterId) {
      query += ' AND l.LetterID = ?';
      params.push(letterId);
    }

    if (letterType) {
      query += ' AND l.LetterType = ?';
      params.push(letterType);
    }

    query += ' ORDER BY l.DateGenerated DESC';

    const letters = await executeQuery(query, params);
    return NextResponse.json(letters);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch letters' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      letterType,
      letterContent,
      recipientName,
      recipientAddress,
      templateId
    } = body;

    // Get template if templateId provided
    let finalContent = letterContent;
    if (templateId) {
      const template = await executeQuery(
        'SELECT TemplateContent FROM LetterTemplates WHERE TemplateID = ?',
        [templateId]
      );
      
      if (template.length > 0) {
        // Replace template placeholders with actual content
        finalContent = template[0].TemplateContent
          .replace('{{content}}', letterContent)
          .replace('{{recipientName}}', recipientName)
          .replace('{{recipientAddress}}', recipientAddress);
      }
    }

    const result = await executeQuery<any>(
      `INSERT INTO GeneratedLetters (
        UserID, LetterType, LetterContent,
        RecipientName, RecipientAddress,
        DateGenerated
      ) VALUES (?, ?, ?, ?, ?, NOW())`,
      [
        userId,
        letterType,
        finalContent,
        recipientName,
        recipientAddress
      ]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate letter' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { letterId, ...updateData } = body;

    const result = await executeQuery(
      `UPDATE GeneratedLetters SET
        LetterContent = ?,
        RecipientName = ?,
        RecipientAddress = ?,
        LastUpdated = NOW()
      WHERE LetterID = ?`,
      [
        updateData.letterContent,
        updateData.recipientName,
        updateData.recipientAddress,
        letterId
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update letter' }, { status: 500 });
  }
}

// Get available letter templates
export async function OPTIONS(request: Request) {
  try {
    const templates = await executeQuery(
      'SELECT * FROM LetterTemplates WHERE IsActive = TRUE ORDER BY TemplateName'
    );
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}