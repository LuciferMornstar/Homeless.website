"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';

interface ModernTemplateProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHero?: boolean;
  showCta?: boolean;
}

export default function ModernTemplate({
  children,
  title = "Support for Those Facing Homelessness",
  subtitle = "Find resources, support and community to help you through difficult times",
  showHero = true,
  showCta = true
}: ModernTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Menu />
      
      {showHero && (
        <section className="relative bg-blue-900 text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-50"></div>
          <div className="container mx-auto max-w-5xl px-4 relative z-10">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4 animate-fade-in-up">{title}</h1>
              <p className="text-xl mb-8 animate-fade-in-up">{subtitle}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
                <Link 
                  href="/get-help" 
                  className="px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300"
                >
                  Get Help Now
                </Link>
                <Link 
                  href="/resources" 
                  className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-900 transition duration-300"
                >
                  View Resources
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="container mx-auto max-w-5xl px-4 py-10">
        {children}
      </main>

      {showCta && (
        <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Right Now?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our resources are available 24/7. If you&apos;re in an emergency situation, don&apos;t wait - get help immediately.
            </p>
            <Link 
              href="/emergency" 
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 inline-block"
            >
              Emergency Help
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
