import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const acceptsPets = searchParams.get('acceptsPets');
    const gender = searchParams.get('gender');
    
    let query = 'SELECT * FROM EmergencyShelters WHERE IsVerified = TRUE';
    const params: any[] = [];
    
    if (city) {
      query += ' AND City = ?';
      params.push(city);
    }
    
    if (acceptsPets === 'true') {
      query += ' AND AcceptsPets = TRUE';
    }
    
    if (gender) {
      query += ' AND (Gender = ? OR Gender = "Any")';
      params.push(gender);
    }
    
    query += ' ORDER BY Name ASC';
    
    const [rows] = await pool.query(query, params);
    
    return NextResponse.json({ 
      success: true, 
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching emergency shelters:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch emergency shelters', 
      error: error.message 
    }, { status: 500 });
  }
}