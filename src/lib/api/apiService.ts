import axios from 'axios';

const API_BASE_URL = '/api';

// Create an axios instance with defaults
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic error handler
const handleApiError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("API Error Response:", error.response.data);
    return {
      error: error.response.data.error || 'An error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error("API Error Request:", error.request);
    return {
      error: 'No response received from server',
      status: 503
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("API Error:", error.message);
    return {
      error: error.message || 'An error occurred',
      status: 500
    };
  }
};

// Generic API methods
export const apiService = {
  // GET request
  async get<T>(endpoint: string, params?: any): Promise<T | { error: string, status: number }> {
    try {
      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T | { error: string, status: number }> {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T | { error: string, status: number }> {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T | { error: string, status: number }> {
    try {
      const response = await apiClient.patch(endpoint, data);
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  },

  // DELETE request
  async delete<T>(endpoint: string, params?: any): Promise<T | { error: string, status: number }> {
    try {
      const response = await apiClient.delete(endpoint, { params });
      return response.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

export default apiService;