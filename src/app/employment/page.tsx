'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSearch, faHandshake, faGraduationCap, faIdCard, faUserTie, faFileAlt, faPoundSign, faPhone, faBalanceScale, faToolbox } from '@fortawesome/free-solid-svg-icons';

export function EmploymentPage() {
  const [resourceType, setResourceType] = useState('all');

  // Filter resources based on selected type
  const filterResources = (type: string) => {
    setResourceType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-teal-700 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-blue-700 opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Employment Support</h1>
            <p className="text-xl md:text-2xl mb-8">
              Find work, build skills, and understand your employment rights while homeless
            </p>
            <div className="bg-white text-gray-700 p-4 rounded-lg shadow-lg text-left mt-8">
              <p className="font-semibold text-teal-800">
                Employment can be a critical step toward housing stability. Under British law, you have the right to work even without a fixed address, and various programs exist to help overcome barriers to employment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter Resources */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Employment Resources</h2>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => filterResources('all')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${resourceType === 'all' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    All Resources
                  </button>
                  <button 
                    onClick={() => filterResources('jobSearch')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${resourceType === 'jobSearch' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <FontAwesomeIcon icon={faSearch} className="mr-2" />
                    Job Search
                  </button>
                  <button 
                    onClick={() => filterResources('training')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${resourceType === 'training' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                    Training & Skills
                  </button>
                  <button 
                    onClick={() => filterResources('rights')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${resourceType === 'rights' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <FontAwesomeIcon icon={faBalanceScale} className="mr-2" />
                    Employment Rights
                  </button>
                  <button 
                    onClick={() => filterResources('practicalSupport')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${resourceType === 'practicalSupport' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    <FontAwesomeIcon icon={faToolbox} className="mr-2" />
                    Practical Support
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Finding Work Section */}
          {(resourceType === 'all' || resourceType === 'jobSearch') && (
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faBriefcase} className="text-teal-600 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Finding Work</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    Finding employment while homeless can present challenges, but many organizations and government programs can help you overcome barriers and find work.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-teal-50 p-5 rounded-lg">
                      <h3 className="font-bold text-teal-800 mb-3">Jobcentre Plus Support</h3>
                      <p className="text-gray-700 mb-4">
                        Jobcentre Plus provides specialized support for people experiencing homelessness:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Job search assistance and advice</li>
                        <li>Access to computers and phone for job applications</li>
                        <li>Referrals to training and skills programs</li>
                        <li>Help with CV writing and interview preparation</li>
                        <li>Potential access to the Flexible Support Fund for interview clothes or travel costs</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">
                        <strong>Note:</strong> You do not need a fixed address to register with Jobcentre Plus. You can use a care-of address, such as a day center or hostel.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-3">Employment Programs for Homeless People</h3>
                      <p className="text-gray-700 mb-4">
                        Several UK charities and social enterprises offer specialized employment support:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Crisis Skylight centres</strong> - Employment coaching, job readiness and sector-specific training</li>
                        <li><strong>St Mungo's Recovery College</strong> - Skills courses and employment support</li>
                        <li><strong>The Big Issue</strong> - Self-employment opportunity as magazine vendors</li>
                        <li><strong>Beam</strong> - Crowdfunding for training, certifications, and equipment</li>
                        <li><strong>Salvation Army Employment Plus</strong> - Employment advice and training</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-lg mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">Local Council Employment Initiatives</h3>
                    <p className="text-gray-700 mb-3">
                      Many local councils run or fund employment initiatives specifically for people experiencing homelessness. These can include:
                    </p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Employment advisors specializing in homelessness</li>
                      <li>Programs connecting homeless people with local employers</li>
                      <li>Supported employment opportunities</li>
                      <li>Voluntary work experience placements</li>
                    </ul>
                    <p className="mt-3 text-sm text-gray-600">
                      Contact your local council's housing department or homelessness team to ask about employment programs in your area.
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-5 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-3">Online Job Search Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2">Find a Job (Government Service)</h4>
                        <p className="text-gray-700 mb-2">
                          Official UK government job search platform.
                        </p>
                        <a href="https://www.gov.uk/find-a-job" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                          www.gov.uk/find-a-job
                        </a>
                      </div>
                      <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2">Indeed</h4>
                        <p className="text-gray-700 mb-2">
                          Large job search engine with many entry-level positions.
                        </p>
                        <a href="https://www.indeed.co.uk" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                          www.indeed.co.uk
                        </a>
                      </div>
                      <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2">Reed</h4>
                        <p className="text-gray-700 mb-2">
                          Job site with various types of employment opportunities.
                        </p>
                        <a href="https://www.reed.co.uk" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                          www.reed.co.uk
                        </a>
                      </div>
                      <div className="bg-white p-4 rounded shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2">Gumtree Jobs</h4>
                        <p className="text-gray-700 mb-2">
                          Local job listings, including casual and cash-in-hand work.
                        </p>
                        <a href="https://www.gumtree.com/jobs" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                          www.gumtree.com/jobs
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Training and Skills Section */}
          {(resourceType === 'all' || resourceType === 'training') && (
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faGraduationCap} className="text-purple-600 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Training and Skills</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    Improving your skills can significantly enhance your employment prospects. Many free or low-cost training opportunities are available for people experiencing homelessness.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-purple-50 p-5 rounded-lg">
                      <h3 className="font-bold text-purple-800 mb-3">Free Courses and Qualifications</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Adult Education Budget (AEB) funded courses</strong> - Free if you're unemployed and receiving benefits</li>
                        <li><strong>Free Level 3 qualifications</strong> - For adults without A-levels or equivalent</li>
                        <li><strong>Skills Bootcamps</strong> - Free, flexible courses to build sector-specific skills</li>
                        <li><strong>Community learning courses</strong> - Often free or low-cost at local colleges</li>
                        <li><strong>Digital skills training</strong> - Many libraries offer free basic IT courses</li>
                      </ul>
                      <a 
                        href="https://nationalcareers.service.gov.uk/find-a-course" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-purple-600 hover:underline block mt-3"
                      >
                        Find courses through the National Careers Service →
                      </a>
                    </div>
                    
                    <div className="bg-green-50 p-5 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-3">Charity Training Programs</h3>
                      <p className="text-gray-700 mb-3">
                        Many homelessness charities offer free training programs specifically designed for people experiencing homelessness:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Crisis</strong> - IT, creative skills, construction, and catering courses</li>
                        <li><strong>St Mungo's</strong> - Vocational training in multiple sectors</li>
                        <li><strong>Groundswell</strong> - Peer advocacy training for those with lived experience</li>
                        <li><strong>Centrepoint</strong> - Various vocational programs for young homeless people</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">
                        Contact your local homelessness charities to inquire about training programs in your area.
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">Construction Skills and Certifications</h3>
                    <p className="text-gray-700 mb-4">
                      The construction industry offers many entry-level opportunities and potential career progression:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>CSCS Card</strong> - Essential certification needed to work on construction sites</li>
                      <li><strong>Construction Skills Fund</strong> - Free training for those looking to work in construction</li>
                      <li><strong>Building Heroes</strong> - Construction skills training for vulnerable adults</li>
                    </ul>
                    <div className="mt-4 bg-white p-4 rounded shadow-sm">
                      <h4 className="font-semibold text-gray-800">Crisis Construction Academy</h4>
                      <p className="text-gray-700 mb-2">
                        Crisis offers free construction training for homeless individuals, including:
                      </p>
                      <ul className="list-disc list-inside text-gray-700">
                        <li>Health & Safety Level 1</li>
                        <li>CSCS card preparation and test</li>
                        <li>Skills in various trades</li>
                        <li>Help with job applications in the construction industry</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Practical Support Section */}
          {(resourceType === 'all' || resourceType === 'practicalSupport') && (
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faToolbox} className="text-orange-600 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Practical Support for Job Seekers</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    Practical barriers can make finding and sustaining employment difficult when homeless. These resources can help overcome those barriers.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-orange-50 p-5 rounded-lg">
                      <h3 className="font-bold text-orange-800 mb-3">Interview Clothing</h3>
                      <p className="text-gray-700 mb-3">
                        Access free professional clothing for interviews:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Suited & Booted</strong> - Professional clothing for men</li>
                        <li><strong>Smart Works</strong> - Interview clothing and coaching for women</li>
                        <li><strong>Dress for Success</strong> - Professional attire for women</li>
                        <li>Many local charities also provide clothing for interviews</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">
                        Also ask your Jobcentre Plus advisor about the Flexible Support Fund, which can provide money for interview clothes.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-3">Digital Access</h3>
                      <p className="text-gray-700 mb-3">
                        Places to access computers and internet for job searching:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Public libraries - Free computer and internet access</li>
                        <li>Jobcentre Plus - Computer access for job searching</li>
                        <li>Homelessness day centers - Many offer internet access</li>
                        <li>Crisis Skylight centres - Computer facilities</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">
                        Many libraries also offer support with creating email accounts and basic IT skills.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-5 rounded-lg">
                      <h3 className="font-bold text-green-800 mb-3">Transport Assistance</h3>
                      <p className="text-gray-700 mb-3">
                        Help with travel costs for job interviews and work:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Jobcentre Plus Flexible Support Fund can cover interview travel costs</li>
                        <li>Jobcentre Plus Travel Discount Card - 50% off train fares</li>
                        <li>Some local councils offer free bus passes for job seekers</li>
                        <li>Charities may provide travel grants for employment</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-indigo-50 p-5 rounded-lg">
                    <h3 className="font-bold text-indigo-800 mb-3 flex items-center">
                      <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                      Getting ID Documents
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Lack of ID can be a major barrier to employment. Here's how to obtain necessary documents:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Birth Certificate</h4>
                        <p className="text-gray-700 mb-2">
                          You can order a replacement birth certificate online for £11. Some homelessness charities may help cover this cost.
                        </p>
                        <a 
                          href="https://www.gov.uk/order-copy-birth-death-marriage-certificate" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-indigo-600 hover:underline"
                        >
                          Order birth certificate →
                        </a>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Proof of Address</h4>
                        <p className="text-gray-700">
                          If you don't have a fixed address, you can use a "care of" address from:
                        </p>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>Day centers or hostels</li>
                          <li>Trusted friends or family</li>
                          <li>GP surgery where you're registered</li>
                          <li>Some homelessness services offer address services</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Employment Rights Section */}
          {(resourceType === 'all' || resourceType === 'rights') && (
            <section className="mb-16">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon icon={faBalanceScale} className="text-red-600 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-gray-800">Your Employment Rights</h2>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <p className="text-gray-700 mb-6">
                    Under British law, being homeless doesn't affect your employment rights. Understanding your rights can help you find and maintain employment.
                  </p>
                  
                  <div className="bg-red-50 p-5 rounded-lg mb-8">
                    <h3 className="font-bold text-red-800 mb-3">Right to Work Regardless of Housing Status</h3>
                    <p className="text-gray-700 mb-3">
                      Important facts about your right to work while homeless:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Employers cannot legally discriminate against you for being homeless</li>
                      <li>You do not need a fixed address to work legally in the UK</li>
                      <li>You can use a "care of" address for employment documentation</li>
                      <li>Having no fixed address does not affect your tax status or right to work</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-yellow-50 p-5 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-3">Payment and Banking</h3>
                      <p className="text-gray-700 mb-3">
                        Managing pay without a permanent address:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li><strong>Bank accounts:</strong> Basic bank accounts are available even without proof of address - ask about them at high street banks</li>
                        <li><strong>Credit Unions:</strong> Often more flexible with address requirements than mainstream banks</li>
                        <li><strong>Post Office Card Accounts:</strong> Can be used to receive wages and benefits</li>
                        <li><strong>Digital banking:</strong> Some online banks have less stringent address requirements</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">
                        <strong>Need help opening a bank account?</strong> Ask at your local day center or homelessness charity. Many work directly with banks to help homeless people access financial services.
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 p-5 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-3">Benefits While Working</h3>
                      <p className="text-gray-700 mb-3">
                        Information about continuing to receive benefits while employed:
                      </p>
                      <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>Universal Credit can continue while working part-time</li>
                        <li>Housing Benefit or housing element of Universal Credit may continue if your income is low</li>
                        <li>Working Tax Credit may be available if you work at least 16 hours per week</li>
                        <li>The Benefit Cap does not apply if you earn above a certain threshold</li>
                      </ul>
                      <a 
                        href="https://www.entitledto.co.uk/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline block mt-3"
                      >
                        Use the EntitledTo calculator to check your benefit entitlement →
                      </a>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-5 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-3 flex items-center">
                      <FontAwesomeIcon icon={faPoundSign} className="mr-2" />
                      National Minimum Wage
                    </h3>
                    <p className="text-gray-700 mb-4">
                      All workers in the UK are entitled to at least the National Minimum Wage or National Living Wage, regardless of housing status.
                    </p>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-2">Current Minimum Wage Rates (as of April 2025):</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Age 23 and over:</strong> £11.44 per hour (National Living Wage)</li>
                        <li><strong>Age 21-22:</strong> £11.44 per hour</li>
                        <li><strong>Age 18-20:</strong> £8.60 per hour</li>
                        <li><strong>Under 18:</strong> £6.40 per hour</li>
                        <li><strong>Apprentice:</strong> £6.40 per hour</li>
                      </ul>
                      <p className="mt-3 text-sm text-gray-600">
                        If you believe you're being paid less than the minimum wage, you can contact ACAS for advice on 0300 123 1100.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Further Support */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faHandshake} className="text-blue-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Further Employment Support</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  These organizations can provide specialized employment support for people experiencing homelessness:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-blue-800 mb-3">Crisis</h3>
                    <p className="text-gray-700 mb-3">Employment coaching, training and support at Skylight centres across the UK.</p>
                    <p className="text-gray-700"><strong>Phone:</strong> 0300 636 1967</p>
                    <a href="https://www.crisis.org.uk/get-help/services-near-you/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-2">Find a Skylight Centre near you</a>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-blue-800 mb-3">The Prince's Trust</h3>
                    <p className="text-gray-700 mb-3">Help for young people aged 16-30 to gain skills and find work.</p>
                    <p className="text-gray-700"><strong>Phone:</strong> 0800 842 842</p>
                    <a href="https://www.princes-trust.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-2">princes-trust.org.uk</a>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-blue-800 mb-3">BEAM</h3>
                    <p className="text-gray-700 mb-3">Crowdfunding platform for homeless people to fund training, certifications and work supplies.</p>
                    <a href="https://beam.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-2">beam.org</a>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-3">Mental Health Support for Job Seekers</h3>
                  <p className="text-gray-700 mb-4">
                    Job searching can be stressful, particularly when dealing with homelessness. Support is available:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">NHS Mental Health Support</h4>
                      <p className="text-gray-700 mb-2">
                        You can self-refer to NHS talking therapies (IAPT) services without a GP referral.
                      </p>
                      <a href="https://www.nhs.uk/service-search/mental-health/find-a-psychological-therapies-service/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                        Find NHS talking therapies →
                      </a>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Our Mental Health Assessment Tool</h4>
                      <p className="text-gray-700 mb-2">
                        Take our confidential mental health assessment to get personalized recommendations.
                      </p>
                      <Link href="/mental-health" className="text-blue-600 hover:underline block">
                        Take mental health assessment →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Need Help? CTA */}
          <section className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg shadow-lg text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Personalized Employment Support?</h2>
            <p className="text-xl mb-6">Our team can connect you with employment specialists</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:08005555HELP" 
                className="bg-white text-teal-600 hover:bg-teal-50 font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Call 0800-555-HELP
              </a>
              <Link 
                href="/interview" 
                className="bg-teal-800 hover:bg-teal-900 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                Interview Preparation
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
