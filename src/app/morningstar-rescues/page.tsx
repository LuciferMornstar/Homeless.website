"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

export default function MorningstarRescuesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Menu />
      
      <main className="container mx-auto max-w-4xl px-4 py-10">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-blue-800">Morningstar Rescues</h1>
          <p className="text-xl text-gray-700 mb-6">
            Specialising in Rescuing and Training Dachshunds & Small Breeds as Service and Assistance Dogs
          </p>
          <div className="w-20 h-1 bg-red-600 mx-auto mb-8"></div>
        </header>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At Morningstar Rescues, our goal is to create useful, loving forever homes for everyone—including dogs. 
            We rescue dachshunds and other small breeds, providing them with a second chance and a meaningful role as service or assistance dogs.
          </p>
          <p className="text-gray-700">
            We believe that rescue dogs can become vital companions for individuals experiencing homelessness or mental health challenges, 
            offering emotional support and stability during difficult times.
          </p>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Service Dog Training Scheme</h2>
          <p className="text-gray-700 mb-4">
            We offer a specialised training program that prepares our rescued dogs to become service and assistance animals. 
            Our training focuses on:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700 space-y-2">
            <li>General service and assistance skills</li>
            <li>Emotional support and companionship</li>
            <li>Mental health support - helping with anxiety, depression, and PTSD</li>
            <li>Protection training for vulnerable individuals</li>
            <li>Specialised support for people experiencing homelessness</li>
          </ul>
          <div className="mt-6 p-4 bg-blue-50 rounded-md border-l-4 border-blue-500">
            <p className="text-gray-700 italic">
              Our dogs are specifically trained to help individuals navigate the challenges of homelessness and mental health issues, 
              providing emotional stability and practical assistance in difficult living situations.
            </p>
          </div>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">How to Apply</h2>
          <p className="text-gray-700 mb-4">
            If you or someone you know could benefit from a service or assistance dog, or if you wish to support our mission, 
            please contact us for more information about our application process and eligibility criteria.
          </p>
          <p className="text-gray-700 mb-4">
            We have specific programs designed for individuals experiencing homelessness or housing insecurity, 
            with accommodation options available for both the person and their service animal.
          </p>
          <div className="mt-6 bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-500">
            <h3 className="font-medium text-gray-800 mb-2">Priority Application</h3>
            <p className="text-gray-700">
              We prioritize applications from individuals facing homelessness, mental health challenges, 
              and those in emergency housing situations. Our aim is to provide support when it's needed most.
            </p>
          </div>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Contact Us</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 text-gray-800">General Inquiries</h3>
              <p className="text-gray-700 mb-1">Email: <a href="mailto:dogs@homeless.website" className="text-blue-600 underline">dogs@homeless.website</a></p>
              <p className="text-gray-700 mb-1">Phone: <a href="tel:+447853811172" className="text-blue-600">+44 7853 811172</a></p>
              <p className="text-gray-700 mb-4">Follow us: <a href="https://www.facebook.com/homelesshelpuk" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Facebook</a></p>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Emergency Assistance</h3>
              <p className="text-gray-700 mb-1">For urgent help: <a href="mailto:helpme@homeless.website" className="text-blue-600 underline">helpme@homeless.website</a></p>
              <p className="text-gray-700 mb-4">Information: <a href="mailto:info@homeless.website" className="text-blue-600 underline">info@homeless.website</a></p>
            </div>
          </div>
        </section>

        <section className="mb-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Volunteer Opportunities</h2>
          <p className="text-gray-700 mb-4">
            We are always looking for passionate volunteers to help with dog training, fostering, fundraising, and outreach 
            to homeless communities. If you're interested in making a difference, please get in touch.
          </p>
          <div className="text-center mt-6">
            <Link href="/volunteer" className="inline-block px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition duration-300">
              Become a Volunteer
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
