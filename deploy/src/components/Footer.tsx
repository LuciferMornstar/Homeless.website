import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#06454b] py-8 text-white text-center border-t-4 border-red-200 mt-10">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-left">
        <div>
          <h3 className="text-xl font-bold mb-2">Contact & Support</h3>
          <p className="mb-1"><strong>Email:</strong> <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a></p>
          <p className="mb-1"><strong>Dogs:</strong> <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a></p>
          <p className="mb-1"><strong>Volunteer:</strong> <a href="mailto:volunteer@homeless.website" className="underline">volunteer@homeless.website</a></p>
          <p className="mb-1"><strong>Info:</strong> <a href="mailto:info@homeless.website" className="underline">info@homeless.website</a></p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Phone & Social</h3>
          <p className="mb-1"><strong>Phone/Text/WhatsApp/iMessage:</strong> <a href="tel:+447853811172" className="underline">+44 7853 811172</a></p>
          <p className="mb-1"><strong>Facebook:</strong> <a href="https://www.facebook.com/homelesshelpuk" className="underline" target="_blank" rel="noopener noreferrer">homelesshelpuk</a></p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Mission</h3>
          <p className="mb-1">Helping the homeless across the UK, with a focus on mental health and service dogs.</p>
          <p className="mb-1">All information is based on British law.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/get-help" className="underline">Get Help</Link></li>
            <li><Link href="/mental-health" className="underline">Mental Health</Link></li>
            <li><Link href="/service-dog-certification" className="underline">Service Dogs</Link></li>
            <li><Link href="/volunteer" className="underline">Volunteer</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-sm text-gray-200">&copy; 2025 Homeless Helpers. All rights reserved. <span className="block">Website by Morningstar Rescues</span></div>
    </footer>
  );
}
