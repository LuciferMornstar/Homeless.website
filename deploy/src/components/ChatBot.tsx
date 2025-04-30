'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser, faTimes, faComments } from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const helpfulResponses = {
  emergency: [
    "If you're in immediate danger, please call 999.",
    "For medical emergencies, go to your nearest A&E or call 999.",
    "If you need immediate shelter, call the National Homeless Advice Service on 0808 800 4444."
  ],
  shelter: [
    "You can find emergency shelters in your area by visiting our Shelters page or calling the National Homeless Advice Service on 0808 800 4444.",
    "Local councils have a legal duty to provide advice and assistance to homeless people in their area. Visit your local council's housing department.",
    "If you're sleeping rough, contact StreetLink on 0300 500 0914 who can connect you to local services."
  ],
  mentalHealth: [
    "If you're experiencing a mental health crisis, call the Samaritans on 116 123 (available 24/7).",
    "NHS Mental Health Services can be accessed by calling 111, option 2.",
    "Our Mental Health page has resources for free counseling and support services."
  ],
  dogs: [
    "Many shelters do accept dogs - you can check our dog-friendly resources section.",
    "The Dogs Trust Freedom Project offers temporary fostering for dogs of people fleeing domestic abuse or experiencing homelessness.",
    "Service dogs are protected under UK law and establishments must make reasonable accommodations."
  ],
  benefits: [
    "You may be eligible for Universal Credit, Housing Benefit, or other support. Visit GOV.UK or your local Citizens Advice.",
    "You don't need a fixed address to claim benefits - you can use a care-of address or a day center.",
    "Our Benefits page has detailed information on what you might be entitled to and how to apply."
  ],
  food: [
    "Food banks can provide emergency food supplies. Visit our Food Banks page to find one near you.",
    "Many community centers and churches offer free meals on certain days of the week.",
    "The Trussell Trust operates many UK food banks - call 0808 208 2138 for more information."
  ],
  healthCare: [
    "You have the right to register with a GP even if you don't have a fixed address or identification.",
    "If you're sleeping rough, many cities have dedicated homeless healthcare services.",
    "NHS walk-in centers can provide treatment for minor injuries and illnesses without an appointment."
  ]
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hello, I'm HelpfulBot. How can I assist you today? I can help with emergency information, shelters, mental health resources, dog-friendly services, benefits advice, food resources, or healthcare access.",
    sender: 'bot',
    timestamp: new Date()
  }
];

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessageId = messages.length + 1;
    const userMessage: Message = {
      id: userMessageId,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Process the message and respond
    setTimeout(() => {
      const botResponse = generateResponse(input.toLowerCase());
      const botMessage: Message = {
        id: userMessageId + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };
  
  const generateResponse = (userInput: string): string => {
    // Check for emergency keywords
    if (userInput.includes('emergency') || userInput.includes('danger') || userInput.includes('urgent') || userInput.includes('immediate')) {
      return getRandomResponse('emergency');
    }
    
    // Check for shelter keywords
    if (userInput.includes('shelter') || userInput.includes('housing') || userInput.includes('sleep') || userInput.includes('rough') || userInput.includes('place to stay')) {
      return getRandomResponse('shelter');
    }
    
    // Check for mental health keywords
    if (userInput.includes('mental') || userInput.includes('depress') || userInput.includes('anxiety') || userInput.includes('stress') || userInput.includes('suicid')) {
      return getRandomResponse('mentalHealth');
    }
    
    // Check for dog keywords
    if (userInput.includes('dog') || userInput.includes('pet') || userInput.includes('animal') || userInput.includes('service animal')) {
      return getRandomResponse('dogs');
    }
    
    // Check for benefits keywords
    if (userInput.includes('benefit') || userInput.includes('universal credit') || userInput.includes('money') || userInput.includes('financial') || userInput.includes('fund')) {
      return getRandomResponse('benefits');
    }
    
    // Check for food keywords
    if (userInput.includes('food') || userInput.includes('hungry') || userInput.includes('eat') || userInput.includes('meal')) {
      return getRandomResponse('food');
    }
    
    // Check for healthcare keywords
    if (userInput.includes('health') || userInput.includes('doctor') || userInput.includes('gp') || userInput.includes('medical') || userInput.includes('nhs')) {
      return getRandomResponse('healthCare');
    }
    
    // Default response
    return "I'm not sure how to help with that specific question. You can ask me about emergency services, shelter, mental health, dog-friendly services, benefits, food resources, or healthcare. If you need immediate assistance, please call our helpline at +447853811172 or email helpme@homeless.website.";
  };
  
  const getRandomResponse = (category: keyof typeof helpfulResponses): string => {
    const responses = helpfulResponses[category];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 sm:w-96 flex flex-col max-h-[500px] border border-gray-200">
          <div className="bg-red-700 text-white px-4 py-3 flex justify-between items-center rounded-t-lg">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRobot} className="mr-2" />
              <span className="font-medium">HelpfulBot</span>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-red-100 text-gray-900' 
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon 
                      icon={message.sender === 'user' ? faUser : faRobot} 
                      className={`mr-2 ${message.sender === 'user' ? 'text-red-700' : 'text-gray-700'}`}
                    />
                    <span className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                aria-label="Send message"
                className={`bg-red-700 text-white px-4 py-2 rounded-r-lg focus:outline-none ${
                  !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-800'
                }`}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              For emergencies, please call 999. This chatbot is for informational purposes only.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-red-700 hover:bg-red-800 text-white rounded-full p-4 shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          aria-label="Open chat"
        >
          <FontAwesomeIcon icon={faComments} size="lg" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
