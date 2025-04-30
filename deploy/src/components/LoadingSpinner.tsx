'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'gray';
  className?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
  text,
}) => {
  // Size values
  const sizeMap = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4',
  };
  
  // Color values
  const colorMap = {
    primary: 'border-red-700 border-t-transparent',
    secondary: 'border-blue-600 border-t-transparent',
    gray: 'border-gray-600 border-t-transparent',
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full ${sizeMap[size]} ${colorMap[color]}`} role="status" aria-label="Loading">
        <span className="sr-only">Loading...</span>
      </div>
      {text && <p className={`mt-3 text-${color === 'primary' ? 'red-700' : color === 'secondary' ? 'blue-600' : 'gray-600'}`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
