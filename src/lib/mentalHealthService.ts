import ApiService from './apiService';

export interface MentalHealthResource {
  ResourceID: number;
  Name: string;
  ResourceType: string;
  Description: string;
  Address: string;
  City: string;
  County: string;
  PostCode: string;
  Phone: string;
  EmergencyPhone?: string;
  Email?: string;
  Website?: string;
  ServicesOffered: string;
  EligibilityCriteria?: string;
  ReferralProcess?: string;
  SpecializesIn?: string;
  AcceptsHomeless: boolean;
  IsVerified: boolean;
  NHSFunded: boolean;
  HasDropInHours: boolean;
  DropInSchedule?: string;
  AcceptsSelfReferral: boolean;
  WaitingTimeDays?: number;
  RequiresAppointment: boolean;
  ProvidesRemoteSupport: boolean;
  RemoteSupportDetails?: string;
  AcceptsDogs: boolean;
  Latitude?: number;
  Longitude?: number;
}

export interface CrisisSupportResource {
  ResourceID: number;
  Name: string;
  Description: string;
  Phone: string;
  EmergencyPhone?: string;
  Email?: string;
  Website?: string;
  ServicesOffered: string;
  AvailabilityHours: string;
  IsHelpline: boolean;
  IsTextService: boolean;
  IsEmailService: boolean;
  IsChatService: boolean;
  ProvidesImmediateHelp: boolean;
}

interface MentalHealthResourcesResponse {
  success: boolean;
  data: MentalHealthResource[];
  message?: string;
}

interface CrisisSupportResponse {
  success: boolean;
  data: CrisisSupportResource[];
  message?: string;
}

interface MentalHealthResourceFilters {
  county?: string;
  acceptsDogs?: boolean;
  nhsFunded?: boolean;
  city?: string;
  resourceType?: string;
  acceptsSelfReferral?: boolean;
}

/**
 * Service for mental health resources
 */
class MentalHealthService {
  /**
   * Get all mental health resources with optional filtering
   */
  static async getResources(filters?: MentalHealthResourceFilters): Promise<MentalHealthResource[]> {
    try {
      // Convert MentalHealthResourceFilters to Record<string, string | number | boolean>
      const queryParams: Record<string, string | number | boolean> = {};
      
      if (filters) {
        // Copy all properties from filters to the new object
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined) {
            queryParams[key] = value;
          }
        });
      }
      
      const response = await ApiService.get<MentalHealthResourcesResponse>('mental-health-resources', queryParams);
      
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      }
      
      throw new Error(response.message ?? 'Failed to fetch mental health resources');
    } catch (error) {
      console.error('Error fetching mental health resources:', error);
      throw error;
    }
  }

  /**
   * Get a specific mental health resource by ID
   */
  static async getResourceById(resourceId: number): Promise<MentalHealthResource> {
    try {
      const response = await ApiService.get<{ success: boolean; data: MentalHealthResource; message?: string }>(
        `mental-health-resources/${resourceId}`
      );
      
      if (response.success && response.data) {
        return response.data as unknown as MentalHealthResource;
      }
      
      throw new Error(response.message ?? 'Failed to fetch mental health resource');
    } catch (error) {
      console.error(`Error fetching mental health resource #${resourceId}:`, error);
      throw error;
    }
  }

  /**
   * Get crisis support resources
   */
  static async getCrisisSupport(): Promise<CrisisSupportResource[]> {
    try {
      const response = await ApiService.get<CrisisSupportResponse>(
        'mental-health-crisis-support'
      );
      
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      }
      
      throw new Error(response.message ?? 'Failed to fetch crisis support resources');
    } catch (error) {
      console.error('Error fetching crisis support resources:', error);
      throw error;
    }
  }
}

export default MentalHealthService;