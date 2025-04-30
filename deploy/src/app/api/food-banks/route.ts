import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import type { FoodBank } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius = searchParams.get('radius') || '10'; // Default 10km radius
  const petFood = searchParams.get('petFood');
  const delivery = searchParams.get('delivery');
  
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
      FROM FoodBanks
      WHERE 1=1
    `;
    const params: any[] = [lat, lng, lat];

    if (petFood === 'true') {
      query += ' AND PetFoodAvailable = TRUE';
    }

    if (delivery === 'true') {
      query += ' AND DeliveryAvailable = TRUE';
    }

    if (lat && lng) {
      query += ' HAVING distance < ?';
      params.push(radius);
      query += ' ORDER BY distance';
    }

    // Updated to use object parameter format
    const foodBanks = await executeQuery<FoodBank[]>({
      query,
      values: params
    });
    
    return NextResponse.json(foodBanks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch food banks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      address,
      openingHours,
      requirements,
      currentStockLevel,
      petFoodAvailable,
      deliveryAvailable,
      latitude,
      longitude,
      ...foodBankData
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO FoodBanks (
        Name, Address, OpeningHours,
        Requirements, CurrentStockLevel,
        PetFoodAvailable, DeliveryAvailable,
        Latitude, Longitude,
        DateAdded, StockLastUpdated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      values: [
        name,
        address,
        openingHours,
        requirements,
        currentStockLevel,
        petFoodAvailable,
        deliveryAvailable,
        latitude,
        longitude
      ]
    });

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add food bank' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { foodBankId, ...updateData } = body;

    // If stock level is being updated, update the stock last updated timestamp
    const stockUpdated = updateData.currentStockLevel !== undefined;
    const query = `
      UPDATE FoodBanks SET
        Name = ?,
        Address = ?,
        OpeningHours = ?,
        Requirements = ?,
        CurrentStockLevel = ?,
        PetFoodAvailable = ?,
        DeliveryAvailable = ?,
        Latitude = ?,
        Longitude = ?,
        LastUpdated = NOW()
        ${stockUpdated ? ', StockLastUpdated = NOW()' : ''}
      WHERE FoodBankID = ?`;

    // Updated to use object parameter format
    await executeQuery({
      query,
      values: [
        updateData.name,
        updateData.address,
        updateData.openingHours,
        updateData.requirements,
        updateData.currentStockLevel,
        updateData.petFoodAvailable,
        updateData.deliveryAvailable,
        updateData.latitude,
        updateData.longitude,
        foodBankId
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update food bank' }, { status: 500 });
  }
}