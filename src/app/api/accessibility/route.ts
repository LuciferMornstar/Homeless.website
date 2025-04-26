import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const toolId = searchParams.get('toolId');
  
  try {
    let query = `
      SELECT 
        uas.SettingID,
        uas.UserID,
        at.Name as ToolName,
        at.Description,
        at.Category,
        at.SettingKey,
        at.DefaultValue,
        at.Options,
        uas.SettingValue,
        uas.LastUsed
      FROM AccessibilityTools at
      LEFT JOIN UserAccessibilitySettings uas ON at.ToolID = uas.ToolID
        AND uas.UserID = ?
      WHERE at.IsActive = TRUE
    `;
    const params: any[] = [userId];

    if (toolId) {
      query += ' AND at.ToolID = ?';
      params.push(toolId);
    }

    query += ' ORDER BY at.Category, at.Name';

    const settings = await executeQuery(query, params);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch accessibility settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      toolId,
      settingValue
    } = body;

    // Check if setting already exists
    const existing = await executeQuery(
      'SELECT SettingID FROM UserAccessibilitySettings WHERE UserID = ? AND ToolID = ?',
      [userId, toolId]
    );

    if (existing.length > 0) {
      // Update existing setting
      await executeQuery(
        `UPDATE UserAccessibilitySettings SET
          SettingValue = ?,
          LastUsed = NOW()
        WHERE UserID = ? AND ToolID = ?`,
        [settingValue, userId, toolId]
      );
    } else {
      // Create new setting
      await executeQuery(
        `INSERT INTO UserAccessibilitySettings (
          UserID, ToolID, SettingValue, DateSet
        ) VALUES (?, ?, ?, NOW())`,
        [userId, toolId, settingValue]
      );
    }

    // Update user preferences in Users table
    const allSettings = await executeQuery(
      `SELECT 
        at.SettingKey,
        uas.SettingValue
      FROM UserAccessibilitySettings uas
      JOIN AccessibilityTools at ON at.ToolID = uas.ToolID
      WHERE uas.UserID = ?`,
      [userId]
    );

    // Convert settings to JSON for storage
    const accessibilityPreferences = JSON.stringify(
      allSettings.reduce((acc: any, setting: any) => {
        acc[setting.SettingKey] = setting.SettingValue;
        return acc;
      }, {})
    );

    await executeQuery(
      `UPDATE Users SET
        AccessibilityPreferences = ?
      WHERE UserID = ?`,
      [accessibilityPreferences, userId]
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save accessibility setting' }, { status: 500 });
  }
}

// Get simplified content for users with cognitive disabilities
export async function OPTIONS(request: Request) {
  const { searchParams } = new URL(request.url);
  const contentType = searchParams.get('contentType');
  const contentId = searchParams.get('contentId');
  const readingLevel = searchParams.get('readingLevel') || 'Simple';
  
  try {
    const content = await executeQuery(
      `SELECT * FROM SimplifiedContent
      WHERE OriginalContentType = ?
      AND OriginalContentID = ?
      AND ReadingLevel = ?`,
      [contentType, contentId, readingLevel]
    );

    if (content.length === 0) {
      return NextResponse.json(
        { error: 'No simplified content available' },
        { status: 404 }
      );
    }

    return NextResponse.json(content[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch simplified content' },
      { status: 500 }
    );
  }
}

// Get translations for non-English speakers
export async function PUT(request: Request) {
  const body = await request.json();
  const {
    contentType,
    contentId,
    language
  } = body;
  
  try {
    const translation = await executeQuery(
      `SELECT * FROM TranslatedContent
      WHERE OriginalContentType = ?
      AND OriginalContentID = ?
      AND Language = ?
      AND QualityChecked = TRUE`,
      [contentType, contentId, language]
    );

    if (translation.length === 0) {
      return NextResponse.json(
        { error: 'No translation available' },
        { status: 404 }
      );
    }

    return NextResponse.json(translation[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch translation' },
      { status: 500 }
    );
  }
}