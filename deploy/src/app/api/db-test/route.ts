import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET() {
  try {
    const result = await executeQuery<any[]>({ 
      query: 'SELECT 1 as test',
    });
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    );
  }
}