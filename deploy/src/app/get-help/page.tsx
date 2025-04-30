import type { Metadata } from 'next';
import Link from 'next/link';
import { ServiceCard } from '@/components/ServiceCard';

export const metadata: Metadata = {
  title: 'Homeless Helpers - Get Help',
  description: 'Immediate support, resources and guidance for those facing homelessness or housing instability.',
};

export default function GetHelpPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-700 to-red-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Help Now</h1>
            <p className="text-xl mb-8">
              Immediate support and resources for those facing homelessness or housing instability
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+447853811172" className="bg-white hover:bg-gray-100 text-red-700 font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 text-center">
                Emergency Helpline
              </a>
              <Link href="#immediate-help" className="bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 text-center">
                Find Resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact Section */}
      <section id="immediate-help" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Immediate Assistance</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8 rounded-r-lg">
              <p className="text-lg font-bold text-red-700 mb-2">If you're in immediate danger:</p>
              <p className="text-gray-700">Call 999 for emergency services</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Homeless Helpers Helpline</h3>
                <p className="mb-4 text-gray-700">Our trained staff are available 24/7 to provide guidance and support.</p>
                <div className="flex items-center mb-2">
                  <span className="font-semibold w-20">Phone:</span>
                  <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-20">Email:</span>
                  <a href="mailto:helpme@homeless.website" className="text-blue-600 hover:underline">helpme@homeless.website</a>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-gray-800">Shelter Emergency Advice</h3>
                <p className="mb-4 text-gray-700">National housing and homelessness charity offering expert advice.</p>
                <div className="flex items-center mb-2">
                  <span className="font-semibold w-20">Phone:</span>
                  <a href="tel:08088004444" className="text-blue-600 hover:underline">0808 800 4444</a>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-20">Website:</span>
                  <a href="https://www.shelter.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">shelter.org.uk</a>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
              <h3 className="text-xl font-bold mb-2 text-blue-800">Local Authority Housing Departments</h3>
              <p className="text-gray-700 mb-4">
                Your local council has a legal duty to help people who are homeless or at risk of becoming homeless.
              </p>
              <Link href="https://www.gov.uk/homelessness-help-from-council" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                Find your local council's housing department →
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Support Resources</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Access a variety of services designed to provide immediate and long-term support
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              title="Find Shelter" 
              description="Emergency accommodation options, hostels, and night shelters available across the UK."
              icon="🏠"
              link="/shelters"
            />
            <ServiceCard 
              title="Food Banks" 
              description="Locations where you can access free food and essential supplies in your local area."
              icon="🍎"
              link="/foodbanks"
            />
            <ServiceCard 
              title="Healthcare Access" 
              description="Information on accessing healthcare services, including registering with a GP while homeless."
              icon="🏥"
              link="/healthcare"
            />
            <ServiceCard 
              title="Mental Health Support" 
              description="Resources for mental health challenges, including crisis support and ongoing care."
              icon="🧠"
              link="/mental-health"
            />
            <ServiceCard 
              title="Employment Help" 
              description="Job search assistance, skills development, and support returning to work."
              icon="💼"
              link="/employment"
            />
            <ServiceCard 
              title="Legal Rights" 
              description="Understanding your legal rights as a homeless person in the UK and how to access support."
              icon="⚖️"
              link="/legal-rights"
            />
          </div>
        </div>
      </section>
      
      {/* Know Your Rights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Know Your Rights</h2>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Housing Rights in the UK</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">Priority Need</h4>
                  <p className="text-gray-700">
                    Local authorities must provide accommodation if you&apos;re in &quot;priority need.&quot; This includes:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                    <li>Pregnant women</li>
                    <li>Families with children</li>
                    <li>People vulnerable due to age, disability, or mental illness</li>
                    <li>People made homeless by an emergency such as a fire or flood</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">Homelessness Reduction Act 2017</h4>
                  <p className="text-gray-700">
                    This law requires local authorities to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                    <li>Prevent homelessness for anyone at risk within 56 days</li>
                    <li>Provide a personal housing plan</li>
                    <li>Work with you for 56 days to help resolve your housing situation</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-2 text-gray-800">Healthcare Rights</h4>
                  <p className="text-gray-700">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
                    <li>Register with a GP without a fixed address</li>
                    <li>Access emergency care regardless of your housing status</li>
                    <li>Receive mental health support through the NHS</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/lettermaker" className="text-blue-600 hover:underline font-semibold">
                  Use our Letter Maker tool to help communicate with authorities →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Self-Help Tools */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Digital Support Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-indigo-600">💬</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">HelpfulBot</h3>
              <p className="text-gray-700 mb-4">
                Our AI assistant can provide immediate information about resources, rights, and next steps. Available 24/7.
              </p>
              <Link href="/helpfulbot" className="text-indigo-600 hover:underline font-semibold flex items-center">
                Chat with HelpfulBot
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-indigo-600">📝</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Letter Maker</h3>
              <p className="text-gray-700 mb-4">
                Generate professionally written letters to authorities, landlords, or service providers to help advocate for your rights.
              </p>
              <Link href="/lettermaker" className="text-indigo-600 hover:underline font-semibold flex items-center">
                Create a Letter
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-indigo-600">🧠</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Mental Health Assessment</h3>
              <p className="text-gray-700 mb-4">
                Take a confidential assessment to identify potential mental health concerns and get matched with appropriate resources.
              </p>
              <Link href="/mental-health-assessment" className="text-indigo-600 hover:underline font-semibold flex items-center">
                Take Assessment
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-indigo-600">🐕</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Service Dog Information</h3>
              <p className="text-gray-700 mb-4">
                Learn about how service dogs can support mental health and wellbeing during housing instability.
              </p>
              <Link href="/service-dog-certification" className="text-indigo-600 hover:underline font-semibold flex items-center">
                Explore Service Dogs
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Stories of Hope</h2>
            
            <div className="bg-white/10 p-8 rounded-lg backdrop-blur-sm">
              <div className="mb-6 text-3xl">❝</div>
              <blockquote className="text-xl mb-8">
                I was sleeping rough for months after losing my job and flat. The resources I found through Homeless Helpers helped me access emergency housing, mental health support, and eventually find work. Now I have my own place and I'm rebuilding my life.
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white/20 mr-4"></div>
                <div>
                  <p className="font-bold">Thomas R.</p>
                  <p className="text-white/80">London</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">We're Here to Help</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            No matter what challenges you're facing, you don't have to face them alone. Reach out today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:helpme@homeless.website" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md shadow transition duration-300">
              Email for Support
            </a>
            <a href="tel:+447853811172" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-md shadow transition duration-300">
              Call Our Helpline
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
