import { RowDataPacket } from 'mysql2/promise';
import { MentalHealthResource } from './models';
import { executeQuery, executeInsert, executeUpdate } from './dbUtils';

/**
 * Mental Health Resources repository
 * Handles database operations for mental health resources
 */

// Interface for mental health resource rows from the database
interface MentalHealthResourceRow extends MentalHealthResource, RowDataPacket {}

/**
 * Get all mental health resources with optional filtering
 */
export async function getAllMentalHealthResources(
  filters?: Partial<MentalHealthResource>,
  limit: number = 100
): Promise<MentalHealthResource[]> {
  let query = 'SELECT * FROM MentalHealthResources WHERE 1=1';
  const params: any[] = [];

  // Add filters if provided
  if (filters) {
    if (filters.AcceptsHomeless) {
      query += ' AND AcceptsHomeless = ?';
      params.push(filters.AcceptsHomeless);
    }
    if (filters.AcceptsDogs) {
      query += ' AND AcceptsDogs = ?';
      params.push(filters.AcceptsDogs);
    }
    if (filters.NHSFunded) {
      query += ' AND NHSFunded = ?';
      params.push(filters.NHSFunded);
    }
    if (filters.City) {
      query += ' AND City LIKE ?';
      params.push(`%${filters.City}%`);
    }
    if (filters.County) {
      query += ' AND County LIKE ?';
      params.push(`%${filters.County}%`);
    }
    if (filters.ResourceType) {
      query += ' AND ResourceType = ?';
      params.push(filters.ResourceType);
    }
  }

  query += ' ORDER BY Name LIMIT ?';
  params.push(limit);

  return await executeQuery<MentalHealthResourceRow>(query, params);
}

/**
 * Get mental health resource by ID
 */
export async function getMentalHealthResourceById(id: number): Promise<MentalHealthResource | null> {
  const query = 'SELECT * FROM MentalHealthResources WHERE ResourceID = ? LIMIT 1';
  const resources = await executeQuery<MentalHealthResourceRow>(query, [id]);
  return resources.length > 0 ? resources[0] : null;
}

/**
 * Search mental health resources
 */
export async function searchMentalHealthResources(
  searchTerm: string,
  limit: number = 20
): Promise<MentalHealthResource[]> {
  const query = `
    SELECT * FROM MentalHealthResources 
    WHERE Name LIKE ? OR Description LIKE ? OR ServicesOffered LIKE ? 
    OR SpecializesIn LIKE ? OR City LIKE ? OR County LIKE ?
    ORDER BY Name
    LIMIT ?
  `;
  const searchPattern = `%${searchTerm}%`;
  const params = [
    searchPattern, searchPattern, searchPattern, 
    searchPattern, searchPattern, searchPattern, 
    limit
  ];
  
  return await executeQuery<MentalHealthResourceRow>(query, params);
}

/**
 * Find mental health resources by proximity
 */
export async function findMentalHealthResourcesByProximity(
  latitude: number,
  longitude: number,
  radiusMiles: number = 10,
  limit: number = 20
): Promise<MentalHealthResource[]> {
  // Radius of Earth in miles
  const earthRadiusMiles = 3958.8;
  
  // Calculate distance using the Haversine formula
  const query = `
    SELECT *,
      (${earthRadiusMiles} * acos(
        cos(radians(?)) * 
        cos(radians(Latitude)) * 
        cos(radians(Longitude) - radians(?)) + 
        sin(radians(?)) * 
        sin(radians(Latitude))
      )) AS distance
    FROM MentalHealthResources
    HAVING distance <= ?
    ORDER BY distance
    LIMIT ?
  `;
  
  const params = [latitude, longitude, latitude, radiusMiles, limit];
  return await executeQuery<MentalHealthResourceRow>(query, params);
}