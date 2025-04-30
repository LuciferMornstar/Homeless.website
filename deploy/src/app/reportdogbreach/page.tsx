'use client';

import React, { useState, useRef, FormEvent, ChangeEvent } from 'react';
import Link from 'next/link';

interface FormData {
  reporterName: string;
  reporterEmail: string;
  reporterPhone: string;
  businessName: string;
  businessAddress: string;
  incidentDate: string;
  description: string;
  contactConsent: boolean;
}

interface FileAttachment {
  name: string;
  size: number;
  type: string;
  lastModified?: number;
}

export default function ReportDogBreach() {
  const [formData, setFormData] = useState<FormData>({
    reporterName: '',
    reporterEmail: '',
    reporterPhone: '',
    businessName: '',
    businessAddress: '',
    incidentDate: '',
    description: '',
    contactConsent: false
  });
  
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAttachment = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...fileList]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (formRef.current && !formRef.current.checkValidity()) {
      // Trigger browser's native validation
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulating form submission. In a real app, you'd use an API call
    setTimeout(() => {
      console.log('Form Data:', formData);
      console.log('Attachments:', attachments);
      
      // Reset form after submission
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormData({
        reporterName: '',
        reporterEmail: '',
        reporterPhone: '',
        businessName: '',
        businessAddress: '',
        incidentDate: '',
        description: '',
        contactConsent: false
      });
      
      setAttachments([]);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Report a Service Dog Access Denial</h1>
          
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
              <h2 className="text-green-800 text-xl font-semibold mb-3">Report Submitted Successfully</h2>
              <p className="text-green-700 mb-4">
                Thank you for reporting this incident. Your report helps us document and address access issues for service dog handlers.
              </p>
              <p className="text-green-700 mb-4">
                We will review your report and may contact you if more information is needed (if you provided consent).
              </p>
              <div className="mt-6">
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mr-3"
                >
                  Submit Another Report
                </button>
                <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded inline-block">
                  Return Home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Use this form to report businesses or organisations that unlawfully denied access to a legitimate assistance dog in the UK. Your reports help us advocate for proper enforcement of the Equality Act 2010.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-blue-700">
                  <strong>Note:</strong> Under the Equality Act 2010, assistance dog handlers have the right to access most services and premises that are open to the public. Service providers cannot refuse entry to someone with an assistance dog without justification.
                </p>
              </div>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="reporterName" className="block text-gray-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        id="reporterName"
                        name="reporterName"
                        value={formData.reporterName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="reporterEmail" className="block text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        id="reporterEmail"
                        name="reporterEmail"
                        value={formData.reporterEmail}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="reporterPhone" className="block text-gray-700 mb-1">Phone Number (optional)</label>
                    <input
                      type="tel"
                      id="reporterPhone"
                      name="reporterPhone"
                      value={formData.reporterPhone}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Incident Details</h2>
                  
                  <div className="mb-4">
                    <label htmlFor="businessName" className="block text-gray-700 mb-1">Business/Organisation Name</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="businessAddress" className="block text-gray-700 mb-1">Business Address/Location</label>
                    <textarea
                      id="businessAddress"
                      name="businessAddress"
                      value={formData.businessAddress}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={2}
                      required
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="incidentDate" className="block text-gray-700 mb-1">Date of Incident</label>
                    <input
                      type="date"
                      id="incidentDate"
                      name="incidentDate"
                      value={formData.incidentDate}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-gray-700 mb-1">
                      Description of Incident
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={6}
                      required
                      placeholder="Please describe what happened in detail, including any comments made by staff, how you identified your dog as an assistance dog, etc."
                    ></textarea>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Supporting Evidence</h2>
                  
                  <div>
                    <label htmlFor="attachments" className="block text-gray-700 mb-1">
                      Upload Photos, Videos or Documents (optional)
                    </label>
                    <p className="text-sm text-gray-500 mb-2">
                      You can upload photos of the location, correspondence with the business, or any other relevant evidence.
                    </p>
                    <input
                      type="file"
                      id="attachments"
                      name="attachments"
                      onChange={handleAttachment}
                      className="w-full p-2 border border-gray-300 rounded"
                      multiple
                    />
                    
                    {attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700">Attached files:</p>
                        <ul className="text-sm text-gray-600 list-disc pl-4">
                          {attachments.map((file, i) => (
                            <li key={i}>{file.name}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-4">Follow-up</h2>
                  
                  <div className="mb-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="contactConsent"
                        checked={formData.contactConsent}
                        onChange={handleInputChange}
                        className="mt-1 mr-2"
                      />
                      <span className="text-gray-700">
                        I consent to being contacted for additional information about this incident if needed
                      </span>
                    </label>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      What would you like to happen as a result of this report? (optional)
                    </p>
                    <textarea
                      id="desiredOutcome"
                      name="desiredOutcome"
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={4}
                      placeholder="E.g., staff training, formal apology, etc."
                    ></textarea>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <p className="text-yellow-800">
                      By submitting this form, you confirm that the information provided is accurate to the best of your knowledge.
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
