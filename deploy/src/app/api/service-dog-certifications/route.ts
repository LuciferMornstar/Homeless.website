import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface ServiceDogCertification extends RowDataPacket {
  id: number;
  dogId: number;
  dogName: string;
  ownerName: string;
  certificationDate: Date;
  expiryDate: Date;
  certificationLevel: string;
  specializations: string;
  status: 'active' | 'expired' | 'revoked';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function GET() {
  try {
    const certifications = await query<ServiceDogCertification[]>(
      `SELECT * FROM ServiceDogCertifications 
       WHERE status = 'active' 
       ORDER BY certificationDate DESC`
    );

    return NextResponse.json({ 
      success: true, 
      data: certifications 
    });
  } catch (error) {
    console.error('Failed to fetch service dog certifications:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}