import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const county = searchParams.get('county');
    const acceptsDogs = searchParams.get('acceptsDogs');
    const nhsFunded = searchParams.get('nhsFunded');
    
    let query = 'SELECT * FROM MentalHealthResources WHERE IsVerified = TRUE';
    const params: any[] = [];
    
    if (county) {
      query += ' AND County = ?';
      params.push(county);
    }
    
    if (acceptsDogs === 'true') {
      query += ' AND AcceptsDogs = TRUE';
    }
    
    if (nhsFunded === 'true') {
      query += ' AND NHSFunded = TRUE';
    }
    
    query += ' ORDER BY Name ASC';
    
    const [rows] = await pool.query(query, params);
    
    return NextResponse.json({ 
      success: true, 
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching mental health resources:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch mental health resources', 
      error: error.message 
    }, { status: 500 });
  }
}