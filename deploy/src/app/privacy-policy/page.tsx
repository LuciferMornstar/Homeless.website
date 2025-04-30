import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy & GDPR Compliance</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">Last Updated: April 30, 2025</p>
        
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Homeless Helpers ("we", "our", or "us") is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
        </p>
        <p className="mb-4">
          This policy is compliant with the General Data Protection Regulation (GDPR) and the UK Data Protection Act 2018.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="mb-4">We may collect the following types of information:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2"><strong>Personal identification information</strong>: Name, email address, phone number, and postal address (only when voluntarily provided).</li>
          <li className="mb-2"><strong>Technical information</strong>: IP address, browser type, device information, and cookies.</li>
          <li className="mb-2"><strong>Usage data</strong>: How you interact with our website and services.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="mb-4">We use the collected information for the following purposes:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">To provide and maintain our services</li>
          <li className="mb-2">To connect you with appropriate homeless support resources</li>
          <li className="mb-2">To respond to your inquiries and support requests</li>
          <li className="mb-2">To improve our website and services</li>
          <li className="mb-2">To comply with legal obligations</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Data Protection Principles</h2>
        <p className="mb-4">We adhere to the following principles when processing your data:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Lawfulness, fairness, and transparency</li>
          <li className="mb-2">Purpose limitation</li>
          <li className="mb-2">Data minimization</li>
          <li className="mb-2">Accuracy</li>
          <li className="mb-2">Storage limitation</li>
          <li className="mb-2">Integrity and confidentiality</li>
          <li className="mb-2">Accountability</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Legal Basis for Processing</h2>
        <p className="mb-4">We process your personal data based on the following legal grounds:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2"><strong>Consent</strong>: You have given explicit consent for us to process your data for specific purposes.</li>
          <li className="mb-2"><strong>Legitimate interests</strong>: Processing is necessary for our legitimate interests, provided those interests don't override your fundamental rights and freedoms.</li>
          <li className="mb-2"><strong>Legal obligation</strong>: Processing is necessary to comply with a legal obligation.</li>
          <li className="mb-2"><strong>Vital interests</strong>: In emergency situations, to protect your vital interests or those of another person.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
        <p className="mb-4">Under the GDPR and UK data protection law, you have the following rights:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2"><strong>Right to access</strong>: You can request copies of your personal data.</li>
          <li className="mb-2"><strong>Right to rectification</strong>: You can request that we correct inaccurate information.</li>
          <li className="mb-2"><strong>Right to erasure</strong>: You can request that we delete your personal data.</li>
          <li className="mb-2"><strong>Right to restrict processing</strong>: You can request that we restrict the processing of your data.</li>
          <li className="mb-2"><strong>Right to data portability</strong>: You can request the transfer of your data to another organization.</li>
          <li className="mb-2"><strong>Right to object</strong>: You can object to our processing of your personal data.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="mb-4">
          We use cookies to improve your experience on our website. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="mb-4">
          We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <p className="mb-4">
          We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mb-4">
          Email: <a href="mailto:info@homeless.website" className="text-blue-600 hover:underline">info@homeless.website</a><br />
          Phone: <a href="tel:+447853811172" className="text-blue-600 hover:underline">+44 7853 811172</a>
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
