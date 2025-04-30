import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="mb-6 text-gray-600">
          We're sorry, but the page you were looking for doesn't exist or has been moved.
        </p>
        <p className="mb-6 text-gray-600">
          If you're experiencing homelessness or need immediate help, please don't hesitate to contact us.
        </p>
        <div className="mb-6">
          <p className="font-semibold">Emergency Contact:</p>
          <p><a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a></p>
          <p><a href="mailto:helpme@homeless.website" className="text-blue-600 hover:underline">helpme@homeless.website</a></p>
        </div>
        <div className="flex justify-center">
          <Link href="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
