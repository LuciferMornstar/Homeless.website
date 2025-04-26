'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FoodBank {
  FoodBankID: number;
  Name: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Phone?: string;
  Email?: string;
  Website?: string;
  OpeningHours?: string;
  Requirements?: string;
  AvailableItems?: string;
  Notes?: string;
  Latitude?: number;
  Longitude?: number;
}

export default function FoodbanksPage() {
  const [foodbanks, setFoodbanks] = useState<FoodBank[]>([]);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/foodbanks')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setFoodbanks(data.data);
        } else {
          setError('Failed to load food banks');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load food banks');
        setLoading(false);
      });
  }, []);

  // Filtered food banks
  const filtered = foodbanks.filter(fb => {
    const matchesSearch =
      !search ||
      fb.Name?.toLowerCase().includes(search.toLowerCase()) ||
      fb.City?.toLowerCase().includes(search.toLowerCase()) ||
      fb.Address?.toLowerCase().includes(search.toLowerCase());
    const matchesCity = !cityFilter || fb.City === cityFilter;
    return matchesSearch && matchesCity;
  });

  // Unique cities for filter dropdown
  const cities = Array.from(new Set(foodbanks.map(fb => fb.City).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-blue-700 opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Food Bank Resources</h1>
            <p className="text-xl md:text-2xl mb-8">
              Find free food assistance and support across the UK
            </p>
            <div className="bg-white text-gray-700 p-4 rounded-lg shadow-lg text-left mt-8">
              <p className="font-semibold text-green-800">
                Everyone deserves access to nutritious food. Food banks across the UK provide emergency food supplies to those in need, regardless of your housing situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Find Food Banks Near You */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Find Food Banks Near You</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Food banks are available throughout the UK, with several large networks and many independent local services.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-bold text-green-800 mb-3">Trussell Trust Food Banks</h3>
                    <p className="text-gray-700 mb-4">
                      The Trussell Trust operates the UK&apos;s largest network of food banks, with over 1,200 centers across the country.
                    </p>
                    <a 
                      href="https://www.trusselltrust.org/get-help/find-a-foodbank/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Find a Trussell Trust Food Bank
                    </a>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-bold text-blue-800 mb-3">Independent Food Banks</h3>
                    <p className="text-gray-700 mb-4">
                      Many independent food banks operate locally. The Independent Food Aid Network (IFAN) can help you find these services.
                    </p>
                    <a 
                      href="https://www.foodaidnetwork.org.uk/our-members" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Find an Independent Food Bank
                    </a>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg mb-6">
                  <h3 className="font-bold text-gray-800 mb-3">Other Ways to Find Food Support</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Contact your local council&apos;s welfare assistance team</li>
                    <li>Ask at a local community center, library, or place of worship</li>
                    <li>Speak to a support worker, social worker, or GP</li>
                    <li>Call Citizens Advice on <strong>0808 208 2138</strong> (England &amp; Wales)</li>
                    <li>If you&apos;re in Scotland, contact the Scottish Welfare Fund on <strong>0141 276 1177</strong></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How Food Banks Work */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">How Food Banks Work</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Most food banks operate through a referral system, but processes can vary between different organizations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h3 className="font-bold text-center text-gray-800 mb-3">Get a Referral</h3>
                    <p className="text-gray-700">
                      Most food banks require a referral voucher. These can be obtained from organizations like Citizens Advice, GPs, social workers, or local charities.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h3 className="font-bold text-center text-gray-800 mb-3">Visit the Food Bank</h3>
                    <p className="text-gray-700">
                      Take your referral voucher to the food bank. Staff will check it and prepare a food parcel designed to last for approximately three days.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-green-100 text-green-600 mx-auto mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h3 className="font-bold text-center text-gray-800 mb-3">Additional Support</h3>
                    <p className="text-gray-700">
                      Many food banks offer more than just food. They may provide toiletries, household items, and can often signpost you to other helpful services.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-3">
                    Important Information
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Most food banks limit the number of parcels you can receive within a specific period</li>
                    <li>Food banks aim to provide short-term emergency support, not ongoing assistance</li>
                    <li>If you need food immediately and cannot get a referral, contact the food bank directly as some may be able to help in emergency situations</li>
                    <li>Some food banks can arrange delivery if you&apos;re unable to collect your parcel</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* No Fixed Address? */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Accessing Food Banks Without a Fixed Address</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  If you don&apos;t have a fixed address, you can still access food banks and other food support services.
                </p>

                <div className="bg-blue-50 p-5 rounded-lg mb-8">
                  <h3 className="font-bold text-blue-800 mb-3">Tips for Accessing Food Banks When Homeless</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Contact a local homeless outreach team who can provide food bank referrals</li>
                    <li>Visit a day center, which often have connections with local food banks</li>
                    <li>Speak to staff at emergency accommodation or hostels</li>
                    <li>Some food banks will consider direct applications in emergency situations</li>
                    <li>Carry a letter from a support worker confirming your situation if possible</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-5 rounded-lg">
                  <h3 className="font-bold text-green-800 mb-3">Alternative Food Support</h3>
                  <p className="text-gray-700 mb-3">When food banks aren&apos;t accessible, these alternatives may help:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Soup Kitchens</h4>
                      <p className="text-gray-700">
                        Many cities have soup kitchens or community cafes offering free or low-cost meals. No referral needed.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Community Fridges</h4>
                      <p className="text-gray-700">
                        Public refrigerators where food is freely available to anyone who needs it.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Faith-Based Organizations</h4>
                      <p className="text-gray-700">
                        Many churches, mosques, temples, and other religious groups offer meals and food parcels.
                      </p>
                    </div>
                    <div className="bg-white rounded p-4 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Day Centers</h4>
                      <p className="text-gray-700">
                        Homeless day centers often provide meals and can connect you with food services.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dynamic Food Bank Listings */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
              <h2 className="text-3xl font-bold text-gray-800">All Food Banks (Database)</h2>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Search by name, city or address..."
                  className="border p-2 rounded"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search food banks"
                />
                <select
                  className="border p-2 rounded"
                  value={cityFilter}
                  onChange={e => setCityFilter(e.target.value)}
                  aria-label="Filter by city"
                >
                  <option value="">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading food banks...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                  <div className="col-span-full text-center text-gray-600">No food banks found.</div>
                ) : filtered.map(fb => (
                  <div key={fb.FoodBankID} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-bold text-green-800 text-xl mb-2">{fb.Name}</h3>
                      <p className="text-gray-700 mb-1">{fb.Address}{fb.City ? `, ${fb.City}` : ''}{fb.ZipCode ? `, ${fb.ZipCode}` : ''}</p>
                      {fb.OpeningHours && <p className="text-gray-600 text-sm mb-1">Hours: {fb.OpeningHours}</p>}
                      {fb.AvailableItems && <p className="text-gray-600 text-sm mb-1">Items: {fb.AvailableItems}</p>}
                      {fb.Requirements && <p className="text-gray-600 text-sm mb-1">Requirements: {fb.Requirements}</p>}
                      {fb.Notes && <p className="text-gray-600 text-xs mb-1">{fb.Notes}</p>}
                    </div>
                    <div className="mt-4 space-y-1">
                      {fb.Phone && <a href={`tel:${fb.Phone}`} className="text-green-700 hover:underline block">Call: {fb.Phone}</a>}
                      {fb.Email && <a href={`mailto:${fb.Email}`} className="text-green-700 hover:underline block">Email: {fb.Email}</a>}
                      {fb.Website && <a href={fb.Website.startsWith('http') ? fb.Website : `https://${fb.Website}`} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline block">Website</a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 text-sm text-gray-600 text-center">
              For help, contact <a href="mailto:helpme@homeless.website" className="text-green-700 underline">helpme@homeless.website</a> or call/text/WhatsApp <a href="tel:+447853811172" className="text-green-700 underline">+44 7853 811172</a>. Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">homelesshelpuk</a>
            </div>
          </section>

          {/* Need Help Now? */}
          <section className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Accessing Food Today?</h2>
            <p className="text-xl mb-6">Our team can help connect you with local food support services</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:08005555HELP" 
                className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                Call 0800-555-HELP
              </a>
              <Link 
                href="/emergency" 
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                Emergency Resources
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer information with links to specific resources could be added here */}
    </div>
  );
}
