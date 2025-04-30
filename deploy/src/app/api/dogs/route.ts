import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import type { ServiceDog } from '@/types/models';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  try {
    let query = 'SELECT * FROM Dogs WHERE 1=1';
    const params: any[] = [];

    if (userId) {
      query += ' AND UserID = ?';
      params.push(userId);
    }

    // Updated to use object parameter format
    const dogs = await executeQuery<ServiceDog[]>({
      query,
      values: params
    });
    
    return NextResponse.json(dogs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      name,
      breed,
      isServiceDog,
      serviceDogType,
      serviceDogTrainingLevel,
      ...dogData
    } = body;

    // Updated to use object parameter format
    const result = await executeQuery<{insertId: number, affectedRows: number}>({
      query: `INSERT INTO Dogs (
        UserID, Name, Breed, 
        IsServiceDog, ServiceDogType, 
        ServiceDogTrainingLevel, DateAdded
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      values: [
        userId,
        name,
        breed,
        isServiceDog,
        serviceDogType,
        serviceDogTrainingLevel
      ]
    });

    // If this is a service dog, add to certification tracking
    if (isServiceDog) {
      await executeQuery({
        query: `INSERT INTO ServiceDogWelfareConcerns (
          DogID, Status, DateReported
        ) VALUES (?, 'New', NOW())`,
        values: [result.insertId]
      });
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to register dog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { dogId, ...updateData } = body;

    // Updated to use object parameter format
    await executeQuery({
      query: `UPDATE Dogs SET 
        Name = ?, 
        Breed = ?,
        IsServiceDog = ?,
        ServiceDogType = ?,
        ServiceDogTrainingLevel = ?,
        LastUpdated = NOW()
      WHERE DogID = ?`,
      values: [
        updateData.name,
        updateData.breed,
        updateData.isServiceDog,
        updateData.serviceDogType,
        updateData.serviceDogTrainingLevel,
        dogId
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update dog' }, { status: 500 });
  }
}