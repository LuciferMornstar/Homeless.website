"use client";

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse, faBrain, faPeopleGroup, faDog, faHandHoldingHeart, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

export default function MentalHealthPage() {
  return (
    <ModernTemplate 
      title="Mental Health Support"
      subtitle="Resources and guidance for mental wellbeing while experiencing homelessness"
    >
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Mental Health & Homelessness</h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
          <div className="lg:w-2/3 w-full">
            <p className="text-gray-700 mb-4">
              The relationship between homelessness and mental health is complex and bidirectional. Mental health issues can 
              contribute to homelessness, while the experience of homelessness often exacerbates existing mental health conditions 
              or triggers new ones.
            </p>
            <p className="text-gray-700 mb-4">
              At Homeless Helpers, we understand this connection deeply. Our mental health support services are designed 
              specifically for individuals experiencing housing insecurity, with an understanding of the unique challenges and 
              trauma associated with homelessness.
            </p>
            <p className="text-gray-700">
              Our approach is trauma-informed, person-centered, and focused on both immediate crisis support and 
              long-term healing and stability. We believe mental wellbeing is a crucial component of finding and 
              maintaining stable housing.
            </p>
          </div>
          <div className="lg:w-1/3 w-full">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Did You Know?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Up to 80% of people experiencing homelessness in the UK report having mental health issues</li>
                <li>• Many people become homeless after being discharged from mental health facilities without proper support</li>
                <li>• Depression and anxiety rates are significantly higher among homeless populations</li>
                <li>• Access to mental health services can dramatically improve housing outcomes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faHeartPulse} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Crisis Support</h3>
          <p className="text-gray-700 mb-4 text-center">
            Immediate help for those experiencing acute mental health distress while homeless.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>24/7 crisis telephone support</li>
            <li>Mobile outreach mental health teams</li>
            <li>Emergency psychiatric referrals</li>
            <li>Suicide prevention resources</li>
          </ul>
          <div className="text-center mt-6">
            <Link 
              href="/emergency" 
              className="inline-block px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
            >
              Get Crisis Help
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faBrain} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Therapeutic Services</h3>
          <p className="text-gray-700 mb-4 text-center">
            Ongoing mental health support through various therapeutic approaches.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Trauma-informed counselling</li>
            <li>CBT and DBT therapy</li>
            <li>Substance use support</li>
            <li>Medication management assistance</li>
          </ul>
          <div className="text-center mt-6">
            <Link 
              href="/mental-health-assessment" 
              className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Request Support
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faPeopleGroup} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Community Support</h3>
          <p className="text-gray-700 mb-4 text-center">
            Building connections and reducing isolation through peer support.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Weekly peer support groups</li>
            <li>Lived experience mentoring</li>
            <li>Creative therapy workshops</li>
            <li>Mental health cafés</li>
          </ul>
          <div className="text-center mt-6">
            <Link 
              href="/network" 
              className="inline-block px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-300"
            >
              Join a Group
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Specialized Mental Health Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="flex">
            <div className="mr-4 text-amber-500">
              <FontAwesomeIcon icon={faDog} className="text-4xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Service & Therapy Animals</h3>
              <p className="text-gray-700 mb-3">
                Our service dog program provides specially trained animals to support individuals with mental health 
                conditions. These dogs offer emotional support, stability, and can be trained to assist with specific 
                symptoms like anxiety attacks or PTSD triggers.
              </p>
              <Link 
                href="/service-dog-certification" 
                className="text-blue-600 hover:underline"
              >
                Learn more about our service dog program →
              </Link>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 text-purple-500">
              <FontAwesomeIcon icon={faHandHoldingHeart} className="text-4xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Trauma-Informed Care</h3>
              <p className="text-gray-700 mb-3">
                Our services recognize that many people experiencing homelessness have histories of trauma. 
                Our trauma-informed approach prioritizes safety, trustworthiness, choice, collaboration, and empowerment 
                in all interactions.
              </p>
              <Link 
                href="/resources" 
                className="text-blue-600 hover:underline"
              >
                Trauma recovery resources →
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="mr-4 text-green-500">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-4xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mental Health Assessment</h3>
              <p className="text-gray-700 mb-3">
                Our specialists can provide comprehensive mental health assessments to help identify conditions 
                that may be affecting you and develop appropriate support plans. These assessments can also 
                help with benefits applications.
              </p>
              <Link 
                href="/mental-health-assessment" 
                className="text-blue-600 hover:underline"
              >
                Schedule an assessment →
              </Link>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Self-Care Resources</h3>
            <p className="text-gray-700 mb-4">
              Even in difficult circumstances, small self-care practices can help maintain mental wellbeing:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Free mindfulness and meditation resources</li>
              <li>• Crisis grounding techniques</li>
              <li>• Sleep hygiene tips for shelter environments</li>
              <li>• Low-cost/no-cost mental health apps</li>
            </ul>
            <Link 
              href="/resources" 
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              Download self-care toolkit →
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Take a Mental Health Self-Assessment</h2>
        <p className="text-gray-700 mb-6">
          Wondering if you could benefit from mental health support? Our confidential self-assessment can help you 
          identify potential mental health concerns and direct you to appropriate resources. The assessment takes 
          approximately 5-10 minutes to complete.
        </p>
        <div className="text-center">
          <Link 
            href="/mental-health-assessment" 
            className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-300"
          >
            Start Self-Assessment
          </Link>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Contact Our Mental Health Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Get Support</h3>
            <p className="text-gray-700 mb-4">
              Our mental health specialists are available to provide guidance, support, and referrals to appropriate services.
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Mental Health Support:</strong> <a href="mailto:helpme@homeless.website" className="text-blue-600 hover:underline">helpme@homeless.website</a>
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Crisis Line:</strong> <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a>
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Service Dog Inquiries:</strong> <a href="mailto:dogs@homeless.website" className="text-blue-600 hover:underline">dogs@homeless.website</a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Emergency Mental Health Services</h3>
            <p className="text-gray-700 mb-4">
              If you or someone you know is experiencing a mental health emergency or having thoughts of suicide:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Call 999 for immediate danger</li>
              <li>Contact the Samaritans: 116 123 (free, 24/7)</li>
              <li>Text SHOUT to 85258 for crisis text support</li>
              <li>Visit your nearest A&E department</li>
            </ul>
            <Link
              href="/emergency"
              className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300"
            >
              Emergency Resources
            </Link>
          </div>
        </div>
      </div>
    </ModernTemplate>
  );
}
