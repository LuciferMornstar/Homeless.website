import React from 'react';
import Link from 'next/link';

export default function AccessibilityStatement() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Accessibility Statement</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">Last Updated: April 30, 2025</p>
        
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="mb-4">
          Homeless Helpers is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Measures Taken</h2>
        <p className="mb-4">
          We have taken the following measures to ensure accessibility:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Include accessibility as part of our mission statement</li>
          <li className="mb-2">Integrate accessibility into our procurement practices</li>
          <li className="mb-2">Provide clear and simple content for people of all cognitive abilities</li>
          <li className="mb-2">Ensure sufficient color contrast between text and backgrounds</li>
          <li className="mb-2">Use descriptive alt text for all images</li>
          <li className="mb-2">Ensure keyboard navigation for all interactive elements</li>
          <li className="mb-2">Design forms with clear labels and error messages</li>
          <li className="mb-2">Provide transcripts for audio content and captions for video content</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Conformance Status</h2>
        <p className="mb-4">
          The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
        </p>
        <p className="mb-4">
          Our website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Cognitive Accessibility</h2>
        <p className="mb-4">
          We recognize that our audience includes individuals with a wide range of cognitive abilities. We strive to:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Use plain language and avoid jargon</li>
          <li className="mb-2">Provide clear and simple navigation</li>
          <li className="mb-2">Break information into manageable chunks</li>
          <li className="mb-2">Use visual aids to support text where appropriate</li>
          <li className="mb-2">Allow users to control movement and animations</li>
          <li className="mb-2">Provide clear error messages and recovery options</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <p className="mb-4">
          We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers:
        </p>
        <p className="mb-4">
          Email: <a href="mailto:info@homeless.website" className="text-blue-600 hover:underline">info@homeless.website</a><br />
          Phone: <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a>
        </p>
        <p className="mb-4">
          We try to respond to feedback within 3 business days.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Assessment</h2>
        <p className="mb-4">
          Our website was last tested for accessibility compliance on April 15, 2025. The assessment was conducted internally.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">British Law Compliance</h2>
        <p className="mb-4">
          This accessibility statement is provided in accordance with the Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 and the Equality Act 2010.
        </p>
      </div>
      
      <div className="flex justify-center mt-8">
        <Link href="/" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
