'use client';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaArrowRight, FaPaw, FaFileDownload, FaInfo, FaQuestionCircle } from 'react-icons/fa';

export default function Page() {
  const [activeTab, setActiveTab] = useState('about');
  const [showFAQ, setShowFAQ] = useState<number | null>(null);
  
  return (
    <>
      <Head>
        <title>Service Dog Certification - Official UK Guidelines</title>
        <meta name="description" content="Information about service dog certification in the UK, legal rights, and application process." />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        <header className="bg-blue-900 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Service Dog Certification</h1>
            <p className="text-lg max-w-3xl">
              Official information on assistance dog certification, rights and responsibilities under British law
            </p>
          </div>
        </header>

        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto whitespace-nowrap py-3 scrollbar-hide">
              <button 
                onClick={() => setActiveTab('about')}
                className={`px-4 py-2 mx-1 font-medium rounded-md ${activeTab === 'about' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}`}
              >
                About Certification
              </button>
              <button 
                onClick={() => setActiveTab('rights')}
                className={`px-4 py-2 mx-1 font-medium rounded-md ${activeTab === 'rights' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}`}
              >
                Legal Rights
              </button>
              <button 
                onClick={() => setActiveTab('process')}
                className={`px-4 py-2 mx-1 font-medium rounded-md ${activeTab === 'process' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}`}
              >
                Application Process
              </button>
              <button 
                onClick={() => setActiveTab('sample')}
                className={`px-4 py-2 mx-1 font-medium rounded-md ${activeTab === 'sample' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}`}
              >
                Sample Certificate
              </button>
              <button 
                onClick={() => setActiveTab('faq')}
                className={`px-4 py-2 mx-1 font-medium rounded-md ${activeTab === 'faq' ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}`}
              >
                FAQs
              </button>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          {/* About Certification Section */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">About Service Dog Certification in the UK</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="prose max-w-none">
                    <p className="mb-4">
                      In the United Kingdom, assistance dogs are protected under the Equality Act 2010, which provides disabled persons with legal rights to be accompanied by their assistance dogs in places where the general public is allowed.
                    </p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6">
                      <h3 className="text-lg font-semibold mb-2">Important to Know</h3>
                      <p>
                        <strong>While certification is not legally required in the UK</strong> for an assistance dog to have public access rights, it can help prevent access disputes and make day-to-day interactions smoother.
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Types of Assistance Dogs</h3>
                    <p>Assistance dogs perform various tasks to help individuals with disabilities, including:</p>
                    
                    <ul className="list-disc pl-6 space-y-1 mb-4">
                      <li><strong>Guide Dogs</strong> - Assist people with visual impairments</li>
                      <li><strong>Hearing Dogs</strong> - Alert deaf people to important sounds</li>
                      <li><strong>Mobility Assistance Dogs</strong> - Help people with physical disabilities</li>
                      <li><strong>Medical Alert Dogs</strong> - Detect medical emergencies (seizures, low blood sugar)</li>
                      <li><strong>Psychiatric Service Dogs</strong> - Support people with mental health conditions</li>
                      <li><strong>Autism Support Dogs</strong> - Assist people with autism spectrum disorder</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold mt-6 mb-3">Standards for Service Dogs</h3>
                    <p>While not required by law, a properly trained service dog should:</p>
                    
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Be well-behaved in public settings</li>
                      <li>Not be disruptive or aggressive</li>
                      <li>Be trained to perform specific tasks related to the handler's disability</li>
                      <li>Be under the handler's control at all times</li>
                      <li>Be clean and well-groomed</li>
                    </ul>
                    
                    <p className="mt-6">
                      Our certification process verifies these attributes through a combination of temperament testing, task demonstration, and public access evaluation.
                    </p>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Recognition in the UK</h3>
                    
                    <div className="mb-4">
                      <p className="text-sm">The UK has several established organizations that train and certify assistance dogs:</p>
                      
                      <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                        <li>Guide Dogs UK</li>
                        <li>Hearing Dogs for Deaf People</li>
                        <li>Dogs for Good</li>
                        <li>Canine Partners</li>
                        <li>Medical Detection Dogs</li>
                        <li>Support Dogs</li>
                        <li>Dog A.I.D.</li>
                      </ul>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <h4 className="font-semibold mb-2">International Recognition</h4>
                      <p className="text-sm">
                        UK assistance dog certifications are generally recognized internationally, though requirements may vary by country.
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 rounded-lg p-4 mt-6">
                      <h4 className="font-semibold text-yellow-800 mb-2">Need Help?</h4>
                      <p className="text-sm mb-2">
                        If you're facing access issues with your assistance dog, contact:
                      </p>
                      <div className="text-sm">
                        <div className="flex items-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          <a href="mailto:dogs@homeless.website" className="text-blue-700 hover:underline">dogs@homeless.website</a>
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <a href="tel:+447853811172" className="text-blue-700 hover:underline">+44 7853 811172</a>
                        </div>
                      </div>
                    </div>

                    <Link 
                      href="/reportdogbreach" 
                      className="block w-full bg-red-600 text-white text-center py-3 px-4 rounded-md mt-6 font-medium hover:bg-red-700 transition-colors"
                    >
                      Report an Access Refusal
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Legal Rights Section */}
          {activeTab === 'rights' && (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Legal Rights of Assistance Dog Handlers</h2>
              
              <div className="prose max-w-none">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-6">
                  <h3 className="text-lg font-semibold mb-2">UK Equality Act 2010</h3>
                  <p>
                    The Equality Act 2010 provides comprehensive protection for disabled people, including those who use assistance dogs. The Act makes it unlawful for service providers to discriminate against people with disabilities.
                  </p>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Key Rights Under UK Law</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg mb-2">Public Access Rights</h4>
                    <p className="text-sm mb-3">
                      Disabled people have the right to be accompanied by their assistance dogs in most public places and businesses, including:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Restaurants and cafés</li>
                      <li>Shops and supermarkets</li>
                      <li>Hotels and accommodation</li>
                      <li>Hospitals and healthcare facilities</li>
                      <li>Educational establishments</li>
                      <li>Public transport</li>
                      <li>Cinemas, theaters and other entertainment venues</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-lg mb-2">Reasonable Adjustments</h4>
                    <p className="text-sm mb-3">
                      Service providers must make "reasonable adjustments" to accommodate assistance dogs, which may include:
                    </p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Modifying a "no dogs" policy</li>
                      <li>Providing suitable space for the dog to rest</li>
                      <li>Ensuring staff are trained on assistance dog policies</li>
                      <li>Accommodating the dog in places where animals are typically not allowed</li>
                      <li>Providing water for the assistance dog</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Limitations and Exceptions</h3>
                <p>
                  There are very limited circumstances where service providers might legally refuse access to assistance dogs:
                </p>
                
                <ul className="list-disc pl-6 mb-6">
                  <li><strong>Genuine safety risk</strong> - If the presence of the dog would create a genuine safety risk that cannot be overcome by reasonable adjustments</li>
                  <li><strong>Sterile environments</strong> - Such as operating theaters or certain clean rooms where the presence of any animal would compromise health standards</li>
                </ul>
                
                <p>
                  In these exceptional cases, service providers should still make reasonable adjustments, such as:
                </p>
                
                <ul className="list-disc pl-6 mb-6">
                  <li>Providing assistance to the disabled person while their dog is taken care of</li>
                  <li>Offering alternative services where the dog can be present</li>
                  <li>Making temporary arrangements for the care of the dog</li>
                </ul>
                
                <h3 className="text-xl font-semibold mb-4">What To Do If Refused Access</h3>
                <p>If you are refused access with your assistance dog:</p>
                
                <ol className="list-decimal pl-6 space-y-2 mb-6">
                  <li>Remain calm and explain your legal rights under the Equality Act 2010</li>
                  <li>Inform the service provider that your dog is an assistance dog, not a pet</li>
                  <li>If possible, show any identification or documentation for your dog</li>
                  <li>Ask to speak to a manager or person in charge</li>
                  <li>Take note of the names of staff involved and details of the incident</li>
                  <li>If the issue is not resolved, consider making a formal complaint</li>
                </ol>
                
                <div className="bg-red-50 border-l-4 border-red-600 p-4 my-6">
                  <h3 className="text-lg font-semibold mb-2">Report Access Refusals</h3>
                  <p className="mb-3">
                    If you've been denied access with your assistance dog, you can report the incident and seek support.
                  </p>
                  <Link 
                    href="/reportdogbreach" 
                    className="inline-block bg-red-600 text-white py-2 px-4 rounded font-medium hover:bg-red-700 transition-colors"
                  >
                    Report an Access Refusal
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Application Process Section */}
          {activeTab === 'process' && (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Service Dog Certification Process</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-8">
                <h3 className="text-lg font-semibold mb-2">Important Note</h3>
                <p>
                  While certification is not legally required in the UK for an assistance dog to have public access rights under the Equality Act 2010, having formal certification can help prevent access disputes and make daily interactions easier.
                </p>
              </div>
              
              <div className="space-y-8 mb-10">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center flex-shrink-0 text-2xl font-bold">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Eligibility Assessment</h3>
                    <p className="mb-3">
                      To begin the certification process, we need to confirm your eligibility. This involves:
                    </p>
                    <ul className="list-disc pl-6 mb-3">
                      <li>Confirming your disability status as defined by the Equality Act 2010</li>
                      <li>Assessing whether your dog provides assistance specifically related to your disability</li>
                      <li>Reviewing any existing training your dog has received</li>
                    </ul>
                    <p className="text-sm text-gray-600">
                      <strong>Required documents:</strong> Medical documentation of disability, ID, and any existing dog training certificates
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8"></div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center flex-shrink-0 text-2xl font-bold">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Dog Assessment</h3>
                    <p className="mb-3">
                      Your dog must demonstrate suitability for assistance work through:
                    </p>
                    <ul className="list-disc pl-6 mb-3">
                      <li>Temperament testing - assessing behavior, reactions, and disposition</li>
                      <li>Basic obedience evaluation - sit, stay, come, walk on lead without pulling</li>
                      <li>Task performance - demonstrating at least three tasks directly related to your disability</li>
                      <li>Public access behavior - appropriate conduct in public settings</li>
                    </ul>
                    <p className="text-sm text-gray-600">
                      <strong>Assessment location:</strong> Usually conducted at your home and in public settings like shopping centres
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8"></div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center flex-shrink-0 text-2xl font-bold">3</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Handler Knowledge Test</h3>
                    <p className="mb-3">
                      You'll need to demonstrate knowledge of:
                    </p>
                    <ul className="list-disc pl-6 mb-3">
                      <li>Your legal rights and responsibilities under the Equality Act 2010</li>
                      <li>Proper care and maintenance of your assistance dog</li>
                      <li>Public etiquette with an assistance dog</li>
                      <li>How to handle access denials and challenging situations</li>
                    </ul>
                    <p className="text-sm text-gray-600">
                      <strong>Format:</strong> Written or verbal assessment, with accommodations available as needed
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-8"></div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-800 text-white flex items-center justify-center flex-shrink-0 text-2xl font-bold">4</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Certification Issuance</h3>
                    <p className="mb-3">
                      Upon successful completion of all assessments, you'll receive:
                    </p>
                    <ul className="list-disc pl-6 mb-3">
                      <li>Official assistance dog certification document</li>
                      <li>Assistance dog ID card with photo of you and your dog</li>
                      <li>Assistance dog vest or harness with appropriate patches</li>
                      <li>Digital certificate for your phone/device</li>
                    </ul>
                    <p className="text-sm text-gray-600">
                      <strong>Timeline:</strong> Processing typically takes 2-3 weeks after all assessments are complete
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Application Fees</h3>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-8">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold">Standard Application</h4>
                    <p className="text-2xl font-bold mt-1 mb-2">£120</p>
                    <p className="text-sm text-gray-600">Full assessment and certification</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Low Income Option</h4>
                    <p className="text-2xl font-bold mt-1 mb-2">£60</p>
                    <p className="text-sm text-gray-600">With proof of benefits or low income</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Renewal (Every 2 Years)</h4>
                    <p className="text-2xl font-bold mt-1 mb-2">£45</p>
                    <p className="text-sm text-gray-600">Simplified assessment process</p>
                  </div>
                </div>
                <p className="text-sm mt-4 text-gray-700">
                  <strong>Fee Waiver:</strong> Full fee waivers are available in cases of financial hardship. Contact us to learn more.
                </p>
              </div>
              
              <div className="flex justify-center mt-8">
                <button className="bg-blue-600 text-white py-3 px-8 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center">
                  <FaArrowRight className="mr-2" />
                  Begin Application Process
                </button>
              </div>
              
              <div className="text-center mt-4 text-sm text-gray-600">
                Have questions about the application process? Contact us at{' '}
                <a href="mailto:dogs@homeless.website" className="text-blue-700 hover:underline">dogs@homeless.website</a>
              </div>
            </div>
          )}

          {/* Sample Certificate Section */}
          {activeTab === 'sample' && (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Sample Service Dog Certificate</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-6 py-1 transform rotate-45 translate-x-8 translate-y-4 text-sm font-bold">
                      SAMPLE
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full border-2 border-blue-700 bg-white flex justify-center items-center font-bold text-blue-900 text-xl">
                          MSR
                        </div>
                        <div className="ml-4">
                          <h2 className="text-2xl font-bold text-blue-900">Service Dog Certificate</h2>
                          <p className="text-sm text-gray-600">United Kingdom</p>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <p className="font-bold">Registration ID:</p>
                        <p className="font-mono tracking-wider">UK-SD-12345</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="w-full aspect-square bg-gray-200 border border-gray-300 flex items-center justify-center">
                          <FaPaw className="text-6xl text-gray-400" />
                          <span className="absolute text-xs text-gray-500">Dog Photo</span>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Dog Name</p>
                            <p className="font-bold">Max</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Breed</p>
                            <p className="font-bold">Labrador Retriever</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Handler Name</p>
                            <p className="font-bold">Jane Smith</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Type of Assistance</p>
                            <p className="font-bold">Medical Alert</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Issue Date</p>
                            <p className="font-bold">15/01/2025</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Expiry Date</p>
                            <p className="font-bold">15/01/2027</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm">
                      <p className="font-bold mb-2">Legal Notice:</p>
                      <p>This dog is a trained service animal that assists a person with a disability. Under the UK Equality Act 2010, this assistance dog is permitted to accompany its handler in places of public accommodation where pets might otherwise be prohibited.</p>
                    </div>
                    
                    <div className="mt-8 flex justify-between">
                      <div>
                        <div className="w-32 border-b border-gray-400 h-10 relative">
                          <span className="absolute -bottom-6 left-0 text-xs">Certifying Officer</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-32 border-b border-gray-400 h-10 relative">
                          <span className="absolute -bottom-6 right-0 text-xs">Handler Signature</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-12 text-center text-xs text-gray-500">
                      <p>This certificate is provided for identification purposes and does not confer rights beyond those established by the UK Equality Act 2010.</p>
                      <p>For verification, visit: verify-assistance-dog.homeless.website</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition-colors flex items-center mx-auto">
                      <FaFileDownload className="mr-2" />
                      Download Sample PDF
                    </button>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-semibold mb-4">Certificate Features</h3>
                    
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-green-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Unique ID Number</span>
                          <p className="text-sm text-gray-600">Each certificate has a unique verification code</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-green-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Anti-counterfeit Design</span>
                          <p className="text-sm text-gray-600">Special paper and security features</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-green-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Online Verification</span>
                          <p className="text-sm text-gray-600">QR code allows instant verification</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-green-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Legal Information</span>
                          <p className="text-sm text-gray-600">UK Equality Act references included</p>
                        </div>
                      </li>
                      
                      <li className="flex items-start">
                        <div className="bg-green-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <div>
                          <span className="font-medium">Digital Copy</span>
                          <p className="text-sm text-gray-600">Access your certificate on any device</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Real Certificates</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      View examples of issued certificates for verified service dogs:
                    </p>
                    
                    <Link 
                      href="/service-dog-certification-frankie" 
                      className="block bg-white p-4 rounded-lg border border-gray-200 hover:bg-blue-50 mb-3 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold">Frankie</p>
                          <p className="text-sm text-gray-600">Labrador Retriever</p>
                          <p className="text-xs text-gray-500">PTSD/Anxiety Support</p>
                        </div>
                        <FaArrowRight className="text-blue-600" />
                      </div>
                    </Link>
                    
                    <Link 
                      href="#" 
                      className="block bg-white p-4 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold">Gypsy</p>
                          <p className="text-sm text-gray-600">Dachshund</p>
                          <p className="text-xs text-gray-500">Memory/Injury Assistance</p>
                        </div>
                        <FaArrowRight className="text-blue-600" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {/* FAQ 1 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => setShowFAQ(showFAQ === 1 ? null : 1)}
                  >
                    <span>Is certification legally required for assistance dogs in the UK?</span>
                    <FaQuestionCircle className={`transform transition-transform ${showFAQ === 1 ? 'rotate-180' : ''}`} />
                  </button>
                  {showFAQ === 1 && (
                    <div className="p-4 bg-white">
                      <p className="mb-3">
                        No. Under the UK Equality Act 2010, there is no legal requirement for assistance dogs to be certified or registered. The law provides protection based on the dog being trained to assist a disabled person, regardless of formal certification.
                      </p>
                      <p>
                        However, having official certification can help prevent access disputes and make day-to-day interactions smoother for both the handler and service providers. It provides a clear, standardized way to identify legitimate assistance dogs.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ 2 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => setShowFAQ(showFAQ === 2 ? null : 2)}
                  >
                    <span>What are businesses allowed to ask about my assistance dog?</span>
                    <FaQuestionCircle className={`transform transition-transform ${showFAQ === 2 ? 'rotate-180' : ''}`} />
                  </button>
                  {showFAQ === 2 && (
                    <div className="p-4 bg-white">
                      <p className="mb-3">
                        Under UK guidelines, service providers are permitted to ask:
                      </p>
                      <ul className="list-disc pl-6 mb-3">
                        <li>Is the dog an assistance dog required because of a disability?</li>
                        <li>What tasks or work has the dog been trained to perform?</li>
                      </ul>
                      <p className="mb-3">
                        They should not ask for:
                      </p>
                      <ul className="list-disc pl-6 mb-3">
                        <li>Detailed medical information about your disability</li>
                        <li>Demonstrations of the dog's abilities</li>
                        <li>Specific certification or documentation (though having this can help)</li>
                      </ul>
                      <p>
                        If refused access, politely explain your rights under the Equality Act 2010.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ 3 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => setShowFAQ(showFAQ === 3 ? null : 3)}
                  >
                    <span>Can I self-train my assistance dog?</span>
                    <FaQuestionCircle className={`transform transition-transform ${showFAQ === 3 ? 'rotate-180' : ''}`} />
                  </button>
                  {showFAQ === 3 && (
                    <div className="p-4 bg-white">
                      <p className="mb-3">
                        Yes, self-training is permitted in the UK. The Equality Act 2010 does not specify that an assistance dog must be trained by a professional organization.
                      </p>
                      <p className="mb-3">
                        However, the dog must be trained to:
                      </p>
                      <ul className="list-disc pl-6 mb-3">
                        <li>Perform specific tasks that mitigate your disability</li>
                        <li>Behave appropriately in public settings</li>
                        <li>Not be a danger or nuisance to others</li>
                      </ul>
                      <p>
                        For self-trained dogs, our certification process can provide validation of your training efforts and help with public recognition of your dog's assistance status.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ 4 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => setShowFAQ(showFAQ === 4 ? null : 4)}
                  >
                    <span>What is the difference between an assistance dog and an emotional support animal?</span>
                    <FaQuestionCircle className={`transform transition-transform ${showFAQ === 4 ? 'rotate-180' : ''}`} />
                  </button>
                  {showFAQ === 4 && (
                    <div className="p-4 bg-white">
                      <p className="mb-3">
                        <strong>Assistance/Service Dogs:</strong> These are specifically trained to perform tasks directly related to a person's disability. For example, guiding a blind person, alerting a deaf person to sounds, or retrieving items for someone with mobility issues.
                      </p>
                      <p className="mb-3">
                        <strong>Emotional Support Animals (ESAs):</strong> These provide comfort through companionship but are not specifically trained to perform disability-related tasks.
                      </p>
                      <p className="mb-3">
                        <strong>Legal Distinction:</strong> In the UK, assistance dogs are protected under the Equality Act 2010, giving them access rights to public places. Emotional support animals do not have the same legal protections for public access.
                      </p>
                      <p>
                        Our certification program is for assistance dogs that perform specific trained tasks, not for emotional support animals.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* FAQ 5 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    className="w-full flex justify-between items-center p-4 bg-gray-50 text-left font-medium hover:bg-gray-100 transition-colors"
                    onClick={() => setShowFAQ(showFAQ === 5 ? null : 5)}
                  >
                    <span>What if my assistance dog is refused access?</span>
                    <FaQuestionCircle className={`transform transition-transform ${showFAQ === 5 ? 'rotate-180' : ''}`} />
                  </button>
                  {showFAQ === 5 && (
                    <div className="p-4 bg-white">
                      <p className="mb-3">
                        If your assistance dog is refused access:
                      </p>
                      <ol className="list-decimal pl-6 mb-3">
                        <li>Calmly explain your rights under the Equality Act 2010</li>
                        <li>Show your certification (if available)</li>
                        <li>Ask to speak to a manager or supervisor</li>
                        <li>Document the incident - note names, times, and details</li>
                        <li>Consider filing a formal complaint with the establishment</li>
                        <li>Report the incident using our access refusal form</li>
                      </ol>
                      <p className="mb-3">
                        In serious cases, you might consider:
                      </p>
                      <ul className="list-disc pl-6 mb-3">
                        <li>Contacting the Equality Advisory Support Service (EASS)</li>
                        <li>Making a complaint to the Equality and Human Rights Commission</li>
                        <li>Seeking legal advice regarding disability discrimination</li>
                      </ul>
                      <p>
                        <Link href="/reportdogbreach" className="text-blue-600 hover:underline">
                          Click here to report an access refusal incident
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Still Have Questions?</h3>
                <p className="mb-4">
                  Our team is available to answer any questions you may have about service dog certification, legal rights, or the application process.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 bg-white p-4 rounded-md border border-gray-200">
                    <h4 className="font-semibold mb-2">Email Us</h4>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:dogs@homeless.website" className="text-blue-600 hover:underline">dogs@homeless.website</a>
                    </div>
                  </div>
                  <div className="flex-1 bg-white p-4 rounded-md border border-gray-200">
                    <h4 className="font-semibold mb-2">Call Us</h4>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-blue-700 hover:underline flex items-center">
              <FaArrowLeft className="mr-2" />
              Back to Homepage
            </Link>
            
            <Link href="/verify-assistance-dog" className="text-blue-700 hover:underline flex items-center">
              Verify a Certificate
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Service Dog Support</h3>
                <p className="mb-4">Helping individuals with assistance dogs understand their rights and access services in the UK.</p>
                <p>Contact us at <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a></p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/verify-assistance-dog" className="hover:underline">Verify a Certificate</Link></li>
                  <li><Link href="/reportdogbreach" className="hover:underline">Report Access Denial</Link></li>
                  <li><Link href="/protection-dogs" className="hover:underline">Protection Dogs & The Law</Link></li>
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h3 className="text-xl font-bold mb-4">Legal Information</h3>
                <p className="text-sm">The information on this website about assistance dogs and the Equality Act 2010 is provided as guidance only and should not be considered legal advice. For specific legal advice, please consult a qualified legal professional.</p>
                <p className="text-sm mt-2">© 2025 Homeless Helpers. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
