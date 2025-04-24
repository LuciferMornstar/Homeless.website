'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faGlobe, faMapMarkerAlt, faDog, faWheelchair, faClock, faPoundSign } from '@fortawesome/free-solid-svg-icons';

interface ServiceCardProps {
  title: string;
  description: string;
  address?: string;
  city?: string;
  postCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  servicesOffered?: string;
  tags?: string[];
  acceptsDogs?: boolean;
  isAccessible?: boolean;
  openingHours?: string;
  isFree?: boolean;
  detailsUrl?: string;
  nhsFunded?: boolean;
  emergencyService?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  address,
  city,
  postCode,
  phone,
  email,
  website,
  servicesOffered,
  tags = [],
  acceptsDogs = false,
  isAccessible = false,
  openingHours,
  isFree = false,
  detailsUrl,
  nhsFunded = false,
  emergencyService = false,
}) => {
  const fullAddress = [address, city, postCode].filter(Boolean).join(', ');
  
  return (
    <div className={`border rounded-lg overflow-hidden shadow-md bg-white transition-transform hover:shadow-lg ${emergencyService ? 'border-red-500' : ''}`}>
      <div className={`px-6 py-4 ${emergencyService ? 'bg-red-50' : ''}`}>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
          
          <div className="flex space-x-1">
            {nhsFunded && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">NHS</span>
            )}
            {acceptsDogs && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                <FontAwesomeIcon icon={faDog} className="mr-1" /> Dog Friendly
              </span>
            )}
            {isAccessible && (
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                <FontAwesomeIcon icon={faWheelchair} className="mr-1" /> Accessible
              </span>
            )}
            {isFree && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                <FontAwesomeIcon icon={faPoundSign} className="mr-1" /> Free
              </span>
            )}
          </div>
        </div>
        
        {emergencyService && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-3">
            <p className="font-bold">Emergency Service</p>
            <p>This service provides emergency assistance.</p>
          </div>
        )}
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {servicesOffered && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">Services:</h4>
            <p className="text-gray-600">{servicesOffered}</p>
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          {fullAddress && (
            <div className="flex items-start">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mt-1 mr-2" />
              <span className="text-gray-700">{fullAddress}</span>
            </div>
          )}
          
          {phone && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-2" />
              <a href={`tel:${phone}`} className="text-gray-700 hover:text-red-700">{phone}</a>
            </div>
          )}
          
          {email && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-2" />
              <a href={`mailto:${email}`} className="text-gray-700 hover:text-red-700">{email}</a>
            </div>
          )}
          
          {website && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGlobe} className="text-gray-500 mr-2" />
              <a 
                href={website.startsWith('http') ? website : `https://${website}`} 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-gray-700 hover:text-red-700"
              >
                {website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          
          {openingHours && (
            <div className="flex items-start">
              <FontAwesomeIcon icon={faClock} className="text-gray-500 mt-1 mr-2" />
              <span className="text-gray-700">{openingHours}</span>
            </div>
          )}
        </div>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {detailsUrl && (
        <div className="px-6 py-3 bg-gray-50 border-t">
          <Link 
            href={detailsUrl} 
            className="text-red-700 hover:text-red-900 font-medium inline-flex items-center"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ServiceCard;
