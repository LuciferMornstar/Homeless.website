import mysql from 'mysql2/promise';
import { RowDataPacket, OkPacket, ResultSetHeader, FieldPacket } from 'mysql2';
import { dbConfig } from './config';

export type QueryResult<T> = [T[], FieldPacket[]];
export type QueryResultWithoutFields<T> = T[];

// Create a single pool instance
const pool = mysql.createPool(dbConfig);

/**
 * Execute a query that returns rows
 */
export async function query<T extends RowDataPacket[]>(
  sql: string, 
  params?: unknown[]
): Promise<QueryResultWithoutFields<T>> {
  const [rows] = await pool.query<T>(sql, params);
  return rows;
}

/**
 * Execute a query that performs an action (insert, update, delete)
 */
export async function execute(
  sql: string, 
  params?: unknown[]
): Promise<ResultSetHeader> {
  const [result] = await pool.execute<OkPacket>(sql, params);
  return result;
}

/**
 * Test the database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    connection.release();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

// Create a named object for the default export
const db = {
  pool,
  query,
  execute,
  testConnection
} as const;

// Export everything individually and as a default export
export { pool };
export default db;