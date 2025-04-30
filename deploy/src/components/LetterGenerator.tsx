'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faFilePdf, faEnvelope, faSave, faUndo, faFileWord } from '@fortawesome/free-solid-svg-icons';
import ApiService from '@/lib/apiService';

interface LetterTemplate {
  TemplateID: number;
  TemplateName: string;
  TemplateType: string;
  TemplateContent: string;
}

interface LetterGeneratorProps {
  userId?: number; // Optional if user is not logged in
}

const LetterGenerator: React.FC<LetterGeneratorProps> = ({ userId }) => {
  const [templates, setTemplates] = useState<LetterTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [letterContent, setLetterContent] = useState('');
  const [userName, setUserName] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [templateType, setTemplateType] = useState<string>('housing');

  useEffect(() => {
    fetchTemplates();
  }, [templateType]);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await ApiService.get<{ success: boolean; data: LetterTemplate[] }>('lettermaker', { type: templateType });

      if (response.success && Array.isArray(response.data)) {
        setTemplates(response.data);
        if (response.data.length > 0) {
          setSelectedTemplate(response.data[0]);
          setLetterContent(response.data[0].TemplateContent);
        }
      } else {
        throw new Error('Failed to fetch letter templates');
      }
    } catch (err) {
      console.error('Error fetching letter templates:', err);
      setError('Failed to load letter templates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = parseInt(e.target.value);
    const template = templates.find(t => t.TemplateID === templateId) || null;
    setSelectedTemplate(template);
    if (template) {
      setLetterContent(template.TemplateContent);
    }
  };

  const handleTemplateTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplateType(e.target.value);
  };

  const handleLetterContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetterContent(e.target.value);
  };

  const populateTemplate = () => {
    if (!selectedTemplate) return '';

    let populatedContent = letterContent;
    
    // Replace placeholders with actual values
    populatedContent = populatedContent
      .replace(/\[RECIPIENT_NAME\]/g, recipientName)
      .replace(/\[RECIPIENT_ADDRESS\]/g, recipientAddress)
      .replace(/\[YOUR_NAME\]/g, userName)
      .replace(/\[YOUR_ADDRESS\]/g, userAddress)
      .replace(/\[DATE\]/g, new Date().toLocaleDateString('en-GB'))
      .replace(/\[TODAY\]/g, new Date().toLocaleDateString('en-GB'));
    
    return populatedContent;
  };

  const handleSaveLetter = async () => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const finalContent = populateTemplate();
      
      const response = await ApiService.post<{ success: boolean; message: string; data?: any }>('lettermaker', {
        userId,
        letterType: selectedTemplate?.TemplateType || templateType,
        letterContent: finalContent,
        recipientName,
        recipientAddress
      });

      if (response.success) {
        setSuccess('Your letter has been saved successfully!');
      } else {
        throw new Error(response.message || 'Failed to save letter');
      }
    } catch (err) {
      console.error('Error saving letter:', err);
      setError('Failed to save letter. Please try again later.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    // This would be implemented with a PDF generation library
    // For now, we'll just show a placeholder message
    alert('PDF download feature coming soon. For now, you can copy the letter content and paste it into a word processor.');
  };

  const handleDownloadWord = () => {
    // This would be implemented with a Word document generation library
    // For now, we'll just show a placeholder message
    alert('Word document download feature coming soon. For now, you can copy the letter content and paste it into a word processor.');
  };

  const handleReset = () => {
    if (selectedTemplate) {
      setLetterContent(selectedTemplate.TemplateContent);
    }
    setSuccess(null);
    setError(null);
  };

  const previewLetter = () => {
    return (
      <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-sm min-h-[60vh] max-h-[70vh] overflow-y-auto font-serif">
        <div className="text-right mb-8">
          <p>{userName}</p>
          <p>{userAddress}</p>
          <p>{new Date().toLocaleDateString('en-GB')}</p>
        </div>
        
        <div className="mb-8">
          <p>{recipientName}</p>
          <p>{recipientAddress}</p>
        </div>
        
        <div>
          <p>Dear {recipientName || '[Recipient]'},</p>
          <div className="mt-4 whitespace-pre-line">{letterContent}</div>
          <div className="mt-8">
            <p>Yours sincerely,</p>
            <p className="mt-6">{userName || '[Your Name]'}</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FontAwesomeIcon icon={faSpinner} spin size="2x" className="text-red-700" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Letter Maker</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            <p>{success}</p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Letter Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Letter Type</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={templateType}
                  onChange={handleTemplateTypeChange}
                >
                  <option value="housing">Housing & Accommodation</option>
                  <option value="benefits">Benefits & Financial Support</option>
                  <option value="healthcare">Healthcare Access</option>
                  <option value="employment">Employment</option>
                  <option value="legal">Legal Services</option>
                  <option value="complaint">Complaints & Grievances</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Letter Template</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={selectedTemplate?.TemplateID || ''}
                  onChange={handleTemplateChange}
                  disabled={templates.length === 0}
                >
                  {templates.length === 0 ? (
                    <option value="">No templates available</option>
                  ) : (
                    templates.map(template => (
                      <option key={template.TemplateID} value={template.TemplateID}>
                        {template.TemplateName}
                      </option>
                    ))
                  )}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Your Address</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Recipient Name</label>
                <input 
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who is this letter addressed to?"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Recipient Address</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Enter recipient's address"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Letter Content</label>
                <textarea 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={letterContent}
                  onChange={handleLetterContentChange}
                  placeholder="Enter or edit the letter content"
                  rows={10}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Letter Preview</h3>
            {previewLetter()}
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <FontAwesomeIcon icon={faUndo} className="mr-2" /> Reset
              </button>
              
              <button
                onClick={handleSaveLetter}
                disabled={isSaving}
                className={`flex items-center px-4 py-2 ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800'} text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500`}
              >
                {isSaving ? (
                  <><FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> Saving...</>
                ) : (
                  <><FontAwesomeIcon icon={faSave} className="mr-2" /> Save Letter</>
                )}
              </button>
              
              <button
                onClick={handleDownloadPDF}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faFilePdf} className="mr-2" /> Download PDF
              </button>
              
              <button
                onClick={handleDownloadWord}
                className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <FontAwesomeIcon icon={faFileWord} className="mr-2" /> Download Word
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">Letter Writing Tips</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Keep your letter concise and to the point.</li>
          <li>Clearly state what you're requesting in the first paragraph.</li>
          <li>Include any reference numbers or relevant dates.</li>
          <li>Be polite and professional, even if you're frustrated.</li>
          <li>Keep a copy of all correspondence for your records.</li>
          <li>If possible, follow up with a phone call a week after sending.</li>
        </ul>
      </div>
      
      <div className="bg-gray-50 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
        <p className="mb-4">
          If you need assistance with your letter or have questions about your specific situation, 
          please contact our support team:
        </p>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-red-700 mr-2" />
          <a href="mailto:helpme@homeless.website" className="text-red-700 hover:underline">
            helpme@homeless.website
          </a>
        </div>
      </div>
    </div>
  );
};

export default LetterGenerator;
