'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define types for dog data
interface Dog {
  id: number;
  name: string;
}

function ProtectionDogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  // Load dog images into the gallery
  useEffect(() => {
    async function loadDogGallery() {
      try {
        // Try to fetch from API first
        const res = await fetch('/api/dogs');
        const files = await res.json();
        
        if (files.length) {
          // Process API response
          const dogData = files
            .filter((f: string) => f.toLowerCase().endsWith('.jpeg'))
            .sort((a: string, b: string) => parseInt(a) - parseInt(b))
            .map((file: string) => {
              const id = parseInt(file.replace(/\.jpeg$/i, ''));
              return { id, name: `Dog #${id}` };
            });
          setDogs(dogData);
        } else {
          // Fallback to static list
          createFallbackDogs();
        }
      } catch (err) {
        // API failed, use fallback
        createFallbackDogs();
      }
    }

    function createFallbackDogs() {
      // Create a fallback list of 13 dogs
      const fallbackDogs = Array.from({ length: 13 }, (_, i) => ({
        id: i + 1,
        name: `Dog #${i + 1}`
      }));
      setDogs(fallbackDogs);
    }

    loadDogGallery();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slideUp">Guardians in Small Packages</h1>
            <p className="text-xl mb-8 animate-slideUp">Training rescued dachshunds to provide comfort, companionship, and a crucial layer of protection for vulnerable individuals.</p>
            <a href="#training" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 animate-slideUp">
              Learn About Our Training
            </a>
          </div>
        </div>
      </section>

      <main id="main-content">
        {/* About Section */}
        <section className="py-16" id="about">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="/public/Assets/dogs/1.jpeg" 
                    alt="Rescued Dachshund #1" 
                    width={600} 
                    height={400} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-2">About Morningstar Rescues</h2>
                <div className="w-20 h-1 bg-red-600 mb-6"></div>
                <p className="mb-4">Morningstar Rescues was founded on the belief that every individual deserves to feel safe and that the unique bond between humans and animals can be a powerful force for healing and protection. We specialize in rescuing dachshunds, recognizing their intelligence, loyalty, and surprisingly loud bark!</p>
                <p className="mb-4">We provide these deserving dogs with a second chance, offering them love, rehabilitation, and specialized training. Our goal is to place them in homes where they can serve as more than just pets – they become vigilant companions for children and vulnerable adults.</p>
                <div className="border-l-4 border-red-600 bg-red-50 p-4 mt-4">
                  Our trained dachshunds are intended to act as an alert system and deterrent. They are companions that provide comfort and can signal potential danger, but they are not a substitute for adult supervision, professional security measures, or emergency services.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gray-100" id="mission">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Our Mission: Alert &amp; Protect</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="text-center max-w-4xl mx-auto mb-4">Our core mission is twofold: to rescue dachshunds in need and to train them to become sensitive alert companions for minors and vulnerable individuals. We focus on empowering those who may have difficulty recognizing or communicating discomfort in potentially unsafe situations.</p>
            <p className="text-center max-w-4xl mx-auto">We aim to equip our dachshunds with the skills to recognize specific cues of distress from their handlers and to react appropriately by creating noise (barking) and space, drawing attention to the situation and potentially deterring unwanted interaction.</p>
          </div>
        </section>

        {/* Why Dachshunds Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Why Dachshunds?</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                <h3 className="text-xl font-semibold mb-3">Surprisingly Loud Bark</h3>
                <p>Their bark is disproportionately loud for their size, making it an effective alert signal that demands attention.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                <h3 className="text-xl font-semibold mb-3">Loyal &amp; Attuned</h3>
                <p>Dachshunds form strong bonds with their families and are often highly sensitive to their owner's emotional state.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                <h3 className="text-xl font-semibold mb-3">Intelligent &amp; Trainable</h3>
                <p>Despite a reputation for stubbornness, they are intelligent dogs capable of learning complex commands and cues with positive reinforcement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Training Program Section */}
        <section className="py-16 bg-gray-100" id="training">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-2">Our Specialized Training Program</h2>
                <div className="w-20 h-1 bg-red-600 mb-6"></div>
                <p className="mb-4">Our training program is built on positive reinforcement techniques, patience, and a deep understanding of both canine behavior and the needs of vulnerable individuals. It includes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-bold">Basic Obedience &amp; Socialization:</span> Foundation skills: sit, stay, recall, leash etiquette, and positive interaction with people, pets, and varied environments.</li>
                  <li><span className="font-bold">Distress Cue Recognition:</span> Dogs learn handler-specific signals (verbal code words, hand gestures, breathing patterns) denoting discomfort or fear, including silent cues for non-verbal individuals.</li>
                  <li><span className="font-bold">Alert Barking Protocol:</span> Distinct barking sequence trained to interrupt inappropriate contact and draw immediate attention, differentiating from routine barking.</li>
                  <li><span className="font-bold">Barrier &amp; Comfort Positioning:</span> Taught to place themselves between handler and intruder or to nestle close for reassurance, creating physical boundaries.</li>
                  <li><span className="font-bold">Contextual Differentiation:</span> Training to distinguish normal touch (petting, handling) from unwanted contact by relying on the handler's distress cue to prevent false alarms.</li>
                  <li><span className="font-bold">Advanced Protection Scenarios:</span> Simulated scenarios: crowded spaces, quick reach attempts, provider confusion drills (grooming vs. harmful touch). Dogs learn adaptive responses.</li>
                  <li><span className="font-bold">Continual Reinforcement:</span> Ongoing handler-led refreshers: monthly drills, habit-building for consistent performance under stress.</li>
                  <li><span className="font-bold">Public Access &amp; Distraction Control:</span> Maintain focus in busy environments with distractions: public transit, school halls, community events.</li>
                </ul>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="/public/Assets/dogs/2.jpeg" 
                    alt="Dachshund training session" 
                    width={600} 
                    height={400} 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dogs Gallery Section */}
        <section className="py-16" id="dogs">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Our Guardians Gallery</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {dogs.map((dog) => (
                <Link 
                  href={`/dog-profile?dog=${dog.id}`} 
                  key={dog.id}
                  className="block group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 transform group-hover:scale-105 animate-fadeIn">
                    <div className="relative h-64">
                      <Image 
                        src={`/public/Assets/dogs/${dog.id}.jpeg`} 
                        alt={`Rescue Dog ${dog.id}`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-600">{dog.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Training Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Protection From Inappropriate Touch</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">Handler Distress Signals</h3>
                  <p>Verbal phrases, safe words, gentle tugs on leash, or specific hand gestures that trigger the dog's protective behavior.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">Immediate Alert Barking</h3>
                  <p>Loud, structured bark pattern that signals caregivers and deters unwanted touch.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">Physical Barrier Formation</h3>
                  <p>Strategic positioning to block or slow an intruder, creating a safe perimeter around the handler.</p>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">Reversal Drills</h3>
                  <p>Drills where the handler and dog practice turning away from strangers or moving to safety zones when contact escalates.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition duration-300 animate-fadeIn">
                  <h3 className="text-xl font-semibold mb-3">Long-Term Bonding &amp; Trust</h3>
                  <p>Consistent positive interactions, play-based trust exercises, and handler confidence coaching ensure the dog's reliability.</p>
                </div>
              </div>
            </div>
            <p className="text-center max-w-4xl mx-auto mt-8">
              By combining keen sensitivity with structured training, our dachshunds provide an empowering safety net—giving vulnerable individuals a trusted advocate they can rely on in challenging situations.
            </p>
          </div>
        </section>

        {/* Apply Section */}
        <section className="py-16 text-center" id="apply">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Apply to Receive a Trained Guardian</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto mb-8">Our application process is designed to ensure the right match between a Dachshund Guardian and those who need companionship and protection. If you or someone you care for could benefit from a trained companion, please complete our secure application form.</p>
            <Link 
              href="/apply" 
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Proceed to Application
            </Link>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-16 bg-gray-100 text-center" id="support">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Support Our Mission</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto mb-8">Morningstar Rescues depends on the generosity of supporters to rescue, rehabilitate, and train our dachshund guardians. Your contributions enable us to save lives and bring peace of mind to vulnerable individuals.</p>
            <div className="space-x-4">
              <Link 
                href="/donate" 
                className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Donate Now
              </Link>
              <Link 
                href="/volunteer" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 text-center" id="contact">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-2">Contact Us</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <p className="mb-6">Have questions or need assistance? Reach out to our team:</p>
            <ul className="space-y-2 max-w-xl mx-auto">
              <li><span className="font-bold">General Inquiries:</span> <a href="mailto:info@morningstarrescues.org" className="text-red-600 hover:underline">info@morningstarrescues.org</a></li>
              <li><span className="font-bold">Applications:</span> <a href="mailto:applications@morningstarrescues.org" className="text-red-600 hover:underline">applications@morningstarrescues.org</a></li>
              <li><span className="font-bold">Support &amp; Donations:</span> <a href="mailto:support@morningstarrescues.org" className="text-red-600 hover:underline">support@morningstarrescues.org</a></li>
              <li><span className="font-bold">Volunteer Coordination:</span> <a href="mailto:volunteer@morningstarrescues.org" className="text-red-600 hover:underline">volunteer@morningstarrescues.org</a></li>
            </ul>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Testimonials</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
                <p className="italic mb-4">"Ruby has transformed our family's life. My daughter feels safer and more confident knowing her guardian is by her side."</p>
                <p className="font-semibold">— Sarah T., Parent</p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
                <p className="italic mb-4">"Max alerted us during a late-night crisis at the shelter. His training truly saves lives."</p>
                <p className="font-semibold">— John M., Shelter Director</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16" id="faq">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How do I apply for a Dachshund Guardian?</h3>
                <p>Visit our <Link href="/apply" className="text-red-600 hover:underline">application page</Link> to complete the form. We review each application to ensure the best match.</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Can I adopt a trained dog if I move away?</h3>
                <p>Yes. Our guardians can accompany you nationwide. Please notify us with your new address so we can update records and provide local support.</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What support is provided post-placement?</h3>
                <p>We offer 12 months of complimentary follow-up, including training refreshers, virtual consultations, and a 24/7 helpline at <a href="mailto:support@morningstarrescues.org" className="text-red-600 hover:underline">support@morningstarrescues.org</a>.</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">How can I volunteer?</h3>
                <p>Visit our <Link href="/volunteer" className="text-red-600 hover:underline">volunteer page</Link> to view current opportunities and registration details.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Help Us Train Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">Help Us Train Our Guardians</h2>
            <div className="w-24 h-1 bg-red-600 mx-auto mb-6"></div>
            <div className="max-w-4xl mx-auto">
              <p className="mb-4">Our dachshund guardians undergo extensive, specialized training to become alert companions for those who need them most. You can support their journey by:</p>
              <ul className="list-disc pl-6 space-y-2 mb-8">
                <li><span className="font-bold">Volunteer as a Training Assistant:</span> Assist our trainers in socialization exercises, obstacle courses, and cue practice. No prior experience needed — we provide all instruction.</li>
                <li><span className="font-bold">Sponsor a Training Session:</span> Cover the cost of treats, equipment, or professional coaching. Your sponsorship helps us train more dogs every month.</li>
                <li><span className="font-bold">Donate Training Supplies:</span> We welcome new or gently used harnesses, clickers, agility gear, and high-value treats. Contact <a href="mailto:training@morningstarrescues.org" className="text-red-600 hover:underline">training@morningstarrescues.org</a>.</li>
                <li><span className="font-bold">Share Your Skills:</span> If you're a certified trainer, veterinarian, or behaviorist, offer workshops or seminars for our staff and volunteers.</li>
              </ul>
              <div className="text-center">
                <Link 
                  href="/volunteer" 
                  className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 mr-4"
                >
                  Become a Training Volunteer
                </Link>
                <Link 
                  href="/donate" 
                  className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
                >
                  Donate Supplies
                </Link>
                <p className="mt-4 text-sm">Questions? Email our Training Coordinator at <a href="mailto:training@morningstarrescues.org" className="text-red-600 hover:underline">training@morningstarrescues.org</a>.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Add some CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
}

// Only export one default component
export default ProtectionDogsPage;
