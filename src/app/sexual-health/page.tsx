"use client";

import React, { useEffect, useState } from "react";
import ModernTemplate from "@/components/ModernTemplate";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

// Add Q&A types
interface QAItem {
  id: number;
  question: string;
  answer?: string;
  createdAt: string;
  answeredBy?: string;
  isApproved: boolean;
}

// Add missing interfaces
interface Resource {
  ResourceID: number;
  Title: string;
  URL?: string;
  Description?: string;
  ResourceType?: string;
  Category?: string;
}

interface Organization {
  OrganizationID: number;
  Name: string;
  Description?: string;
  ServicesOffered?: string;
  Phone?: string;
  IsVerified?: boolean;
}

interface DogFriendlyResource {
  DogFriendlyResourceID: number;
  Name: string;
  Description?: string;
  Address?: string;
  City?: string;
  Notes?: string;
}

interface MentalHealthResource {
  ResourceID: number;
  Name: string;
  Description?: string;
  Phone?: string;
  ServicesOffered?: string;
}

export default function SexualHealthPage() {
  // Dynamic resource and support lists
  const [resources, setResources] = useState<Resource[]>([]);
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [dogFriendly, setDogFriendly] = useState<DogFriendlyResource[]>([]);
  const [mentalHealth, setMentalHealth] = useState<MentalHealthResource[]>([]);

  // Q&A state
  const [question, setQuestion] = useState("");
  const [qaList, setQaList] = useState<QAItem[]>([]);
  const [qaLoading, setQaLoading] = useState(false);
  const [qaError, setQaError] = useState("");
  const [moderationMode, setModerationMode] = useState(false); // For admin/moderator
  const [moderationMsg, setModerationMsg] = useState("");

  // Self-assessment state
  const [assessment, setAssessment] = useState({ q1: "", q2: "", q3: "" });
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);
  // Feedback state
  const [feedback, setFeedback] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  useEffect(() => {
    // Fetch resources
    axios.get("/api/resources?category=Sexual Health").then(res => setResources(res.data.data || []));
    axios.get("/api/organizations").then(res => setOrgs(res.data.data || []));
    axios.get("/api/dog-friendly-resources").then(res => setDogFriendly(res.data.data || []));
    axios.get("/api/mental-health-resources").then(res => setMentalHealth(res.data.data || []));

    // Fetch Q&A from database
    setQaLoading(true);
    axios.get("/api/sexual-health-qa").then(res => {
      setQaList(res.data.data || []);
      setQaLoading(false);
    }).catch(() => {
      setQaError("Failed to load questions. Please try again later.");
      setQaLoading(false);
    });
  }, []);

  // Q&A submit handler
  async function handleQuestionSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setQaLoading(true);
    setQaError("");
    try {
      const res = await axios.post("/api/sexual-health-qa", { question });
      setQaList([res.data.data, ...qaList]);
      setQuestion("");
    } catch {
      setQaError("Could not submit your question. Please try again later.");
    }
    setQaLoading(false);
  }

  // Moderation: Approve or delete Q&A
  async function handleModerate(id: number, action: "approve" | "delete") {
    setModerationMsg("");
    try {
      await axios.post(`/api/sexual-health-qa/moderate`, { id, action });
      setQaList(qaList => qaList.filter(q => q.id !== id));
      setModerationMsg(`Question ${action === "approve" ? "approved" : "deleted"}.`);
    } catch {
      setModerationMsg("Moderation failed. Try again.");
    }
  }

  // Self-assessment submit handler
  function handleAssessmentSubmit(e: React.FormEvent) {
    e.preventDefault();
    let advice = "";
    if (assessment.q1 === "yes" || assessment.q2 === "yes") {
      if (assessment.q3 === "no") {
        advice = "You are at higher risk. Please use condoms every time and get tested regularly at an NHS clinic.";
      } else {
        advice = "You are doing well, but regular testing is still important. Visit a sexual health clinic for free checkups.";
      }
    } else {
      advice = "Your risk is lower, but regular checkups are still a good idea. NHS clinics are free and confidential.";
    }
    setAssessmentResult(advice);
  }

  // Feedback submit handler
  function handleFeedbackSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFeedbackMsg("Thank you for your feedback!");
    setFeedback("");
  }

  return (
    <ModernTemplate
      title="The Ultimate UK Guide: Sexual Health & Safety While Homeless"
      subtitle="Comprehensive, practical, and trauma-informed support for everyone—no matter your situation or ability."
    >
      {/* Easy Read Summary */}
      <div className="bg-yellow-50 p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-yellow-800">Quick Summary (Easy Read)</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Sex is normal. You deserve to be safe and healthy, even if you are homeless.</li>
          <li>Use condoms every time. Get them free from NHS clinics and charities.</li>
          <li>Ask for help if you feel unsafe or worried. You have rights and support is available.</li>
          <li>Service dogs can help with mental health and safety.</li>
          <li>Contact us or the numbers below if you need urgent help.</li>
        </ul>
      </div>

      {/* Understanding the Challenges */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-3xl font-bold mb-6 text-red-800">Understanding the Challenges</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Lack of privacy and safe spaces for intimacy</li>
          <li>Limited access to condoms, lubricant, and healthcare</li>
          <li>Increased risk of STIs and sexual assault</li>
          <li>Barriers to services (ID, stigma, fear, mental health, substance use)</li>
          <li>Survival sex and vulnerability to exploitation</li>
          <li>Mental health and substance use can make things harder</li>
        </ul>
        <p className="text-gray-700 mb-4">
          Homelessness makes it harder to stay safe and healthy. This guide helps you protect yourself and your partners, understand your rights, and find support—no matter your situation or ability.
        </p>
      </div>

      {/* Finding Safe Spaces */}
      <div className="bg-blue-50 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Finding Safe Spaces</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><b>Shelters:</b> Some allow couples or have private areas. Ask about policies. Some are dog-friendly.</li>
          <li><b>Temporary Accommodation:</b> Council-provided places may offer more privacy—check locks and safety.</li>
          <li><b>Public Spaces:</b> If you must, choose well-lit, safer areas and know the legal risks.</li>
          <li><b>Hotels/Motels:</b> Pooling resources can help, but check for safety and avoid exploitation.</li>
          <li><b>Community Groups:</b> Local organisations may help you find safe spaces or advocate for you.</li>
          <li><b>Sexual Health Clinics:</b> Offer confidential, private consultations and support.</li>
        </ul>
        <div className="mt-4">
          <h3 className="font-semibold text-blue-700">Dog-Friendly Resources</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {dogFriendly.length === 0 ? <li>Loading dog-friendly places...</li> : dogFriendly.map((r) => (
              <li key={r.DogFriendlyResourceID}><b>{r.Name}</b> - {r.Address} {r.City} {r.Notes && `(${r.Notes})`}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Protecting Your Health */}
      <div className="bg-green-50 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Protecting Your Health</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Use condoms (male or female) every time. Free from NHS clinics, charities, and outreach.</li>
          <li>Use water-based lubricant to prevent condom breakage.</li>
          <li>Get regular STI tests—even if you have no symptoms. Free and confidential at NHS clinics.</li>
          <li>Vaccinations for HPV and hepatitis B are available on the NHS.</li>
          <li>Emergency contraception and HIV prevention (PrEP/PEP) are available—ask at clinics or A&E.</li>
        </ul>
        <div className="mt-4">
          <h3 className="font-semibold text-green-700">Find Sexual Health Resources</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {resources.length === 0 ? <li>Loading resources...</li> : resources.map((r) => (
              <li key={r.ResourceID}><a href={r.URL} className="underline text-green-800" target="_blank" rel="noopener noreferrer">{r.Title}</a> - {r.Description}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Common STIs and Their Implications */}
      <div className="bg-pink-50 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-pink-800">Common STIs: What You Need to Know</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><b>Chlamydia:</b> Often no symptoms. Can cause infertility. Easily treated with antibiotics.</li>
          <li><b>Gonorrhoea:</b> Painful urination, discharge. Can cause serious complications if untreated.</li>
          <li><b>Syphilis:</b> Serious if untreated. Treated with penicillin.</li>
          <li><b>HIV:</b> Attacks the immune system. No cure, but treatment allows a long, healthy life.</li>
          <li><b>Genital Herpes:</b> Painful blisters. No cure, but treatment helps.</li>
          <li><b>Genital Warts:</b> Caused by HPV. Can be treated.</li>
          <li><b>Hepatitis B:</b> Affects the liver. Vaccination available.</li>
        </ul>
        <p className="text-gray-700 text-sm">Get tested regularly. Most STIs are treatable, and early treatment protects you and others.</p>
      </div>

      {/* Legal Considerations in the UK */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-6 text-red-800">Legal Considerations in the UK</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><b>Consent:</b> Must be voluntary and informed. If in doubt, say no. The law protects you.</li>
          <li><b>Public Sex:</b> Illegal and can lead to arrest. Know the risks.</li>
          <li><b>Sex Work:</b> Not illegal, but related activities (soliciting, brothels, pimping) are. Be aware of the law and your rights.</li>
          <li><b>Reporting Assault:</b> Call police or Rape Crisis (0808 802 9999). NHS SARCs offer free, confidential help.</li>
          <li><b>Exploitation:</b> The law protects you from being forced or tricked into sex or sex work.</li>
        </ul>
        <p className="text-gray-700 mb-2">
          If you feel unsafe or have been assaulted, get help as soon as possible. Your safety and dignity matter. <b>All information is based on British law.</b>
        </p>
      </div>

      {/* Mental Health, Substance Use, and Service Dogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
          <h3 className="text-xl font-semibold mb-3 text-green-800">Mental Health & Substance Use</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-2">
            <li>Mental health and substance use can affect decision-making and safety.</li>
            <li>Support is available—ask for trauma-informed care and mental health help.</li>
            <li>Service dogs can provide emotional support and stability. <Link href="/service-dog-certification" className="text-green-700 underline">Learn about service dogs</Link>.</li>
          </ul>
          <div className="mt-4">
            <h4 className="font-semibold text-green-700">Mental Health Resources</h4>
            <ul className="list-disc pl-6 text-gray-700">
              {mentalHealth.length === 0 ? <li>Loading mental health resources...</li> : mentalHealth.map((r) => (
                <li key={r.ResourceID}><b>{r.Name}</b> - {r.Description} {r.Phone && `(${r.Phone})`}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-600">
          <h3 className="text-xl font-semibold mb-3 text-yellow-800">Support for Vulnerable Groups</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-2">
            <li>LGBTQ+ people, women, and young people may face extra risks—specialist support is available.</li>
            <li>Ask for women-only or LGBTQ+ friendly services if needed.</li>
            <li>Advocacy and peer support can help you access your rights.</li>
          </ul>
        </div>
      </div>

      {/* Trauma-Informed Care & Advocacy */}
      <div className="bg-purple-50 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-purple-800">Trauma-Informed Care & Advocacy</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Many people experiencing homelessness have a history of trauma. Services should be delivered in a way that promotes healing and avoids re-traumatisation.</li>
          <li>If you have trouble accessing services or feel your rights are not respected, seek advocacy support from a local organisation or support worker.</li>
          <li>You deserve respect and dignity, no matter your situation.</li>
        </ul>
      </div>

      {/* Where to Get Help */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-red-800">Where to Get Help</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><b>NHS Sexual Health Clinics:</b> Free, confidential STI testing, contraception, and advice.</li>
          <li><b>Rape Crisis:</b> 0808 802 9999 (women & girls, support after sexual violence)</li>
          <li><b>SARCs:</b> NHS Sexual Assault Referral Centres for medical and psychological help.</li>
          <li><b>Shelter:</b> Housing and legal advice for anyone facing homelessness.</li>
          <li><b>St Mungo&apos;s, Spectra, Terrence Higgins Trust, Brook, FPA:</b> Specialist support for sexual health, HIV, and vulnerable groups.</li>
        </ul>
        <div className="mt-4">
          <h3 className="font-semibold text-red-700">Local Organisations</h3>
          <ul className="list-disc pl-6 text-gray-700">
            {orgs.length === 0 ? <li>Loading organisations...</li> : orgs.map((o) => (
              <li key={o.OrganizationID}><b>{o.Name}</b> - {o.Description} {o.Phone && `(${o.Phone})`}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Anonymous Q&A Section (now real-time, moderated, and database-backed) */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">Ask a Question (Anonymous)</h2>
        <p className="mb-2 text-gray-700">Have a question about sexual health, safety, or your rights? Ask anonymously below. Our team or community will answer as soon as possible.</p>
        <form className="mb-4" onSubmit={handleQuestionSubmit}>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            rows={3}
            placeholder="Type your question here..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
            disabled={qaLoading}
          />
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" disabled={qaLoading}>Submit Question</button>
        </form>
        {qaError && <div className="text-red-600 mb-2">{qaError}</div>}
        <div>
          <h3 className="font-semibold text-blue-700 mb-2">Recent Questions & Answers</h3>
          {qaLoading ? <div>Loading...</div> : (
            <ul className="space-y-2">
              {qaList.length === 0 ? <li>No questions yet. Be the first to ask!</li> : qaList.filter(q => q.isApproved).map((qa) => (
                <li key={qa.id} className="bg-blue-50 p-3 rounded-lg">
                  <b>Q:</b> {qa.question}<br />
                  <b>A:</b> {qa.answer || <span className="italic text-gray-500">Awaiting answer...</span>}
                  {qa.answeredBy && qa.answer && <span className="ml-2 text-xs text-gray-500">(Answered by {qa.answeredBy})</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Moderation controls (visible only in moderation mode) */}
        {moderationMode && (
          <div className="mt-6">
            <h3 className="font-semibold text-red-700 mb-2">Moderation Panel</h3>
            {moderationMsg && <div className="text-green-700 mb-2">{moderationMsg}</div>}
            <ul className="space-y-2">
              {qaList.filter(q => !q.isApproved).map((qa) => (
                <li key={qa.id} className="bg-yellow-50 p-3 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <b>Q:</b> {qa.question}<br />
                    <b>A:</b> {qa.answer || <span className="italic text-gray-500">Awaiting answer...</span>}
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0">
                    <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={() => handleModerate(qa.id, "approve")}>Approve</button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={() => handleModerate(qa.id, "delete")}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Contact & Support */}
      <div className="bg-gradient-to-r from-red-100 to-yellow-100 p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-bold mb-4 text-red-800">Contact & Support</h2>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-red-600" /> <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> (General Support)</li>
          <li><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-red-600" /> <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a> (Service Dogs)</li>
          <li><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-red-600" /> <a href="mailto:volunteer@homeless.website" className="underline">volunteer@homeless.website</a> (Volunteering)</li>
          <li><FontAwesomeIcon icon={faEnvelope} className="mr-2 text-red-600" /> <a href="mailto:info@homeless.website" className="underline">info@homeless.website</a> (Info)</li>
          <li><FontAwesomeIcon icon={faPhone} className="mr-2 text-red-600" /> <a href="tel:+447853811172" className="underline">+44 7853 811172</a> (Phone, text, WhatsApp, iMessage)</li>
          <li><FontAwesomeIcon icon={faPeopleGroup} className="mr-2 text-red-600" /> <a href="https://www.facebook.com/homelesshelpuk" className="underline" target="_blank" rel="noopener noreferrer">Facebook</a></li>
        </ul>
        <p className="text-gray-700 text-sm">All information is based on British law. This page is for everyone—whether you find reading easy or hard. If you need help, just ask.</p>
      </div>
    </ModernTemplate>
  );
}
