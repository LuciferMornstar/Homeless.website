import { NextResponse } from 'next/server';
import { executeQuery, logGDPRConsent } from '@/lib/db';
import { headers } from 'next/headers';
import type { User } from '@/types/models';

export async function GET(request: Request) {
  try {
    const users = await executeQuery<User[]>('SELECT * FROM Users WHERE IsActive = true');
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    
    // GDPR compliance: Ensure required consents are provided
    const { 
      username, 
      email, 
      password,
      privacyPolicyAgreed,
      marketingConsentGiven,
      dataSharingConsentGiven,
      ...userData 
    } = body;

    if (!privacyPolicyAgreed) {
      return NextResponse.json(
        { error: 'Privacy policy agreement is required' },
        { status: 400 }
      );
    }

    // Create user with basic info
    const result = await executeQuery<any>(
      `INSERT INTO Users (
        Username, Email, Password, 
        PrivacyPolicyAgreed, 
        MarketingConsentGiven, 
        DataSharingConsentGiven
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        username, 
        email, 
        password, // Note: Ensure password is hashed before this point
        privacyPolicyAgreed,
        marketingConsentGiven,
        dataSharingConsentGiven
      ]
    );

    // Log GDPR consents
    const userId = result.insertId;
    await logGDPRConsent(
      userId,
      'PrivacyPolicy',
      privacyPolicyAgreed,
      headersList.get('x-forwarded-for') || 'unknown',
      headersList.get('user-agent') || 'unknown',
      'Privacy Policy v1.0',
      '1.0'
    );

    if (marketingConsentGiven) {
      await logGDPRConsent(
        userId,
        'Marketing',
        true,
        headersList.get('x-forwarded-for') || 'unknown',
        headersList.get('user-agent') || 'unknown',
        'Marketing Communications Consent v1.0',
        '1.0'
      );
    }

    if (dataSharingConsentGiven) {
      await logGDPRConsent(
        userId,
        'DataSharing',
        true,
        headersList.get('x-forwarded-for') || 'unknown',
        headersList.get('user-agent') || 'unknown',
        'Data Sharing Consent v1.0',
        '1.0'
      );
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}