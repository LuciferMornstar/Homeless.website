import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT * FROM Organizations');
    
    return NextResponse.json({ 
      success: true, 
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching organizations:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch organizations', 
      error: error.message 
    }, { status: 500 });
  }
}