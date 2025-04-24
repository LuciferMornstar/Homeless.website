'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import apiService from '@/lib/apiService';
import LoadingSpinner from '@/components/LoadingSpinner';

interface DogFriendlyResource {
  DogFriendlyResourceID: number;
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
}

const DogFriendlyResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<DogFriendlyResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<DogFriendlyResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterService, setFilterService] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [isSimpleView, setIsSimpleView] = useState(false);

  // Fetch resources on component mount
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get<DogFriendlyResource[]>('dog-friendly-resources');
        if (response.success && response.data) {
          setResources(response.data);
          setFilteredResources(response.data);
          
          // Extract unique cities and service types
          const uniqueCities = [...new Set(response.data
            .map(resource => resource.City)
            .filter(city => city && city.trim() !== ''))] as string[];
          setCities(uniqueCities.sort());
          
          const allServicesText = response.data
            .map(resource => resource.ServicesOffered || '')
            .join(' ');
          
          // Extract service types from the services text
          const commonServices = [
            'shelter', 'housing', 'veterinary', 'food', 'supplies', 
            'training', 'walking', 'daycare', 'grooming', 'medical'
          ];
          
          const foundServices = commonServices.filter(service => 
            allServicesText.toLowerCase().includes(service.toLowerCase())
          );
          
          setServiceTypes(foundServices);
        } else {
          setError('Failed to load dog-friendly resources');
        }
      } catch (err) {
        setError('An error occurred while loading resources');
        console.error('Error fetching dog resources:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources when search term or filters change
  useEffect(() => {
    if (resources.length === 0) return;
    
    let result = [...resources];
    
    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        resource => 
          resource.Name.toLowerCase().includes(term) ||
          (resource.Description && resource.Description.toLowerCase().includes(term)) ||
          (resource.ServicesOffered && resource.ServicesOffered.toLowerCase().includes(term))
      );
    }
    
    // Apply city filter
    if (filterCity) {
      result = result.filter(resource => resource.City === filterCity);
    }
    
    // Apply service type filter
    if (filterService) {
      result = result.filter(
        resource => resource.ServicesOffered && 
        resource.ServicesOffered.toLowerCase().includes(filterService.toLowerCase())
      );
    }
    
    setFilteredResources(result);
  }, [searchTerm, filterCity, filterService, resources]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setFilterCity('');
    setFilterService('');
  };

  // Toggle between simple and detailed view
  const toggleView = () => {
    setIsSimpleView(!isSimpleView);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-lg">
          <h2 className="text-xl text-red-800 mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dog-Friendly Resources</h1>
          <p className="text-gray-600 mt-2">Find services and resources that welcome you and your dog</p>
        </div>
        <button
          onClick={toggleView}
          className="bg-blue-50 text-blue-700 py-2 px-4 rounded border border-blue-300 hover:bg-blue-100"
        >
          {isSimpleView ? "Show Detailed View" : "Show Simple View"}
        </button>
      </div>

      {/* Search and filters */}
      <div className={`bg-white p-6 rounded-lg shadow-md mb-8 ${isSimpleView ? 'text-lg' : ''}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="search" className={`block mb-2 ${isSimpleView ? 'text-xl font-semibold' : 'text-sm font-medium text-gray-700'}`}>
              {isSimpleView ? "Find:" : "Search"}
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isSimpleView ? "Type what you need" : "Search by name, description or services..."}
              className={`w-full p-3 border border-gray-300 rounded-md ${isSimpleView ? 'text-lg' : ''}`}
            />
          </div>
          
          <div>
            <label htmlFor="city" className={`block mb-2 ${isSimpleView ? 'text-xl font-semibold' : 'text-sm font-medium text-gray-700'}`}>
              {isSimpleView ? "Town or City:" : "Filter by City"}
            </label>
            <select
              id="city"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-md ${isSimpleView ? 'text-lg' : ''}`}
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="service" className={`block mb-2 ${isSimpleView ? 'text-xl font-semibold' : 'text-sm font-medium text-gray-700'}`}>
              {isSimpleView ? "What you need:" : "Filter by Service Type"}
            </label>
            <select
              id="service"
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-md ${isSimpleView ? 'text-lg' : ''}`}
            >
              <option value="">All Services</option>
              {serviceTypes.map((service) => (
                <option key={service} value={service}>
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleResetFilters}
            className={`text-blue-600 hover:text-blue-800 ${isSimpleView ? 'text-lg font-semibold' : ''}`}
          >
            {isSimpleView ? "Show everything" : "Reset filters"}
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className={`text-gray-700 ${isSimpleView ? 'text-lg' : ''}`}>
          Showing {filteredResources.length} of {resources.length} resources
        </p>
      </div>

      {filteredResources.length === 0 ? (
        <div className={`bg-yellow-50 p-6 rounded-lg text-center ${isSimpleView ? 'text-xl' : ''}`}>
          <h3 className="text-yellow-800 font-semibold mb-2">
            {isSimpleView ? "Nothing found" : "No resources match your search"}
          </h3>
          <p className="text-yellow-700">
            {isSimpleView 
              ? "Try changing what you're looking for or click 'Show everything'" 
              : "Try adjusting your filters or search term to find more dog-friendly resources"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div key={resource.DogFriendlyResourceID} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-6">
                <h2 className={`font-bold text-gray-900 mb-2 ${isSimpleView ? 'text-2xl' : 'text-xl'}`}>
                  {resource.Name}
                </h2>
                
                {isSimpleView ? (
                  // Simple view with essential information only
                  <>
                    <p className="text-lg mb-4">
                      {resource.Description ? 
                        (resource.Description.length > 100 ? 
                          resource.Description.substring(0, 100) + '...' : 
                          resource.Description) : 
                        ''}
                    </p>
                    
                    {resource.Address && (
                      <div className="mb-3">
                        <p className="text-lg">
                          <span className="font-semibold">Where: </span>
                          {resource.Address}, {resource.City}
                        </p>
                      </div>
                    )}
                    
                    {resource.Phone && (
                      <div className="mb-3">
                        <p className="text-lg">
                          <span className="font-semibold">Phone: </span>
                          {resource.Phone}
                        </p>
                      </div>
                    )}
                    
                    {resource.ServicesOffered && (
                      <div className="mb-4">
                        <p className="text-lg">
                          <span className="font-semibold">What they offer: </span>
                          {resource.ServicesOffered}
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  // Detailed view with all information
                  <>
                    <p className="text-gray-700 mb-4">{resource.Description}</p>
                    
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                      {resource.Address && (
                        <p className="text-gray-700">
                          <span className="font-medium">Address: </span>
                          {resource.Address}, {resource.City}, {resource.State} {resource.ZipCode}
                        </p>
                      )}
                      {resource.Phone && (
                        <p className="text-gray-700">
                          <span className="font-medium">Phone: </span>
                          {resource.Phone}
                        </p>
                      )}
                      {resource.Website && (
                        <p className="text-gray-700">
                          <span className="font-medium">Website: </span>
                          <a href={resource.Website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {resource.Website}
                          </a>
                        </p>
                      )}
                    </div>
                    
                    {resource.ServicesOffered && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Services Offered</h3>
                        <p className="text-gray-700">{resource.ServicesOffered}</p>
                      </div>
                    )}
                    
                    {resource.Restrictions && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Restrictions</h3>
                        <p className="text-gray-700">{resource.Restrictions}</p>
                      </div>
                    )}
                    
                    {resource.Notes && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-900 mb-2">Additional Notes</h3>
                        <p className="text-gray-700">{resource.Notes}</p>
                      </div>
                    )}
                  </>
                )}
                
                <div className={`flex justify-end mt-4 ${isSimpleView ? 'text-lg' : ''}`}>
                  <Link href={`/dog-friendly-resources/${resource.DogFriendlyResourceID}`} className="text-blue-600 hover:text-blue-800 hover:underline">
                    {isSimpleView ? "See more" : "View details"}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Emergency dog help banner */}
      <div className={`mt-12 bg-red-50 border border-red-200 rounded-lg p-6 ${isSimpleView ? 'text-lg' : ''}`}>
        <h2 className={`font-bold text-red-800 mb-2 ${isSimpleView ? 'text-2xl' : 'text-xl'}`}>
          {isSimpleView ? "Need help with your dog right now?" : "Emergency Support for You and Your Dog"}
        </h2>
        <p className="text-red-700 mb-4">
          {isSimpleView 
            ? "If you and your dog need help now, we can help you find a safe place to stay." 
            : "If you're in a crisis situation and need immediate assistance with your dog, please contact our emergency helpline."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/emergency" className="bg-red-600 text-white py-3 px-6 rounded-lg text-center hover:bg-red-700">
            {isSimpleView ? "Get emergency help" : "Emergency Services"}
          </Link>
          <a href={`tel:+447853811172`} className="bg-white text-red-600 border border-red-300 py-3 px-6 rounded-lg text-center hover:bg-red-50">
            {isSimpleView ? "Call for help: +447853811172" : "Call Helpline: +447853811172"}
          </a>
        </div>
      </div>
      
      {/* Contact section */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
        <h2 className={`font-bold text-gray-900 mb-2 ${isSimpleView ? 'text-2xl' : 'text-xl'}`}>
          {isSimpleView ? "Want to add a dog-friendly place?" : "Know of a Dog-Friendly Resource We Should Add?"}
        </h2>
        <p className={`mb-4 ${isSimpleView ? 'text-lg' : 'text-gray-700'}`}>
          {isSimpleView 
            ? "Tell us about places that help people with dogs." 
            : "Help us grow our database of dog-friendly resources for people experiencing homelessness."}
        </p>
        <div className="inline-block">
          <a 
            href="mailto:dogs@homeless.website" 
            className="bg-blue-600 text-white py-3 px-6 rounded-lg inline-block hover:bg-blue-700"
          >
            {isSimpleView ? "Email us" : "Submit a Resource"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default DogFriendlyResourcesPage;
