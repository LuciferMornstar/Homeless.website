"use client";

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import Link from 'next/link';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <ModernTemplate 
      title="Welcome to Homeless Helpers"
      subtitle="Supporting those experiencing or at risk of homelessness"
    >
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/3 w-full relative h-64 lg:h-auto">
            <Image
              src="/logo.png"
              alt="Homeless Helpers Logo"
              fill
              className="rounded-lg object-contain"
              priority
            />
          </div>
          <div className="lg:w-2/3 w-full">
            <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Welcome to Homeless Helpers. We are dedicated to providing support, resources and hope to individuals and families facing homelessness across the UK. Our organisation focuses on addressing the immediate needs of those experiencing homelessness while also working to tackle the underlying issues that lead to housing insecurity.
            </p>
            <p className="text-gray-700 mb-4">
              We recognize that homelessness is a complex issue often intertwined with mental health challenges, addiction, unemployment, and systemic barriers. That&apos;s why our approach is holistic, offering practical assistance alongside emotional support and advocacy.
            </p>
            <p className="text-gray-700">
              Whether you&apos;re seeking help, looking to volunteer, or wanting to learn more about the challenges facing homeless individuals in the UK, you&apos;ve come to the right place.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">If You Need Help</h2>
          <p className="text-gray-700 mb-4">
            We offer a range of resources for individuals experiencing or at risk of homelessness:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Directory of emergency shelters and temporary accommodation</li>
            <li>Access to food banks and meal services</li>
            <li>Mental health support and counselling referrals</li>
            <li>Assistance with benefits and housing applications</li>
            <li>Service dog certification and support animal resources</li>
            <li>Letter templates for communicating with agencies and landlords</li>
          </ul>
          <Link 
            href="/get-help" 
            className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
          >
            Get Help Now
          </Link>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Mental Health Focus</h2>
          <p className="text-gray-700 mb-4">
            At Homeless Helpers, we place special emphasis on mental health support. We understand that:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Mental health issues can both contribute to and result from homelessness</li>
            <li>The experience of homelessness is traumatic and can worsen existing conditions</li>
            <li>Access to mental health services is often limited for those without stable housing</li>
            <li>Recovery requires addressing both practical needs and psychological wellbeing</li>
          </ul>
          <Link 
            href="/mental-health" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Mental Health Resources
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">How You Can Help</h2>
        <p className="text-gray-700 mb-6">
          There are many ways you can contribute to supporting those experiencing homelessness:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Volunteer</h3>
            <p className="text-gray-700 mb-4">
              Join our team of dedicated volunteers who provide direct support to homeless individuals.
            </p>
            <Link 
              href="/volunteer" 
              className="text-blue-600 hover:underline"
            >
              Learn more about volunteering →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Donate</h3>
            <p className="text-gray-700 mb-4">
              Your financial support helps us maintain and expand our services for those in need.
            </p>
            <Link 
              href="/donate" 
              className="text-blue-600 hover:underline"
            >
              Make a donation →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">Spread Awareness</h3>
            <p className="text-gray-700 mb-4">
              Help challenge stereotypes and misconceptions about homelessness in your community.
            </p>
            <Link 
              href="/resources" 
              className="text-blue-600 hover:underline"
            >
              Access educational resources →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Get in Touch</h3>
            <p className="text-gray-700 mb-1">
              <strong>General Inquiries:</strong> <a href="mailto:info@homeless.website" className="text-blue-600 hover:underline">info@homeless.website</a>
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Help & Support:</strong> <a href="mailto:helpme@homeless.website" className="text-blue-600 hover:underline">helpme@homeless.website</a>
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Volunteer Opportunities:</strong> <a href="mailto:volunteer@homeless.website" className="text-blue-600 hover:underline">volunteer@homeless.website</a>
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Service Dog Inquiries:</strong> <a href="mailto:dogs@homeless.website" className="text-blue-600 hover:underline">dogs@homeless.website</a>
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Phone:</strong> <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a>
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Facebook:</strong> <a href="https://www.facebook.com/homelesshelpuk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.facebook.com/homelesshelpuk</a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">We&apos;re Here to Help</h3>
            <p className="text-gray-700 mb-4">
              Our team is available to provide guidance and support. Whether you&apos;re experiencing homelessness, 
              concerned about housing insecurity, or wanting to contribute to our mission, please don&apos;t hesitate to reach out.
            </p>
            <p className="text-gray-700 mb-4">
              For emergency situations requiring immediate assistance, please contact our emergency helpline.
            </p>
            <Link
              href="/emergency"
              className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
            >
              Emergency Help
            </Link>
          </div>
        </div>
      </div>
    </ModernTemplate>
  );
}
