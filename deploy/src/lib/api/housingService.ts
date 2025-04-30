import apiService from './apiService';
import type { HousingOpportunity } from '@/types/models';

// Fetch all housing opportunities with optional filters
export const getAllHousingOpportunities = async (filters?: {
  location?: string;
  propertyType?: string;
  maxRent?: number;
  acceptsDogs?: boolean;
  hasAccessibility?: boolean;
  acceptsHousingBenefit?: boolean;
}) => {
  return apiService.get<HousingOpportunity[]>('/housing-opportunities', filters);
};

// Get housing opportunity by ID
export const getHousingOpportunityById = async (id: number) => {
  return apiService.get<HousingOpportunity>(`/housing-opportunities/${id}`);
};

// Register interest in a property
export const registerPropertyInterest = async (propertyId: number, userId: number, notes?: string) => {
  return apiService.post<{ success: boolean }>('/housing-opportunities/interest', {
    propertyId,
    userId,
    notes
  });
};

// Submit a new housing opportunity
export const addHousingOpportunity = async (opportunity: Omit<HousingOpportunity, 'PropertyID'>) => {
  return apiService.post<{ id: number }>('/housing-opportunities', opportunity);
};

// Update housing opportunity details
export const updateHousingOpportunity = async (
  id: number,
  opportunityData: Partial<HousingOpportunity>
) => {
  return apiService.put<{ success: boolean }>(`/housing-opportunities/${id}`, opportunityData);
};

// Mark property as let/unavailable
export const markPropertyUnavailable = async (propertyId: number, reason: string) => {
  return apiService.patch<{ success: boolean }>(`/housing-opportunities`, {
    propertyId,
    isAvailable: false,
    reason
  });
};

// Delete a housing opportunity
export const deleteHousingOpportunity = async (id: number) => {
  return apiService.delete<{ success: boolean }>(`/housing-opportunities/${id}`);
};