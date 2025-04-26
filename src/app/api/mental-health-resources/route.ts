import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import type { MentalHealthResource } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '10';
  const acceptsDogs = searchParams.get('acceptsDogs');
  const nhsFunded = searchParams.get('nhsFunded');
  const remoteSupport = searchParams.get('remoteSupport');
  
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
      FROM MentalHealthResources
      WHERE AcceptsHomeless = TRUE
    `;
    const params: any[] = [lat, lng, lat];

    if (acceptsDogs === 'true') {
      query += ' AND AcceptsDogs = TRUE';
    }

    if (nhsFunded === 'true') {
      query += ' AND NHSFunded = TRUE';
    }

    if (remoteSupport === 'true') {
      query += ' AND ProvidesRemoteSupport = TRUE';
    }

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    }

    // Updated to use object parameter format
    const resources = await executeQuery<MentalHealthResource[]>({
      query,
      values: params
    });
    
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch mental health resources' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      resourceType,
      servicesOffered,
      acceptsHomeless,
      acceptsDogs,
      providesRemoteSupport,
      waitingTimeDays,
      nhsFunded,
      latitude,
      longitude,
      ...resourceData
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO MentalHealthResources (
        Name, ResourceType, ServicesOffered,
        AcceptsHomeless, AcceptsDogs, ProvidesRemoteSupport,
        WaitingTimeDays, NHSFunded,
        Latitude, Longitude,
        DateAdded
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      values: [
        name,
        resourceType,
        servicesOffered,
        acceptsHomeless,
        acceptsDogs,
        providesRemoteSupport,
        waitingTimeDays,
        nhsFunded,
        latitude,
        longitude
      ]
    });

    // If this is an NHS resource, add to real-time notifications
    if (nhsFunded) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'New NHS Mental Health Resource Available',
          ?, 'Resource Update', ?, 'MentalHealth',
          'Medium', NOW()
        )`,
        values: [`New NHS mental health service available: ${name}`, result.insertId]
      });
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add mental health resource' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { resourceId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE MentalHealthResources SET
        Name = ?,
        ResourceType = ?,
        ServicesOffered = ?,
        AcceptsHomeless = ?,
        AcceptsDogs = ?,
        ProvidesRemoteSupport = ?,
        WaitingTimeDays = ?,
        NHSFunded = ?,
        Latitude = ?,
        Longitude = ?,
        LastUpdated = NOW()
      WHERE ResourceID = ?`,
      values: [
        updateData.name,
        updateData.resourceType,
        updateData.servicesOffered,
        updateData.acceptsHomeless,
        updateData.acceptsDogs,
        updateData.providesRemoteSupport,
        updateData.waitingTimeDays,
        updateData.nhsFunded,
        updateData.latitude,
        updateData.longitude,
        resourceId
      ]
    });

    // If waiting time has changed significantly (>7 days difference)
    if (updateData.previousWaitingTime && 
        Math.abs(updateData.waitingTimeDays - updateData.previousWaitingTime) > 7) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'Waiting Time Update',
          ?, 'Resource Update', ?, 'MentalHealth',
          'Medium', NOW()
        )`,
        values: [
          `Waiting time for ${updateData.name} has changed from ${updateData.previousWaitingTime} to ${updateData.waitingTimeDays} days`,
          resourceId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update mental health resource' }, { status: 500 });
  }
}