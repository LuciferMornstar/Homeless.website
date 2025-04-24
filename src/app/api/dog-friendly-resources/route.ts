import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM DogFriendlyResources 
       WHERE IsVerified = TRUE 
       ORDER BY Name ASC`
    );
    
    return NextResponse.json({ 
      success: true, 
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching dog friendly resources:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch dog friendly resources', 
      error: error.message 
    }, { status: 500 });
  }
}