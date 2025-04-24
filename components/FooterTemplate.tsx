// Footer Template React Component (from footer-template.html)
import React from 'react';

export default function FooterTemplate() {
  return (
    <footer className="bg-[#06454b] py-6 text-white text-center">
      <p>&copy; 2025 Homeless Helpers. All rights reserved.</p>
      <p>Registered Charity No. 1234567</p>
      <div className="mt-4 grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left px-4">
        <div>
          <h3 className="text-xl mb-2">General Inquiries</h3>
          <p><strong>Email:</strong> <a href="mailto:helpme@homeless.website" className="text-white underline">helpme@homeless.website</a></p>
          <p><strong>Phone:</strong> <a href="tel:+447853811172" className="text-white underline">+44 7853 811172</a></p>
        </div>
        <div>
          <h3 className="text-xl mb-2">Volunteer</h3>
          <p><strong>Email:</strong> <a href="mailto:volunteer@homeless.website" className="text-white underline">volunteer@homeless.website</a></p>
          <p><strong>Facebook:</strong> <a href="https://www.facebook.com/homelesshelpuk" className="text-white underline" target="_blank" rel="noopener noreferrer">homelesshelpuk</a></p>
        </div>
        <div>
          <h3 className="text-xl mb-2">Service Dogs</h3>
          <p><strong>Email:</strong> <a href="mailto:dogs@homeless.website" className="text-white underline">dogs@homeless.website</a></p>
          <p><strong>Info:</strong> <a href="mailto:info@homeless.website" className="text-white underline">info@homeless.website</a></p>
        </div>
      </div>
    </footer>
  );
}