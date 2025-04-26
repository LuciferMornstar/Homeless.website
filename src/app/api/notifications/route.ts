import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const unreadOnly = searchParams.get('unreadOnly') === 'true';
  const notificationType = searchParams.get('type');
  const priority = searchParams.get('priority');
  
  try {
    let query = `
      SELECT * FROM RealTimeNotifications 
      WHERE ExpiryDate > NOW() OR ExpiryDate IS NULL
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND (UserID = ? OR UserID IS NULL)';
      params.push(userId);
    }

    if (unreadOnly) {
      query += ' AND IsRead = FALSE';
    }

    if (notificationType) {
      query += ' AND NotificationType = ?';
      params.push(notificationType);
    }

    if (priority) {
      query += ' AND Priority = ?';
      params.push(priority);
    }

    query += ' ORDER BY Priority DESC, DateCreated DESC';

    const notifications = await executeQuery(query, params);
    return NextResponse.json(notifications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      title,
      message,
      notificationType,
      relatedEntityId,
      relatedEntityType,
      priority = 'Medium',
      expiryDate,
      ...notificationData
    } = body;

    const result = await executeQuery(
      `INSERT INTO RealTimeNotifications (
        UserID, Title, Message,
        NotificationType, RelatedEntityID,
        RelatedEntityType, Priority,
        ExpiryDate, DateCreated,
        DeliveryStatus
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 'Pending')`,
      [
        userId,
        title,
        message,
        notificationType,
        relatedEntityId,
        relatedEntityType,
        priority,
        expiryDate
      ]
    );

    // If this is a device-enabled user, attempt push notification
    const devices = await executeQuery(
      'SELECT DeviceToken, DeviceType FROM UserDevices WHERE UserID = ? AND IsActive = TRUE',
      [userId]
    );

    if (devices.length > 0) {
      // Attempt to send push notifications to all user devices
      await Promise.all(devices.map(async (device: any) => {
        try {
          // Handle push notification sending based on device type
          // This would integrate with Firebase Cloud Messaging or Apple Push Notification Service
          
          await executeQuery(
            `UPDATE RealTimeNotifications SET
              DeliveryStatus = 'Sent'
            WHERE NotificationID = ?`,
            [result.insertId]
          );
        } catch (error) {
          console.error('Push notification failed:', error);
          // Mark as failed but don't throw - notification is still in database
          await executeQuery(
            `UPDATE RealTimeNotifications SET
              DeliveryStatus = 'Failed'
            WHERE NotificationID = ?`,
            [result.insertId]
          );
        }
      }));
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { notificationId, isRead, isDismissed } = body;

    // Update notification status
    const result = await executeQuery(
      `UPDATE RealTimeNotifications SET
        IsRead = ?,
        IsDismissed = ?
      WHERE NotificationID = ?`,
      [isRead, isDismissed, notificationId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update notification' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const notificationId = searchParams.get('notificationId');
  const userId = searchParams.get('userId');

  try {
    // Only allow deletion of user's own notifications
    const result = await executeQuery(
      'DELETE FROM RealTimeNotifications WHERE NotificationID = ? AND UserID = ?',
      [notificationId, userId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
  }
}