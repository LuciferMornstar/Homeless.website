import ApiService from './apiService';

export interface DogFriendlyResource {
  DogFriendlyResourceID: number;
  OrganizationID?: number;
  Name: string;
  Description: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Phone?: string;
  Website?: string;
  ServicesOffered?: string;
  Restrictions?: string;
  Notes?: string;
  DateAdded: string;
  LastUpdated: string;
}

export interface ServiceDogCertification {
  CertificationID: number;
  DogID: number;
  CertificationType: string;
  CertificationNumber: string;
  IssuingOrganization: string;
  IssueDate: string;
  ExpiryDate: string;
  CertificationStatus: string;
  CertificationDocument?: string;
  Notes?: string;
}

export interface Dog {
  DogID: number;
  UserID?: number;
  Name: string;
  Breed?: string;
  Description?: string;
  VaccinationRecords?: string;
  CertificationNumber?: string;
}

// Interfaces for dog certification verification
export interface DogCertificationDetails {
  CertificationID: number;
  DogID: number;
  DogName: string;
  OwnerName: string;
  CertificationType: string;
  IssuingOrganization: string;
  IssueDate: string;
  ExpiryDate: string;
  CertificationStatus: string;
}

interface DogResourcesResponse {
  success: boolean;
  data: DogFriendlyResource[];
  message?: string;
}

interface DogServiceResponse<T = Record<string, unknown>> {
  success: boolean;
  message?: string;
  data?: T;
}

/**
 * Service for dog-related resources and operations
 */
class DogService {
  /**
   * Get all dog-friendly resources
   */
  static async getDogFriendlyResources(): Promise<DogFriendlyResource[]> {
    try {
      const response = await ApiService.get<DogResourcesResponse>('dog-friendly-resources');
      
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      }
      
      throw new Error(response.message ?? 'Failed to fetch dog-friendly resources');
    } catch (error) {
      console.error('Error fetching dog-friendly resources:', error);
      throw error;
    }
  }

  /**
   * Register a new dog for a user
   */
  static async registerDog(dogData: Omit<Dog, 'DogID'>): Promise<{ dogId: number }> {
    try {
      const response = await ApiService.post<{ id: number }>('dogs', dogData);
      
      if (response.success && response.data) {
        // Type assertion to handle the response structure
        const responseData = response.data as unknown as { id: number };
        return { dogId: responseData.id };
      }
      
      throw new Error(response.message ?? 'Failed to register dog');
    } catch (error) {
      console.error('Error registering dog:', error);
      throw error;
    }
  }

  /**
   * Apply for service dog certification
   */
  static async applyCertification(certificationData: Omit<ServiceDogCertification, 'CertificationID'>): Promise<{ certificationId: number }> {
    try {
      const response = await ApiService.post<{ certificationId: number }>('service-dog-certification', certificationData);
      
      if (response.success && response.data) {
        const responseData = response.data as unknown as { certificationId: number };
        return { certificationId: responseData.certificationId };
      }
      
      throw new Error(response.message ?? 'Failed to apply for service dog certification');
    } catch (error) {
      console.error('Error applying for service dog certification:', error);
      throw error;
    }
  }

  /**
   * Verify a service dog certification
   */
  static async verifyCertification(certificationNumber: string): Promise<{ isValid: boolean; details?: DogCertificationDetails }> {
    try {
      const response = await ApiService.get<DogCertificationDetails>('verify-assistance-dog', { certificationNumber });
      
      if (response.success && response.data) {
        return { 
          isValid: true,
          details: response.data as unknown as DogCertificationDetails
        };
      }
      
      return { isValid: false };
    } catch (error) {
      console.error('Error verifying dog certification:', error);
      return { isValid: false };
    }
  }

  /**
   * Get dog images from the system
   */
  static async getDogImages(): Promise<string[]> {
    try {
      const response = await ApiService.get<{ success: boolean; data: string[] }>('dogs');
      
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching dog images:', error);
      return [];
    }
  }
}

export default DogService;