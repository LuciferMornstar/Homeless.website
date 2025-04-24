import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faHospital, faMedkit, faPills, faUser, faAmbulance, faHandHoldingMedical, faBrain, faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homeless Helpers - Healthcare',
  description: 'Information on accessing healthcare services, registering with a GP, and mental health support for those experiencing homelessness in the UK.',
};

export function HealthcarePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">Healthcare Resources</h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-300">
              Access healthcare resources for homeless individuals across the UK
            </p>
            <div className="bg-white text-gray-700 p-4 rounded-lg shadow-lg text-left mt-8">
              <p className="font-semibold text-blue-800">
                Under British law, all individuals have the right to access NHS healthcare services, regardless of housing status.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Mental Health Support */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faBrain} className="text-purple-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Mental Health Support</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Homelessness can significantly impact mental wellbeing. The following resources are available to help you manage your mental health:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <h3 className="font-bold text-purple-800 mb-2">Free Mental Health Assessment</h3>
                    <p className="text-gray-700 mb-4">Take our confidential assessment to understand your mental health needs better.</p>
                    <Link 
                      href="/mental-health" 
                      className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Take Assessment
                    </Link>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h3 className="font-bold text-blue-800 mb-2">Crisis Support</h3>
                    <p className="text-gray-700 mb-4">For immediate mental health support:</p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Samaritans: <strong>116 123</strong> (24/7, free)</li>
                      <li>Crisis Text Line: Text <strong>SHOUT to 85258</strong></li>
                      <li>NHS Mental Health: <strong>111, option 2</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 mb-6">
                  <h3 className="font-bold text-yellow-800 mb-2">Access to NHS Mental Health Services</h3>
                  <p className="text-gray-700 mb-3">In the UK, you can access mental health services even if you don't have a fixed address:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>You have the right to register with a GP without a fixed address</li>
                    <li>Ask to register as a temporary patient if needed</li>
                    <li>Use a care-of address (day center, hostel, or friend's address)</li>
                    <li>Some areas have dedicated homeless healthcare teams</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Register with a GP */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faUser} className="text-blue-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Registering with a GP</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Everyone in the UK has the right to register with a GP, even if you don't have proof of address, ID, or immigration status.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-3">How to Register</h3>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2">
                      <li>Find a local GP surgery using the <a href="https://www.nhs.uk/service-search/find-a-gp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NHS website</a></li>
                      <li>Contact the GP surgery to register (in person, phone, or online)</li>
                      <li>Ask about registering without a fixed address</li>
                      <li>Complete a GMS1 form (you can ask for help with this)</li>
                      <li>Explain your situation if you have no ID or proof of address</li>
                    </ol>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">If You're Refused</h3>
                    <p className="text-gray-700 mb-3">If a GP refuses to register you:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Ask for the reason in writing</li>
                      <li>Contact your local Healthwatch or NHS England Customer Contact Centre: <strong>0300 311 22 33</strong></li>
                      <li>Reach out to Groundswell's #HealthNow peer advocates: <strong>03000 039 600</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                  <h3 className="font-bold text-green-800 mb-2">Special Services for Homeless Individuals</h3>
                  <p className="text-gray-700 mb-3">Some areas have dedicated healthcare services for homeless people:</p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Homeless Health Service</li>
                    <li>Mobile health units that visit hostels and day centers</li>
                    <li>Specialist GP practices for homeless patients</li>
                    <li>Ask at your local day center or shelter for information</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Emergency Healthcare */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faAmbulance} className="text-red-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Emergency Healthcare</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  If you need urgent medical attention, you have several options:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h3 className="font-bold text-red-800 mb-2">A&E Departments</h3>
                    <p className="text-gray-700">For life-threatening emergencies, go to your nearest A&E department or call <strong>999</strong>.</p>
                  </div>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h3 className="font-bold text-blue-800 mb-2">NHS 111</h3>
                    <p className="text-gray-700">For urgent but non-life-threatening issues, call <strong>111</strong> for advice on where to go.</p>
                  </div>
                  
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h3 className="font-bold text-green-800 mb-2">Walk-in Centres</h3>
                    <p className="text-gray-700">For minor injuries and illnesses, visit a walk-in centre. No appointment needed.</p>
                  </div>
                </div>

                <div className="bg-red-50 p-5 rounded-lg">
                  <h3 className="font-bold text-red-800 mb-2">Remember</h3>
                  <p className="text-gray-700">
                    You have the right to receive emergency medical care regardless of your housing situation. 
                    Hospitals cannot refuse to treat you in an emergency because you don't have an address or ID.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Medication & Prescriptions */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faPills} className="text-green-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Medication & Prescriptions</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Managing medications while homeless can be challenging. Here are some resources to help:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-gray-800 mb-3">Getting Prescriptions</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Register with a GP to receive prescriptions</li>
                      <li>Ask your GP about medication delivery options</li>
                      <li>Some pharmacies offer services for people without fixed addresses</li>
                      <li>Explain your situation to the pharmacist who may be able to help</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">Prescription Costs</h3>
                    <p className="text-gray-700 mb-3">You may be eligible for free prescriptions if you:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Receive certain benefits</li>
                      <li>Have specific medical conditions</li>
                      <li>Are over 60 or under 16 (or under 19 in full-time education)</li>
                      <li>Have an HC2 certificate (through the NHS Low Income Scheme)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2">HC2 Certificates</h3>
                  <p className="text-gray-700 mb-3">
                    If you're on a low income, you can apply for an HC2 certificate which provides free:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li>NHS prescriptions</li>
                    <li>NHS dental treatment</li>
                    <li>NHS sight tests</li>
                    <li>Glasses or contact lenses</li>
                    <li>Travel to NHS appointments</li>
                    <li>NHS wigs and fabric supports</li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Ask at a day center, hostel, or Jobcentre Plus for an HC1 form to apply.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Support Organizations */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faHandHoldingMedical} className="text-blue-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Support Organizations</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  These organizations can help you access healthcare services while homeless:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-blue-800 mb-3">Groundswell</h3>
                    <p className="text-gray-700 mb-3">Peer advocacy and support to access healthcare.</p>
                    <p className="text-gray-700"><strong>Phone:</strong> 03000 039 600</p>
                    <a href="https://groundswell.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-2">groundswell.org.uk</a>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-blue-800 mb-3">Crisis</h3>
                    <p className="text-gray-700 mb-3">Offers health services and support at Skylight centres.</p>
                    <p className="text-gray-700"><strong>Phone:</strong> 0300 636 1967</p>
                    <a href="https://www.crisis.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-2">crisis.org.uk</a>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-blue-800 mb-3">Pathway</h3>
                    <p className="text-gray-700 mb-3">Healthcare for homeless people in hospitals.</p>
                    <a href="https://www.pathway.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mt-2">pathway.org.uk</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Need Help? CTA */}
          <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Now?</h2>
            <p className="text-xl mb-6">Our team can connect you with local healthcare services</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:08005555HELP" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Call 0800-555-HELP
              </a>
              <Link 
                href="/emergency" 
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                <FontAwesomeIcon icon={faAmbulance} className="mr-2" />
                Emergency Resources
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer information including links to more specific health resources could be added here */}
    </main>
  );
}
