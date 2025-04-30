'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Service Dog Certification - Frankie</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                <Image
                  src="/public/Assets/Frankie.jpg"
                  alt="Frankie - Service Dog"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-2xl font-semibold mb-4">Certification Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Dog Name:</p>
                  <p className="font-medium">Frankie</p>
                </div>
                <div>
                  <p className="text-gray-600">Certification Type:</p>
                  <p className="font-medium">Full Service Dog</p>
                </div>
                <div>
                  <p className="text-gray-600">Specializations:</p>
                  <ul className="list-disc list-inside font-medium">
                    <li>Psychiatric Support</li>
                    <li>Medical Alert</li>
                    <li>Mobility Assistance</li>
                  </ul>
                </div>
                <div>
                  <p className="text-gray-600">Certification Date:</p>
                  <p className="font-medium">January 15, 2023</p>
                </div>
                <div>
                  <p className="text-gray-600">Certification Status:</p>
                  <p className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Training History</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Basic Obedience Training</p>
              <p className="text-gray-600">Completed: March 2022</p>
              <p className="text-sm text-gray-500">Mastery of essential commands and public behavior</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Psychiatric Support Training</p>
              <p className="text-gray-600">Completed: July 2022</p>
              <p className="text-sm text-gray-500">Specialized in anxiety response and grounding techniques</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Medical Alert Training</p>
              <p className="text-gray-600">Completed: October 2022</p>
              <p className="text-sm text-gray-500">Trained for specific medical condition alerts</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-medium">Public Access Training</p>
              <p className="text-gray-600">Completed: December 2022</p>
              <p className="text-sm text-gray-500">Advanced public behavior and task performance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Service Tasks</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Psychiatric Support</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Deep pressure therapy</li>
                <li>Anxiety interruption</li>
                <li>Grounding support</li>
                <li>PTSD episode response</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Medical Alert</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Blood sugar level alerts</li>
                <li>Seizure detection</li>
                <li>Medication reminders</li>
                <li>Medical assistance alerts</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Mobility Assistance</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Balance support</li>
                <li>Item retrieval</li>
                <li>Door operation</li>
                <li>Light switch operation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Public Access Skills</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Calm behavior in public</li>
                <li>Ignore distractions</li>
                <li>Navigate crowds</li>
                <li>Public transport etiquette</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            For more information about our service dog certification program:
          </p>
          <Link 
            href="/service-dog-certification"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Learn More About Certification
          </Link>
        </div>
      </main>
    </div>
  );
}
