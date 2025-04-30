import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Define interfaces for letters and templates
interface Letter {
  LetterID: number;
  UserID: string;
  LetterType: string;
  LetterContent: string;
  RecipientName: string;
  RecipientAddress: string;
  DateGenerated: Date;
  LastUpdated?: Date;
  TemplateName?: string;
  TemplateType?: string;
  TemplateContent?: string;
}

interface LetterTemplate {
  TemplateID: number;
  TemplateName: string;
  TemplateType: string;
  TemplateContent: string;
  IsActive: boolean;
  DateCreated: Date;
  LastUpdated?: Date;
}

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

    // Updated to use object parameter format
    const letters = await executeQuery<Letter[]>({
      query,
      values: params
    });
    
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
      // Updated to use object parameter format
      const template = await executeQuery<{TemplateContent: string}[]>({
        query: 'SELECT TemplateContent FROM LetterTemplates WHERE TemplateID = ?',
        values: [templateId]
      });
      
      if (template.length > 0) {
        // Replace template placeholders with actual content
        finalContent = template[0].TemplateContent
          .replace('{{content}}', letterContent)
          .replace('{{recipientName}}', recipientName)
          .replace('{{recipientAddress}}', recipientAddress);
      }
    }

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO GeneratedLetters (
        UserID, LetterType, LetterContent,
        RecipientName, RecipientAddress,
        DateGenerated
      ) VALUES (?, ?, ?, ?, ?, NOW())`,
      values: [
        userId,
        letterType,
        finalContent,
        recipientName,
        recipientAddress
      ]
    });

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate letter' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { letterId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE GeneratedLetters SET
        LetterContent = ?,
        RecipientName = ?,
        RecipientAddress = ?,
        LastUpdated = NOW()
      WHERE LetterID = ?`,
      values: [
        updateData.letterContent,
        updateData.recipientName,
        updateData.recipientAddress,
        letterId
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update letter' }, { status: 500 });
  }
}

// Get available letter templates
export async function OPTIONS(request: Request) {
  try {
    // Updated to use object parameter format
    const templates = await executeQuery<LetterTemplate[]>({
      query: 'SELECT * FROM LetterTemplates WHERE IsActive = TRUE ORDER BY TemplateName'
    });
    
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}