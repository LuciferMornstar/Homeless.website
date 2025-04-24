import { RowDataPacket } from 'mysql2/promise';
import { DogFriendlyResource } from './models';
import { executeQuery, executeInsert, executeUpdate } from './dbUtils';

/**
 * Dog Friendly Resources repository
 * Handles database operations for dog-friendly resources
 */

// Interface for dog resource rows from the database
interface DogFriendlyResourceRow extends DogFriendlyResource, RowDataPacket {}

/**
 * Get all dog-friendly resources with optional filtering
 */
export async function getAllDogFriendlyResources(
  filters?: Partial<DogFriendlyResource>,
  limit: number = 100
): Promise<DogFriendlyResource[]> {
  let query = 'SELECT * FROM DogFriendlyResources WHERE 1=1';
  const params: any[] = [];

  // Add filters if provided
  if (filters) {
    if (filters.City) {
      query += ' AND City LIKE ?';
      params.push(`%${filters.City}%`);
    }
    if (filters.State) {
      query += ' AND State LIKE ?';
      params.push(`%${filters.State}%`);
    }
    if (filters.OrganizationID) {
      query += ' AND OrganizationID = ?';
      params.push(filters.OrganizationID);
    }
  }

  query += ' ORDER BY Name LIMIT ?';
  params.push(limit);

  return await executeQuery<DogFriendlyResourceRow>(query, params);
}

/**
 * Get dog-friendly resource by ID
 */
export async function getDogFriendlyResourceById(id: number): Promise<DogFriendlyResource | null> {
  const query = 'SELECT * FROM DogFriendlyResources WHERE DogFriendlyResourceID = ? LIMIT 1';
  const resources = await executeQuery<DogFriendlyResourceRow>(query, [id]);
  return resources.length > 0 ? resources[0] : null;
}

/**
 * Search dog-friendly resources
 */
export async function searchDogFriendlyResources(
  searchTerm: string,
  limit: number = 20
): Promise<DogFriendlyResource[]> {
  const query = `
    SELECT * FROM DogFriendlyResources 
    WHERE Name LIKE ? OR Description LIKE ? OR ServicesOffered LIKE ? 
    OR City LIKE ? OR State LIKE ?
    ORDER BY Name
    LIMIT ?
  `;
  const searchPattern = `%${searchTerm}%`;
  const params = [
    searchPattern, searchPattern, searchPattern, 
    searchPattern, searchPattern, 
    limit
  ];
  
  return await executeQuery<DogFriendlyResourceRow>(query, params);
}

/**
 * Find dog-friendly resources by proximity
 * Note: This requires latitude and longitude data to be present in the records
 */
export async function findDogFriendlyResourcesByProximity(
  latitude: number,
  longitude: number,
  radiusMiles: number = 10,
  limit: number = 20
): Promise<DogFriendlyResource[]> {
  // Join with Organizations table to get geolocation data
  const query = `
    SELECT dfr.*, o.Latitude, o.Longitude,
      (3958.8 * acos(
        cos(radians(?)) * 
        cos(radians(o.Latitude)) * 
        cos(radians(o.Longitude) - radians(?)) + 
        sin(radians(?)) * 
        sin(radians(o.Latitude))
      )) AS distance
    FROM DogFriendlyResources dfr
    JOIN Organizations o ON dfr.OrganizationID = o.OrganizationID
    HAVING distance <= ?
    ORDER BY distance
    LIMIT ?
  `;
  
  const params = [latitude, longitude, latitude, radiusMiles, limit];
  return await executeQuery<DogFriendlyResourceRow>(query, params);
}

/**
 * Get dog-friendly resources by service type
 */
export async function getDogFriendlyResourcesByService(serviceType: string): Promise<DogFriendlyResource[]> {
  const query = `
    SELECT * FROM DogFriendlyResources 
    WHERE ServicesOffered LIKE ?
    ORDER BY Name
  `;
  
  return await executeQuery<DogFriendlyResourceRow>(query, [`%${serviceType}%`]);
}

/**
 * Get dog-friendly shelters
 * This is a specialized query to find emergency shelters that accept pets
 */
export async function getDogFriendlyShelters(): Promise<any[]> {
  const query = `
    SELECT es.*, 'EmergencyShelter' as ResourceType
    FROM EmergencyShelters es
    WHERE es.AcceptsPets = TRUE
    
    UNION
    
    SELECT 
      NULL as ShelterID,
      dfr.Name,
      dfr.Address,
      dfr.City,
      dfr.State as State,
      dfr.ZipCode,
      dfr.Phone,
      NULL as Email,
      dfr.Website,
      NULL as Capacity,
      NULL as CurrentAvailability,
      TRUE as AcceptsPets,
      NULL as Gender,
      NULL as AgeRestrictions,
      NULL as CheckInTime,
      NULL as CheckOutTime,
      NULL as StayLimitDays,
      dfr.ServicesOffered,
      NULL as Latitude,
      NULL as Longitude,
      NULL as IsVerified,
      dfr.DateAdded,
      dfr.LastUpdated,
      'DogFriendlyResource' as ResourceType
    FROM DogFriendlyResources dfr
    WHERE dfr.ServicesOffered LIKE '%shelter%' 
    OR dfr.ServicesOffered LIKE '%housing%'
    OR dfr.ServicesOffered LIKE '%accommodation%'
    
    ORDER BY Name
  `;
  
  return await executeQuery(query, []);
}