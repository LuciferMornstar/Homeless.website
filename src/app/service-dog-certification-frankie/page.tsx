'use client';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export function ServiceDogCertificationFrankiePage() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  return (
    <>
      <Head>
        <title>Official Service Dog Certification - Frankie - MorningstarRescue</title>
        <meta name="description" content="Official service dog certification for Frankie, a certified assistance dog through MorningstarRescue" />
      </Head>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap");
        
        :root {
          --primary-color: #00205b; /* Navy Blue */
          --accent-color: #c9a75c; /* Gold */
          --text-color: #000000;
          --background-color: #ffffff;
          --border-color: #c9a75c; /* Gold */
        }
      `}</style>

      <div className="font-['Libre_Baskerville',serif] leading-6 text-[var(--text-color)] bg-[#f5f5f5] m-0 p-0">
        <div className="max-w-[1000px] mx-auto my-10 p-5">
          <div className="p-5 bg-white shadow-[0_0_25px_rgba(0,0,0,0.15)]">
            <div className="relative border-2 border-[var(--border-color)] p-10 bg-[var(--background-color)] bg-[url('data:image/svg+xml,%3Csvg_width=%27100%25%27_height=%27100%25%27_xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cdefs%3E%3Cpattern_id=%27smallGrid%27_width=%2710%27_height=%2710%27_patternUnits=%27userSpaceOnUse%27%3E%3Cpath_d=%27M_10_0_L_0_0_0_10%27_fill=%27none%27_stroke=%27%23C9A75C%27_stroke-width=%270.2%27_opacity=%270.07%27/%3E%3C/pattern%3E%3C/defs%3E%3Crect_width=%27100%25%27_height=%27100%25%27_fill=%27url(%23smallGrid)%27/%3E%3C/svg%3E')] shadow-[inset_0_0_30px_rgba(201,167,92,0.1)]">
              <div className="absolute top-5 left-5 w-[60px] h-[60px] border-t-3 border-l-3 border-[var(--accent-color)] pointer-events-none"></div>
              <div className="absolute top-5 right-5 w-[60px] h-[60px] border-t-3 border-r-3 border-[var(--accent-color)] pointer-events-none"></div>
              <div className="absolute bottom-5 left-5 w-[60px] h-[60px] border-b-3 border-l-3 border-[var(--accent-color)] pointer-events-none"></div>
              <div className="absolute bottom-5 right-5 w-[60px] h-[60px] border-b-3 border-r-3 border-[var(--accent-color)] pointer-events-none"></div>

              <div className="text-center mb-5 pb-5 relative">
                <div className="flex justify-center items-center mb-4">
                  <div className="w-20 h-20 rounded-full border-2 border-[var(--accent-color)] bg-white flex justify-center items-center font-bold text-[var(--primary-color)] font-['Cinzel_Decorative',serif] text-[1.3rem]">
                    MSR
                  </div>
                  <div className="mx-[30px] text-center">
                    <h1 className="font-['Cinzel_Decorative',serif] text-[2.2rem] text-[var(--primary-color)] m-0 tracking-[1px] uppercase font-[900] mb-[10px]">
                      Service Dog Certification
                    </h1>
                    <div>
                      <span className="text-[1rem] text-[var(--primary-color)] tracking-[2px] uppercase">Official Documentation</span>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full border-2 border-[var(--accent-color)] bg-white flex justify-center items-center font-bold text-[var(--primary-color)] font-['Cinzel_Decorative',serif] text-[1.3rem]">
                    UK
                  </div>
                </div>
              </div>

              <div className="absolute top-10 right-10">
                <div className="font-['Noto_Serif',serif] text-[var(--primary-color)] text-[0.9rem] flex flex-col items-end">
                  <div className="font-bold">Registration ID:</div>
                  <div className="font-mono tracking-[1px] mt-[3px]">
                    MS8912FRK
                  </div>
                </div>
              </div>

              <div className="absolute top-10 left-10 w-[70px] h-[70px] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[var(--accent-color)] rounded-full flex items-center justify-center font-['Cinzel_Decorative',serif] text-[0.7rem] font-bold text-[var(--primary-color)]">
                  OFFICIAL
                </div>
              </div>

              <div className="text-center mb-[30px]">
                <p className="text-[1.1rem] leading-[1.7] text-justify my-[30px]">
                  This document certifies that the service dog identified below has
                  been trained and evaluated in accordance with industry standards
                  and has successfully completed all required training to perform
                  work or tasks for the benefit of an individual with a disability.
                  This dog has been trained through
                  <strong> MorningstarRescue</strong>, a recognized service dog
                  training organization, and meets or exceeds the standards for
                  public access as established by industry guidelines and UK legislation.
                </p>

                <div className="flex flex-wrap gap-[30px] my-[30px] relative">
                  <div className="flex-none w-[200px]">
                    <div className="w-[200px] h-[200px] border border-[var(--accent-color)] p-[5px] bg-white shadow-[0_3px_10px_rgba(0,0,0,0.1)]">
                      <Image
                        src="/Assets/Frankie.jpg"
                        alt="Frankie - Service Dog Portrait"
                        width={190}
                        height={190}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-[300px]">
                    <table className="w-full border-collapse">
                      <tbody>
                        <tr className="border-b border-[var(--accent-color)] border-opacity-30">
                          <td className="py-[8px] px-[10px] font-bold text-[var(--primary-color)] text-left">Dog Name:</td>
                          <td className="py-[8px] px-[10px] text-right">Frankie</td>
                        </tr>
                        <tr className="border-b border-[var(--accent-color)] border-opacity-30">
                          <td className="py-[8px] px-[10px] font-bold text-[var(--primary-color)] text-left">Breed:</td>
                          <td className="py-[8px] px-[10px] text-right">Labrador Retriever</td>
                        </tr>
                        <tr className="border-b border-[var(--accent-color)] border-opacity-30">
                          <td className="py-[8px] px-[10px] font-bold text-[var(--primary-color)] text-left">Handler:</td>
                          <td className="py-[8px] px-[10px] text-right">Thomas Anderson</td>
                        </tr>
                        <tr className="border-b border-[var(--accent-color)] border-opacity-30">
                          <td className="py-[8px] px-[10px] font-bold text-[var(--primary-color)] text-left">Service Type:</td>
                          <td className="py-[8px] px-[10px] text-right">PTSD/Anxiety Support</td>
                        </tr>
                        <tr className="border-b border-[var(--accent-color)] border-opacity-30">
                          <td className="py-[8px] px-[10px] font-bold text-[var(--primary-color)] text-left">Microchip:</td>
                          <td className="py-[8px] px-[10px] text-right">956000004325871</td>
                        </tr>
                        <tr>
                          <td className="py-[8px] px-[10px] font-bold text-[var(--primary-color)] text-left">Date of Birth:</td>
                          <td className="py-[8px] px-[10px] text-right">12 May 2022</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border border-[var(--accent-color)] p-5 my-[30px] bg-[rgba(201,167,92,0.03)] text-center">
                <h3 className="mt-0 text-[var(--primary-color)] font-['Cinzel_Decorative',serif] text-[1.4rem]">
                  Certification Details
                </h3>
                <div className="flex justify-between my-5 flex-wrap">
                  <div className="flex-none w-[48%] text-left">
                    <div className="mb-[15px]">
                      <p className="mb-[3px] text-[0.8rem] font-bold text-[var(--primary-color)]">Issued Date:</p>
                      <p className="m-0 text-[1rem]">March 1, 2025</p>
                    </div>
                    <div className="mb-[15px]">
                      <p className="mb-[3px] text-[0.8rem] font-bold text-[var(--primary-color)]">Training Standard:</p>
                      <p className="m-0 text-[1rem]">International Service Dog Standards</p>
                    </div>
                  </div>
                  <div className="flex-none w-[48%] text-left">
                    <div className="mb-[15px]">
                      <p className="mb-[3px] text-[0.8rem] font-bold text-[var(--primary-color)]">Expiry Date:</p>
                      <p className="m-0 text-[1rem]">February 15, 2027</p>
                    </div>
                    <div className="mb-[15px]">
                      <p className="mb-[3px] text-[0.8rem] font-bold text-[var(--primary-color)]">Certified Tasks:</p>
                      <p className="m-0 text-[1rem]">Anxiety Interruption, Deep Pressure Therapy, Space Creation</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[1.1rem] leading-[1.7] text-justify my-[30px]">
                This service dog is authorized to accompany the handler in all areas
                of public accommodation where members of the public are permitted,
                as provided by the UK Equality Act 2010. The handler and dog
                are protected by UK law, and businesses and organizations that
                serve the public may not discriminate against individuals with
                service animals. This includes, but is not limited to, retail shops, restaurants,
                hotels, public transport, and healthcare facilities.
              </p>

              <div className="flex justify-around mt-[50px] flex-wrap">
                <div className="text-center min-w-[250px] mb-5">
                  <div className="w-full border-b border-[var(--text-color)] mb-[10px] relative pt-[30px] before:content-['✕'] before:absolute before:left-[10px] before:top-[10px] before:text-[var(--accent-color)] before:opacity-60">
                    <Image
                      src="/Assets/signature-trainer.png"
                      alt="Lead Trainer Signature"
                      width={200}
                      height={50}
                      className="mx-auto mb-2"
                    />
                  </div>
                  <div className="font-bold mt-[5px]">Sarah Johnson</div>
                  <div className="italic text-[var(--primary-color)] text-[0.9rem]">
                    Lead Trainer, MorningstarRescue
                  </div>
                </div>

                <div className="text-center min-w-[250px] mb-5">
                  <div className="w-full border-b border-[var(--text-color)] mb-[10px] relative pt-[30px] before:content-['✕'] before:absolute before:left-[10px] before:top-[10px] before:text-[var(--accent-color)] before:opacity-60">
                    <Image
                      src="/Assets/signature-director.png"
                      alt="Director Signature"
                      width={200}
                      height={50}
                      className="mx-auto mb-2"
                    />
                  </div>
                  <div className="font-bold mt-[5px]">Dr. Mark Williams</div>
                  <div className="italic text-[var(--primary-color)] text-[0.9rem]">
                    Director of Certification, MorningstarRescue
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[60px] right-[60px] w-[150px] h-[150px] opacity-90 overflow-hidden md:block hidden">
                <div className="absolute top-0 left-0 w-full h-full border-2 border-[var(--accent-color)] rounded-full box-border"></div>
                <div className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] border-2 border-[var(--accent-color)] rounded-full flex flex-col items-center justify-center">
                  <div className="text-center transform rotate-[-25deg]">
                    <Image
                      src="/Assets/certification-seal.png"
                      alt="Official Certification Seal"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[50px] left-[60px] w-[30px] h-[80px] md:block hidden">
                <div className="w-[30px] h-[60px] bg-[var(--primary-color)] relative before:content-[''] before:absolute before:bottom-[-10px] before:left-0 before:w-[15px] before:h-[20px] before:bg-[var(--primary-color)] before:transform before:skew-y-[20deg] after:content-[''] after:absolute after:bottom-[-10px] after:right-0 after:w-[15px] after:h-[20px] after:bg-[var(--primary-color)] after:transform after:skew-y-[-20deg]"></div>
                <div className="w-[30px] h-[30px] bg-[var(--accent-color)] rounded-full absolute top-0 left-0 flex items-center justify-center text-white text-[0.6rem] font-bold uppercase tracking-[0.5px] font-['Noto_Serif',serif]">
                  CERT
                </div>
              </div>

              <div className="mt-[40px] text-center text-[0.8rem] text-[var(--primary-color)] italic border-t border-[var(--accent-color)] pt-[15px] relative">
                <p className="max-w-[80%] mx-auto">
                  This certification is provided as a courtesy to assist with public
                  access rights. Under the UK Equality Act 2010, assistance dogs are legally 
                  permitted to accompany their handlers in places where the general public are allowed.
                </p>
                <div className="absolute bottom-0 right-[40px] text-[0.8rem] italic">
                  Issue Date: March 1, 2025
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <Link
              href="/service-dog-certification"
              className="inline-block bg-[var(--primary-color)] text-white py-[10px] px-[20px] no-underline rounded-none font-['Noto_Serif',serif] uppercase tracking-[1px] text-[0.9rem] transition-colors duration-300 hover:bg-[#00133a]"
            >
              <FaArrowLeft className="inline mr-2" /> Back to Certifications
            </Link>
            
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="inline-block bg-[var(--accent-color)] text-white py-[10px] px-[20px] no-underline rounded-none font-['Noto_Serif',serif] uppercase tracking-[1px] text-[0.9rem] transition-colors duration-300 hover:bg-[#b08f3d]"
            >
              Share Certificate
            </button>
          </div>
          
          {showShareOptions && (
            <div className="mt-4 p-4 bg-white shadow-md">
              <h4 className="font-bold mb-2">Share this certificate:</h4>
              <div className="flex space-x-3">
                <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">Email</button>
                <button className="bg-green-600 text-white px-3 py-2 rounded text-sm">WhatsApp</button>
                <button className="bg-blue-400 text-white px-3 py-2 rounded text-sm">Twitter</button>
                <button className="bg-blue-800 text-white px-3 py-2 rounded text-sm">Facebook</button>
                <button className="bg-gray-800 text-white px-3 py-2 rounded text-sm">Copy Link</button>
              </div>
            </div>
          )}
          
          <div className="max-w-2xl mx-auto mt-8 bg-blue-50 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">Assistance Dogs in the UK: Your Legal Rights</h2>
            <p className="text-gray-700 mb-3">
              Under the Equality Act 2010, service providers have a duty to make reasonable adjustments to accommodate disabled people, which includes permitting assistance dogs on the premises.
            </p>
            <p className="text-gray-700 mb-3">
              If you encounter access refusal with your assistance dog, you can report this as disability discrimination. Establishments that refuse access to assistance dogs may be in breach of the law.
            </p>
            <div className="mt-4">
              <Link 
                href="/reportdogbreach"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Report an access refusal incident →
              </Link>
            </div>
          </div>
          
          <div className="max-w-2xl mx-auto mt-8 text-center text-gray-600 text-sm">
            <p>Need assistance with your service dog certification? Contact our service dog support team at <a href="mailto:dogs@homeless.website" className="text-blue-600 hover:underline">dogs@homeless.website</a></p>
            <p className="mt-2">For verification inquiries: <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a></p>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <Link
          href="/menu" 
          className="fixed bottom-5 left-5 z-[999] bg-[var(--primary-color)] text-white border-none rounded-none py-[10px] px-[20px] cursor-pointer shadow-[0_3px_6px_rgba(0,0,0,0.2)] font-['Noto_Serif',serif] uppercase tracking-[1px] text-[0.9rem] block md:hidden"
        >
          Menu
        </Link>
      </div>
    </>
  );
}

export default ServiceDogCertificationFrankiePage;
