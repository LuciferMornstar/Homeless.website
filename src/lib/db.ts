import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function executeQuery<T>({ query, values }: { query: string; values?: any[] }) {
  try {
    const [results] = await pool.query(query, values);
    return results as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
}

// Adding missing functions used by API routes

// For simpler query execution
export async function query<T>(sql: string, values?: any[]) {
  return executeQuery<T>({ query: sql, values });
}

// For simpler execution without results
export async function execute(sql: string, values?: any[]) {
  return executeQuery({ query: sql, values });
}

// For transaction support
export async function executeTransaction<T>(queries: { query: string; values?: any[] }[]) {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const results = [];
    for (const { query, values } of queries) {
      const [result] = await connection.query(query, values);
      results.push(result);
    }
    
    await connection.commit();
    return results as T[];
  } catch (error) {
    await connection.rollback();
    console.error('Transaction error:', error);
    throw new Error('Database transaction failed');
  } finally {
    connection.release();
  }
}

// For GDPR compliance logging
export async function logGDPRConsent(userId: string, action: string, details: any, ipAddress?: string) {
  try {
    return await executeQuery({
      query: `INSERT INTO ActivityLog (
        user_id,
        action_type,
        action_details,
        ip_address,
        created_at
      ) VALUES (?, ?, ?, ?, NOW())`,
      values: [userId, action, JSON.stringify(details), ipAddress || 'unknown']
    });
  } catch (error) {
    console.error('GDPR logging error:', error);
    // We don't throw here to prevent breaking the main functionality
  }
}

export default pool;