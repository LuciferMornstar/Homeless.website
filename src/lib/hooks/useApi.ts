import { useState, useEffect, useCallback } from 'react';
import apiService from '../api/apiService';

// Generic type for API error responses
export type ApiError = { error: string; status: number };

// Check if a response contains an error
export const isApiError = (response: any): response is ApiError => {
  return response && typeof response === 'object' && 'error' in response && 'status' in response;
};

/**
 * Hook for fetching data from the API
 */
export function useFetch<T>(endpoint: string, params?: any, initialData?: T) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiService.get<T>(endpoint, params);
      
      if (isApiError(response)) {
        setError(response.error);
        setData(initialData);
      } else {
        setData(response as T);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setData(initialData);
    } finally {
      setLoading(false);
    }
  }, [endpoint, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
}

/**
 * Hook for submitting data to the API (Create/Update/Delete)
 */
export function useSubmit<T, R = any>(method: 'post' | 'put' | 'patch' | 'delete' = 'post') {
  const [data, setData] = useState<R | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const submit = useCallback(
    async (endpoint: string, submitData?: T): Promise<R | undefined> => {
      setLoading(true);
      setSuccess(false);
      setError(null);
      
      try {
        let response: any;
        
        if (method === 'delete') {
          response = await apiService[method]<R>(endpoint, submitData);
        } else {
          response = await apiService[method]<R>(endpoint, submitData);
        }
        
        if (isApiError(response)) {
          setError(response.error);
          return undefined;
        } else {
          setData(response as R);
          setSuccess(true);
          return response as R;
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [method]
  );

  return { submit, data, error, loading, success };
}

/**
 * Hook specifically for mental health resources
 */
export function useMentalHealthResources(params?: {
  searchTerm?: string;
  proximity?: {
    latitude: number;
    longitude: number;
    radiusMiles?: number;
  };
  limit?: number;
}) {
  let endpoint = '/mental-health-resources';
  let queryParams = { ...params };
  
  if (params?.proximity) {
    queryParams = {
      ...queryParams,
      lat: params.proximity.latitude,
      lng: params.proximity.longitude,
      radius: params.proximity.radiusMiles || 10,
    };
    delete queryParams.proximity;
  }
  
  return useFetch(endpoint, queryParams);
}

/**
 * Hook specifically for dog-friendly resources
 */
export function useDogFriendlyResources(params?: {
  searchTerm?: string;
  city?: string;
  state?: string;
  proximity?: {
    latitude: number;
    longitude: number;
    radiusMiles?: number;
  };
  limit?: number;
}) {
  let endpoint = '/dog-friendly-resources';
  let queryParams = { ...params };
  
  if (params?.proximity) {
    queryParams = {
      ...queryParams,
      lat: params.proximity.latitude,
      lng: params.proximity.longitude,
      radius: params.proximity.radiusMiles || 10,
    };
    delete queryParams.proximity;
  }
  
  return useFetch(endpoint, queryParams);
}

/**
 * Hook specifically for housing opportunities
 */
export function useHousingOpportunities(params?: {
  location?: string;
  propertyType?: string;
  maxRent?: number;
  acceptsDogs?: boolean;
  hasAccessibility?: boolean;
  acceptsHousingBenefit?: boolean;
}) {
  return useFetch('/housing-opportunities', params);
}

/**
 * Hook specifically for service dogs information
 */
export function useServiceDogs(userId?: string, dogId?: string) {
  const params = {
    ...(userId && { userId }),
    ...(dogId && { dogId }),
  };
  
  return useFetch('/service-dogs', params);
}

/**
 * Hook for user documents
 */
export function useUserDocuments(userId?: string, category?: string) {
  const params = {
    ...(userId && { userId }),
    ...(category && { category }),
  };
  
  return useFetch('/documents', params);
}

/**
 * Hook for benefits assistance
 */
export function useBenefitsAssistance(userId?: string, benefitType?: string, status?: string) {
  const params = {
    ...(userId && { userId }),
    ...(benefitType && { benefitType }),
    ...(status && { status }),
  };
  
  return useFetch('/benefits-assistance', params);
}