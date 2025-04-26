import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');
  const maxRent = searchParams.get('maxRent');
  const acceptsDogs = searchParams.get('acceptsDogs') === 'true';
  const hasAccessibility = searchParams.get('hasAccessibility') === 'true';
  const acceptsHousingBenefit = searchParams.get('acceptsHousingBenefit') === 'true';
  
  try {
    let query = `
      SELECT h.*,
        l.OrganizationName as LandlordName,
        l.ContactInformation as LandlordContact,
        l.IsVerified as LandlordVerified,
        GROUP_CONCAT(DISTINCT af.FeatureName) as AccessibilityFeatures
      FROM HousingOpportunities h
      LEFT JOIN LandlordInformation l ON h.LandlordID = l.LandlordID
      LEFT JOIN PropertyAccessibility af ON h.PropertyID = af.PropertyID
      WHERE h.IsAvailable = TRUE
        AND h.ListingExpiryDate > CURDATE()
    `;
    const params: any[] = [];

    if (location) {
      query += ' AND (h.Area = ? OR h.Postcode LIKE ?)';
      params.push(location, `${location}%`);
    }

    if (propertyType) {
      query += ' AND h.PropertyType = ?';
      params.push(propertyType);
    }

    if (maxRent) {
      query += ' AND h.MonthlyRent <= ?';
      params.push(maxRent);
    }

    if (acceptsDogs) {
      query += ' AND h.PetsAllowed = TRUE';
    }

    if (hasAccessibility) {
      query += ' AND h.HasAccessibilityFeatures = TRUE';
    }

    if (acceptsHousingBenefit) {
      query += ' AND h.AcceptsHousingBenefit = TRUE';
    }

    query += ' GROUP BY h.PropertyID ORDER BY h.DateListed DESC';

    const housing = await executeQuery(query, params);
    return NextResponse.json(housing);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch housing opportunities' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      landlordId,
      propertyType,
      address,
      area,
      postcode,
      monthlyRent,
      depositAmount,
      bedrooms,
      description,
      petsAllowed,
      hasAccessibilityFeatures,
      accessibilityFeatures = [],
      acceptsHousingBenefit,
      availableFrom,
      minimumTenancy,
      energyRating,
      councilTaxBand,
      billsIncluded,
      furnishingStatus,
      photos = []
    } = body;

    const result = await executeQuery<any>(
      `INSERT INTO HousingOpportunities (
        LandlordID, PropertyType, Address,
        Area, Postcode, MonthlyRent,
        DepositAmount, Bedrooms, Description,
        PetsAllowed, HasAccessibilityFeatures,
        AcceptsHousingBenefit, AvailableFrom,
        MinimumTenancy, EnergyRating,
        CouncilTaxBand, BillsIncluded,
        FurnishingStatus, DateListed,
        IsAvailable, ListingExpiryDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE, DATE_ADD(NOW(), INTERVAL 30 DAY))`,
      [
        landlordId,
        propertyType,
        address,
        area,
        postcode,
        monthlyRent,
        depositAmount,
        bedrooms,
        description,
        petsAllowed,
        hasAccessibilityFeatures,
        acceptsHousingBenefit,
        availableFrom,
        minimumTenancy,
        energyRating,
        councilTaxBand,
        billsIncluded,
        furnishingStatus
      ]
    );

    // Add accessibility features if any
    for (const feature of accessibilityFeatures) {
      await executeQuery(
        'INSERT INTO PropertyAccessibility (PropertyID, FeatureName) VALUES (?, ?)',
        [result.insertId, feature]
      );
    }

    // Add property photos
    for (const photo of photos) {
      await executeQuery(
        'INSERT INTO PropertyPhotos (PropertyID, PhotoURL, Caption) VALUES (?, ?, ?)',
        [result.insertId, photo.url, photo.caption]
      );
    }

    // Create notification for suitable users
    await executeQuery(
      `INSERT INTO RealTimeNotifications (
        Title, Message, NotificationType,
        RelatedEntityID, RelatedEntityType,
        Priority, DateCreated
      ) VALUES (
        'New Housing Opportunity',
        ?, 'Housing', ?, 'Property',
        'High', NOW()
      )`,
      [
        `New ${bedrooms} bedroom ${propertyType.toLowerCase()} available in ${area} for £${monthlyRent}/month`,
        result.insertId
      ]
    );

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create housing opportunity' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, ...updateData } = body;

    const result = await executeQuery(
      `UPDATE HousingOpportunities SET
        PropertyType = ?,
        Address = ?,
        Area = ?,
        Postcode = ?,
        MonthlyRent = ?,
        DepositAmount = ?,
        Bedrooms = ?,
        Description = ?,
        PetsAllowed = ?,
        HasAccessibilityFeatures = ?,
        AcceptsHousingBenefit = ?,
        AvailableFrom = ?,
        MinimumTenancy = ?,
        EnergyRating = ?,
        CouncilTaxBand = ?,
        BillsIncluded = ?,
        FurnishingStatus = ?,
        LastUpdated = NOW()
      WHERE PropertyID = ?`,
      [
        updateData.propertyType,
        updateData.address,
        updateData.area,
        updateData.postcode,
        updateData.monthlyRent,
        updateData.depositAmount,
        updateData.bedrooms,
        updateData.description,
        updateData.petsAllowed,
        updateData.hasAccessibilityFeatures,
        updateData.acceptsHousingBenefit,
        updateData.availableFrom,
        updateData.minimumTenancy,
        updateData.energyRating,
        updateData.councilTaxBand,
        updateData.billsIncluded,
        updateData.furnishingStatus,
        propertyId
      ]
    );

    // Update accessibility features if provided
    if (updateData.accessibilityFeatures) {
      await executeQuery(
        'DELETE FROM PropertyAccessibility WHERE PropertyID = ?',
        [propertyId]
      );
      
      for (const feature of updateData.accessibilityFeatures) {
        await executeQuery(
          'INSERT INTO PropertyAccessibility (PropertyID, FeatureName) VALUES (?, ?)',
          [propertyId, feature]
        );
      }
    }

    // Update photos if provided
    if (updateData.photos) {
      await executeQuery(
        'DELETE FROM PropertyPhotos WHERE PropertyID = ?',
        [propertyId]
      );
      
      for (const photo of updateData.photos) {
        await executeQuery(
          'INSERT INTO PropertyPhotos (PropertyID, PhotoURL, Caption) VALUES (?, ?, ?)',
          [propertyId, photo.url, photo.caption]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update housing opportunity' }, { status: 500 });
  }
}

// Mark property as let/unavailable
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, isAvailable, reason } = body;

    await executeQuery(
      `UPDATE HousingOpportunities SET
        IsAvailable = ?,
        UnavailabilityReason = ?,
        LastUpdated = NOW()
      WHERE PropertyID = ?`,
      [isAvailable, reason, propertyId]
    );

    // If property is no longer available, notify interested users
    if (!isAvailable) {
      await executeQuery(
        `INSERT INTO RealTimeNotifications (
          Title, Message, NotificationType,
          RelatedEntityID, RelatedEntityType,
          Priority, DateCreated
        ) SELECT
          'Property No Longer Available',
          ?, 'Housing', ?, 'Property',
          'Medium', NOW()
        FROM UserPropertyInterest
        WHERE PropertyID = ?`,
        [
          `A property you were interested in is no longer available: ${reason}`,
          propertyId,
          propertyId
        ]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update property availability' }, { status: 500 });
  }
}