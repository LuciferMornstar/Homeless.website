import React from 'react';
import LetterGenerator from '@/components/LetterGenerator';
import Link from 'next/link';

export const metadata = {
  title: 'Letter Maker | Homeless Helpers',
  description: 'Create professional letters for housing, benefits, or legal matters with our easy-to-use letter generator.',
};

export default function LetterMakerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Letter Maker Tool</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Create professional letters for housing applications, benefit claims, council communications, 
          complaints, healthcare access, and more. Our templates are designed to help you communicate effectively 
          with officials and service providers.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Why formal letters matter:</strong> Written communication provides a record of your requests and shows 
                you're taking matters seriously. Most official processes in the UK require formal written requests or applications.
              </p>
            </div>
          </div>
        </div>
        
        <LetterGenerator />
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Understanding Your Rights</h2>
          <p className="mb-4">
            Under UK law, you have specific rights related to housing, benefits, healthcare, and more. Understanding 
            these rights can help you craft more effective letters:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Housing:</strong> Local authorities have a duty to provide advice and assistance to homeless people 
              or those threatened with homelessness under the Homelessness Reduction Act 2017.
            </li>
            <li>
              <strong>Benefits:</strong> You have the right to appeal decisions about your benefits within one month of the decision.
            </li>
            <li>
              <strong>Healthcare:</strong> GP practices cannot refuse to register someone because they are homeless, do not have proof 
              of address, or because of their immigration status.
            </li>
            <li>
              <strong>Discrimination:</strong> The Equality Act 2010 protects you from discrimination based on protected characteristics, 
              including disability (which can include mental health conditions).
            </li>
          </ul>
          <p>
            For more detailed information on your rights, visit our <Link href="/legal-rights" className="text-red-700 hover:underline">Legal Rights</Link> section.
          </p>
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Need Further Assistance?</h2>
          <p className="mb-4">
            If you need help with your specific situation or would like someone to review your letter before you send it, 
            our team is available to assist you:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email: <a href="mailto:helpme@homeless.website" className="text-red-700 hover:underline">helpme@homeless.website</a></li>
            <li>Phone, text, or WhatsApp: <a href="tel:+447853811172" className="text-red-700 hover:underline">+44 7853 811172</a></li>
            <li>Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="text-red-700 hover:underline" target="_blank" rel="noopener noreferrer">www.facebook.com/homelesshelpuk</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
