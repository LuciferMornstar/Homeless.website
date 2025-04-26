import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import type { DogFriendlyResource } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '10'; // Default 10km radius
  
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
      FROM DogFriendlyResources
      WHERE IsVerified = TRUE
    `;
    const params: any[] = [lat, lng, lat];

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    }

    const resources = await executeQuery<DogFriendlyResource[]>(query, params);
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dog-friendly resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      servicesOffered,
      address,
      city,
      postCode,
      phone,
      dogSize,
      hasDogFacilities,
      latitude,
      longitude,
      ...resourceData
    } = body;

    const result = await executeQuery<any>(
      `INSERT INTO DogFriendlyResources (
        Name, Description, ServicesOffered,
        Address, City, PostCode, Phone,
        DogSize, HasDogFacilities,
        Latitude, Longitude,
        DateAdded, IsVerified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), FALSE)`,
      [
        name,
        description,
        servicesOffered,
        address,
        city,
        postCode,
        phone,
        dogSize,
        hasDogFacilities,
        latitude,
        longitude
      ]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add dog-friendly resource' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { resourceId, ...updateData } = body;

    const result = await executeQuery(
      `UPDATE DogFriendlyResources SET
        Name = ?,
        Description = ?,
        ServicesOffered = ?,
        Address = ?,
        City = ?,
        PostCode = ?,
        Phone = ?,
        DogSize = ?,
        HasDogFacilities = ?,
        Latitude = ?,
        Longitude = ?,
        LastUpdated = NOW()
      WHERE DogFriendlyResourceID = ?`,
      [
        updateData.name,
        updateData.description,
        updateData.servicesOffered,
        updateData.address,
        updateData.city,
        updateData.postCode,
        updateData.phone,
        updateData.dogSize,
        updateData.hasDogFacilities,
        updateData.latitude,
        updateData.longitude,
        resourceId
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update dog-friendly resource' }, { status: 500 });
  }
}