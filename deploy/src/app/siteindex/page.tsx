import React from 'react';
import Link from 'next/link';

const siteLinks = [
  { href: '/about', label: 'About' },
  { href: '/addictions', label: 'Addictions' },
  { href: '/dog-profile', label: 'Dog Profile' },
  { href: '/emergency', label: 'Emergency' },
  { href: '/employment', label: 'Employment' },
  { href: '/foodbanks', label: 'Food Banks' },
  { href: '/footer-template', label: 'Footer Template' },
  { href: '/get-help', label: 'Get Help' },
  { href: '/healthcare', label: 'Healthcare' },
  { href: '/helpfulbot', label: 'Helpful Bot' },
  { href: '/hhchan', label: 'HHChan' },
  { href: '/', label: 'Home' },
  { href: '/interview', label: 'Interview' },
  { href: '/Landingpage', label: 'Landing Page' },
  { href: '/lettermaker', label: 'Letter Maker' },
  { href: '/menu', label: 'Menu' },
  { href: '/mental-health-assessment', label: 'Mental Health Assessment' },
  { href: '/modern-footer', label: 'Modern Footer' },
  { href: '/modern-template', label: 'Modern Template' },
  { href: '/morningstar-rescues', label: 'Morningstar Rescues' },
  { href: '/network', label: 'Network' },
  { href: '/post-housing', label: 'After Housing' },
  { href: '/resources', label: 'Resources' },
  { href: '/shelters', label: 'Shelters' },
  { href: '/siteindex', label: 'Site Index' },
  { href: '/SRForm1', label: 'Self‑Referral Form' },
  { href: '/traderai', label: 'Trader AI' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/welcome', label: 'Welcome' },
  { href: '/protection-dogs', label: 'Protection Dogs' },
  { href: '/reportdogbreach', label: 'Report Dog Breach' },
  { href: '/service-dog-certification', label: 'Service Dog Certification' },
  { href: '/service-dog-certification-frankie', label: 'Service Dog Certification Frankie' },
  { href: '/verify-assistance-dog', label: 'Verify Assistance Dog' },
];

export default function SiteIndexPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Site Index</h1>
        <p className="mb-4">Navigate through all resources and tools for homeless people in the UK, including mental health support. All information is based on British law and HHR rules.</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {siteLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="block bg-white rounded shadow p-4 hover:bg-gray-100 transition">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Contact: <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> | <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a> | <a href="mailto:volunteer@homeless.website" className="underline">volunteer@homeless.website</a> | <a href="mailto:info@homeless.website" className="underline">info@homeless.website</a> | <a href="tel:+447853811172" className="underline">+44 7853 811172</a></p>
          <p>Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="underline">homelesshelpuk</a></p>
        </div>
      </div>
    </div>
  );
}
