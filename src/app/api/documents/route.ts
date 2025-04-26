import { NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';
import { headers } from 'next/headers';

// Ensure GDPR compliance with document handling
const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const documentId = searchParams.get('documentId');
  const category = searchParams.get('category');
  
  try {
    let query = `
      SELECT d.*,
        CASE 
          WHEN d.ExpiryDate IS NOT NULL AND d.ExpiryDate <= CURDATE() 
          THEN TRUE 
          ELSE FALSE 
        END as IsExpired
      FROM UserDocumentStorage d
      WHERE 1=1
    `;
    const params: any[] = [];

    if (userId) {
      query += ' AND d.UserID = ?';
      params.push(userId);
    }

    if (documentId) {
      query += ' AND d.DocumentID = ?';
      params.push(documentId);
    }

    if (category) {
      query += ' AND d.Category = ?';
      params.push(category);
    }

    query += ' ORDER BY d.UploadDate DESC';

    const documents = await executeQuery(query, params);

    // Filter out sensitive information before sending
    const sanitizedDocs = documents.map((doc: any) => ({
      ...doc,
      StoragePath: undefined, // Don't expose actual storage path
      DocumentData: undefined // Don't send binary data in list view
    }));

    return NextResponse.json(sanitizedDocs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId');
    const category = formData.get('category');
    const description = formData.get('description');
    const expiryDate = formData.get('expiryDate');
    const isConfidential = formData.get('isConfidential') === 'true';

    // Validate file type and size
    if (!ALLOWED_DOCUMENT_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }

    // Generate secure storage path
    const timestamp = Date.now();
    const storagePath = `user_${userId}/${timestamp}_${file.name}`;

    const result = await executeQuery<any>(
      `INSERT INTO UserDocumentStorage (
        UserID, FileName, FileType,
        FileSize, StoragePath, Category,
        Description, UploadDate,
        ExpiryDate, IsConfidential,
        UploadIPAddress, LastAccessDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, ?, NOW())`,
      [
        userId,
        file.name,
        file.type,
        file.size,
        storagePath,
        category,
        description,
        expiryDate || null,
        isConfidential,
        headers().get('x-forwarded-for') || 'unknown'
      ]
    );

    // Log document upload for GDPR compliance
    await executeQuery(
      `INSERT INTO DocumentAccessLog (
        DocumentID, UserID, AccessType,
        AccessDate, IPAddress
      ) VALUES (?, ?, 'Upload', NOW(), ?)`,
      [
        result.insertId,
        userId,
        headers().get('x-forwarded-for') || 'unknown'
      ]
    );

    // If this is an important document, create a notification
    if (category === 'ID' || category === 'Legal' || category === 'Medical') {
      await executeQuery(
        `INSERT INTO RealTimeNotifications (
          UserID, Title, Message,
          NotificationType, RelatedEntityID,
          RelatedEntityType, Priority,
          DateCreated
        ) VALUES (?, 'Document Uploaded', ?,
          'Document', ?, 'Document',
          'Medium', NOW())`,
        [
          userId,
          `Important ${category} document uploaded: ${file.name}`,
          result.insertId
        ]
      );
    }

    return NextResponse.json({ id: result.insertId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload document' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { documentId, userId, ...updateData } = body;

    // Verify user owns the document
    const doc = await executeQuery(
      'SELECT UserID FROM UserDocumentStorage WHERE DocumentID = ?',
      [documentId]
    );

    if (doc.length === 0 || doc[0].UserID !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await executeQuery(
      `UPDATE UserDocumentStorage SET
        Category = ?,
        Description = ?,
        ExpiryDate = ?,
        IsConfidential = ?,
        LastAccessDate = NOW()
      WHERE DocumentID = ?`,
      [
        updateData.category,
        updateData.description,
        updateData.expiryDate,
        updateData.isConfidential,
        documentId
      ]
    );

    // Log document update
    await executeQuery(
      `INSERT INTO DocumentAccessLog (
        DocumentID, UserID, AccessType,
        AccessDate, IPAddress
      ) VALUES (?, ?, 'Update', NOW(), ?)`,
      [
        documentId,
        userId,
        headers().get('x-forwarded-for') || 'unknown'
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const documentId = searchParams.get('documentId');
  const userId = searchParams.get('userId');

  try {
    // Verify user owns the document
    const doc = await executeQuery(
      'SELECT UserID FROM UserDocumentStorage WHERE DocumentID = ?',
      [documentId]
    );

    if (doc.length === 0 || doc[0].UserID !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Log deletion for GDPR compliance
    await executeQuery(
      `INSERT INTO DocumentAccessLog (
        DocumentID, UserID, AccessType,
        AccessDate, IPAddress
      ) VALUES (?, ?, 'Delete', NOW(), ?)`,
      [
        documentId,
        userId,
        headers().get('x-forwarded-for') || 'unknown'
      ]
    );

    // Soft delete the document
    await executeQuery(
      `UPDATE UserDocumentStorage SET
        IsDeleted = TRUE,
        DeletedDate = NOW(),
        DeletedBy = ?
      WHERE DocumentID = ?`,
      [userId, documentId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}