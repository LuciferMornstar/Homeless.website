'use client';

import { useEffect, useState } from 'react';

interface Benefit {
  BenefitID: number;
  BenefitName: string;
  Provider?: string;
  Description?: string;
  EligibilityCriteria?: string;
  ApplicationProcess?: string;
  DocumentsRequired?: string;
  ContactInformation?: string;
  Website?: string;
  Category?: string;
  IsUniversalCredit?: boolean;
  IsHousingBenefit?: boolean;
  IsJobSeekers?: boolean;
  IsDisabilityBenefit?: boolean;
  IsLocalCouncilBenefit?: boolean;
  ApplicationFormURL?: string;
  AverageProcessingTime?: string;
  AppealProcess?: string;
  MaximumAmount?: number;
  PaymentFrequency?: string;
  RequiresNINumber?: boolean;
}

export default function BenefitsPage() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/benefits')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBenefits(data.data);
        } else {
          setError('Failed to load benefits');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load benefits');
        setLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(benefits.map(b => b.Category).filter(Boolean)));

  const filtered = benefits.filter(b => {
    const matchesSearch =
      !search ||
      b.BenefitName?.toLowerCase().includes(search.toLowerCase()) ||
      b.Description?.toLowerCase().includes(search.toLowerCase()) ||
      b.Provider?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || b.Category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-blue-50">
      <section className="bg-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Benefits & Entitlements</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-6">
          Find out what financial support, housing help, and entitlements you can access in the UK. This guide is for everyone, including those with no fixed address or complex needs.
        </p>
        <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-lg text-left max-w-2xl mx-auto">
          <p className="font-semibold">
            If you need help applying for benefits, contact <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> or call/text/WhatsApp <a href="tel:+447853811172" className="underline">+44 7853 811172</a>. Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="underline" target="_blank" rel="noopener noreferrer">homelesshelpuk</a>
          </p>
        </div>
      </section>
      <main className="py-12">
        <div className="container mx-auto px-4">
          <section className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
              <h2 className="text-3xl font-bold text-blue-800">All Benefits & Entitlements</h2>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="Search by name, provider or description..."
                  className="border p-2 rounded"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search benefits"
                />
                <select
                  className="border p-2 rounded"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            {loading ? (
              <div className="text-center py-8">Loading benefits...</div>
            ) : error ? (
              <div className="text-center text-red-600 py-8">{error}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.length === 0 ? (
                  <div className="col-span-full text-center text-gray-600">No benefits found.</div>
                ) : filtered.map(b => (
                  <div key={b.BenefitID} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="font-bold text-blue-800 text-xl mb-2">{b.BenefitName}</h3>
                      {b.Provider && <p className="text-blue-700 text-sm mb-1">Provider: {b.Provider}</p>}
                      {b.Description && <p className="text-gray-700 mb-1">{b.Description}</p>}
                      {b.EligibilityCriteria && <p className="text-gray-600 text-sm mb-1"><strong>Eligibility:</strong> {b.EligibilityCriteria}</p>}
                      {b.ApplicationProcess && <p className="text-gray-600 text-sm mb-1"><strong>How to Apply:</strong> {b.ApplicationProcess}</p>}
                      {b.DocumentsRequired && <p className="text-gray-600 text-sm mb-1"><strong>Documents Needed:</strong> {b.DocumentsRequired}</p>}
                      {b.MaximumAmount && <p className="text-gray-600 text-sm mb-1"><strong>Max Amount:</strong> £{b.MaximumAmount.toFixed(2)}</p>}
                      {b.PaymentFrequency && <p className="text-gray-600 text-sm mb-1"><strong>Payment Frequency:</strong> {b.PaymentFrequency}</p>}
                      {b.AverageProcessingTime && <p className="text-gray-600 text-sm mb-1"><strong>Processing Time:</strong> {b.AverageProcessingTime}</p>}
                      {b.RequiresNINumber === false && <p className="text-gray-600 text-sm mb-1"><strong>No National Insurance Number required</strong></p>}
                      {b.IsUniversalCredit && <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-1">Universal Credit</span>}
                      {b.IsHousingBenefit && <span className="inline-block bg-green-200 text-green-800 text-xs px-2 py-1 rounded mr-2 mb-1">Housing Benefit</span>}
                      {b.IsJobSeekers && <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mr-2 mb-1">Job Seekers</span>}
                      {b.IsDisabilityBenefit && <span className="inline-block bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded mr-2 mb-1">Disability</span>}
                      {b.IsLocalCouncilBenefit && <span className="inline-block bg-pink-200 text-pink-800 text-xs px-2 py-1 rounded mr-2 mb-1">Local Council</span>}
                    </div>
                    <div className="mt-4 space-y-1">
                      {b.ContactInformation && <div className="text-blue-700 text-sm">Contact: {b.ContactInformation}</div>}
                      {b.Website && <a href={b.Website.startsWith('http') ? b.Website : `https://${b.Website}`} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline block">Official Website</a>}
                      {b.ApplicationFormURL && <a href={b.ApplicationFormURL} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline block">Application Form</a>}
                      {b.AppealProcess && <details className="mt-2"><summary className="cursor-pointer text-blue-600 underline">How to Appeal</summary><div className="text-gray-700 text-sm mt-1">{b.AppealProcess}</div></details>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-8 text-sm text-blue-700 text-center">
              If you need help, email <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> or call/text/WhatsApp <a href="tel:+447853811172" className="underline">+44 7853 811172</a>. Facebook: <a href="https://www.facebook.com/homelesshelpuk" className="underline" target="_blank" rel="noopener noreferrer">homelesshelpuk</a>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">What if I have no fixed address or ID?</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="list-disc list-inside mb-4">
                <li>You can still claim most benefits even if you are homeless or have no fixed address. Use a care-of address (like a day centre or trusted organisation) if needed.</li>
                <li>If you have no ID, support workers or Citizens Advice can help you get the right documents.</li>
                <li>Universal Credit, Housing Benefit, and other entitlements are legal rights in the UK. Councils and DWP must not discriminate based on homelessness.</li>
                <li>If you are refused help, ask for a written decision and seek advice immediately.</li>
              </ul>
              <p className="mb-2">For more help, contact <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> or <a href="tel:+447853811172" className="underline">+44 7853 811172</a>.</p>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Extra Help for All IQ Levels</h2>
            <div className="bg-white rounded-lg shadow-md p-6 text-gray-700">
              <ul className="list-disc list-inside mb-4">
                <li><strong>Simple explanations:</strong> Each benefit has a short summary and clear steps to apply.</li>
                <li><strong>For advanced users:</strong> Expand details for legal references, appeal processes, and maximum entitlements.</li>
                <li>All information is based on British law and up to date as of April 2025.</li>
                <li>Service dog owners: You are entitled to reasonable adjustments and support. For help, email <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a>.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
