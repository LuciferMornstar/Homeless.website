import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import type { AddictionService } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '10';
  const nhs = searchParams.get('nhs') === 'true';
  const selfReferral = searchParams.get('selfReferral') === 'true';
  const dualDiagnosis = searchParams.get('dualDiagnosis') === 'true';
  
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
      FROM AddictionServices
      WHERE IsVerified = TRUE
    `;
    const params: any[] = [lat, lng, lat];

    if (nhs) {
      query += ' AND IsNHSProvided = TRUE';
    }

    if (selfReferral) {
      query += ' AND AcceptsSelfreferrals = TRUE';
    }

    if (dualDiagnosis) {
      query += ' AND HasDualDiagnosisSupport = TRUE';
    }

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    } else {
      query += ' ORDER BY Name';
    }

    // Updated to use object parameter format
    const services = await executeQuery<AddictionService[]>({
      query,
      values: params
    });
    
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch addiction services' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      serviceType,
      description,
      address,
      city,
      county,
      postCode,
      phone,
      email,
      website,
      servicesOffered,
      eligibilityCriteria,
      referralProcess,
      isNHSProvided,
      acceptsSelfReferrals,
      hasDualDiagnosisSupport,
      waitingListTimeWeeks,
      latitude,
      longitude
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<any>({
      query: `INSERT INTO AddictionServices (
        Name, ServiceType, Description,
        Address, City, County, PostCode,
        Phone, Email, Website,
        ServicesOffered, EligibilityCriteria,
        ReferralProcess, IsNHSProvided,
        AcceptsSelfreferrals, HasDualDiagnosisSupport,
        WaitingListTimeWeeks, Latitude, Longitude,
        DateAdded, IsVerified
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), FALSE)`,
      values: [
        name, serviceType, description,
        address, city, county, postCode,
        phone, email, website,
        servicesOffered, eligibilityCriteria,
        referralProcess, isNHSProvided,
        acceptsSelfReferrals, hasDualDiagnosisSupport,
        waitingListTimeWeeks, latitude, longitude
      ]
    });

    // Create notification for NHS services
    if (isNHSProvided) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'New NHS Addiction Service Available',
          ?, 'Service Update', ?, 'Addiction',
          'Medium', NOW()
        )`,
        values: [`New NHS addiction service available: ${name}`, result.insertId]
      });
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add addiction service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, ...updateData } = body;

    // Updated to use object parameter format
    const result = await executeQuery({
      query: `UPDATE AddictionServices SET
        Name = ?,
        ServiceType = ?,
        Description = ?,
        Address = ?,
        City = ?,
        County = ?,
        PostCode = ?,
        Phone = ?,
        Email = ?,
        Website = ?,
        ServicesOffered = ?,
        EligibilityCriteria = ?,
        ReferralProcess = ?,
        IsNHSProvided = ?,
        AcceptsSelfreferrals = ?,
        HasDualDiagnosisSupport = ?,
        WaitingListTimeWeeks = ?,
        Latitude = ?,
        Longitude = ?,
        LastUpdated = NOW(),
        IsVerified = FALSE
      WHERE ServiceID = ?`,
      values: [
        updateData.name,
        updateData.serviceType,
        updateData.description,
        updateData.address,
        updateData.city,
        updateData.county,
        updateData.postCode,
        updateData.phone,
        updateData.email,
        updateData.website,
        updateData.servicesOffered,
        updateData.eligibilityCriteria,
        updateData.referralProcess,
        updateData.isNHSProvided,
        updateData.acceptsSelfReferrals,
        updateData.hasDualDiagnosisSupport,
        updateData.waitingListTimeWeeks,
        updateData.latitude,
        updateData.longitude,
        serviceId
      ]
    });

    // Notify of significant waiting time changes
    if (updateData.previousWaitingTime &&
        Math.abs(updateData.waitingListTimeWeeks - updateData.previousWaitingTime) > 2) {
      await executeQuery({
        query: `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) VALUES (
          'Waiting Time Update',
          ?, 'Service Update', ?, 'Addiction',
          'Medium', NOW()
        )`,
        values: [
          `Waiting time for ${updateData.name} has changed from ${updateData.previousWaitingTime} to ${updateData.waitingListTimeWeeks} weeks`,
          serviceId
        ]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update addiction service' }, { status: 500 });
  }
}