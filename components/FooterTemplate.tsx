// Footer Template React Component (from footer-template.html)
import React from 'react';

export default function FooterTemplate() {
  return (
    <footer className="bg-[#06454b] py-8 text-white text-center border-t-4 border-yellow-400">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-6 text-left">
          <div>
            <h3 className="text-xl mb-2 font-bold">General Inquiries</h3>
            <p><strong>Email:</strong> <a href="mailto:info@homeless.website" className="text-white underline">info@homeless.website</a></p>
            <p><strong>Phone/Text/WhatsApp:</strong> <a href="tel:+447853811172" className="text-white underline">+44 7853 811172</a></p>
          </div>
          <div>
            <h3 className="text-xl mb-2 font-bold">Help & Support</h3>
            <p><strong>Email:</strong> <a href="mailto:helpme@homeless.website" className="text-white underline">helpme@homeless.website</a></p>
            <p><strong>For urgent help, mental health, or emergencies, contact us any time.</strong></p>
          </div>
          <div>
            <h3 className="text-xl mb-2 font-bold">Service Dogs</h3>
            <p><strong>Email:</strong> <a href="mailto:dogs@homeless.website" className="text-white underline">dogs@homeless.website</a></p>
            <p><strong>Support for people with service dogs and pet-friendly resources.</strong></p>
          </div>
          <div>
            <h3 className="text-xl mb-2 font-bold">Volunteer</h3>
            <p><strong>Email:</strong> <a href="mailto:volunteer@homeless.website" className="text-white underline">volunteer@homeless.website</a></p>
            <p><strong>Facebook:</strong> <a href="https://www.facebook.com/homelesshelpuk" className="text-white underline" target="_blank" rel="noopener noreferrer">facebook.com/homelesshelpuk</a></p>
          </div>
        </div>
        <div className="mt-6 text-xs text-gray-200 text-center">
          <p>&copy; 2025 Homeless Helpers. All rights reserved. Registered Charity No. 1234567</p>
          <p>This website is based on British law. All information is for guidance only and does not constitute legal advice.</p>
        </div>
      </div>
    </footer>
  );
}