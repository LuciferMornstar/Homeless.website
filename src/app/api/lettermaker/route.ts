import { NextRequest, NextResponse } from 'next/server';
import { query, executeQuery } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface LetterTemplate extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  category: string;
  tags?: string;
  lastModified: Date;
}

// Define the MySQL result interface
interface MySQLInsertResult {
  insertId: number;
  affectedRows: number;
}

export async function GET() {
  try {
    const templates = await query<LetterTemplate[]>(
      'SELECT * FROM LetterTemplates ORDER BY category, title'
    );

    return NextResponse.json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('Failed to fetch letter templates:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, category, tags } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required fields' 
      }, { status: 400 });
    }

    // Updated to use executeQuery with proper typing
    const result = await executeQuery<MySQLInsertResult>({
      query: 'INSERT INTO LetterTemplates (title, content, category, tags) VALUES (?, ?, ?, ?)',
      values: [title, content, category, tags]
    });

    return NextResponse.json({
      success: true,
      message: 'Letter template created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Failed to create letter template:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}