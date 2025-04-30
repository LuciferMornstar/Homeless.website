'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

function isMemberAuthenticated() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('hhchan_member') === 'true';
}

const forumSections = [
  {
    title: 'Ancient Mysteries & Forbidden Knowledge',
    topics: 'The Anunnaki, Atlantis, ancient alien contact, esoteric symbolism, suppressed archaeological discoveries.'
  },
  {
    title: 'The Shadow Government & Global Agendas',
    topics: 'The New World Order, the Illuminati, the Bilderberg Group, transhumanism, population control.'
  },
  {
    title: 'Technological Deception & Digital Tyranny',
    topics: 'Artificial intelligence, quantum computing, Neuralink, 5G, the simulation hypothesis.'
  },
  {
    title: 'Extraterrestrial Disclosure & Cosmic Realities',
    topics: 'UFO sightings, alien abductions, government cover-ups, the Fermi Paradox, interdimensional beings.'
  },
  {
    title: 'The Nature of Reality & the Limits of Perception',
    topics: 'Quantum physics, the Mandela Effect, altered states of consciousness, the holographic universe, the nature of time.'
  },
];

const featuredDiscussions = [
  {
    title: 'Project Blue Book Declassified',
    desc: 'A critical analysis of the recently released government documents, examining the evidence for and implications of extraterrestrial encounters.'
  },
  {
    title: 'The Anunnaki and Human Origins',
    desc: 'A deep dive into the ancient texts and archaeological evidence surrounding the Anunnaki, and their potential role in the creation of humanity.'
  },
  {
    title: 'The Simulation Hypothesis: Are We Living in a Computer Program?',
    desc: 'Exploring the philosophical and scientific arguments for and against the possibility that our reality is a simulated construct.'
  },
  {
    title: 'Ancient Civilizations and Advanced Technology',
    desc: 'Examining evidence that suggests ancient cultures possessed technologies far more advanced than currently accepted.'
  },
];

const joinCommunity = [
  'Register: Create an account to participate in discussions, share your research, and connect with like-minded individuals.',
  'Introduce Yourself: Tell us about your background, your areas of interest, and what you hope to contribute to the forum.',
  'Start a Discussion: Share your insights, ask questions, and propose new topics for exploration.',
  'Contribute to the Wiki: Help us build a comprehensive repository of knowledge by contributing to our collaborative wiki.'
];

export default function HHChanPage() {
  const [messages, setMessages] = useState<Array<{author: string; text: string}>>([]);
  const [input, setInput] = useState('');
  const [member, setMember] = useState(false);
  const messageListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setMember(isMemberAuthenticated());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { author: 'You', text: input }]);
    setInput('');
    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, 100);
  };

  const navLinks = [
    { href: '#forum-guidelines', label: 'Guidelines' },
    { href: '#forum-sections', label: 'Sections' },
    { href: '#featured-discussions', label: 'Discussions' },
    { href: '#message-board', label: 'Message Board' },
    { href: '#join-community', label: 'Join' },
  ];

  return (
    <div className="bg-[#f3f1e3] min-h-screen text-[#0b0c0c] font-inter">
      <header className="header bg-[#00703c] border-b-8 border-[#003087] shadow flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 sticky top-0 z-10">
        <div>
          <h1 className="text-3xl font-bold text-white border-b-2 border-white pb-1 mb-1">Labyrinth of Speculation</h1>
          <p className="text-lg text-white">A Forum for Advanced Conspiracy Discourse</p>
        </div>
        <nav className="mt-4 md:mt-0">
          <ul className="flex flex-wrap gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link text-white font-semibold px-3 py-2 rounded hover:bg-[#005e2e] border-b-2 border-transparent hover:border-white transition">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="container mx-auto max-w-3xl py-8 px-4">
        <section id="forum-guidelines" className="mb-8 bg-white border border-[#b1b4b6] shadow p-6">
          <h2 className="text-2xl font-semibold text-[#1d70b8] mb-4 border-b-2 border-[#b1b4b6] pb-2">Forum Guidelines</h2>
          <ol className="space-y-3 list-decimal pl-6">
            <li><strong>Respectful Discourse:</strong> Engage in robust debate, but maintain civility. Personal attacks and inflammatory language will not be tolerated.</li>
            <li><strong>Evidence-Based Speculation:</strong> Ground your theories in verifiable facts, credible sources, and logical reasoning. While we encourage out-of-the-box thinking, assertions should be supported by evidence.</li>
            <li><strong>Source Transparency:</strong> Clearly cite the origins of your information. Primary sources are preferred, but reputable secondary sources are acceptable.</li>
            <li><strong>Open-Mindedness:</strong> Be willing to consider alternative perspectives and challenge your own assumptions. The pursuit of truth requires intellectual humility.</li>
            <li><strong>No Trolling or Disinformation:</strong> This forum is for serious discussion. Trolling, spreading deliberate misinformation, or promoting harmful ideologies will result in immediate removal.</li>
          </ol>
        </section>
        <section id="forum-sections" className="mb-8 bg-white border border-[#b1b4b6] shadow p-6">
          <h2 className="text-2xl font-semibold text-[#1d70b8] mb-4 border-b-2 border-[#b1b4b6] pb-2">Forum Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forumSections.map((section) => (
              <div key={section.title} className="bg-[#f8f8f8] border-l-4 border-[#1d70b8] p-4">
                <h3 className="text-lg font-semibold text-[#1d70b8] mb-2">{section.title}</h3>
                <ul><li><strong>Topics:</strong> {section.topics}</li></ul>
              </div>
            ))}
          </div>
        </section>
        <section id="featured-discussions" className="mb-8 bg-white border border-[#b1b4b6] shadow p-6">
          <h2 className="text-2xl font-semibold text-[#1d70b8] mb-4 border-b-2 border-[#b1b4b6] pb-2">Featured Discussions</h2>
          <ul className="space-y-3">
            {featuredDiscussions.map((d) => (
              <li key={d.title} className="bg-[#f8f8f8] border-l-4 border-[#1d70b8] p-4">
                <h4 className="text-lg font-semibold text-[#1d70b8] mb-1">{d.title}</h4>
                <p>{d.desc}</p>
              </li>
            ))}
          </ul>
        </section>
        <section id="message-board" className="mb-8 bg-white border border-[#b1b4b6] shadow p-6">
          <h2 className="text-2xl font-semibold text-[#1d70b8] mb-4 border-b-2 border-[#b1b4b6] pb-2">Message Board</h2>
          <ul className="message-list mb-4 max-h-64 overflow-y-auto border-2 border-[#b1b4b6] bg-[#f8f8f8] p-2" ref={messageListRef}>
            {messages.map((msg, idx) => (
              <li key={idx} className="bg-white border-l-4 border-[#1d70b8] p-3 mb-2">
                <strong>{msg.author}:</strong>
                <p>{msg.text}</p>
              </li>
            ))}
          </ul>
          <form className="message-form flex flex-col" onSubmit={handleSubmit}>
            <label htmlFor="message" className="text-[#0b0c0c] text-sm mb-1">Your Message:</label>
            <textarea
              id="message"
              name="message"
              required
              className="bg-white border-2 border-[#b1b4b6] p-2 mb-2 text-[#0b0c0c] resize-none min-h-[2rem] text-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" className="bg-[#00823b] text-white px-4 py-2 font-semibold rounded hover:bg-[#005e2e] w-fit">Post Message</button>
          </form>
        </section>
        <section id="join-community" className="mb-8 bg-white border border-[#b1b4b6] shadow p-6">
          <h2 className="text-2xl font-semibold text-[#1d70b8] mb-4 border-b-2 border-[#b1b4b6] pb-2">Join the Community</h2>
          <ul className="space-y-3">
            {joinCommunity.map((item, idx) => (
              <li key={idx} className="bg-[#f8f8f8] border-l-4 border-[#1d70b8] p-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
        {member ? (
          <section id="members-area" className="mb-8 bg-green-50 border border-green-400 shadow p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-green-800 mb-4 border-b-2 border-green-300 pb-2">Hidden Members Area</h2>
            <p className="mb-2">Welcome to the exclusive members area! Here you can access advanced discussions, upload files, and collaborate securely with other verified members.</p>
            <ul className="list-disc list-inside mb-2">
              <li>Access to private forums and resources</li>
              <li>Share and download research files</li>
              <li>Direct messaging with other members</li>
              <li>Special support for service dog owners and mental health resources</li>
            </ul>
            <p className="text-sm text-green-700">For help, contact <a href="mailto:helpme@homeless.website" className="underline">helpme@homeless.website</a> or <a href="mailto:dogs@homeless.website" className="underline">dogs@homeless.website</a>.</p>
          </section>
        ) : (
          <section id="members-area-locked" className="mb-8 bg-yellow-50 border border-yellow-400 shadow p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-yellow-800 mb-4 border-b-2 border-yellow-300 pb-2">Members Area Locked</h2>
            <p className="mb-2">This area is only accessible to members who have authenticated via <Link href="/NFCAuth" className="underline text-blue-700">NFCAuth</Link>.</p>
            <p className="text-sm text-yellow-700">Authenticate to unlock advanced features and private discussions.</p>
          </section>
        )}
      </main>
      <footer className="bg-[#f0f0f0] text-[#0b0c0c] py-4 text-center border-t border-[#b1b4b6] mt-8">
        <p>© 2025 Labyrinth of Speculation. All rights reserved.</p>
      </footer>
    </div>
  );
}
