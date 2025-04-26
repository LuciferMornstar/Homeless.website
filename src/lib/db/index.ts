import mysql from 'mysql2/promise';
import { Pool, PoolConnection, ResultSetHeader, OkPacket } from 'mysql2/promise';
import { dbConfig } from './config';

// Create a pool to manage connections
let pool: Pool = mysql.createPool(dbConfig);

/**
 * Execute a query with parameters and return the result
 */
export const query = async <T>(sql: string, params?: unknown[]): Promise<T> => {
  try {
    const [rows] = await pool.query(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Execute a query with parameters that modifies data
 */
export const execute = async (
  sql: string, 
  params?: unknown[]
): Promise<OkPacket & ResultSetHeader> => {
  try {
    const [result] = await pool.execute(sql, params);
    return result as OkPacket & ResultSetHeader;
  } catch (error) {
    console.error('Database execute error:', error);
    throw error;
  }
};

/**
 * Execute a query with parameters and return the result
 * This is a convenience function that's clearer than 'query'
 */
export const executeQuery = async <T>(
  sql: string | { query: string; params?: unknown[] },
  params?: unknown[]
): Promise<T> => {
  try {
    let query: string;
    let queryParams: unknown[] | undefined;

    if (typeof sql === 'string') {
      query = sql;
      queryParams = params;
    } else {
      query = sql.query;
      queryParams = sql.params;
    }

    const [rows] = await pool.query(query, queryParams);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

/**
 * Execute a transaction with multiple queries
 */
export const executeTransaction = async <T>(
  queriesOrCallback: { query: string; params?: unknown[] }[] | ((connection: PoolConnection) => Promise<T>)
): Promise<T | (OkPacket & ResultSetHeader)[]> => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    let result: T | (OkPacket & ResultSetHeader)[];
    
    if (typeof queriesOrCallback === 'function') {
      // If it's a callback function, call it with the connection
      result = await queriesOrCallback(connection);
    } else {
      // If it's an array of queries, execute them in sequence
      result = [] as (OkPacket & ResultSetHeader)[];
      for (const q of queriesOrCallback) {
        const [queryResult] = await connection.query(q.query, q.params);
        (result as (OkPacket & ResultSetHeader)[]).push(queryResult as OkPacket & ResultSetHeader);
      }
    }
    
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error('Transaction error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

/**
 * Log GDPR consent
 */
export const logGDPRConsent = async (
  userId: number,
  consentType: string,
  consentGiven: boolean,
  ipAddress: string
): Promise<OkPacket & ResultSetHeader> => {
  const sql = `
    INSERT INTO GDPRConsent (UserID, ConsentType, ConsentGiven, IPAddress, ConsentDate)
    VALUES (?, ?, ?, ?, NOW())
  `;
  return execute(sql, [userId, consentType, consentGiven, ipAddress]);
};

/**
 * Test the database connection
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};

// Create a named object for the default export
const db = {
  pool,
  query,
  execute,
  executeQuery,
  executeTransaction,
  logGDPRConsent,
  testConnection
} as const;

// Export everything individually and as a default export
export { pool };
export default db;