import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    
    let query = 'SELECT * FROM FoodBanks WHERE IsVerified = TRUE';
    const params: any[] = [];
    
    if (city) {
      query += ' AND City = ?';
      params.push(city);
    }
    
    query += ' ORDER BY Name ASC';
    
    const [rows] = await pool.query(query, params);
    
    return NextResponse.json({ 
      success: true, 
      data: rows 
    });
  } catch (error: any) {
    console.error('Error fetching food banks:', error);
    
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch food banks', 
      error: error.message 
    }, { status: 500 });
  }
}