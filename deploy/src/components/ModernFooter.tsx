// Modern Footer React Component (from modern-footer.html)
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ModernFooter() {
  return (
    <footer className="modern-footer bg-gray-900 text-white py-10 mt-8 border-t-4 border-yellow-400">
      <div className="container mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="footer-logo mb-2">
            <Image src="/logo.png" alt="Homeless Helpers" width={40} height={40} />
          </div>
          <p className="mb-2">Providing support, resources and hope to those facing homelessness in the UK.</p>
          <div className="social-links flex gap-3 mt-2">
            <a href="https://www.facebook.com/homelesshelpuk" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-xl mb-2 font-bold">Quick Links</h4>
          <ul className="footer-nav space-y-1">
            <li><Link href="/shelters" className="footer-nav-link underline">Find Shelters</Link></li>
            <li><Link href="/foodbanks" className="footer-nav-link underline">Food Banks</Link></li>
            <li><Link href="/mental-health" className="footer-nav-link underline">Mental Health</Link></li>
            <li><Link href="/service-dog-certification" className="footer-nav-link underline">Service Dog Support</Link></li>
            <li><Link href="/emergency" className="footer-nav-link underline">Emergency Help</Link></li>
            <li><Link href="/resources" className="footer-nav-link underline">All Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl mb-2 font-bold">Contact & Support</h4>
          <ul className="footer-nav space-y-1">
            <li><span className="font-semibold">Help & Support:</span> <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a></li>
            <li><span className="font-semibold">Dog Support:</span> <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a></li>
            <li><span className="font-semibold">Volunteer:</span> <a href="mailto:volunteer@homeless.website" className="underline">volunteer@homeless.website</a></li>
            <li><span className="font-semibold">General Info:</span> <a href="mailto:info@homeless.website" className="underline">info@homeless.website</a></li>
            <li><span className="font-semibold">Phone/Text/WhatsApp:</span> <a href="tel:+447853811172" className="underline">+44 7853 811172</a></li>
            <li><span className="font-semibold">Facebook:</span> <a href="https://www.facebook.com/homelesshelpuk" className="underline" target="_blank" rel="noopener noreferrer">facebook.com/homelesshelpuk</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl mb-2 font-bold">Mental Health & Emergency</h4>
          <p className="mb-2">If you are struggling with your mental health or in crisis, please reach out. We are here to help, and you are not alone.</p>
          <ul className="footer-nav space-y-1">
            <li><Link href="/mental-health-resources" className="footer-nav-link underline">Mental Health Resources</Link></li>
            <li><Link href="/emergency" className="footer-nav-link underline">Emergency Contacts</Link></li>
            <li><span className="font-semibold">Immediate Help:</span> <a href="tel:+447853811172" className="underline">+44 7853 811172</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center mt-8 text-xs text-gray-300">
        <p>&copy; 2025 Homeless Helpers. All rights reserved. Registered Charity No. 1234567</p>
        <p>This website is based on British law. All information is for guidance only and does not constitute legal advice.</p>
        <p>
          <Link href="/siteindex" className="underline">Site Index</Link> | 
          <Link href="/privacy-policy" className="underline ml-2 mr-2">Privacy Policy</Link> | 
          <Link href="/terms-of-service" className="underline mr-2">Terms of Service</Link> | 
          <Link href="/accessibility" className="underline">Accessibility</Link>
        </p>
      </div>
    </footer>
  );
}