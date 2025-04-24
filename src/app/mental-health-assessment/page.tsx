import React from 'react';
import MentalHealthAssessment from '@/components/MentalHealthAssessment';

export const metadata = {
  title: 'Mental Health Assessment | Homeless Helpers',
  description: 'Complete a confidential mental health assessment to receive personalized resources and support for your situation.',
};

export default function MentalHealthAssessmentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Mental Health Self-Assessment</h1>
        <p className="text-gray-600 mb-8">
          This confidential assessment helps identify potential mental health concerns and connects you with appropriate resources.
          Your responses are private and will only be used to provide personalized recommendations.
        </p>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Important:</strong> This is not a diagnostic tool. If you're experiencing a mental health crisis, please call 999, 
                the Samaritans at 116 123 (24/7, free), or the Mental Health Crisis Line at 111, option 2.
              </p>
            </div>
          </div>
        </div>
        
        <MentalHealthAssessment />
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Why Mental Health Matters When Facing Homelessness</h2>
          <p className="mb-4">
            Mental health and homelessness often affect each other. The stress of homelessness can worsen existing 
            mental health conditions or lead to new ones, while mental health challenges can make it harder to maintain housing.
          </p>
          <p className="mb-4">
            Taking care of your mental wellbeing is a crucial step in breaking the cycle. Even small steps toward better mental 
            health can improve your quality of life and help you access the resources you need.
          </p>
          <p>
            Remember that seeking help is a sign of strength, not weakness. Everyone deserves support during difficult times.
          </p>
        </div>
      </div>
    </div>
  );
}
