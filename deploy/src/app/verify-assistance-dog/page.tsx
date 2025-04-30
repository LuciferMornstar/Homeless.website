'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheck, FaTimes, FaSearch, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

// Define types for our certification data
type CertificationStatus = 'valid' | 'expired' | 'not_found';

interface CertificationData {
  status: CertificationStatus;
  dogName?: string;
  breed?: string;
  handler?: string;
  issuedDate?: string;
  expiryDate?: string;
  serviceType?: string;
}

type CertificationsRecord = {
  [key: string]: CertificationData;
};

// Change the main component export to follow Next.js Page conventions
export default function Page() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<CertificationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // This would normally connect to a real database
  // For demo purposes, we'll use a static list of valid certification IDs
  const validCertifications: CertificationsRecord = {
    'MS8912FRK': {
      status: 'valid',
      dogName: 'Frankie',
      breed: 'Labrador Retriever',
      handler: 'Thomas Anderson',
      issuedDate: '01/03/2025',
      expiryDate: '15/02/2027',
      serviceType: 'PTSD/Anxiety Support'
    },
    'LM2677GYP': {
      status: 'valid',
      dogName: 'Gypsy',
      breed: 'Dachshund',
      handler: 'Lucifer Morningstar',
      issuedDate: '14/04/2025',
      expiryDate: '10/04/2027',
      serviceType: 'Memory/Injury Assistance'
    },
    'SD5511BUD': {
      status: 'expired',
      dogName: 'Buddy',
      breed: 'German Shepherd',
      handler: 'John Smith',
      issuedDate: '05/06/2020',
      expiryDate: '05/06/2023',
      serviceType: 'Mobility Assistance'
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const formattedQuery = searchQuery.trim().toUpperCase();
      
      if (validCertifications[formattedQuery]) {
        setSearchResult(validCertifications[formattedQuery]);
      } else {
        setSearchResult({ status: 'not_found' });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 text-white py-6 mb-6">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image 
              src="/Assets/gov1.png" 
              alt="GOV.UK Logo" 
              width={36} 
              height={36} 
              className="mr-2"
            />
            <span className="font-bold text-xl md:text-2xl">GOV.UK</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold w-full mt-4 md:mt-0 md:w-auto">
            Verify Assistance Dog Certification
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 md:grid md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2 bg-white p-6 shadow-md mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Check if an assistance dog certification is genuine
          </h2>
          
          <div className="mb-8 text-gray-700">
            <p className="mb-4">
              Use this service to check if an assistance dog certification is valid and genuine.
              This service covers certifications issued by registered training organizations in the United Kingdom.
            </p>
            <p className="mb-4">
              Enter the registration ID found on the assistance dog certificate to verify its status.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-sm">
                <FaInfoCircle className="inline-block mr-2 text-blue-600" />
                Under the Equality Act 2010, assistance dogs are legally permitted in establishments 
                where the general public are allowed, even without certification. This service helps 
                verify official certifications but is not required for legal access rights.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="mb-4">
              <label htmlFor="certId" className="block font-bold mb-2 text-gray-700">
                Certification Registration ID
              </label>
              <input
                type="text"
                id="certId"
                className="w-full border-2 border-gray-300 p-3 focus:outline-none focus:border-blue-800"
                placeholder="e.g. MS8912FRK"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 text-white py-3 px-6 font-bold hover:bg-green-800 flex items-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center">
                  <FaSearch className="mr-2" /> Verify Certification
                </span>
              )}
            </button>
          </form>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 text-red-800">
              {error}
            </div>
          )}

          {searchResult && (
            <div className={`p-6 mb-6 rounded border-l-4 ${
              searchResult.status === 'valid' 
                ? 'bg-green-50 border-green-600' 
                : searchResult.status === 'expired' 
                  ? 'bg-amber-50 border-amber-600' 
                  : 'bg-red-50 border-red-600'
            }`}>
              <h3 className="text-xl font-bold mb-4">Verification Result</h3>
              
              {searchResult.status === 'valid' && (
                <div>
                  <div className="flex items-center mb-4 text-green-800">
                    <div className="bg-green-600 rounded-full p-1 mr-3">
                      <FaCheck className="text-white text-sm" />
                    </div>
                    <span className="font-bold">VALID CERTIFICATION</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Dog Name</p>
                      <p className="text-lg">{searchResult.dogName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Breed</p>
                      <p className="text-lg">{searchResult.breed}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Handler</p>
                      <p className="text-lg">{searchResult.handler}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Service Type</p>
                      <p className="text-lg">{searchResult.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Issued Date</p>
                      <p className="text-lg">{searchResult.issuedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Valid Until</p>
                      <p className="text-lg">{searchResult.expiryDate}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm bg-blue-50 p-3">
                    This certification is valid and has been verified in our system. 
                    This dog is a legitimate assistance dog trained to provide the service indicated above.
                  </p>
                </div>
              )}
              
              {searchResult.status === 'expired' && (
                <div>
                  <div className="flex items-center mb-4 text-amber-800">
                    <div className="bg-amber-600 rounded-full p-1 mr-3">
                      <FaExclamationTriangle className="text-white text-sm" />
                    </div>
                    <span className="font-bold">EXPIRED CERTIFICATION</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Dog Name</p>
                      <p className="text-lg">{searchResult.dogName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Breed</p>
                      <p className="text-lg">{searchResult.breed}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Handler</p>
                      <p className="text-lg">{searchResult.handler}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Service Type</p>
                      <p className="text-lg">{searchResult.serviceType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-600 mb-1">Expired On</p>
                      <p className="text-lg">{searchResult.expiryDate}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm bg-amber-50 p-3">
                    This certification has expired. The dog may still be a legitimate assistance animal, 
                    but the certification needs to be renewed. Under the Equality Act 2010, assistance dogs 
                    are still permitted in public places even without current certification.
                  </p>
                </div>
              )}
              
              {searchResult.status === 'not_found' && (
                <div>
                  <div className="flex items-center mb-4 text-red-800">
                    <div className="bg-red-600 rounded-full p-1 mr-3">
                      <FaTimes className="text-white text-sm" />
                    </div>
                    <span className="font-bold">CERTIFICATION NOT FOUND</span>
                  </div>
                  
                  <p className="mb-4">
                    The certification ID you entered was not found in our system. This may indicate:
                  </p>
                  
                  <ul className="list-disc pl-5 mb-4">
                    <li>The ID was entered incorrectly</li>
                    <li>The certification has not been registered in this system</li>
                    <li>The certification may not be genuine</li>
                  </ul>
                  
                  <p className="text-sm bg-blue-50 p-3">
                    Note: Under the Equality Act 2010, assistance dogs are legally permitted in 
                    establishments where the general public are allowed, even without certification. 
                    If you suspect fraudulent activity, please contact the appropriate authorities.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="md:col-span-1">
          <div className="bg-white p-6 shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Related Information</h3>
            <ul className="list-disc pl-5 mb-4 text-blue-800">
              <li className="mb-2">
                <Link href="/service-dog-certification" className="hover:underline">
                  Service Dog Certification
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/reportdogbreach" className="hover:underline">
                  Report Access Refusal
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/protection-dogs" className="hover:underline">
                  Protection Dogs & The Law
                </Link>
              </li>
              <li className="mb-2">
                <Link href="https://www.equality-hub.gov.uk/guidance-on-assistance-dogs" target="_blank" rel="noopener noreferrer" className="flex items-center">
                  UK Equality Act 2010 Guidance
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-6 shadow-md mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Need Help?</h3>
            <p className="mb-3 text-gray-700">
              If you have questions about assistance dog rights or need support, our team is here to help.
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dogs@homeless.website" className="text-blue-700 hover:underline">dogs@homeless.website</a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+447853811172" className="text-blue-700 hover:underline">+44 7853 811172</a>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Support Services</h3>
              <p className="mb-4">Helping homeless individuals and their service animals navigate legal rights and access services.</p>
              <p>Contact us at <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a></p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/mental-health" className="hover:underline">Mental Health Support</Link></li>
                <li><Link href="/resources" className="hover:underline">Resources</Link></li>
                <li><Link href="/volunteer" className="hover:underline">Volunteer</Link></li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h3 className="text-xl font-bold mb-4">Legal Information</h3>
              <p className="text-sm">The information on this website is provided as guidance only and should not be considered legal advice. For specific legal advice, please consult a qualified legal professional.</p>
              <p className="text-sm mt-2">© 2025 Homeless Helpers. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
