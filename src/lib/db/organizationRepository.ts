import { RowDataPacket } from 'mysql2/promise';
import { Organization } from './models';
import { executeQuery, executeInsert, executeUpdate } from './dbUtils';

/**
 * Organizations repository
 * Handles database operations for organizations
 */

// Interface for organization rows from the database
interface OrganizationRow extends Organization, RowDataPacket {}

/**
 * Get all organizations with optional filtering
 */
export async function getAllOrganizations(
  filters?: Partial<Organization>,
  limit: number = 100
): Promise<Organization[]> {
  let query = 'SELECT * FROM Organizations WHERE 1=1';
  const params: any[] = [];

  // Add filters if provided
  if (filters) {
    if (filters.IsVerified !== undefined) {
      query += ' AND IsVerified = ?';
      params.push(filters.IsVerified);
    }
    if (filters.City) {
      query += ' AND City LIKE ?';
      params.push(`%${filters.City}%`);
    }
    if (filters.State) {
      query += ' AND State LIKE ?';
      params.push(`%${filters.State}%`);
    }
    if (filters.IsNHSAffiliated !== undefined) {
      query += ' AND IsNHSAffiliated = ?';
      params.push(filters.IsNHSAffiliated);
    }
  }

  query += ' ORDER BY Name LIMIT ?';
  params.push(limit);

  return await executeQuery<OrganizationRow>(query, params);
}

/**
 * Get organization by ID
 */
export async function getOrganizationById(id: number): Promise<Organization | null> {
  const query = 'SELECT * FROM Organizations WHERE OrganizationID = ? LIMIT 1';
  const organizations = await executeQuery<OrganizationRow>(query, [id]);
  return organizations.length > 0 ? organizations[0] : null;
}

/**
 * Search organizations
 */
export async function searchOrganizations(
  searchTerm: string,
  limit: number = 20
): Promise<Organization[]> {
  const query = `
    SELECT * FROM Organizations 
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
  
  return await executeQuery<OrganizationRow>(query, params);
}

/**
 * Find organizations by proximity
 */
export async function findOrganizationsByProximity(
  latitude: number,
  longitude: number,
  radiusMiles: number = 10,
  limit: number = 20
): Promise<Organization[]> {
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
    FROM Organizations
    HAVING distance <= ?
    ORDER BY distance
    LIMIT ?
  `;
  
  const params = [latitude, longitude, latitude, radiusMiles, limit];
  return await executeQuery<OrganizationRow>(query, params);
}

/**
 * Get organization services
 */
export async function getOrganizationServices(organizationId: number): Promise<any[]> {
  const query = `
    SELECT s.* 
    FROM Services s
    JOIN OrganizationServices os ON s.ServiceID = os.ServiceID
    WHERE os.OrganizationID = ?
  `;
  
  return await executeQuery(query, [organizationId]);
}

/**
 * Get organizations by service type
 */
export async function getOrganizationsByService(serviceType: string): Promise<Organization[]> {
  const query = `
    SELECT o.* 
    FROM Organizations o
    JOIN OrganizationServices os ON o.OrganizationID = os.OrganizationID
    JOIN Services s ON os.ServiceID = s.ServiceID
    WHERE s.Category = ? OR s.ServiceName LIKE ?
    GROUP BY o.OrganizationID
    ORDER BY o.Name
  `;
  
  return await executeQuery<OrganizationRow>(query, [serviceType, `%${serviceType}%`]);
}