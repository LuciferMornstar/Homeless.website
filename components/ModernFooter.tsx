// Modern Footer React Component (from modern-footer.html)
import React from 'react';
import Link from 'next/link';

export default function ModernFooter() {
  return (
    <footer className="modern-footer bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <div className="footer-logo mb-2"><img src="/logo.png" alt="Homeless Helpers" height={40} /></div>
          <p>Providing support, resources and hope to those facing homelessness.<br />
            <span className="font-semibold">Contact us:</span> <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> | <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a> | <a href="mailto:volunteer@homeless.website" className="underline">volunteer@homeless.website</a> | <a href="mailto:info@homeless.website" className="underline">info@homeless.website</a> | <a href="tel:+447853811172" className="underline">+44 7853 811172</a>
          </p>
          <div className="social-links flex gap-3 mt-2">
            <a href="https://www.facebook.com/homelesshelpuk" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter" /></a>
            <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram" /></a>
          </div>
        </div>
        <div>
          <h4 className="text-xl mb-2">Quick Links</h4>
          <ul className="footer-nav space-y-1">
            <li><Link href="/shelters" className="footer-nav-link underline">Find Shelters</Link></li>
            <li><Link href="/foodbanks" className="footer-nav-link underline">Food Banks</Link></li>
            <li><Link href="/healthcare" className="footer-nav-link underline">Healthcare</Link></li>
            <li><Link href="/employment" className="footer-nav-link underline">Employment</Link></li>
            <li><Link href="/resources" className="footer-nav-link underline">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl mb-2">Contact Us</h4>
          <ul className="footer-nav space-y-1">
            <li><i className="fas fa-envelope" /> helpme@homeless.website</li>
            <li><i className="fas fa-envelope" /> dogs@homeless.website</li>
            <li><i className="fas fa-envelope" /> volunteer@homeless.website</li>
            <li><i className="fas fa-envelope" /> info@homeless.website</li>
            <li><i className="fas fa-phone" /> Emergency: +44 7853 811172</li>
            <li><i className="fas fa-map-marker-alt" /> We're online 24/7</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom text-center mt-6 text-sm">
        <p>&copy; 2025 Homeless Helpers. All rights reserved. | <Link href="/siteindex" className="underline">Site Index</Link> | <a href="#" className="underline">Privacy Policy</a></p>
      </div>
    </footer>
  );
}