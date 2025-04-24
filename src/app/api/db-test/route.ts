import { NextRequest, NextResponse } from 'next/server';
import pool, { testConnection } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query('SELECT 1 as connection_test');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connection successful', 
      data: rows
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Database connection failed', 
      error: error.message 
    }, { status: 500 });
  }
}