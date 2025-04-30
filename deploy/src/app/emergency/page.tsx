"use client";

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHospital, faHome, faUtensils, faHands, faShield } from '@fortawesome/free-solid-svg-icons';

export default function EmergencyPage() {
  return (
    <ModernTemplate 
      title="Emergency Help"
      subtitle="Immediate assistance for urgent homelessness situations"
      showHero={false}
      showCta={false}
    >
      <div className="bg-red-600 text-white p-8 rounded-lg shadow-md mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="text-5xl">
            <FontAwesomeIcon icon={faPhone} />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-xl mb-4">
              If you&apos;re in immediate danger or facing a life-threatening emergency, call 999 immediately.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Emergency Housing Helpline</h3>
                <p className="mb-2">For urgent housing needs:</p>
                <a href="tel:+447853811172" className="text-white font-bold text-xl hover:underline">+44 7853 811172</a>
              </div>
              <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Mental Health Crisis Line</h3>
                <p className="mb-2">For mental health emergencies:</p>
                <p className="text-white font-bold text-xl">116 123 (Samaritans)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Emergency Housing</h2>
          <p className="text-gray-700 mb-4">
            If you need accommodation tonight or are at risk of sleeping rough:
          </p>
          <ul className="space-y-3 mb-6 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Contact your local council&apos;s housing department immediately - they have a legal duty to help homeless people in priority need</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Call our emergency helpline for assistance in finding emergency accommodation</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>Use our shelter database to locate emergency shelters near you</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 mr-2">•</span>
              <span>If you&apos;re under 18, contact social services immediately</span>
            </li>
          </ul>
          <Link
            href="/shelters"
            className="inline-block px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
          >
            Find Emergency Shelter
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Mental Health Crisis</h2>
          <p className="text-gray-700 mb-4">
            If you or someone you know is experiencing a mental health emergency:
          </p>
          <ul className="space-y-3 mb-6 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Call 999 if there is immediate danger</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Contact the Samaritans: 116 123 (free, 24/7)</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Text SHOUT to 85258 for crisis text support</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">•</span>
              <span>Go to your nearest A&E department where psychiatric services are available</span>
            </li>
          </ul>
          <Link
            href="/mental-health"
            className="inline-block px-4 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-300"
          >
            Mental Health Support
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Emergency Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4">
              <FontAwesomeIcon icon={faHospital} className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Healthcare</h3>
            <p className="text-gray-700 mb-3">
              Access emergency medical care without registration or NHS number.
            </p>
            <Link 
              href="/healthcare" 
              className="text-blue-600 hover:underline"
            >
              Emergency healthcare →
            </Link>
          </div>
          
          <div className="bg-green-50 p-5 rounded-lg">
            <div className="w-14 h-14 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4">
              <FontAwesomeIcon icon={faUtensils} className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Food</h3>
            <p className="text-gray-700 mb-3">
              Find emergency food parcels, soup kitchens and food banks.
            </p>
            <Link 
              href="/foodbanks" 
              className="text-green-600 hover:underline"
            >
              Emergency food →
            </Link>
          </div>
          
          <div className="bg-amber-50 p-5 rounded-lg">
            <div className="w-14 h-14 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full mb-4">
              <FontAwesomeIcon icon={faShield} className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Safety</h3>
            <p className="text-gray-700 mb-3">
              Resources for those fleeing domestic violence or abuse.
            </p>
            <Link 
              href="/resources" 
              className="text-amber-600 hover:underline"
            >
              Safety resources →
            </Link>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Local Authority Emergency Contact</h3>
          <p className="text-gray-700 mb-4">
            Your local council has a legal duty to help people who are homeless or at risk of homelessness. 
            They operate emergency out-of-hours services even when their offices are closed.
          </p>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">How to contact your local council:</h4>
            <ol className="list-decimal pl-6 mb-0 text-gray-700 space-y-2">
              <li>Search online for "&lsquo;your area&rsquo; + council + housing emergency"</li>
              <li>Call their main switchboard and ask for the homelessness emergency service</li>
              <li>Visit your local police station who can contact housing services</li>
              <li>Call our helpline for assistance in connecting with your local authority</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Legal Rights in an Emergency</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Emergency Housing Rights</h3>
            <p className="text-gray-700 mb-3">
              Local councils in the UK have a legal duty to help people who are homeless or threatened with homelessness. 
              Under the Homelessness Reduction Act 2017:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>If you&apos;re homeless, the council must assess your situation</li>
              <li>If you&apos;re eligible and in priority need, they must provide emergency accommodation</li>
              <li>You have the right to a written decision</li>
              <li>You can challenge decisions you disagree with</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Priority need includes families with children, pregnant women, vulnerable individuals due to age, 
              illness or disability, and those homeless due to an emergency such as fire or flood.
            </p>
            <Link 
              href="/lettermaker" 
              className="text-blue-600 hover:underline"
            >
              Create an emergency housing letter →
            </Link>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">If You&apos;re Turned Away</h3>
            <p className="text-gray-700 mb-3">
              If the council refuses to help, you can:
            </p>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Ask for the decision in writing</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Request a review of the decision within 21 days</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Contact Shelter&apos;s emergency helpline: 0808 800 4444</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Call our advocacy support line for assistance</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Seek advice from a housing solicitor or law centre</span>
              </li>
            </ul>
            <div className="bg-white p-4 rounded-lg border-l-4 border-red-600">
              <p className="font-medium text-gray-800">
                Don&apos;t give up if you&apos;re initially refused help. The council must provide temporary 
                accommodation while they investigate if there&apos;s reason to believe you may be homeless, 
                eligible for assistance and in priority need.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Us for Emergency Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Emergency Helpline</h3>
            <p className="text-gray-700 mb-4">
              Our team is available 24/7 to provide emergency guidance and support.
            </p>
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600 mb-6">
              <p className="font-bold text-gray-800 mb-1">Emergency Helpline:</p>
              <a href="tel:+447853811172" className="text-red-600 text-2xl font-bold hover:underline">+44 7853 811172</a>
            </div>
            <p className="text-gray-700 mb-1">
              <strong>Emergency Email:</strong> <a href="mailto:helpme@homeless.website" className="text-blue-600 hover:underline">helpme@homeless.website</a>
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Facebook:</strong> <a href="https://www.facebook.com/homelesshelpuk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Send us a message</a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Other Emergency Services</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="font-semibold min-w-[180px] inline-block">Emergency Services:</span>
                <span>999</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[180px] inline-block">Non-emergency Police:</span>
                <span>101</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[180px] inline-block">NHS Urgent Care:</span>
                <span>111</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[180px] inline-block">Samaritans:</span>
                <span>116 123</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[180px] inline-block">Shelter Emergency:</span>
                <span>0808 800 4444</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold min-w-[180px] inline-block">Domestic Violence:</span>
                <span>0808 2000 247</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </ModernTemplate>
  );
}
