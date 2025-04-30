import mysql from 'mysql2/promise';
import { Pool, PoolConnection } from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'db5017676906.hosting-data.io',
  user: process.env.DB_USER || 'dbu5385048',
  password: process.env.DB_PASSWORD || '', // Should be set in environment variables
  database: process.env.DB_NAME || 'dbs14137291',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false
  }
};

// Create a pool to manage connections
let pool: Pool;

// Initialize the connection pool
export const initializePool = () => {
  try {
    pool = mysql.createPool(dbConfig);
    console.log('Database pool initialized');
    return pool;
  } catch (error) {
    console.error('Error initializing database pool:', error);
    throw error;
  }
};

// Get the connection pool
export const getPool = (): Pool => {
  if (!pool) {
    return initializePool();
  }
  return pool;
};

// Execute a query with params
export const executeQuery = async <T>(query: string, params: unknown[] = []): Promise<T[]> => {
  const pool = getPool();
  try {
    const [rows] = await pool.query(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Execute an insert query and return insertId
export const executeInsert = async (query: string, params: unknown[] = []): Promise<number> => {
  const pool = getPool();
  try {
    const [result] = await pool.query(query, params);
    return (result as { insertId: number }).insertId;
  } catch (error) {
    console.error('Database insert error:', error);
    throw error;
  }
};

// Execute an update query and return affectedRows
export const executeUpdate = async (query: string, params: unknown[] = []): Promise<number> => {
  const pool = getPool();
  try {
    const [result] = await pool.query(query, params);
    return (result as { affectedRows: number }).affectedRows;
  } catch (error) {
    console.error('Database update error:', error);
    throw error;
  }
};

// Execute a transaction
export const executeTransaction = async <T>(
  callback: (connection: PoolConnection) => Promise<T>
): Promise<T> => {
  const pool = getPool();
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    console.error('Database transaction error:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  const pool = getPool();
  try {
    const [rows] = await pool.query('SELECT 1 as connection_test');
    return !!(rows as Array<{connection_test: number}>)[0]?.connection_test;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};