import apiService from './apiService';
import type { MentalHealthResource } from '@/types/models';

// Fetch all mental health resources
export const getAllMentalHealthResources = async (filters?: {
  searchTerm?: string;
  county?: string;
  resourceType?: string;
  limit?: number;
}) => {
  return apiService.get<MentalHealthResource[]>('/mental-health-resources', filters);
};

// Get mental health resource by ID
export const getMentalHealthResourceById = async (id: number) => {
  return apiService.get<MentalHealthResource>(`/mental-health-resources/${id}`);
};

// Find mental health resources by proximity
export const findMentalHealthResourcesByProximity = async (
  latitude: number,
  longitude: number,
  radiusMiles: number = 10,
  limit: number = 20
) => {
  return apiService.get<MentalHealthResource[]>('/mental-health-resources', {
    lat: latitude,
    lng: longitude,
    radius: radiusMiles,
    limit
  });
};

// Submit a new mental health resource
export const addMentalHealthResource = async (resource: Omit<MentalHealthResource, 'ResourceID'>) => {
  return apiService.post<{ id: number }>('/mental-health-resources', resource);
};

// Update a mental health resource
export const updateMentalHealthResource = async (
  id: number,
  resourceData: Partial<MentalHealthResource>
) => {
  return apiService.put<{ success: boolean }>(`/mental-health-resources/${id}`, resourceData);
};

// Delete a mental health resource
export const deleteMentalHealthResource = async (id: number) => {
  return apiService.delete<{ success: boolean }>(`/mental-health-resources/${id}`);
};