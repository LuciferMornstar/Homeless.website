import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaDog, FaHandsHelping, FaHeartbeat, FaPhoneAlt, FaEnvelope, FaFacebook, FaComments, FaInfoCircle, FaUserFriends, FaDatabase, FaLightbulb } from 'react-icons/fa';

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

  // Close menu after clicking a link (on mobile)
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-100 via-yellow-50 to-green-100 shadow-lg rounded-b-2xl border-b-4 border-red-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Navigation Heading for all IQs */}
        <div className="flex items-center gap-2 w-full md:w-auto mb-2 md:mb-0">
          <Link href="/" className="text-2xl font-extrabold text-red-700 drop-shadow-lg tracking-wide flex items-center gap-2" aria-label="Go to Home">
            <Image src="/logo.png" alt="Morningstar Rescues Logo" width={40} height={40} className="rounded-full border-2 border-red-300 shadow" />
            Morningstar Rescues
          </Link>
          <span className="ml-3 text-xs md:text-sm text-gray-600 bg-yellow-100 px-2 py-1 rounded-lg flex items-center gap-1" aria-label="Helping the Homeless, Mental Health, and Service Dogs"><FaLightbulb className="text-yellow-400" /> Helping the Homeless & Mental Health</span>
        </div>
        {/* Quick Help Button */}
        <div className="flex gap-2 w-full md:w-auto justify-center md:justify-end mb-2 md:mb-0">
          <a href="tel:+447853811172" className="flex items-center gap-1 px-3 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm" aria-label="Quick Help: Call, Text, iMessage, WhatsApp: +447853811172"><FaPhoneAlt /> Quick Help</a>
          <a href="mailto:helpme@homeless.website" className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" aria-label="Quick Email Help & Support (helpme@homeless.website)"><FaEnvelope /> Email Help</a>
        </div>
        {/* Quick Access Sections */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end mb-2 md:mb-0">
          <Link href="/mental-health" className="flex items-center gap-1 px-2 py-1 bg-green-200 text-green-900 rounded-lg shadow hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xs md:text-sm" aria-label="Mental Health Support"><FaHeartbeat /> Mental Health</Link>
          <Link href="/dog-friendly-resources" className="flex items-center gap-1 px-2 py-1 bg-pink-200 text-pink-900 rounded-lg shadow hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs md:text-sm" aria-label="Service Dogs and Dog Friendly Resources"><FaDog /> Service Dogs</Link>
          <Link href="/volunteer" className="flex items-center gap-1 px-2 py-1 bg-purple-200 text-purple-900 rounded-lg shadow hover:bg-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-xs md:text-sm" aria-label="Volunteer Opportunities"><FaHandsHelping /> Volunteer</Link>
          <Link href="/organizations" className="flex items-center gap-1 px-2 py-1 bg-blue-200 text-blue-900 rounded-lg shadow hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs md:text-sm" aria-label="For Organisations"><FaUserFriends /> For Organisations</Link>
        </div>
        {/* Hamburger Button */}
        <button
          className="text-gray-700 md:hidden focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
          data-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Main Navigation Links */}
        <ul
          id="main-menu"
          className={`${menuOpen ? 'block' : 'hidden'} md:flex md:space-x-6 text-gray-700 font-semibold text-lg drop-shadow absolute md:static left-0 right-0 bg-white md:bg-transparent top-full md:top-auto transition-all duration-300`}
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-red-700 hover:underline transition-colors duration-200 block py-2 md:py-0 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300" onClick={handleLinkClick} aria-label={`Navigate to ${label}`}> 
                {label}
              </Link>
            </li>
          ))}
          {/* Feedback and Database Info Links */}
          <li>
            <Link href="/feedback" className="flex items-center gap-1 hover:text-blue-700 hover:underline transition-colors duration-200 block py-2 md:py-0 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" aria-label="Send Feedback"><FaComments /> Feedback</Link>
          </li>
          <li>
            <Link href="/database-info" className="flex items-center gap-1 hover:text-gray-700 hover:underline transition-colors duration-200 block py-2 md:py-0 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm" aria-label="Database Info"><FaDatabase /> Database Info</Link>
          </li>
        </ul>
        {/* Contact & Social Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-2 ml-4">
          <a href="mailto:helpme@homeless.website" className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm" aria-label="Email Help & Support (helpme@homeless.website)"><FaEnvelope className="inline mr-1" />Email</a>
          <a href="tel:+447853811172" className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm" aria-label="Call, Text, iMessage, WhatsApp: +447853811172"><FaPhoneAlt className="inline mr-1" />Call/Text/WhatsApp</a>
          <a href="mailto:dogs@homeless.website" className="px-3 py-1 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm" aria-label="Dog Support Services (dogs@homeless.website)"><FaDog className="inline mr-1" />Dog Support</a>
          <a href="mailto:volunteer@homeless.website" className="px-3 py-1 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm" aria-label="Volunteer Opportunities (volunteer@homeless.website)"><FaHandsHelping className="inline mr-1" />Volunteer</a>
          <a href="mailto:info@homeless.website" className="px-3 py-1 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm" aria-label="General Info (info@homeless.website)"><FaInfoCircle className="inline mr-1" />Info</a>
          <a href="https://www.facebook.com/homelesshelpuk" target="_blank" rel="noopener noreferrer" aria-label="Facebook - Homeless Help UK" className="px-2 py-2 bg-blue-800 text-white rounded-full shadow hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <FaFacebook className="w-5 h-5" />
          </a>
        </div>
        {/* Accessibility & easy help for all users (Mobile) */}
        <div className="w-full mt-2 md:hidden flex flex-col gap-2 text-xs text-center">
          <span className="block text-gray-700 font-semibold">Need help? Email <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> or call/text <a href="tel:+447853811172" className="underline">+447853811172</a></span>
          <span className="block text-gray-700">Dog Support: <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a></span>
          <span className="block text-gray-700">Volunteer: <a href="mailto:volunteer@homeless.website" className="underline">volunteer@homeless.website</a></span>
          <span className="block text-gray-700">Info: <a href="mailto:info@homeless.website" className="underline">info@homeless.website</a></span>
          <span className="block text-gray-700">Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="underline" target="_blank" rel="noopener noreferrer">facebook.com/homelesshelpuk</a></span>
        </div>
      </div>
    </nav>
  );
}
