import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import type { EmergencyShelter } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '10'; // Default 10km radius
  const dogFriendly = searchParams.get('dogFriendly');
  const hasAvailability = searchParams.get('hasAvailability');
  
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
      FROM EmergencyShelters
      WHERE IsVerified = TRUE
    `;
    const params: any[] = [lat, lng, lat];

    if (dogFriendly === 'true') {
      query += ' AND DogFriendly = TRUE';
    }

    if (hasAvailability === 'true') {
      query += ' AND CurrentAvailability > 0';
    }

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    }

    const shelters = await executeQuery<EmergencyShelter[]>(query, params);
    return NextResponse.json(shelters);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch emergency shelters' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      address,
      currentAvailability,
      acceptsPets,
      dogFriendly,
      servicesOffered,
      accessibilityFeatures,
      requiresReferral,
      latitude,
      longitude,
      ...shelterData
    } = body;

    const result = await executeQuery<any>(
      `INSERT INTO EmergencyShelters (
        Name, Address, CurrentAvailability,
        AcceptsPets, DogFriendly, ServicesOffered,
        AccessibilityFeatures, RequiresReferral,
        Latitude, Longitude,
        DateAdded, IsVerified,
        LastAvailabilityUpdate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), FALSE, NOW())`,
      [
        name,
        address,
        currentAvailability,
        acceptsPets,
        dogFriendly,
        servicesOffered,
        accessibilityFeatures,
        requiresReferral,
        latitude,
        longitude
      ]
    );

    // Log the real-time update
    await executeQuery(
      `INSERT INTO RealTimeShelterUpdates (
        ShelterID, PreviousAvailability, NewAvailability,
        UpdateReason, UpdateTime, IsAutomated
      ) VALUES (?, 0, ?, 'Initial availability', NOW(), TRUE)`,
      [result.insertId, currentAvailability]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add emergency shelter' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { shelterId, previousAvailability, ...updateData } = body;

    // Update shelter details
    const result = await executeQuery(
      `UPDATE EmergencyShelters SET
        Name = ?,
        Address = ?,
        CurrentAvailability = ?,
        AcceptsPets = ?,
        DogFriendly = ?,
        ServicesOffered = ?,
        AccessibilityFeatures = ?,
        RequiresReferral = ?,
        Latitude = ?,
        Longitude = ?,
        LastUpdated = NOW(),
        LastAvailabilityUpdate = NOW()
      WHERE ShelterID = ?`,
      [
        updateData.name,
        updateData.address,
        updateData.currentAvailability,
        updateData.acceptsPets,
        updateData.dogFriendly,
        updateData.servicesOffered,
        updateData.accessibilityFeatures,
        updateData.requiresReferral,
        updateData.latitude,
        updateData.longitude,
        shelterId
      ]
    );

    // Log availability change if it changed
    if (previousAvailability !== updateData.currentAvailability) {
      await executeQuery(
        `INSERT INTO RealTimeShelterUpdates (
          ShelterID, PreviousAvailability, NewAvailability,
          UpdateReason, UpdateTime, IsAutomated
        ) VALUES (?, ?, ?, 'Manual update', NOW(), FALSE)`,
        [shelterId, previousAvailability, updateData.currentAvailability]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update emergency shelter' }, { status: 500 });
  }
}