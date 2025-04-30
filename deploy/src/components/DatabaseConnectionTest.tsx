'use client';

import React, { useState, useEffect } from 'react';

// Define a type for the connection status
interface ConnectionStatus {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

export default function DatabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/db-test');
        const data = await response.json();
        setConnectionStatus(data);
        setIsLoading(false);
      } catch (err) {
        let errorMsg = 'Unknown error';
        if (err instanceof Error) {
          errorMsg = err.message;
        } else if (typeof err === 'string') {
          errorMsg = err;
        }
        setError(errorMsg);
        setIsLoading(false);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Database Connection Test</h2>
      
      {isLoading && (
        <div className="text-center py-4">
          <p>Testing database connection...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p><strong>Error:</strong> {error}</p>
          <p className="mt-2">Please check your server logs and database configuration.</p>
        </div>
      )}
      
      {connectionStatus && !isLoading && !error && (
        <div className={`border px-4 py-3 rounded ${connectionStatus.success ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`}>
          <p><strong>Status:</strong> {connectionStatus.success ? 'Connected' : 'Failed'}</p>
          <p><strong>Message:</strong> {connectionStatus.message}</p>
          {connectionStatus.data && (
            <div className="mt-2">
              <p><strong>Data:</strong> Connection test returned {JSON.stringify(connectionStatus.data)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
