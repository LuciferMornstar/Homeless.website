import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, executeTransaction } from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface EmergencyShelter extends RowDataPacket {
  id: number;
  name: string;
  type: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  website?: string;
  capacity: number;
  currentOccupancy?: number;
  acceptsPets: boolean;
  acceptsFamilies: boolean;
  gender: 'any' | 'male' | 'female';
  minAge?: number;
  maxAge?: number;
  facilities: string;
  accessibility: string;
  requirements?: string;
  openingHours: string;
  isVerified: boolean;
  latitude?: number;
  longitude?: number;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const verified = searchParams.get('verified');

    let sql = 'SELECT * FROM EmergencyShelters';
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (city) {
      conditions.push('city = ?');
      params.push(city);
    }

    if (type) {
      conditions.push('type = ?');
      params.push(type);
    }

    if (verified) {
      conditions.push('isVerified = ?');
      params.push(verified === 'true' ? 1 : 0);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY city, name';

    const shelters = await executeQuery<EmergencyShelter[]>(sql, params);

    return NextResponse.json({ 
      success: true, 
      data: shelters 
    });
  } catch (error) {
    console.error('Failed to fetch shelters:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name, type, address, city, postcode,
      phone, email, website, capacity, acceptsPets,
      acceptsFamilies, gender, minAge, maxAge,
      facilities, accessibility, requirements,
      openingHours, latitude, longitude
    } = body;

    // Validate required fields
    const requiredFields = [
      'name', 'type', 'address', 'city', 'postcode',
      'phone', 'email', 'capacity', 'facilities',
      'accessibility', 'openingHours'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    const result = await executeTransaction<ResultSetHeader>([{
      query: `INSERT INTO EmergencyShelters (
        name, type, address, city, postcode,
        phone, email, website, capacity,
        acceptsPets, acceptsFamilies, gender,
        minAge, maxAge, facilities, accessibility,
        requirements, openingHours, isVerified,
        latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, ?)`,
      params: [
        name, type, address, city, postcode,
        phone, email, website, capacity,
        acceptsPets, acceptsFamilies, gender,
        minAge, maxAge, facilities, accessibility,
        requirements, openingHours, latitude, longitude
      ]
    }]);

    return NextResponse.json({
      success: true,
      message: 'Shelter added successfully',
      id: result[0].insertId
    });
  } catch (error) {
    console.error('Failed to add shelter:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}