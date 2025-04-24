import type { Metadata } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faPhone, faBrain, faCapsules, faClinicMedical, faUserFriends, faHeartbeat, faShieldAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const metadata: Metadata = {
  title: 'Homeless Helpers - Addiction Support',
  description: 'Resources and harm reduction services for individuals experiencing homelessness and addiction in the UK.',
};

export default function AddictionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-purple-700 text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-blue-700 opacity-80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Addiction Support</h1>
            <p className="text-xl md:text-2xl mb-8">
              Support and resources for homeless individuals struggling with addiction in the UK
            </p>
            <div className="bg-white text-gray-700 p-4 rounded-lg shadow-lg text-left mt-8">
              <p className="font-semibold text-purple-800">
                Addiction and homelessness often co-occur and reinforce each other. Getting help for addiction can be a crucial step toward housing stability and improved wellbeing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Understanding Addiction and Homelessness */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faBrain} className="text-purple-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Understanding Addiction and Homelessness</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  The relationship between addiction and homelessness is complex. Each can contribute to the other, and addressing both simultaneously is often necessary for recovery.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-purple-50 p-5 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-3">How Addiction Affects Housing Stability</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Substance use can deplete financial resources needed for housing</li>
                      <li>Addiction may strain relationships with family and support networks</li>
                      <li>Substance use disorders can make it difficult to maintain employment</li>
                      <li>Some housing environments may have zero-tolerance policies regarding substance use</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">How Homelessness Affects Addiction</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Substances may be used as coping mechanisms for the trauma of homelessness</li>
                      <li>Rough sleeping environments often involve increased exposure to substances</li>
                      <li>Lack of privacy and safe spaces can make recovery more challenging</li>
                      <li>Physical health issues from homelessness can lead to substance use for pain management</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200">
                  <h3 className="font-bold text-yellow-800 mb-2 flex items-center">
                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                    Mental Health Connection
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Many people experiencing homelessness and addiction also have co-occurring mental health conditions. These three issues often interact and require integrated treatment approaches:
                  </p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Depression and anxiety may lead to self-medication with substances</li>
                    <li>Substance use can worsen existing mental health conditions</li>
                    <li>Homelessness creates significant psychological stress</li>
                    <li>Trauma is common among people experiencing homelessness and can drive substance use</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Harm Reduction Approaches */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Harm Reduction Services</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Harm reduction focuses on minimizing the negative consequences of substance use, especially when immediate abstinence may not be possible or desired.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-50 p-5 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">Needle Exchange Programs</h3>
                    <p className="text-gray-700 mb-4">
                      Access clean injecting equipment to reduce the risk of blood-borne infections like HIV and hepatitis.
                    </p>
                    <Link 
                      href="https://www.exchangesupplies.org/shopdisp_needle_exchange_directory.php" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-green-600 hover:underline"
                    >
                      Find a needle exchange near you →
                    </Link>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">Naloxone Distribution</h3>
                    <p className="text-gray-700 mb-4">
                      Naloxone is a medication that can reverse opioid overdoses. Many services provide free naloxone kits and training.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Ask at local drug services, homelessness services or pharmacies about naloxone availability.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-3">Drop-in Services</h3>
                    <p className="text-gray-700 mb-4">
                      Many cities have drop-in centers that provide a safe space, basic necessities, and connections to treatment.
                    </p>
                    <p className="text-sm text-gray-600 italic">
                      Contact local homelessness services for information about drop-in centers in your area.
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 p-5 rounded-lg">
                  <h3 className="font-bold text-indigo-800 mb-3">Housing First Approach</h3>
                  <p className="text-gray-700 mb-3">
                    The "Housing First" model provides stable housing without requiring abstinence first. Research shows this approach can be highly effective:
                  </p>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Provides a safe environment that makes addressing addiction easier</li>
                    <li>Reduces stress that can trigger substance use</li>
                    <li>Creates stability needed to engage with treatment services</li>
                    <li>Supports offered alongside housing, not as a prerequisite</li>
                  </ul>
                  <p className="mt-3 text-sm text-gray-600">
                    In the UK, many homelessness organizations are adopting Housing First principles. Ask your local council or homelessness charities about Housing First programs in your area.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Treatment Options */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faClinicMedical} className="text-red-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">NHS Addiction Treatment Services</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  The NHS offers a range of free addiction treatment services. You can access these even if you don't have a fixed address.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                    <h3 className="font-bold text-red-800 mb-3">How to Access NHS Treatment</h3>
                    <ol className="list-decimal list-inside text-gray-700 space-y-2">
                      <li>Speak to your GP (you can register with a GP even without a fixed address)</li>
                      <li>Self-refer directly to your local drug treatment service</li>
                      <li>Contact your local council's substance misuse team</li>
                      <li>Visit an NHS walk-in center or A&E if in crisis</li>
                      <li>Call NHS 111 for advice on local services</li>
                    </ol>
                    <div className="mt-4">
                      <a 
                        href="https://www.nhs.uk/service-search/other-services/Substance-misuse/LocationSearch/340" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                      >
                        Find NHS Addiction Services Near You
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-5 rounded-lg">
                      <h3 className="font-bold text-blue-800 mb-3">NHS Treatment Options</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Talking therapies</strong> - Counseling, CBT, motivational interviewing</li>
                        <li><strong>Detoxification</strong> - Medically supervised withdrawal</li>
                        <li><strong>Substitute prescribing</strong> - Medication to reduce cravings and withdrawal</li>
                        <li><strong>Residential rehabilitation</strong> - Intensive treatment in a residential setting</li>
                        <li><strong>Community support</strong> - Regular support in a community setting</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-50 p-5 rounded-lg">
                      <h3 className="font-bold text-yellow-800 mb-3">No Fixed Address?</h3>
                      <p className="text-gray-700">
                        You can still access NHS addiction services if you're homeless. Many services have specialist homeless teams or outreach workers who can help you navigate the system.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-3">Medication-Assisted Treatment (MAT)</h3>
                  <p className="text-gray-700 mb-4">
                    The NHS offers medication to help manage cravings and withdrawal symptoms, particularly for alcohol and opioid addiction:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">For Opioid Addiction:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Methadone</strong> - Reduces withdrawal symptoms and cravings</li>
                        <li><strong>Buprenorphine</strong> - Similar to methadone but with less sedation</li>
                        <li><strong>Naltrexone</strong> - Blocks the effects of opioids</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">For Alcohol Addiction:</h4>
                      <ul className="list-disc list-inside text-gray-700">
                        <li><strong>Acamprosate</strong> - Reduces cravings and withdrawal symptoms</li>
                        <li><strong>Disulfiram</strong> - Causes unpleasant reactions if alcohol is consumed</li>
                        <li><strong>Naltrexone</strong> - Reduces the pleasurable effects of alcohol</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Charity and Community Support */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faHandHoldingHeart} className="text-purple-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Charity and Community Support</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Many charities and community organizations offer addiction support specifically designed for people experiencing homelessness.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-purple-800 mb-3">Change Grow Live</h3>
                    <p className="text-gray-700 mb-3">One of the largest charities in the UK providing substance misuse and mental health services.</p>
                    <p className="text-gray-700"><strong>Phone:</strong> 01444 472 900</p>
                    <a href="https://www.changegrowlive.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline block mt-2">changegrowlive.org</a>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-purple-800 mb-3">Turning Point</h3>
                    <p className="text-gray-700 mb-3">Provides support for people facing challenges with drugs, alcohol and mental health.</p>
                    <p className="text-gray-700"><strong>Phone:</strong> 020 7481 7600</p>
                    <a href="https://www.turning-point.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline block mt-2">turning-point.co.uk</a>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                    <h3 className="font-bold text-purple-800 mb-3">Addaction</h3>
                    <p className="text-gray-700 mb-3">Offers community-based services for people affected by drug and alcohol problems.</p>
                    <a href="https://www.wearewithyou.org.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline block mt-2">wearewithyou.org.uk</a>
                  </div>
                </div>
                
                <div className="mt-8 bg-purple-50 p-5 rounded-lg">
                  <h3 className="font-bold text-purple-800 mb-3">Peer Support and Mutual Aid Groups</h3>
                  <p className="text-gray-700 mb-4">
                    These groups provide community support from others who have experienced addiction:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Alcoholics Anonymous (AA)</h4>
                      <p className="text-gray-700 mb-2">
                        Free support groups for people struggling with alcohol addiction.
                      </p>
                      <p className="text-gray-700"><strong>Helpline:</strong> 0800 9177 650</p>
                      <a href="https://www.alcoholics-anonymous.org.uk" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline block mt-1">alcoholics-anonymous.org.uk</a>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Narcotics Anonymous (NA)</h4>
                      <p className="text-gray-700 mb-2">
                        Support for those recovering from drug addiction.
                      </p>
                      <p className="text-gray-700"><strong>Helpline:</strong> 0300 999 1212</p>
                      <a href="https://ukna.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline block mt-1">ukna.org</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mental Health and Addiction */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faHeartbeat} className="text-blue-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Mental Health and Addiction</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  Mental health conditions and addiction often occur together. This is known as "dual diagnosis" or "co-occurring disorders."
                </p>
                
                <div className="bg-blue-50 p-5 rounded-lg mb-8">
                  <h3 className="font-bold text-blue-800 mb-3">Common Co-occurring Mental Health Conditions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Depression</strong> - Persistent low mood, hopelessness</li>
                      <li><strong>Anxiety disorders</strong> - Excessive worry, panic attacks</li>
                      <li><strong>Post-traumatic stress disorder (PTSD)</strong> - From traumatic experiences</li>
                      <li><strong>Bipolar disorder</strong> - Extreme mood swings</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Personality disorders</strong> - Difficulty with emotions and relationships</li>
                      <li><strong>Schizophrenia</strong> - Changes in thinking and perception</li>
                      <li><strong>Attention deficit hyperactivity disorder (ADHD)</strong> - Difficulty with attention and impulse control</li>
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-yellow-50 p-5 rounded-lg">
                    <h3 className="font-bold text-yellow-800 mb-3">Integrated Treatment</h3>
                    <p className="text-gray-700 mb-3">
                      The most effective approach is integrated treatment that addresses both addiction and mental health simultaneously:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Comprehensive assessment of both conditions</li>
                      <li>Coordinated treatment planning</li>
                      <li>Mental health and addiction specialists working together</li>
                      <li>Medications for both conditions when appropriate</li>
                      <li>Psychotherapy addressing both issues</li>
                      <li>Long-term follow-up and support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-5 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">Accessing Dual Diagnosis Support</h3>
                    <p className="text-gray-700 mb-3">
                      In the UK, you can access dual diagnosis support through:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>GP referral</strong> - Your GP can refer you to appropriate services</li>
                      <li><strong>Community Mental Health Teams (CMHTs)</strong> - Local NHS mental health services</li>
                      <li><strong>Drug and Alcohol Services</strong> - Many have specialists in dual diagnosis</li>
                      <li><strong>Crisis Teams</strong> - For urgent mental health and addiction issues</li>
                      <li><strong>Specialist Dual Diagnosis Services</strong> - Available in some areas</li>
                    </ul>
                    <a 
                      href="https://www.nhs.uk/mental-health/nhs-voluntary-charity-services/charity-and-voluntary-services/dual-diagnosis-mental-illness-and-substance-misuse/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-green-600 hover:underline block mt-3"
                    >
                      Learn more about dual diagnosis on the NHS website →
                    </a>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5">
                  <h3 className="font-bold text-gray-800 mb-3">Take Our Mental Health Assessment</h3>
                  <p className="text-gray-700 mb-4">
                    If you're concerned about your mental health alongside addiction issues, our free, confidential mental health assessment can help you understand your needs better.
                  </p>
                  <Link 
                    href="/mental-health" 
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Take Mental Health Assessment
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Crisis Support */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <FontAwesomeIcon icon={faPhone} className="text-red-600 text-3xl mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Crisis Support</h2>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-gray-700 mb-6">
                  If you or someone you know is in a crisis related to addiction, these resources can provide immediate help:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-5 rounded-lg">
                    <h3 className="font-bold text-red-800 mb-3">Emergency Services</h3>
                    <p className="text-gray-700 mb-3">
                      Call <strong>999</strong> immediately if:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Someone is experiencing a drug overdose</li>
                      <li>Someone is experiencing severe alcohol withdrawal</li>
                      <li>Someone is at immediate risk of harming themselves or others</li>
                      <li>Someone is experiencing serious medical complications</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-3">NHS Helplines</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FontAwesomeIcon icon={faPhone} className="text-blue-700" />
                        </div>
                        <div>
                          <p className="font-semibold">NHS 111</p>
                          <p className="text-gray-700">For urgent medical advice when it's not a life-threatening emergency</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FontAwesomeIcon icon={faPhone} className="text-blue-700" />
                        </div>
                        <div>
                          <p className="font-semibold">Mental Health Crisis Line: 0800 731 2864</p>
                          <p className="text-gray-700">24/7 support for mental health crises</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-5 rounded-lg">
                    <h3 className="font-bold text-green-800 mb-3">Support Helplines</h3>
                    <ul className="list-none space-y-3">
                      <li className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <FontAwesomeIcon icon={faPhone} className="text-green-700" />
                        </div>
                        <div>
                          <p className="font-semibold">FRANK: 0300 123 6600</p>
                          <p className="text-gray-700">Confidential advice about drugs and alcohol</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <FontAwesomeIcon icon={faPhone} className="text-green-700" />
                        </div>
                        <div>
                          <p className="font-semibold">Samaritans: 116 123</p>
                          <p className="text-gray-700">24/7 emotional support helpline</p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-full mr-3">
                          <FontAwesomeIcon icon={faPhone} className="text-green-700" />
                        </div>
                        <div>
                          <p className="font-semibold">Drinkline: 0300 123 1110</p>
                          <p className="text-gray-700">National alcohol helpline</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-lg">
                    <h3 className="font-bold text-purple-800 mb-3">Walk-in Services</h3>
                    <p className="text-gray-700 mb-3">
                      You can visit these services without an appointment for urgent support:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>A&E departments (for medical emergencies)</li>
                      <li>NHS walk-in centers</li>
                      <li>Some drug and alcohol services offer drop-in sessions</li>
                      <li>Homeless day centers often have addiction support workers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Need Help Now? CTA */}
          <section className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help With Addiction?</h2>
            <p className="text-xl mb-6">Our team can connect you with local addiction support services</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:03001236600" 
                className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Call FRANK: 0300 123 6600
              </a>
              <Link 
                href="/mental-health" 
                className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-full shadow-md transition-colors"
              >
                <FontAwesomeIcon icon={faBrain} className="mr-2" />
                Mental Health Assessment
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
