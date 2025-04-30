"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faBriefcase, faBrain, faHandHoldingHeart, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Menu />
      
      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50"></div>
        <div className="container mx-auto max-w-5xl px-4 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">Support for Those Facing Homelessness</h1>
            <p className="text-xl mb-8 animate-fade-in-up">Find resources, support and community to help you through difficult times</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
              <Link 
                href="/get-help" 
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
              >
                Get Help Now
              </Link>
              <Link 
                href="/resources" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-900 transition duration-300"
              >
                View Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">How We Can Help</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-6 mx-auto">
                <FontAwesomeIcon icon={faHome} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Find Shelter</h3>
              <p className="text-gray-600 mb-6 text-center">
                Access our database of shelters and temporary housing options to find a safe place to stay.
              </p>
              <div className="text-center">
                <Link 
                  href="/shelters" 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Find Shelters
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6 mx-auto">
                <FontAwesomeIcon icon={faUtensils} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Food Resources</h3>
              <p className="text-gray-600 mb-6 text-center">
                Locate food banks, soup kitchens, and community meals in your area to ensure you don&apos;t go hungry.
              </p>
              <div className="text-center">
                <Link 
                  href="/foodbanks" 
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-300"
                >
                  Find Food
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-6 mx-auto">
                <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Employment Help</h3>
              <p className="text-gray-600 mb-6 text-center">
                Get assistance with job searches, resume building, and interview preparation to secure employment.
              </p>
              <div className="text-center">
                <Link 
                  href="/employment" 
                  className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-300"
                >
                  Find Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Our Services</h2>
          <p className="text-center mb-4 text-gray-600">We provide various resources to help people facing or experiencing homelessness</p>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="relative h-64">
                <Image 
                  src="/Assets/dogs/1.jpeg" 
                  alt="Service Dogs" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Service Dog Certification</h3>
                <p className="text-gray-600 mb-6">
                  Our service helps homeless individuals certify their companion animals as service or emotional support animals.
                </p>
                <Link 
                  href="/service-dog-certification" 
                  className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="relative h-64">
                <Image 
                  src="/gov1.png" 
                  alt="Letter Templates" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">Letter Templates</h3>
                <p className="text-gray-600 mb-6">
                  Create official-looking letters to help you communicate with agencies, landlords, and service providers.
                </p>
                <Link 
                  href="/lettermaker" 
                  className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
                >
                  Create Letters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mental Health Support Section - Added to align with HHR Rule #2 */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Mental Health Support</h2>
          <p className="text-center mb-4 text-gray-600">Supporting mental wellbeing is crucial for those experiencing homelessness</p>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-4 mx-auto">
                <FontAwesomeIcon icon={faBrain} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Understanding Trauma</h3>
              <p className="text-gray-600 mb-6 text-center">
                Learn how homelessness and trauma are connected, and find resources for trauma-informed support.
              </p>
              <div className="text-center">
                <Link 
                  href="/mental-health" 
                  className="px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
                <FontAwesomeIcon icon={faHandHoldingHeart} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Crisis Support</h3>
              <p className="text-gray-600 mb-6 text-center">
                Immediate help for mental health emergencies, including 24/7 crisis lines and emergency resources.
              </p>
              <div className="text-center">
                <Link 
                  href="/mental-health#crisis" 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Get Help Now
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:translate-y-[-5px]">
              <div className="w-16 h-16 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full mb-4 mx-auto">
                <FontAwesomeIcon icon={faPeopleGroup} className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Support Groups</h3>
              <p className="text-gray-600 mb-6 text-center">
                Connect with others who understand your experience through peer support groups and community resources.
              </p>
              <div className="text-center">
                <Link 
                  href="/network" 
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition duration-300"
                >
                  Find Groups
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/mental-health-assessment" 
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition duration-300 inline-block"
            >
              Take Mental Health Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Success Stories</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-12"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 italic">
                &ldquo;After months of sleeping rough, the shelter directory helped me find a place where I could stay while I got back on my feet. Now I have my own apartment!&rdquo;
              </p>
              <p className="font-semibold text-gray-800">- Michael S.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 italic">
                &ldquo;The letter maker tool helped me communicate with my landlord when I was facing eviction. It bought me time to find assistance and avoid homelessness.&rdquo;
              </p>
              <p className="font-semibold text-gray-800">- Sarah T.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6 italic">
                &ldquo;Getting my dog certified as an emotional support animal meant I could keep her with me in the shelter. She&apos;s been my rock through this difficult time.&rdquo;
              </p>
              <p className="font-semibold text-gray-800">- James L.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto max-w-5xl px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Right Now?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our resources are available 24/7. If you&apos;re in an emergency situation, don&apos;t wait - get help immediately.
          </p>
          <Link 
            href="/emergency" 
            className="px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 inline-block"
          >
            Emergency Help
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
