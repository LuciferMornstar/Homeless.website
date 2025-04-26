import { NextRequest, NextResponse } from 'next/server';
import { query, execute } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface Organization extends RowDataPacket {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  website?: string;
  services: string;
  openingHours: string;
  isVerified: boolean;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const service = searchParams.get('service');
    const verified = searchParams.get('verified');

    let sql = 'SELECT * FROM Organizations';
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (city) {
      conditions.push('city = ?');
      params.push(city);
    }

    if (service) {
      conditions.push('services LIKE ?');
      params.push(`%${service}%`);
    }

    if (verified) {
      conditions.push('isVerified = ?');
      params.push(verified === 'true' ? 1 : 0);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY name ASC';

    const organizations = await query<Organization[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: organizations
    });
  } catch (error) {
    console.error('Failed to fetch organizations:', error);
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
      name, description, address, city, postcode,
      phone, email, website, services, openingHours,
      latitude, longitude
    } = body;

    if (!name || !description || !address || !city || !postcode || !phone || !email || !services || !openingHours) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    const result = await execute(
      `INSERT INTO Organizations (
        name, description, address, city, postcode,
        phone, email, website, services, openingHours,
        isVerified, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, ?)`,
      [
        name, description, address, city, postcode,
        phone, email, website, services, openingHours,
        latitude, longitude
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Organization added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Failed to add organization:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}