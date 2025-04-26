type ApiResponse<T> = { success: boolean; data?: T; error?: string };

const apiService = {
  async get<T>(path: string, queryParams?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    try {
      let url = `/api/${path}`;
      
      // Add query parameters if provided
      if (queryParams) {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          params.append(key, String(value));
        });
        url += `?${params.toString()}`;
      }
      
      const res = await fetch(url);
      const json = await res.json();
      if (json.success) {
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error || 'Unknown error' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  },

  async post<T, U = Record<string, unknown>>(path: string, body: U): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`/api/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (json.success) {
        return { success: true, data: json.data };
      }
      return { success: false, error: json.error || 'Unknown error' };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return { success: false, error: errorMessage };
    }
  }
};

export default apiService;