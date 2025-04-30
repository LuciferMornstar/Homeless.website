import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faHandsHelping, faPhone, faEnvelope, faDog } from '@fortawesome/free-solid-svg-icons';

export default function IntentionallyHomelessPage() {
  return (
    <ModernTemplate 
      title="Support for Intentionally Homeless Individuals"
      subtitle="Resources and rights for those who choose to be homeless"
    >
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Understanding Your Rights</h2>
        <p className="text-gray-700 mb-4">
          Choosing to be homeless is a personal decision that comes with its own set of challenges and rights. It's important to understand your legal rights and the resources available to you.
        </p>
        <p className="text-gray-700 mb-4">
          In the UK, intentionally homeless individuals still have access to certain rights and services. This page provides information on your rights, available resources, and how to access support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faHome} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Housing Rights</h3>
          <p className="text-gray-700 mb-4 text-center">
            Even if you choose to be homeless, you have the right to access emergency accommodation and support services.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Access to emergency shelters</li>
            <li>Right to apply for temporary accommodation</li>
            <li>Support from local authorities</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faInfoCircle} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Available Resources</h3>
          <p className="text-gray-700 mb-4 text-center">
            There are various resources available to support intentionally homeless individuals.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Drop-in centers and day shelters</li>
            <li>Food banks and meal services</li>
            <li>Healthcare services without a fixed address</li>
            <li>Mental health support and counseling</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Support for Mental Health and Wellbeing</h2>
        <p className="text-gray-700 mb-6">
          Mental health and wellbeing are crucial aspects of life, especially for those who choose to be homeless. There are various support services available to help you maintain your mental health and wellbeing.
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>Access to mental health services and counseling</li>
          <li>Support groups and community programs</li>
          <li>Resources for managing stress and anxiety</li>
          <li>Information on maintaining physical health</li>
        </ul>
        <div className="text-center">
          <Link 
            href="/mental-health" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Explore Mental Health Resources
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Service Dogs and Emotional Support Animals</h2>
        <p className="text-gray-700 mb-6">
          Service dogs and emotional support animals can provide significant benefits for individuals who are intentionally homeless. These animals offer companionship, emotional support, and assistance with daily tasks.
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>Information on obtaining a service dog</li>
          <li>Training programs for service dogs</li>
          <li>Resources for caring for your service dog</li>
          <li>Support for emotional support animals</li>
        </ul>
        <div className="text-center">
          <Link 
            href="/service-dog-certification" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Learn More About Service Dogs
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Contact Information</h2>
        <p className="text-gray-700 mb-6">
          If you need further assistance or have any questions about your rights and available resources, please contact us:
        </p>
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>Email: <a href="mailto:helpme@homeless.website" className="text-blue-600 hover:underline">helpme@homeless.website</a></li>
          <li>Phone, text, iMessage, and WhatsApp: <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a></li>
          <li>Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.facebook.com/homelesshelpuk</a></li>
        </ul>
      </div>
    </ModernTemplate>
  );
}
