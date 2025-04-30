import { NextRequest, NextResponse } from 'next/server';
import { query, executeQuery } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface FoodBank extends RowDataPacket {
  id: number;
  name: string;
  address: string;
  city: string;
  postcode: string;
  phone: string;
  email: string;
  openingHours: string;
  notes?: string;
  website?: string;
  requirementsInfo?: string;
  availableItems?: string;
  isVerified: boolean;
  latitude?: number;
  longitude?: number;
  updatedAt: Date;
}

// Define the MySQL result interface
interface MySQLInsertResult {
  insertId: number;
  affectedRows: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const verified = searchParams.get('verified');

    let sql = 'SELECT * FROM FoodBanks';
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (city) {
      conditions.push('city = ?');
      params.push(city);
    }

    if (verified) {
      conditions.push('isVerified = ?');
      params.push(verified === 'true' ? 1 : 0);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY city, name';

    const foodbanks = await query<FoodBank[]>(sql, params);

    return NextResponse.json({
      success: true,
      data: foodbanks
    });
  } catch (error) {
    console.error('Failed to fetch food banks:', error);
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
      name, address, city, postcode, phone, email,
      openingHours, notes, website, requirementsInfo,
      availableItems, latitude, longitude
    } = body;

    // Validate required fields
    if (!name || !address || !city || !postcode || !phone || !email || !openingHours) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    // Updated to use executeQuery with proper typing
    const result = await executeQuery<MySQLInsertResult>({
      query: `INSERT INTO FoodBanks (
        name, address, city, postcode, phone, email,
        openingHours, notes, website, requirementsInfo,
        availableItems, isVerified, latitude, longitude
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?, ?)`,
      values: [
        name, address, city, postcode, phone, email,
        openingHours, notes, website, requirementsInfo,
        availableItems, latitude, longitude
      ]
    });

    return NextResponse.json({
      success: true,
      message: 'Food bank added successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Failed to add food bank:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}