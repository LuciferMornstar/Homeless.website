import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { headers } from 'next/headers';
import type { SensitiveLocation } from '@/types/models';

async function checkUserAccess(userId: string): Promise<boolean> {
  const user = await executeQuery<any[]>(
    'SELECT IsHiddenMember FROM Users WHERE UserID = ? AND IsActive = TRUE',
    [userId]
  );
  return user.length > 0 && user[0].IsHiddenMember;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '2'; // Smaller default radius for sensitive locations
  const locationType = searchParams.get('type');

  // Verify user has access to hidden section
  if (!userId || !await checkUserAccess(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    let query = `
      SELECT *, 
      (6371 * acos(
        cos(radians(?)) * 
        cos(radians(Latitude)) * 
        cos(radians(Longitude) - radians(?)) + 
        sin(radians(?)) * 
        sin(radians(Latitude))
      )) AS distance
      FROM SensitiveLocations
      WHERE IsVerified = TRUE
    `;
    const params: any[] = [lat, lng, lat];

    if (locationType) {
      query += ' AND LocationType = ?';
      params.push(locationType);
    }

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    }

    const locations = await executeQuery<SensitiveLocation[]>(query, params);
    return NextResponse.json(locations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;

    // Verify user has access to hidden section
    if (!userId || !await checkUserAccess(userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      locationType,
      description,
      latitude,
      longitude,
      safetyWarnings,
      ...locationData
    } = body;

    const result = await executeQuery<any>(
      `INSERT INTO SensitiveLocations (
        LocationType, Description,
        Latitude, Longitude,
        SafetyWarnings,
        AddedByUserID,
        DateAdded,
        IsVerified
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), FALSE)`,
      [
        locationType,
        description,
        latitude,
        longitude,
        safetyWarnings,
        userId
      ]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add location' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const userId = body.userId;
    const { locationId, ...updateData } = body;

    // Verify user has access to hidden section
    if (!userId || !await checkUserAccess(userId)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is the one who added this location
    const location = await executeQuery<any[]>(
      'SELECT AddedByUserID FROM SensitiveLocations WHERE LocationID = ?',
      [locationId]
    );

    if (location.length === 0 || location[0].AddedByUserID !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await executeQuery(
      `UPDATE SensitiveLocations SET
        LocationType = ?,
        Description = ?,
        Latitude = ?,
        Longitude = ?,
        SafetyWarnings = ?,
        LastUpdated = NOW(),
        IsVerified = FALSE
      WHERE LocationID = ?`,
      [
        updateData.locationType,
        updateData.description,
        updateData.latitude,
        updateData.longitude,
        updateData.safetyWarnings,
        locationId
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const locationId = searchParams.get('locationId');

  // Verify user has access to hidden section
  if (!userId || !await checkUserAccess(userId)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if user is the one who added this location
    const location = await executeQuery<any[]>(
      'SELECT AddedByUserID FROM SensitiveLocations WHERE LocationID = ?',
      [locationId]
    );

    if (location.length === 0 || location[0].AddedByUserID !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await executeQuery(
      'DELETE FROM SensitiveLocations WHERE LocationID = ?',
      [locationId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 });
  }
}