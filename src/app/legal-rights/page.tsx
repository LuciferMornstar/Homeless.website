"use client";

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faHome, faFileAlt, faHandshake, faIdCard, faUserTie } from '@fortawesome/free-solid-svg-icons';

export default function LegalRightsPage() {
  return (
    <ModernTemplate 
      title="Your Legal Rights"
      subtitle="Understanding your rights when facing homelessness in the UK"
    >
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Legal Rights When Facing Homelessness</h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
          <div className="lg:w-2/3 w-full">
            <p className="text-gray-700 mb-4">
              In the United Kingdom, individuals facing homelessness have specific legal rights protected by law. 
              Understanding these rights is crucial for accessing the support and services you're entitled to receive.
            </p>
            <p className="text-gray-700 mb-4">
              The Housing Act 1996, as amended by the Homelessness Reduction Act 2017, provides a framework of rights 
              designed to prevent homelessness and support those already experiencing it. Local authorities have 
              legal duties to assist you, depending on your circumstances.
            </p>
            <p className="text-gray-700">
              This page outlines your key legal rights and explains how to exercise them effectively when dealing with 
              local councils, support services, and other institutions.
            </p>
          </div>
          <div className="lg:w-1/3 w-full">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Important Note</h3>
              <p className="text-gray-700 mb-2">
                The information on this page is based on laws applicable in England and Wales. Scotland and Northern Ireland 
                have different legal frameworks for homelessness.
              </p>
              <p className="text-gray-700">
                Laws and policies change frequently. This information was last updated in April 2025.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-amber-100 text-amber-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faHome} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Housing Assistance</h3>
          <p className="text-gray-700 mb-4 text-center">
            Your right to assistance from local authorities when homeless or threatened with homelessness.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Councils must assess anyone who approaches them as homeless</li>
            <li>56-day prevention duty to those threatened with homelessness</li>
            <li>56-day relief duty to help secure accommodation</li>
            <li>Temporary accommodation requirements for priority need cases</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faFileAlt} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Personalised Housing Plans</h3>
          <p className="text-gray-700 mb-4 text-center">
            Your right to a tailored plan to address your housing situation.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Assessment of your housing needs and circumstances</li>
            <li>Written plan with reasonable steps for both you and the council</li>
            <li>Regular reviews of the plan's effectiveness</li>
            <li>Right to request a review if you disagree with the plan</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="w-16 h-16 flex items-center justify-center bg-red-100 text-red-600 rounded-full mb-4 mx-auto">
            <FontAwesomeIcon icon={faBalanceScale} className="text-2xl" />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">Right to Challenge Decisions</h3>
          <p className="text-gray-700 mb-4 text-center">
            Your right to appeal council decisions about your homelessness application.
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>21 days to request a review of most decisions</li>
            <li>Right to remain in temporary accommodation during review</li>
            <li>Option to appeal to county court on point of law</li>
            <li>Access to free legal advice through legal aid</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Priority Need Categories</h2>
        
        <p className="text-gray-700 mb-6">
          Under UK homelessness legislation, some individuals have "priority need" status, which entitles them to 
          enhanced support, including temporary accommodation. You may be in priority need if:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>You have dependent children living with you</li>
            <li>You are pregnant</li>
            <li>You are vulnerable due to old age</li>
            <li>You are vulnerable due to physical disability</li>
            <li>You are vulnerable due to mental illness or disability</li>
            <li>You are fleeing domestic abuse</li>
          </ul>
          
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
            <li>You are vulnerable as a result of time spent in care</li>
            <li>You are vulnerable as a result of time spent in the armed forces</li>
            <li>You are vulnerable as a result of time spent in prison</li>
            <li>You are vulnerable because you're fleeing violence or threats</li>
            <li>You are 16-17 years old</li>
            <li>You are 18-20 years old and were previously in care</li>
          </ul>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Vulnerability Test</h3>
          <p className="text-gray-700">
            For many of the above categories, councils apply a "vulnerability test" – they assess whether you are 
            "significantly more vulnerable than an ordinary person would be if they became homeless." 
            This can be difficult to prove, but our templates and guidance can help you make your case effectively.
          </p>
        </div>

        <Link 
          href="/lettermaker" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
        >
          Create Supporting Letters
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">How to Apply as Homeless</h3>
          <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Contact your local council's housing department</strong> – in person, by phone, or online.</li>
            <li><strong>Request a homelessness assessment</strong> – be clear that you are homeless or at risk of homelessness.</li>
            <li><strong>Attend the assessment interview</strong> – bring any relevant documents and evidence.</li>
            <li><strong>Receive your Personalised Housing Plan</strong> – review it carefully and discuss any concerns.</li>
            <li><strong>Follow the steps in your plan</strong> – keep records of all actions you take.</li>
            <li><strong>Request temporary accommodation</strong> if you believe you have priority need.</li>
            <li><strong>Challenge any decisions</strong> you disagree with within 21 days.</li>
          </ol>
          
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div className="mr-4">
              <FontAwesomeIcon icon={faIdCard} className="text-3xl text-blue-600" />
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Prepare for your assessment:</strong> Use our assessment preparation guide to help you gather 
                the right evidence and make the strongest case possible.
              </p>
              <Link href="/resources#assessment-guide" className="text-blue-600 hover:underline">
                View Assessment Guide →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Legal Help and Representation</h3>
          
          <p className="text-gray-700 mb-4">
            If you need legal advice or representation for your homelessness case, several options are available:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li><strong>Shelter's helpline:</strong> 0808 800 4444 (free, available 8am-8pm weekdays, 9am-5pm weekends)</li>
            <li><strong>Citizens Advice Bureau:</strong> Free advice on housing and benefits</li>
            <li><strong>Law Centres:</strong> Not-for-profit legal advice centers for those who cannot afford a lawyer</li>
            <li><strong>Legal Aid:</strong> Government funding for legal advice if you meet income criteria</li>
            <li><strong>Housing solicitors:</strong> Specialists in housing law (some offer free initial consultations)</li>
          </ul>
          
          <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
            <div className="mr-4">
              <FontAwesomeIcon icon={faUserTie} className="text-3xl text-blue-600" />
            </div>
            <div>
              <p className="text-gray-700">
                <strong>Need legal representation?</strong> Our database can help you find solicitors in your area who specialize 
                in homelessness and housing law.
              </p>
              <Link href="/resources#legal-help" className="text-blue-600 hover:underline">
                Find Legal Help →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Challenging Council Decisions</h2>
        
        <p className="text-gray-700 mb-6">
          If the council makes a decision about your homelessness application that you disagree with, you have the right 
          to challenge it. Common decisions that can be challenged include:
        </p>
        
        <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
          <li>That you are not homeless or threatened with homelessness</li>
          <li>That you are intentionally homeless</li>
          <li>That you have no local connection to the area</li>
          <li>That you are not in priority need</li>
          <li>The suitability of accommodation offered to you</li>
          <li>That you have not cooperated with your Personalised Housing Plan</li>
        </ul>
        
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-blue-800">How to Request a Review</h3>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            <li>Make your request in writing within 21 days of being notified of the decision</li>
            <li>Clearly state which decision you're challenging and why you think it's wrong</li>
            <li>Include any new evidence that supports your case</li>
            <li>Ask for temporary accommodation to continue during the review if applicable</li>
            <li>Consider getting legal advice to help with your review</li>
          </ol>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="mr-4">
            <FontAwesomeIcon icon={faHandshake} className="text-4xl text-blue-600" />
          </div>
          <div>
            <p className="text-gray-700 mb-4">
              <strong>Need help with your review?</strong> Our letter templates can help you draft an effective 
              review request letter to challenge council decisions.
            </p>
            <Link 
              href="/lettermaker" 
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create Review Request Letter
            </Link>
          </div>
        </div>
      </div>
    </ModernTemplate>
  );
}
