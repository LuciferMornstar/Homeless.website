"use client";

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <ModernTemplate 
      title="About Homeless Helpers"
      subtitle="Our mission, vision, and the impact we make"
    >
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Who We Are</h2>
        <div className="flex flex-col lg:flex-row gap-8 items-center mb-8">
          <div className="lg:w-1/2 w-full">
            <p className="text-gray-700 mb-4">
              Homeless Helpers was established in 2020 in response to the rising homelessness crisis in the UK. 
              What began as a small group of volunteers providing food and essential items to those sleeping rough 
              has grown into a comprehensive support network addressing multiple aspects of homelessness.
            </p>
            <p className="text-gray-700 mb-4">
              Our approach is informed by lived experience, with several of our founding members having experienced 
              homelessness themselves. This personal understanding drives our commitment to providing practical, 
              dignified, and empathetic support to those in need.
            </p>
            <p className="text-gray-700">
              We operate on the principle that homelessness is not just about lacking physical shelter—it's often 
              the result of complex systemic issues, mental health challenges, and personal circumstances that require 
              holistic support solutions.
            </p>
          </div>
          <div className="lg:w-1/2 w-full relative h-64 lg:h-80">
            <Image
              src="/logo.png"
              alt="Homeless Helpers Team"
              fill
              className="rounded-lg object-contain"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-medium mb-2 text-blue-800">Dignity</h4>
              <p className="text-gray-700">
                We believe everyone deserves to be treated with respect and dignity regardless of their housing status.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-medium mb-2 text-blue-800">Empowerment</h4>
              <p className="text-gray-700">
                Our goal is to provide tools and resources that help people rebuild their lives independently.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="text-xl font-medium mb-2 text-blue-800">Compassion</h4>
              <p className="text-gray-700">
                We approach our work with understanding, patience, and genuine care for those we serve.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Our Impact</h2>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-700">People Assisted</p>
              <p className="text-blue-600 font-bold">5,200+</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-700">Shelter Placements</p>
              <p className="text-blue-600 font-bold">1,800+</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-700">Mental Health Sessions</p>
              <p className="text-blue-600 font-bold">10,000+</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-700">Service Dogs Placed</p>
              <p className="text-blue-600 font-bold">450+</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-gray-700">Housing Secured</p>
              <p className="text-blue-600 font-bold">950+</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-6">Data represents our impact since 2020</p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Our Approach</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mt-0.5">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Immediate Relief</h3>
                <p className="text-gray-700">
                  Providing essential services like shelter referrals, food, clothing, and emergency assistance to meet urgent needs.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mt-0.5">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Mental Health Support</h3>
                <p className="text-gray-700">
                  Offering specialized mental health resources, including trauma-informed counseling and therapy animal programs.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mt-0.5">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Skills Development</h3>
                <p className="text-gray-700">
                  Developing practical skills through workshops, employment assistance, and digital literacy training.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mt-0.5">
                4
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Stable Housing Pathways</h3>
                <p className="text-gray-700">
                  Creating routes to long-term housing through advocacy, guidance on housing benefits, and landlord partnerships.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mt-0.5">
                5
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-1 text-gray-800">Community Integration</h3>
                <p className="text-gray-700">
                  Building support networks and community connections to prevent isolation and promote lasting stability.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">Our Team</h2>
        <p className="text-gray-700 mb-8">
          Our dedicated team consists of experienced professionals, volunteers with diverse backgrounds, and individuals with lived 
          experience of homelessness. This combination of perspectives allows us to provide informed, empathetic, and effective support.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full mb-4 relative overflow-hidden">
              {/* Replace with actual team member image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">Photo</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Emma Thompson</h3>
            <p className="text-gray-600">Founder & Director</p>
          </div>
          <div className="text-center">
            <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full mb-4 relative overflow-hidden">
              {/* Replace with actual team member image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">Photo</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">James Wilson</h3>
            <p className="text-gray-600">Mental Health Specialist</p>
          </div>
          <div className="text-center">
            <div className="w-40 h-40 mx-auto bg-gray-200 rounded-full mb-4 relative overflow-hidden">
              {/* Replace with actual team member image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">Photo</div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Sarah Ahmed</h3>
            <p className="text-gray-600">Housing Coordinator</p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link
            href="/volunteer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Join Our Team
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg shadow-md">
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
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Vision</h3>
            <p className="text-gray-700 mb-4">
              We envision a future where everyone has access to safe, stable housing and the support they need to thrive. 
              Until that vision is realized, we're committed to being a lifeline for those experiencing homelessness 
              and advocating for systemic change.
            </p>
            <p className="text-gray-700 mb-4">
              If you share our vision and want to make a difference, we'd love to hear from you.
            </p>
            <Link
              href="/volunteer"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </div>
    </ModernTemplate>
  );
}
