'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHandsHelping, 
  faDonate, 
  faBullhorn, 
  faDog, 
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Define TypeScript interfaces for the components
interface InterviewQAProps {
  speaker: string;
  content: string | React.ReactNode;
  isQuestion?: boolean;
}

interface InterviewQuoteProps {
  quote: string;
  author: string;
}

interface GetInvolvedCardProps {
  icon?: IconDefinition;
  title: string;
  description: React.ReactNode;
  linkHref: string;
  linkText: string;
  highlight?: boolean;
}

interface InterviewSectionProps {
  title?: string;
  children: React.ReactNode;
}

// Interview Q&A Component 
const InterviewQA: React.FC<InterviewQAProps> = ({ speaker, content, isQuestion = false }) => {
  return (
    <div className={isQuestion ? "interview-q" : "interview-a"}>
      <span className="interview-speaker">{speaker}:</span> {content}
    </div>
  );
};

// Interview Quote Component
const InterviewQuote: React.FC<InterviewQuoteProps> = ({ quote, author }) => {
  return (
    <div className="interview-quote">
      "{quote}" - {author}
    </div>
  );
};

// Get Involved Card Component
const GetInvolvedCard: React.FC<GetInvolvedCardProps> = ({ icon, title, description, linkHref, linkText, highlight = false }) => {
  return (
    <div className={`get-involved-card ${highlight ? 'get-involved-highlight' : ''}`}>
      <h3>
        {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
        {title}
      </h3>
      <p>{description}</p>
      <Link href={linkHref} className={`btn btn-sm ${highlight ? 'btn-light' : ''}`}>
        {linkText}
      </Link>
    </div>
  );
};

// Interview Section Component
const InterviewSection: React.FC<InterviewSectionProps> = ({ title, children }) => {
  return (
    <section className="interview-section">
      {title && <h2 className="mb-3 interview-heading">{title}</h2>}
      {children}
    </section>
  );
};

export default function Page() {
  return (
    <div>
      {/* Hero Section */}
      <section className="interview-hero">
        <div className="container">
          <h1>Founders Interview: Shining a Light on Homeless Help</h1>
          <p>Lucifer and Laura Morningstar share their journey from homelessness to founding Homeless Help, and how lived experience is changing the system for others.</p>
        </div>
      </section>

      <main className="interview-main" id="main-content">
        <InterviewSection>
          <div className="interview-grid">
            <div>
              <InterviewQA 
                speaker="Interviewer" 
                content="Your story's a bit different from the usual superhero stuff, right? You actually lived this, yeah?" 
                isQuestion={true} 
              />
              <InterviewQA 
                speaker="Lucifer" 
                content="Yeah, you could say that. We just call it 'getting stuck in.' ..." 
              />
              <InterviewQA 
                speaker="Laura" 
                content="Eye-opener? That's putting it mildly, Luce. ..." 
              />
              <InterviewQuote 
                quote="You're not just a statistic; you're a human being in crisis, and they treat you like you're a nuisance." 
                author="Laura Morningstar" 
              />
              <InterviewQA 
                speaker="Interviewer" 
                content="It's like you lose your humanity in their eyes." 
                isQuestion={true}
              />
              <InterviewQA 
                speaker="Laura" 
                content="Exactly! And that's what hurts the most. ..." 
              />
            </div>
            <div>
              <Image 
                src="/Assets/Frankie.jpg" 
                alt="Lucifer and Laura Morningstar" 
                width={500}
                height={300}
                className="interview-img-main" 
              />
              <GetInvolvedCard
                title="Need Help?"
                description={<>Start with our <Link href="/get-help" className="btn btn-sm btn-light get-help-link">Get Help Guide</Link></>}
                linkHref="/get-help"
                linkText="Learn More"
                highlight={true}
              />
              <div className="fun-fact">
                <FontAwesomeIcon icon={faDog} />
                <span>Fun Fact: Frankie, pictured above, is the real-life service dog who inspired our pet-friendly support program!</span>
              </div>
            </div>
          </div>
        </InterviewSection>

        <section className="entertainment-section">
          <h2><FontAwesomeIcon icon={faStar} /> Did You Know?</h2>
          <p>Homeless Helpers was started in a camper van with two dogs, a laptop, and a lot of stubborn hope. Our founders believe laughter and community are as important as food and shelter. <span style={{fontSize: '1.2em'}}>🐾</span></p>
        </section>

        <InterviewSection title="System Failures">
          <InterviewQA 
            speaker="Lucifer" 
            content="...'I don't believe you're homeless.' Just like that. Refused to help us." 
          />
          <InterviewQA 
            speaker="Laura" 
            content="...We didn't know it at the time, but that was a complete breach of the 56-day rule. ..." 
          />
          <InterviewQA 
            speaker="Lucifer" 
            content="...It's not just the immediate rejection, but the feeling that the very system that's supposed to protect you has turned its back on you. ..." 
          />
          <InterviewQuote 
            quote="It's not just the immediate rejection, but the feeling that the very system that's supposed to protect you has turned its back on you." 
            author="Lucifer Morningstar" 
          />
        </InterviewSection>

        <InterviewSection title="The Birth of Homeless Help">
          <InterviewQA 
            speaker="Interviewer" 
            content="Was that the whole reason for starting Homeless Help?" 
            isQuestion={true}
          />
          <InterviewQA 
            speaker="Lucifer" 
            content="It's a big part of it, yeah. ..." 
          />
          <InterviewQA 
            speaker="Laura" 
            content="...We explained this to her, very clearly, ..." 
          />
          <InterviewQA 
            speaker="Lucifer" 
            content="...She was having none of it. ..." 
          />
          <InterviewQA 
            speaker="Laura" 
            content="...At the end of the interview, the system said that it was changing our claims to a new joint claim, and that we would now not get paid for another month. ..." 
          />
          <InterviewQA 
            speaker="Lucifer" 
            content="...We had less than a fiver between us, for two people and two dogs, to eat, live, and fuel the van for a whole month. ..." 
          />
        </InterviewSection>

        <InterviewSection title="Get Involved">
          <div className="get-involved-cards">
            <GetInvolvedCard
              icon={faHandsHelping}
              title="Volunteer"
              description="Join our team and help make a difference in your community."
              linkHref="/volunteer"
              linkText="Learn More"
            />
            <GetInvolvedCard
              icon={faDonate}
              title="Donate"
              description="Your donations help us provide essential services to those in need."
              linkHref="/donate"
              linkText="Donate Now"
            />
            <GetInvolvedCard
              icon={faBullhorn}
              title="Advocate"
              description="Raise awareness and help us challenge the system that fails so many."
              linkHref="/network"
              linkText="Learn How"
            />
          </div>
        </InterviewSection>
      </main>

      <style jsx>{`
        .interview-hero {
          background: linear-gradient(120deg, #06454b 0%, #48d595 100%);
          color: white;
          padding: 60px 0 40px;
          text-align: center;
        }
        .interview-hero h1 {
          font-size: 2.7rem;
          margin-bottom: 1rem;
          color: white;
        }
        .interview-hero p {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 700px;
          margin: 0 auto;
        }
        .interview-main {
          background: #f8f8f8;
          border-radius: 16px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 2.5rem 1.5rem 2rem;
          margin-top: -40px;
          margin-bottom: 2rem;
          max-width: 950px;
          margin-left: auto;
          margin-right: auto;
        }
        .interview-section {
          margin-bottom: 2.5rem;
        }
        .interview-q {
          background: #06454b;
          color: white;
          border-radius: 8px 8px 0 0;
          padding: 1.1rem 1.5rem 0.7rem;
          font-weight: 600;
          font-family: sans-serif;
          box-shadow: 0 2px 8px rgba(72,213,149,0.08);
        }
        .interview-a {
          background: white;
          color: #333;
          border-radius: 0 0 8px 8px;
          padding: 1.1rem 1.5rem 1.2rem;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #48d595;
        }
        .interview-speaker {
          color: #48d595;
          font-weight: bold;
          margin-bottom: 0.3rem;
        }
        .interview-quote {
          background: #48d595;
          color: white;
          border-left: 6px solid #06454b;
          padding: 1.1rem 1.5rem;
          margin: 2rem 0 2rem 0;
          font-style: italic;
          border-radius: 0 16px 16px 0;
          font-size: 1.1rem;
        }
        .interview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }
        @media (max-width: 900px) {
          .interview-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .interview-main { padding: 1rem 0.3rem; }
          .interview-hero h1 { font-size: 2rem; }
        }
        .get-involved-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .get-involved-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 1.5rem 1.2rem;
          flex: 1 1 220px;
          min-width: 220px;
          max-width: 320px;
          text-align: center;
        }
        .get-involved-card h3 {
          color: #06454b;
          margin-bottom: 0.5rem;
        }
        .get-involved-card .btn {
          margin-top: 1rem;
          display: inline-block;
          padding: 0.375rem 0.75rem;
          background-color: #06454b;
          color: white;
          text-decoration: none;
          border-radius: 0.25rem;
          transition: background-color 0.2s;
        }
        .get-involved-card .btn:hover {
          background-color: #048a69;
        }
        .interview-heading {
          color: #06454b;
        }
        .interview-img-main {
          width: 100%;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }
        .get-involved-highlight {
          background: #48d595;
          color: white;
        }
        .get-involved-highlight h3 {
          color: white;
        }
        .get-help-link {
          margin-top: 0.5rem;
          background-color: white !important;
          color: #06454b !important;
        }
        .fun-fact {
          background: #06454b;
          color: white;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .fun-fact svg {
          font-size: 1.7rem;
          color: #48d595;
        }
        .entertainment-section {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          padding: 2rem 1.5rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .entertainment-section h2 {
          color: #06454b;
          margin-bottom: 1rem;
        }
        .entertainment-section svg {
          color: #48d595;
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
}
