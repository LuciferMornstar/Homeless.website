import apiService from './apiService';
import type { DogFriendlyResource } from '@/types/models';

// Fetch all dog-friendly resources
export const getAllDogFriendlyResources = async (filters?: {
  city?: string;
  state?: string;
  organizationId?: number;
  limit?: number;
}) => {
  return apiService.get<DogFriendlyResource[]>('/dog-friendly-resources', filters);
};

// Get dog-friendly resource by ID
export const getDogFriendlyResourceById = async (id: number) => {
  return apiService.get<DogFriendlyResource>(`/dog-friendly-resources/${id}`);
};

// Find dog-friendly resources by proximity (for homeless individuals with dogs)
export const findDogFriendlyResourcesByProximity = async (
  latitude: number,
  longitude: number,
  radiusMiles: number = 10,
  limit: number = 20
) => {
  return apiService.get<DogFriendlyResource[]>('/dog-friendly-resources', {
    lat: latitude,
    lng: longitude,
    radius: radiusMiles,
    limit
  });
};

// Get dog-friendly shelters specifically
export const getDogFriendlyShelters = async () => {
  return apiService.get<DogFriendlyResource[]>('/dog-friendly-resources/shelters');
};

// Submit a new dog-friendly resource
export const addDogFriendlyResource = async (resource: Omit<DogFriendlyResource, 'ResourceID'>) => {
  return apiService.post<{ id: number }>('/dog-friendly-resources', resource);
};

// Update a dog-friendly resource
export const updateDogFriendlyResource = async (
  id: number,
  resourceData: Partial<DogFriendlyResource>
) => {
  return apiService.put<{ success: boolean }>(`/dog-friendly-resources/${id}`, resourceData);
};

// Delete a dog-friendly resource
export const deleteDogFriendlyResource = async (id: number) => {
  return apiService.delete<{ success: boolean }>(`/dog-friendly-resources/${id}`);
};