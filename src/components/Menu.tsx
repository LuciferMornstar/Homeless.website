import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
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
  { href: '/lettermaker', label: 'Lettermaker' },
  { href: '/mental-health', label: 'Mental Health' },
  { href: '/morningstar-rescues', label: 'Morningstar Rescues' },
  { href: '/network', label: 'Network' },
  { href: '/post-housing', label: 'Post Housing' },
  { href: '/protection-dogs', label: 'Protection Dogs' },
  { href: '/resources', label: 'Resources' },
  { href: '/service-dog-certification', label: 'Service Dog Certification' },
  { href: '/service-dog-certification-frankie', label: 'Service Dog Certification Frankie' },
  { href: '/shelters', label: 'Shelters' },
  { href: '/siteindex', label: 'Site Index' },
  { href: '/verify-assistance-dog', label: 'Verify Assistance Dog' },
  { href: '/volunteer', label: 'Volunteer' },
  { href: '/welcome', label: 'Welcome' },
  { href: '/contact', label: 'Contact & Support' },
  { href: '/sexual-health', label: 'Sexual Health' },
];

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-red-100 via-yellow-50 to-green-100 shadow-lg rounded-b-2xl border-b-4 border-red-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-red-700 drop-shadow-lg tracking-wide flex items-center gap-2">
          <img src="/logo.png" alt="Morningstar Rescues Logo" className="w-10 h-10 rounded-full border-2 border-red-300 shadow" />
          Morningstar Rescues
        </Link>
        <button
          className="text-gray-700 md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <ul
          className={`${menuOpen ? '' : 'hidden'} md:flex md:space-x-6 text-gray-700 font-semibold text-lg drop-shadow`}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-red-700 hover:underline transition-colors duration-200 block py-2 md:py-0 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <Link href="/mental-health" className="hidden md:inline-block px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">Mental Health Help</Link>
          <a href="mailto:helpme@homeless.website" className="hidden md:inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">Email Support</a>
          <a href="tel:+447853811172" className="hidden md:inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300">Call Helpline</a>
          <a href="mailto:dogs@homeless.website" className="hidden md:inline-block px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400">Dog Support</a>
          <a href="mailto:volunteer@homeless.website" className="hidden md:inline-block px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400">Volunteer</a>
          <a href="mailto:info@homeless.website" className="hidden md:inline-block px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">General Info</a>
          <a href="https://www.facebook.com/homelesshelpuk" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hidden md:inline-block px-2 py-2 bg-blue-800 text-white rounded-full shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
