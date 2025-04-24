import React, { useState } from 'react';
import Link from 'next/link';

const menuLinks = [
  { href: '/about', label: 'About' },
  { href: '/arbibot', label: 'ArbiBot' },
  { href: '/dog-profile', label: 'Dog Profile' },
  { href: '/employment', label: 'Employment' },
  { href: '/emergency', label: 'Emergency' },
  { href: '/foodbanks', label: 'Food Banks' },
  { href: '/healthcare', label: 'Healthcare' },
  { href: '/get-help', label: 'Get Help' },
  { href: '/helpfulbot', label: 'HelpfulBot' },
  { href: '/', label: 'Home' },
  { href: '/interview', label: 'Interview' },
  { href: '/Landing-1', label: 'Landing 1' },
  { href: '/Landing-2', label: 'Landing 2' },
  { href: '/lettermaker', label: 'Lettermaker' },
  { href: '/morningstar-rescues', label: 'Morningstar Rescues' },
  { href: '/network', label: 'Network' },
  { href: '/post-housing', label: 'Post Housing' },
  { href: '/protection-dogs', label: 'Protection Dogs' },
  { href: '/resources', label: 'Resources' },
  { href: '/service-dog-certification', label: 'Service Dog Certification' },
  { href: '/service-dog-certification-frankie', label: 'Service Dog Certification Frankie' },
  { href: '/shelters', label: 'Shelters' },
  { href: '/siteindex', label: 'Site Index' },
  { href: '/SRForm1', label: 'SR Form' },
  { href: '/verify-assistance-dog', label: 'Verify Assistance Dog' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/welcome', label: 'Welcome' },
];

export default function MenuPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-700">Morningstar Rescues</Link>
          <button
            className="text-gray-700 md:hidden focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
          >
            <i className="fas fa-bars fa-lg" />
          </button>
          <ul className={`${open ? '' : 'hidden'} md:flex md:space-x-6 text-gray-700`} id="navMenu">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-red-700 block py-2 px-2">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-4">Menu</h1>
        <p className="mb-6">Navigate to any section of the site using the menu above. If you need urgent help, email <a href="mailto:helpme@homeless.website" className="underline text-blue-700">helpme@homeless.website</a> or call <a href="tel:+447853811172" className="underline text-blue-700">+44 7853 811172</a>.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {menuLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block bg-gray-50 rounded shadow p-4 hover:bg-gray-100 transition">
              <span className="font-semibold text-lg">{link.label}</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
