import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Define interfaces for API responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Centralized API service to handle all requests to the backend
class ApiService {
  // Generic GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { params });
      return response.data as ApiResponse<T>;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<T>;
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Generic POST request
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
      return response.data as ApiResponse<T>;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<T>;
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Generic PUT request
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data);
      return response.data as ApiResponse<T>;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<T>;
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Generic DELETE request
  async delete<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${endpoint}`, { params });
      return response.data as ApiResponse<T>;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data as ApiResponse<T>;
      }
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // === Specific API Methods ===

  // Organizations
  getOrganizations() {
    return this.get<any[]>('organizations');
  }

  getOrganizationById(id: number) {
    return this.get<any>(`organizations/${id}`);
  }

  // Mental Health Resources
  getMentalHealthResources(filters?: any) {
    return this.get<any[]>('mental-health-resources', filters);
  }

  getMentalHealthResourceById(id: number) {
    return this.get<any>(`mental-health-resources/${id}`);
  }

  // Shelters
  getShelters(filters?: any) {
    return this.get<any[]>('shelters', filters);
  }

  // Food Banks
  getFoodBanks(filters?: any) {
    return this.get<any[]>('foodbanks', filters);
  }

  // Dog-friendly Resources
  getDogFriendlyResources() {
    return this.get<any[]>('dog-friendly-resources');
  }

  // Contact form submission
  submitContactForm(formData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    urgency?: string;
    contactNumber?: string;
    preferredContactMethod?: string;
    bestTimeToContact?: string;
  }) {
    return this.post<{ id: number }>('contact', formData);
  }

  // Mental Health Assessment
  submitMentalHealthAssessment(userId: number, answers: any[]) {
    return this.post<{ assessmentId: number }>('mental-health-assessment', {
      userId,
      answers
    });
  }

  // Letter Generator
  generateLetter(templateId: number, userData: any) {
    return this.post<{ letterId: number; content: string }>('letter-generator', {
      templateId,
      userData
    });
  }

  // User Authentication
  registerUser(userData: {
    username: string;
    password: string;
    email: string;
    firstName?: string;
    lastName?: string;
    hasDog?: boolean;
    dogDetails?: any;
  }) {
    return this.post<{ userId: number }>('auth/register', userData);
  }

  loginUser(credentials: { username: string; password: string }) {
    return this.post<{ token: string; user: any }>('auth/login', credentials);
  }

  // Volunteer Registration
  registerVolunteer(userData: any) {
    return this.post<{ volunteerId: number }>('volunteers', userData);
  }

  // Feedback submission
  submitFeedback(feedbackData: {
    userId?: number;
    organizationId?: number;
    feedbackText: string;
    rating?: number;
    contactEmail?: string;
    subject?: string;
  }) {
    return this.post<{ feedbackId: number }>('feedback', feedbackData);
  }
}

// Export a singleton instance to be used throughout the application
const apiService = new ApiService();
export default apiService;