'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { FaHome, FaMapMarkerAlt, FaHeartbeat, FaUtensils, FaPoundSign, FaPaw, 
  FaBrain, FaPhone, FaHandsHelping, FaBook, FaLaptop, FaFileAlt, FaBriefcase, 
  FaShieldAlt, FaUserFriends, FaSearch, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface ResourceItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  categories: string[];
  types: string[];
  link: string;
  downloadLink?: string;
  isNew?: boolean;
  isHighPriority?: boolean;
}

// Enhanced resources with mental health focus and more comprehensive options
const RESOURCES: ResourceItem[] = [
  { 
    id: 1, 
    title: 'Housing Rights Guide', 
    description: 'A comprehensive guide to your legal rights when facing homelessness in the UK, including the 56-day rule and council obligations under the Homelessness Reduction Act 2017.', 
    icon: <FaHome className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['housing','legal'], 
    types: ['guide','download'], 
    link: '/shelters#housing-rights', 
    downloadLink: '/assets/docs/housing-rights.pdf' 
  },
  { 
    id: 2, 
    title: 'Shelter Finder Tool', 
    description: 'Interactive tool to find emergency accommodation, night shelters, and hostels in your local area across the UK.', 
    icon: <FaMapMarkerAlt className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['housing'], 
    types: ['tool'], 
    link: '/shelters#immediate-help' 
  },
  { 
    id: 3, 
    title: 'Healthcare When Homeless', 
    description: 'Guide to accessing NHS services without a fixed address, including registering with GPs and getting prescriptions. Includes information on your legal rights to healthcare in Britain.', 
    icon: <FaHeartbeat className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['health'], 
    types: ['guide','download'], 
    link: '/healthcare', 
    downloadLink: '/assets/docs/healthcare-guide.pdf' 
  },
  { 
    id: 4, 
    title: 'Food Bank Finder', 
    description: 'Interactive map to find food banks, community meals, and other free food services in your area across the UK.', 
    icon: <FaUtensils className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['food'], 
    types: ['tool'], 
    link: '/foodbanks' 
  },
  { 
    id: 5, 
    title: 'Benefits Entitlement Guide', 
    description: 'Comprehensive guide to the benefits you may be entitled to when homeless or at risk of homelessness under UK law, including Universal Credit and Housing Benefit.', 
    icon: <FaPoundSign className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['benefits','legal'], 
    types: ['guide','download'], 
    link: '/financial', 
    downloadLink: '/assets/docs/benefits-entitlement.pdf' 
  },
  { 
    id: 6, 
    title: 'Pets and Homelessness Guide', 
    description: 'Information on pet-friendly shelters, your rights with assistance animals under UK law, and temporary pet fostering options when facing housing insecurity.', 
    icon: <FaPaw className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['pets','housing'], 
    types: ['guide','download'], 
    link: '/verify-assistance-dog', 
    downloadLink: '/assets/docs/pets-homelessness.pdf' 
  },
  { 
    id: 7, 
    title: 'Mental Health Crisis Support', 
    description: 'Immediate resources for mental health crises, including 24/7 helplines, text services, and emergency mental health team contacts across the UK.', 
    icon: <FaBrain className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['mental-health','health'], 
    types: ['guide','tool'], 
    link: '/mental-health#crisis', 
    isHighPriority: true 
  },
  { 
    id: 8, 
    title: 'Trauma-Informed Mental Health Assessment', 
    description: 'Self-assessment tool designed specifically for people experiencing homelessness, with guidance on accessing appropriate mental health support based on your needs.', 
    icon: <FaBrain className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['mental-health','health'], 
    types: ['tool','template'], 
    link: '/mental-health-assessment', 
    isNew: true 
  },
  { 
    id: 9, 
    title: 'Addiction Support Services Finder', 
    description: 'Directory of addiction and substance use disorder services that work specifically with people experiencing homelessness, with no-fixed-address options highlighted.', 
    icon: <FaHandsHelping className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['mental-health','health','addictions'], 
    types: ['tool'], 
    link: '/addictions' 
  },
  { 
    id: 10, 
    title: 'Employment Rights When Homeless', 
    description: 'Guide to your employment rights in the UK, including how to maintain employment without a fixed address and employment support programs.', 
    icon: <FaBriefcase className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['employment','legal'], 
    types: ['guide','download'], 
    link: '/employment', 
    downloadLink: '/assets/docs/employment-rights.pdf' 
  },
  { 
    id: 11, 
    title: 'CV/Resume Template for Gaps in Employment', 
    description: 'Specialized templates and guidance for creating effective CVs when you have gaps in employment history due to homelessness or housing insecurity.', 
    icon: <FaFileAlt className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['employment'], 
    types: ['template','download'], 
    link: '/employment#cv-templates', 
    downloadLink: '/assets/docs/cv-template.pdf' 
  },
  { 
    id: 12, 
    title: 'Online Safety Guide for Public Computer Use', 
    description: 'Practical guidance on maintaining privacy and security when using public computers at libraries or internet cafés for job searching or benefit applications.', 
    icon: <FaShieldAlt className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['digital','safety'], 
    types: ['guide','download'], 
    link: '/digital-safety', 
    downloadLink: '/assets/docs/online-safety.pdf',
    isNew: true 
  },
  { 
    id: 13, 
    title: 'Peer Support Network Finder', 
    description: 'Find peer-led support groups specific to homeless experiences in your area, including those focused on mental health and recovery.', 
    icon: <FaUserFriends className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['mental-health','network'], 
    types: ['tool'], 
    link: '/network#peer-support' 
  },
  { 
    id: 14, 
    title: 'HelpfulBot AI Assistant', 
    description: 'Interactive AI assistant that can help answer questions about homelessness services, benefits, and rights under UK law, available 24/7.', 
    icon: <FaLaptop className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['digital','tool'], 
    types: ['tool'], 
    link: '/helpfulbot',
    isNew: true 
  },
  { 
    id: 15, 
    title: 'Rights Guide for EU/EEA Citizens Post-Brexit', 
    description: 'Specialized guide on homelessness rights and support available for EU/EEA citizens living in the UK after Brexit, including settled status information.', 
    icon: <FaBook className="text-red-600 text-3xl" aria-hidden="true" />, 
    categories: ['legal','housing'], 
    types: ['guide','download'], 
    link: '/legal-rights#eu-citizens', 
    downloadLink: '/assets/docs/eu-rights-guide.pdf' 
  }
];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);

  // Categories with mental health prominently featured (per HHR rule #2)
  const categories = [
    'all',
    'mental-health',
    'housing',
    'health',
    'food',
    'benefits',
    'legal',
    'employment',
    'pets',
    'digital',
    'network',
    'addictions',
    'safety'
  ];
  
  const types = ['all','guide','tool','template','download','video'];

  const filtered = useMemo(() => {
    return RESOURCES.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.categories.includes(activeCategory);
      const matchesType = activeType === 'all' || item.types.includes(activeType);
      const text = `${item.title} ${item.description}`.toLowerCase();
      const matchesSearch = searchTerm === '' || text.includes(searchTerm.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [activeCategory, activeType, searchTerm]);

  // For accessibility - announce the number of results when filtering changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const announcement = `Found ${filtered.length} resources matching your criteria.`;
      const announcer = document.getElementById('results-announcer');
      if (announcer) {
        announcer.textContent = announcement;
      }
    }
  }, [filtered.length]);

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Handle download clicks - could be expanded to track analytics or handle errors
  const handleDownload = (e: React.MouseEvent, item: ResourceItem) => {
    // Could add analytics tracking here
    console.log(`Download initiated for: ${item.title}`);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-red-700 to-red-900 text-white py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">Resources & Tools</h1>
          <p className="text-center max-w-3xl mx-auto text-lg mb-6">
            Access our comprehensive collection of resources designed to help with homelessness,
            with special focus on mental health support and practical guidance based on British law.
          </p>
          
          {/* Accessible search box with animation */}
          <div className="relative max-w-2xl mx-auto mb-6 transition-all duration-300 ease-in-out">
            <div className={`flex items-center bg-white rounded-full overflow-hidden transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-yellow-400 shadow-lg' : 'shadow'}`}>
              <FaSearch className="text-gray-500 ml-4" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full p-3 border-none focus:outline-none text-gray-800"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                aria-label="Search resources"
              />
            </div>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        {/* Accessibility features */}
        <div className="sr-only" id="results-announcer" aria-live="polite"></div>
        
        {/* Category filters with scroll for mobile */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex flex-nowrap gap-2 min-w-max">
            {categories.map(cat => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(cat)}
                aria-pressed={activeCategory === cat ? "true" : "false"}
                aria-label={`Filter by ${formatCategoryName(cat)} category`}
              >
                {formatCategoryName(cat)}
                {cat === 'mental-health' && <span className="ml-1">★</span>}
              </button>
            ))}
          </div>
        </div>
        
        {/* Type filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {types.map(type => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                activeType === type 
                  ? 'bg-red-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveType(type)}
              aria-pressed={activeType === type ? "true" : "false"}
              aria-label={`Filter by ${type} type`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Results count */}
        <div className="text-gray-500 mb-6">
          Found <span className="font-semibold">{filtered.length}</span> resources
        </div>
        
        {/* Resources grid with animation */}
        <AnimatePresence>
          {filtered.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`border rounded-lg p-6 transition-all duration-300 hover:shadow-lg ${
                    item.isHighPriority ? 'border-red-500 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center">
                      {item.icon}
                      {(item.isNew || item.isHighPriority) && (
                        <span className={`ml-2 text-xs font-bold uppercase px-2 py-1 rounded ${
                          item.isHighPriority ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {item.isHighPriority ? 'Critical' : 'New'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="font-bold text-xl mb-2">{item.title}</h2>
                  <p className="mb-4 text-gray-700">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.categories.map(cat => (
                      <span 
                        key={cat} 
                        className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
                        onClick={() => setActiveCategory(cat)}
                        style={{ cursor: 'pointer' }}
                      >
                        {formatCategoryName(cat)}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a 
                      href={item.link} 
                      className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                      aria-label={`View ${item.title}`}
                    >
                      <FaExternalLinkAlt className="mr-1 text-sm" /> View
                    </a>
                    
                    {item.downloadLink && (
                      <a 
                        href={item.downloadLink} 
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                        onClick={(e) => handleDownload(e, item)}
                        aria-label={`Download ${item.title}`}
                      >
                        <FaDownload className="mr-1 text-sm" /> Download
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <div className="bg-gray-50 rounded-lg p-8 max-w-lg mx-auto">
                <FaSearch className="text-gray-400 text-4xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No resources found</h3>
                <p className="text-gray-500 mb-4">We couldn't find any resources matching your criteria. Please try different filters or search terms.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveType('all');
                    setSearchTerm('');
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Contact for more resources section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Need More Resources?</h2>
          <p className="mb-4">
            If you can't find what you're looking for or need personalized assistance, please get in touch with our team.
            We're here to help connect you with the right resources based on your specific situation.
          </p>
          
          <button
            onClick={() => setShowContactInfo(!showContactInfo)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors mb-4"
            aria-expanded={showContactInfo ? "true" : "false"}
          >
            {showContactInfo ? 'Hide Contact Information' : 'Show Contact Information'}
          </button>
          
          {showContactInfo && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white p-4 rounded border border-gray-200"
            >
              <h3 className="font-bold text-lg mb-2">Contact Information</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FaPhone className="mr-2 text-red-600" /> 
                  <a href="tel:+447853811172" className="hover:underline">+44 7853 811172</a>
                </li>
                <li className="flex items-center">
                  <FaFileAlt className="mr-2 text-red-600" /> 
                  <a href="mailto:helpme@homeless.website" className="hover:underline">helpme@homeless.website</a> (General Inquiries)
                </li>
                <li className="flex items-center">
                  <FaPaw className="mr-2 text-red-600" /> 
                  <a href="mailto:dogs@homeless.website" className="hover:underline">dogs@homeless.website</a> (Service Dogs & Pet Support)
                </li>
                <li className="flex items-center">
                  <FaHandsHelping className="mr-2 text-red-600" /> 
                  <a href="mailto:volunteer@homeless.website" className="hover:underline">volunteer@homeless.website</a> (Volunteering)
                </li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Our team aims to respond to all inquiries within 24 hours. For immediate emergency support,
                please call our helpline or visit the <Link href="/emergency" className="text-red-600 hover:underline">Emergency Help</Link> page.
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
