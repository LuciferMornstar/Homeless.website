'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaperPlane, 
  faHouseChimneyUser, 
  faBed, 
  faUtensils, 
  faBowlFood,
  faHospital, 
  faBriefcase, 
  faScaleBalanced, 
  faBrain, 
  faHandHoldingHeart, 
  faRainbow,
  faUsers, 
  faChild, 
  faHeartBroken,
  faNotesMedical 
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

// Mock Database for services
const servicesDatabase = {
  "manchester": {
    "shelters": [
      { name: "Beacon House Shelter", address: "123 Hope St, Manchester", phone: "0161 123 4567", notes: "Open 24/7. Accepts individuals.", availability: "Likely spaces", icon: "faHouseChimneyUser" },
      { name: "St. Jude's Night Shelter", address: "45 Charity Ave, Manchester", phone: "0161 987 6543", notes: "Opens 8 PM. Men only.", availability: "Check first", icon: "faBed" }
    ],
    "food banks": [
      { name: "Manchester Central Food Bank", address: "Unit 5, Progress Way, Manchester", hours: "Mon, Wed, Fri 10am-2pm", notes: "Referral usually needed.", icon: "faUtensils" },
      { name: "Community Kitchen Project", address: "The Old Church Hall, Manchester", hours: "Tue, Thu 12pm-3pm", notes: "Hot meals served.", icon: "faBowlFood" }
    ],
    "healthcare": [
      { name: "Urban Village Medical Practice", address: "Ancoats Primary Care Centre, Manchester", phone: "0161 272 5656", notes: "GP services for homeless.", icon: "faNotesMedical" }
    ],
    "job centres": [
      { name: "Manchester City Jobcentre Plus", address: "Employment Hub, Central St, Manchester", phone: "Check gov.uk", notes: "Support with job searching and benefits.", icon: "faBriefcase" }
    ],
    "legal aid": [
      { name: "Greater Manchester Law Centre", address: "50 Newton St, Manchester", phone: "0161 834 7210", notes: "Free legal advice and representation.", icon: "faScaleBalanced" }
    ],
    "mental health support": [
      { name: "Manchester Mind", address: "The Ziferblat Building, 23 Edge St, Manchester", phone: "0161 769 5732", notes: "Mental health support and advocacy.", icon: "faBrain" }
    ]
  },
  "birmingham": {
    "shelters": [
      { name: "Midland Shelter Services", address: "78 Safe Haven Rd, Birmingham", phone: "0121 111 2222", notes: "Families and individuals.", availability: "Limited spaces", icon: "faHouseChimneyUser" }
    ],
    "food banks": [
      { name: "Birmingham Food Hub", address: "99 Generosity Ln, Birmingham", hours: "Mon-Fri 9am-1pm", notes: "Multiple locations, check website.", icon: "faUtensils" }
    ],
    "healthcare": [
      { name: "Heartlands Hospital", address: "Bordesley Green East, Birmingham", phone: "0121 424 2000", notes: "Emergency and general healthcare.", icon: "faHospital" }
    ],
    "legal aid": [
      { name: "Birmingham Law Centre", address: "Legal Chambers, Birmingham", phone: "0121 333 4444", notes: "Housing and benefit advice.", icon: "faScaleBalanced" }
    ],
    "addiction support": [
      { name: "Reach Out Recovery", address: "Support Centre, Birmingham", phone: "0121 555 6666", notes: "Drug and alcohol support services.", icon: "faHandHoldingHeart" }
    ],
    "lgbtq+ support": [
      { name: "Birmingham LGBT", address: "38-40 Holloway Circus, Birmingham", phone: "0121 643 0821", notes: "Support and advice for LGBTQ+ community.", icon: "faRainbow" }
    ]
  },
  "east london": {
    "shelters": [
      { name: "Tower Hamlets Emergency Stay", address: "Shelter Point, E1, London", phone: "020 7123 7890", notes: "Short-term stays.", availability: "Call first", icon: "faBed" }
    ],
    "food banks": [
      { name: "Hackney Foodbank", address: "Various locations, Hackney", hours: "Check website for times/locations", notes: "Referral often required.", icon: "faUtensils" }
    ],
    "healthcare": [
      { name: "Royal London Hospital", address: "Whitechapel Rd, London", phone: "020 7377 7000", notes: "Major trauma centre.", icon: "faHospital" }
    ],
    "mental health support": [
      { name: "Mind in the City, Hackney and Waltham Forest", address: "Various locations", phone: "Check website", notes: "Mental health support services.", icon: "faBrain" }
    ],
    "job centres": [
      { name: "Hackney Jobcentre Plus", address: "275-281 Mare St, London E8 1EE", phone: "Check gov.uk", notes: "Job search and benefit assistance.", icon: "faBriefcase" }
    ],
    "domestic violence support": [
      { name: "Hawa Project", address: "Confidential Address, London", phone: "020 7882 6226", notes: "Support for women experiencing domestic violence.", icon: "faHeartBroken" }
    ]
  },
  "bristol": {
    "shelters": [
      { name: "Bristol Nightsafe", address: "Central Bristol Location", phone: "0117 123 4567", notes: "Young people primarily (16-25).", availability: "Call to check", icon: "faHouseChimneyUser" },
      { name: "St Mungo's Bristol", address: "Multiple projects", phone: "See website", notes: "Various housing and support services.", icon: "faBed" }
    ],
    "food banks": [
      { name: "North Bristol Foodbank", address: "Check website for distribution centres", hours: "Varies by location", notes: "Referral needed.", icon: "faUtensils" },
      { name: "Bristol Community Cafe", address: "St Pauls Learning Centre, Bristol", hours: "Wed 11am-2pm", notes: "Pay-what-you-can cafe.", icon: "faBowlFood" }
    ],
    "healthcare": [
      { name: "Bristol Royal Infirmary", address: "Marlborough St, Bristol", phone: "0117 923 0000", notes: "General hospital services.", icon: "faHospital" }
    ],
    "addiction support": [
      { name: "Bristol Drugs Project (BDP)", address: "Central Office, Brunswick Square", phone: "0117 987 6000", notes: "Comprehensive drug/alcohol support.", icon: "faHandHoldingHeart" }
    ],
    "refugee support": [
      { name: "Bristol Refugee Rights", address: "St Pauls Church, City Road", phone: "0117 955 6003", notes: "Advice and support for asylum seekers and refugees.", icon: "faUsers" }
    ]
  },
  "liverpool": {
    "shelters": [
      { name: "The Whitechapel Centre", address: "Langdale St, Liverpool", phone: "0151 207 7617", notes: "For people who are homeless or at risk of homelessness.", availability: "Check Availability", icon: "faHouseChimneyUser" },
    ],
    "food banks": [
      { name: "Liverpool Central Foodbank", address: "Unit 1, Garston Trade Park, Blackburne St, Liverpool", hours: "Mon-Fri 9:30am-12pm", notes: "Referral required.", icon: "faUtensils" },
    ],
    "healthcare": [
      { name: "Royal Liverpool University Hospital", address: "Prescot St, Liverpool", phone: "0151 706 2000", notes: "General hospital.", icon: "faHospital" },
    ],
    "job centres": [
      { name: "Liverpool City Jobcentre", address: "Williamson Square, Liverpool", phone: "Check gov.uk", notes: "Assistance with job searching and benefits.", icon: "faBriefcase" },
    ],
    "young people's services": [
      { name: "YMCA Liverpool", address: "25 Hope St, Liverpool", phone: "0151 709 9616", notes: "Accommodation and support for young people.", icon: "faChild" },
    ],
  },
};

// Keywords for service types
const serviceKeywords = {
  "shelter": "shelters",
  "shelters": "shelters",
  "sleep": "shelters",
  "stay": "shelters",
  "accommodation": "shelters",
  "housing": "shelters",
  "homeless": "shelters",
  "food": "food banks",
  "eat": "food banks",
  "kitchen": "food banks",
  "foodbank": "food banks",
  "food bank": "food banks",
  "meal": "food banks",
  "pantry": "food banks",
  "sustenance": "food banks",
  "healthcare": "healthcare",
  "health": "healthcare",
  "doctor": "healthcare",
  "gp": "healthcare",
  "clinic": "healthcare",
  "medical": "healthcare",
  "hospital": "healthcare",
  "nurse": "healthcare",
  "job": "job centres",
  "jobs": "job centres",
  "employment": "job centres",
  "jobcentre": "job centres",
  "work": "job centres",
  "career": "job centres",
  "legal": "legal aid",
  "lawyer": "legal aid",
  "advice": "legal aid",
  "rights": "legal aid",
  "solicitor": "legal aid",
  "court": "legal aid",
  "mental": "mental health support",
  "counseling": "mental health support",
  "support": "mental health support",
  "therapy": "mental health support",
  "psychology": "mental health support",
  "wellbeing": "mental health support",
  "addiction": "addiction support",
  "drugs": "addiction support",
  "alcohol": "addiction support",
  "recovery": "addiction support",
  "substance": "addiction support",
  // Only one 'abuse' key, mapped to 'domestic violence support' for clarity
  "abuse": "domestic violence support",
  "lgbtq": "lgbtq+ support",
  "gay": "lgbtq+ support",
  "lesbian": "lgbtq+ support",
  "bisexual": "lgbtq+ support",
  "transgender": "lgbtq+ support",
  "queer": "lgbtq+ support",
  "refugee": "refugee support",
  "asylum": "refugee support",
  "immigrant": "refugee support",
  "domestic violence": "domestic violence support",
  "violence": "domestic violence support",
  "young people": "young people's services",
  "youth": "young people's services",
  "teenager": "young people's services",
  "child": "young people's services"
};

// Service type
interface Service {
  name: string;
  address?: string;
  phone?: string;
  hours?: string;
  availability?: string;
  notes?: string;
  icon?: string;
}

// Message type
interface Message {
  text: string;
  sender: 'user' | 'bot';
  services?: Service[];
  serviceType?: string;
  allServices?: Array<{type: string, services: Service[]}>;
}

// Get the appropriate icon for a service
type IconMap = { [key: string]: IconDefinition };
const getServiceIcon = (iconName: string): IconDefinition => {
  const iconMap: IconMap = {
    faHouseChimneyUser,
    faBed,
    faUtensils,
    faBowlFood,
    faHospital,
    faBriefcase,
    faScaleBalanced,
    faBrain,
    faHandHoldingHeart,
    faRainbow,
    faUsers,
    faChild,
    faHeartBroken,
    faNotesMedical
  };

  return iconMap[iconName] || faUsers;
};

// Chat Bubble Component
interface ChatBubbleProps {
  message: string;
  sender: 'user' | 'bot';
}
const ChatBubble = ({ message, sender }: ChatBubbleProps) => (
  <div className={`chat-bubble ${sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}
    dangerouslySetInnerHTML={{ __html: message.replace(/\n/g, '<br>') }} />
);

// Service Card Component
interface ServiceCardProps {
  service: Service;
  _type: string;
}
const ServiceCard = ({ service }: ServiceCardProps) => {
  const iconName = service.icon || 'faUsers';
  const icon = getServiceIcon(iconName);
  
  return (
    <div className="service-card">
      <h3>
        <FontAwesomeIcon icon={icon} className="fa-fw mr-3" />
        {service.name}
      </h3>
      {service.address && <p><strong>Address:</strong> <address>{service.address}</address></p>}
      {service.phone && (
        <p><strong>Phone:</strong> <a href={`tel:${service.phone}`}>{service.phone}</a></p>
      )}
      {service.hours && <p><strong>Hours:</strong> {service.hours}</p>}
      {service.availability && <p><strong>Availability:</strong> {service.availability}</p>}
      {service.notes && <p><strong>Notes:</strong> {service.notes}</p>}
    </div>
  );
};

export function HelpfulBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const chatboxRef = useRef<HTMLDivElement>(null);

  // Parse user input to extract location and service type
  const parseUserInput = (message: string): { location: string | null; serviceTypeKey: string | null; keywordsFound: string[] } => {
    const lowerMessage = message.toLowerCase();
    let location: string | null = null;
    let serviceTypeKey: string | null = null;
    const keywordsFound: string[] = [];

    // 1. Check for known locations first
    const knownLocations = Object.keys(servicesDatabase);
    for (const loc of knownLocations) {
      if (lowerMessage.includes(loc)) {
        location = loc;
        break;
      }
    }

    // 2. If a location was found, check for service keywords
    if (location) {
      for (const keyword in serviceKeywords) {
        if (lowerMessage.includes(keyword)) {
          keywordsFound.push(keyword);
          serviceTypeKey = serviceKeywords[keyword as keyof typeof serviceKeywords];
        }
      }
    } else {
      // 3. If no location matched directly, check if the entire input is a location
      if (knownLocations.includes(lowerMessage)) {
        location = lowerMessage;
      }
    }

    return { location, serviceTypeKey, keywordsFound };
  };

  // Handle user input and generate bot response
  const handleUserInput = (): void => {
    if (inputValue.trim() === '') return;

    // Add user message
    const updatedMessages: Message[] = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(updatedMessages);
    setInputValue('');

    // Parse user input
    const { location, serviceTypeKey } = parseUserInput(inputValue);

    // Process response with setTimeout to simulate bot thinking
    setTimeout(() => {
      if (location && servicesDatabase[location as keyof typeof servicesDatabase]) {
        const locationServices = servicesDatabase[location as keyof typeof servicesDatabase];
        
        if (serviceTypeKey && locationServices[serviceTypeKey as keyof typeof locationServices]) {
          // User asked for a specific service type
          const botResponse = `Okay, looking for ${serviceTypeKey.replace(/_/g, ' ')} in ${location}...`;
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);

          const specificServices = locationServices[serviceTypeKey as keyof typeof locationServices] as Service[];
          
          setTimeout(() => {
            if (specificServices.length > 0) {
              setMessages(prev => [
                ...prev, 
                { 
                  text: `Here are the ${serviceTypeKey.replace(/_/g, ' ')} I found:`, 
                  sender: 'bot',
                  services: specificServices,
                  serviceType: serviceTypeKey
                }
              ]);

              // After showing the specific service, ask if they need anything else
              setTimeout(() => {
                setMessages(prev => [
                  ...prev, 
                  { 
                    text: `Do you need help finding other types of services in ${location}? (e.g., 'healthcare', 'food banks')`, 
                    sender: 'bot' 
                  }
                ]);
              }, 500);
            } else {
              setMessages(prev => [
                ...prev, 
                { 
                  text: `I couldn't find specific listings for ${serviceTypeKey.replace(/_/g, ' ')} in ${location} in my database, but there might be other services available.`, 
                  sender: 'bot' 
                }
              ]);
            }
          }, 500);
        } else {
          // User asked for a location generally
          const botResponse = `Okay, looking for all available services in ${location}...`;
          setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
          
          let hasServices = false;
          const allLocationServices: Array<{type: string, services: Service[]}> = [];
          
          // Collect all services for the location
          for (const typeKey in locationServices) {
            const servicesOfType = locationServices[typeKey as keyof typeof locationServices] as Service[];
            if (servicesOfType && servicesOfType.length > 0) {
              hasServices = true;
              allLocationServices.push({
                type: typeKey,
                services: servicesOfType
              });
            }
          }

          if (hasServices) {
            // Show all services
            setTimeout(() => {
              setMessages(prev => [
                ...prev,
                {
                  text: `Found services in ${location}:`,
                  sender: 'bot',
                  allServices: allLocationServices
                }
              ]);

              setTimeout(() => {
                setMessages(prev => [
                  ...prev,
                  {
                    text: "Please remember to <strong>always call ahead</strong> to confirm details like opening hours and availability, as things can change quickly. Is there anything else I can help you look for?",
                    sender: 'bot'
                  }
                ]);
              }, 500);
            }, 500);
          } else {
            setTimeout(() => {
              setMessages(prev => [
                ...prev,
                {
                  text: `I found the location \"${location}\", but I don't have specific services listed for it in my current database. Try 'Manchester', 'Birmingham', 'East London', or 'Bristol'.`,
                  sender: 'bot'
                }
              ]);
            }, 500);
          }
        }
      } else {
        // Location not found
        const botResponse = `I'm sorry, I couldn't identify a location or service from your request, or I don't have information for that specific area in my database. Please try naming a major UK city (like 'Manchester', 'Birmingham', 'East London', 'Bristol') or ask for a service type within one of those cities (e.g., 'shelters in Bristol').`;
        
        setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
      }
    }, 500);
  };

  // Add initial bot message on component mount
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm HopeBot. I can help you find support services like shelters, food banks, healthcare, and more.\n\nPlease tell me your current town/city (e.g., 'Manchester'), or ask for a specific service in a location (e.g., 'shelters in Bristol').",
        sender: 'bot'
      }
    ]);
  }, []);

  // Scroll to bottom of chatbox when messages change
  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container">
      <header>
        <h1>HopeBot</h1>
        <span>UK Support Finder (Prototype)</span>
      </header>
      
      <main className="bg-white rounded-md shadow-lg flex flex-col h-[85vh]">
        <div id="chatbox" className="flex-1 overflow-y-auto" ref={chatboxRef}>
          {messages.map((message, index) => (
            <div key={index} className={`${message.sender === 'user' ? 'flex justify-end' : 'bot-message-container'}`}>
              <ChatBubble message={message.text} sender={message.sender} />
              
              {/* Render service cards if the message contains services */}
              {message.services && message.services.map((service, serviceIndex) => (
                <ServiceCard key={`${index}-${serviceIndex}`} service={service} _type={message.serviceType || ''} />
              ))}
              
              {/* Render all service types if the message contains all services */}
              {message.allServices && message.allServices.map((serviceGroup, groupIndex) => (
                <React.Fragment key={`group-${groupIndex}`}>
                  {groupIndex > 0 && <div className="service-group-separator"></div>}
                  <div className="service-type-heading">{serviceGroup.type.replace(/_/g, ' ')}:</div>
                  {serviceGroup.services.map((service, serviceIndex) => (
                    <ServiceCard key={`${index}-${groupIndex}-${serviceIndex}`} service={service} _type={serviceGroup.type} />
                  ))}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        
        <footer className="p-3">
          <div className="flex space-x-2">
            <div className="input-container">
              <label htmlFor="userInput" className="sr-only">Enter your message...</label>
              <input 
                type="text" 
                id="userInput" 
                placeholder="e.g., 'Bristol' or 'food banks in Manchester'" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleUserInput();
                  }
                }}
              />
            </div>
            <button id="sendButton" onClick={handleUserInput}>
              <span className="sr-only">Send your message</span>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </footer>
      </main>
      
      <style jsx>{`
        .container {
          max-width: 90%;
          margin: auto;
          font-family: 'Inter', sans-serif;
        }
        
        header {
          background-color: #003366;
          color: white;
          padding: 1rem;
          border-radius: 0.5rem 0.5rem 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        header h1 {
          font-size: 1.85rem;
          font-weight: 600;
          margin: 0;
        }
        
        header span {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        #chatbox {
          flex: 1;
          padding: 1rem;
          overflow-y: auto;
          background-color: #f9fafb;
        }
        
        .chat-bubble {
          max-width: 85%;
          padding: 0.75rem 1rem;
          border-radius: 1rem;
          margin-bottom: 0.5rem;
          word-wrap: break-word;
          line-height: 1.5;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .user-bubble {
          background-color: #3b82f6;
          color: white;
          margin-left: auto;
          border-bottom-right-radius: 0.5rem;
        }
        
        .bot-bubble {
          background-color: #ffffff;
          color: #1f2937;
          border: 1px solid #e0e0e0;
          margin-right: auto;
          border-bottom-left-radius: 0.5rem;
        }
        
        .bot-message-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .service-card {
          background-color: white;
          border: 1px solid #e0e0e0;
          border-radius: 0.75rem;
          padding: 1rem;
          margin-top: 0.75rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
          width: 90%;
          max-width: 500px;
        }
        
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
        }
        
        .service-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
        }
        
        .service-card p {
          font-size: 0.95rem;
          color: #4b5563;
          margin-bottom: 0.5rem;
          padding-left: 0.5rem;
          border-left: 2px solid #d0d0d0;
        }
        
        .service-type-heading {
          font-weight: 600;
          color: #1e293b;
          margin: 1rem 0 0.5rem 0;
          text-transform: capitalize;
        }
        
        .service-group-separator {
          margin-top: 10px;
        }
        
        footer {
          padding: 1rem;
          border-top: 1px solid #e0e0e0;
          background-color: #ffffff;
          border-radius: 0 0 0.5rem 0.5rem;
          display: flex;
          align-items: center;
        }
        
        .input-container {
          flex: 1;
          margin-right: 0.75rem;
          display: flex;
          align-items: center;
          border-radius: 0.5rem;
          border: 1px solid #e0e0e0;
          padding: 0 0.5rem;
          background-color: white;
        }
        
        #userInput {
          flex: 1;
          border: none;
          padding: 0.75rem 0;
          font-size: 1rem;
          outline: none;
          border-radius: 0.375rem;
          background-color: transparent;
        }
        
        #userInput::placeholder {
          color: #9ca3af;
        }
        
        #sendButton {
          background-color: #003366;
          color: white;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          transition: background-color 0.2s ease-in-out, transform 0.1s ease;
          font-size: 1rem;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        #sendButton:hover {
          background-color: #002e5e;
          transform: scale(1.02);
        }
        
        #sendButton:active {
          background-color: #00264d;
          transform: scale(1);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        .chat-bubble a {
          color: #3b82f6;
          text-decoration: underline;
          font-weight: 500;
        }
        
        .chat-bubble a:hover {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .chat-bubble a:focus {
          color: #1e40af;
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}
