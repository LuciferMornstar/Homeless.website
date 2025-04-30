"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const [_mobileMenuOpen, _setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const sections = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    // Get all sections
    sections.current = Array.from(document.querySelectorAll('section[id]'));
    
    const handleScroll = () => {
      let currentSection = '';
      
      sections.current.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100 && 
            window.scrollY < sectionTop + sectionHeight - 100) {
          currentSection = section.getAttribute('id') || '';
        }
      });
      
      if (currentSection !== '' && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  
  const startNeedsAssessment = () => {
    // In a real implementation, you might load a form or survey component here
    console.log("Starting needs assessment");
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen flex flex-col">
      <Menu />
      
      <main className="container mx-auto py-8 px-6 md:px-10 lg:px-12 flex-grow flex flex-col items-center mt-16 md:mt-20 lg:mt-24">
        <section id="hero" className="text-center mb-12 md:mb-16 lg:mb-20 w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 animate-fadeIn">
            Your Path to Stability Starts Here
          </h2>
          <p className="text-gray-600 text-lg md:text-xl lg:text-xl mb-8 md:mb-10 max-w-3xl mx-auto animate-fadeIn">
            Connecting individuals and families experiencing or at risk of homelessness 
            with vital resources and support.
          </p>
          <Link href="/get-help" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            Get Help Now
          </Link>
        </section>

        <section id="needs-assessment" className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-xl mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl p-8 transform transition hover:translate-y-[-4px] hover:scale-[1.02]">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Take Our Needs Assessment
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6 text-center">
            Answer a few questions to help us connect you with the right resources.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/mental-health-assessment" 
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-gray-200 transition transform hover:scale-105 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              Start Assessment
            </Link>
          </div>
          <div id="assessment-placeholder" className="mt-8 text-gray-700 text-center">
            <p className="text-md">The assessment will help us understand your specific needs and connect you with appropriate services for housing, mental health support, and other essential resources.</p>
          </div>
        </section>

        <section id="resources" className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-xl mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl p-8 transform transition hover:translate-y-[-4px] hover:scale-[1.02]">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            Resources Available
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6 text-center">
            Find a comprehensive list of services and support in your area.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Shelters</h3>
              <p className="text-gray-600 text-md mb-4">Emergency and transitional housing options.</p>
              <Link href="/shelters" className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300 text-md inline-block text-center">
                View Shelters
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Food Assistance</h3>
              <p className="text-gray-600 text-md mb-4">Food banks, meal programs, and SNAP information.</p>
              <Link href="/foodbanks" className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300 text-md inline-block text-center">
                Find Food Assistance
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Healthcare</h3>
              <p className="text-gray-600 text-md mb-4">Medical clinics, mental health services, and addiction support.</p>
              <Link href="/healthcare" className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300 text-md inline-block text-center">
                Get Healthcare
              </Link>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Mental Health Support</h3>
              <p className="text-gray-600 text-md mb-4">Resources for mental health including crisis support, counseling, and therapy options.</p>
              <Link href="/mental-health" className="bg-green-400 hover:bg-green-500 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300 text-md inline-block text-center">
                Mental Health Resources
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Dogs</h3>
              <p className="text-gray-600 text-md mb-4">Information about service and assistance dogs for emotional support and wellbeing.</p>
              <Link href="/service-dog-certification" className="bg-blue-300 hover:bg-blue-400 text-gray-800 font-semibold py-2 px-4 rounded-full transition duration-300 text-md inline-block text-center">
                Service Dog Information
              </Link>
            </div>
          </div>
        </section>

        <section id="about-us" className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-xl mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl p-8 transform transition hover:translate-y-[-4px] hover:scale-[1.02]">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
            About Us
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6 text-center">
            Homeless.Website is dedicated to providing a centralized platform for individuals and families experiencing or at risk of homelessness to access critical resources and support. We leverage advanced technology to connect people with the services they need, advocate for systemic change, and empower communities to address homelessness.
          </p>
          <div className="mt-8 text-center">
            <Link href="/about" className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg transition transform hover:scale-105 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12zm1-5a1 1 0 11-2 0V7a1 1 0 112 0v4z" clipRule="evenodd" />
              </svg>
              Learn More About Our Mission
            </Link>
          </div>
        </section>

        <section id="donate" className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-xl mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl p-8 transform transition hover:translate-y-[-4px] hover:scale-[1.02] text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Donate</h2>
          <p className="text-gray-600 text-lg md:text-xl mb-6">
            Your contribution can make a difference in the lives of those experiencing homelessness. Help us connect more people with the resources they need.
          </p>
          <Link href="/donate" className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition transform hover:scale-105 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Donate Now
          </Link>
          <div className="mt-8 bg-white bg-opacity-50 rounded-xl p-6">
            <h3 className="text-xl font-medium text-gray-800 mb-3">Contact Information</h3>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:info@homeless.website" className="text-blue-600 hover:underline">info@homeless.website</a></p>
            <p className="text-gray-700 mb-1">Phone: <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a></p>
            <p className="text-gray-700">Social: <a href="https://www.facebook.com/homelesshelpuk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a></p>
          </div>
        </section>

        {/* Contact & Support Section - prominent, accessible, and easy for all */}
        <section id="contact-support" className="bg-white bg-opacity-20 backdrop-blur-lg border border-white border-opacity-30 rounded-2xl shadow-2xl mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl p-8 text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Contact & Support</h2>
          <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
            We are here to help you, no matter your situation. If you need urgent help, mental health support, or have questions about service dogs, please reach out. All information is based on British law.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-6">
            <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow flex flex-col items-start">
              <span className="font-semibold text-gray-800">Help & Support:</span>
              <a href="mailto:helpme@homeless.website" className="text-blue-700 underline">helpme@homeless.website</a>
              <span className="font-semibold text-gray-800 mt-2">Dog Support:</span>
              <a href="mailto:dogs@homeless.website" className="text-blue-700 underline">dogs@homeless.website</a>
              <span className="font-semibold text-gray-800 mt-2">Volunteer:</span>
              <a href="mailto:volunteer@homeless.website" className="text-blue-700 underline">volunteer@homeless.website</a>
              <span className="font-semibold text-gray-800 mt-2">General Info:</span>
              <a href="mailto:info@homeless.website" className="text-blue-700 underline">info@homeless.website</a>
            </div>
            <div className="bg-white bg-opacity-60 rounded-lg p-4 shadow flex flex-col items-start">
              <span className="font-semibold text-gray-800">Phone, Text, iMessage, WhatsApp:</span>
              <a href="tel:+447853811172" className="text-blue-700 underline mb-2">+44 7853 811172</a>
              <span className="font-semibold text-gray-800">Facebook:</span>
              <a href="https://www.facebook.com/homelesshelpuk" className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">facebook.com/homelesshelpuk</a>
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-2">We respond as quickly as possible. If you are in crisis, please call or text for immediate help.</div>
        </section>
        {/* Expanded Mental Health and Service Dog Support Section */}
        <section id="mental-health-service-dogs" className="bg-green-50 bg-opacity-40 backdrop-blur-lg border border-green-200 rounded-2xl shadow-xl mb-12 md:mb-16 lg:mb-20 w-full max-w-4xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">Mental Health Support</h2>
            <p className="text-green-900 text-lg mb-4">If you are struggling, you are not alone. We offer resources, crisis support, and a listening ear for anyone facing mental health challenges while homeless.</p>
            <Link href="/mental-health-resources" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-lg transition shadow-md">Explore Mental Health Resources</Link>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-4">Service Dog & Pet-Friendly Support</h2>
            <p className="text-blue-900 text-lg mb-4">Service dogs and pets are welcome. Find information about service dog certification, dog-friendly shelters, and support for people with assistance animals.</p>
            <Link href="/service-dog-certification" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition shadow-md">Service Dog Information</Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease, fadeInUp 0.8s ease;
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
}
