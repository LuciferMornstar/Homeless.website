import React from 'react';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <p className="mb-4">Last Updated: April 30, 2025</p>
        
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="mb-4">
          Welcome to Homeless Helpers. These Terms of Service ("Terms") govern your use of our website and the services we offer. By accessing or using our website, you agree to be bound by these Terms.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Use of Our Services</h2>
        <p className="mb-4">
          Our website provides information, resources, and support for individuals experiencing homelessness or at risk of homelessness in the UK. We strive to ensure that all information is accurate and up-to-date, but we cannot guarantee this.
        </p>
        <p className="mb-4">
          The content on our website is for general information purposes only and does not constitute legal, financial, or professional advice. Always seek advice from qualified professionals regarding your specific circumstances.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">User Conduct</h2>
        <p className="mb-4">When using our website, you agree not to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Use our services in any way that violates any applicable law or regulation</li>
          <li className="mb-2">Attempt to gain unauthorized access to any part of our website</li>
          <li className="mb-2">Use our website to transmit any harmful software or data</li>
          <li className="mb-2">Engage in any conduct that restricts or inhibits anyone's use or enjoyment of our website</li>
          <li className="mb-2">Harass, abuse, or harm another person through our services</li>
          <li className="mb-2">Impersonate any person or entity, or falsely state or misrepresent yourself</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
        <p className="mb-4">
          The content on our website, including text, graphics, logos, images, and software, is owned by or licensed to Homeless Helpers and is protected by copyright and other intellectual property laws.
        </p>
        <p className="mb-4">
          You may view, download, and print content from our website for your personal, non-commercial use only. You must not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information obtained from our website without our express written permission.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Service Dogs</h2>
        <p className="mb-4">
          Our website provides information about service dogs for individuals experiencing homelessness. While we strive to provide accurate information, we are not responsible for any disputes that may arise regarding service dog certification or access rights.
        </p>
        <p className="mb-4">
          The information provided about service dogs is based on UK law and regulations as of the date of publication. Laws regarding service dogs may vary by location and may change over time.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Links to Third-Party Websites</h2>
        <p className="mb-4">
          Our website may contain links to third-party websites or services that are not owned or controlled by Homeless Helpers. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by applicable law, Homeless Helpers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li className="mb-2">Your access to or use of or inability to access or use our services</li>
          <li className="mb-2">Any conduct or content of any third party on our services</li>
          <li className="mb-2">Any content obtained from our services</li>
          <li className="mb-2">Unauthorized access, use, or alteration of your transmissions or content</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
        <p className="mb-4">
          We may revise these Terms from time to time. The most current version will always be on this page. We encourage you to review these Terms periodically for any changes. Changes are effective when they are posted on this page.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about these Terms, please contact us at:
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
