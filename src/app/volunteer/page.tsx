'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserFriends,
  faUtensils,
  faChalkboardTeacher,
  faHandsHelping,
  faBriefcase,
  faUserMd,
  faBars,
  faEnvelope,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

export default function VolunteerPage() {
  return <VolunteerPageContent />;
}

const VolunteerPageContent = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    availability: '',
    message: '',
    consent: false,
    newsletter: false
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would submit the form data to a server
    alert('Thank you for your interest in volunteering! We will contact you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      role: '',
      availability: '',
      message: '',
      consent: false,
      newsletter: false
    });
  };

  // Volunteer roles data
  const volunteerRoles = [
    {
      icon: faUserFriends,
      title: "Buddy System Volunteer",
      description: "Support someone recently housed, helping them adjust and thrive."
    },
    {
      icon: faUtensils,
      title: "Food Service Volunteer",
      description: "Help prepare and serve meals at our community kitchens and food banks."
    },
    {
      icon: faChalkboardTeacher,
      title: "Skills Workshop Leader",
      description: "Run workshops on budgeting, cooking, IT skills, or creative activities."
    },
    {
      icon: faHandsHelping,
      title: "Outreach Team Member",
      description: "Join our street outreach teams to connect with rough sleepers and offer support."
    },
    {
      icon: faBriefcase,
      title: "Admin & Office Support",
      description: "Help with admin tasks, phones, emails, and organizing resources."
    },
    {
      icon: faUserMd,
      title: "Professional Skills Volunteer",
      description: "Offer your professional skills in legal, healthcare, mental health, or other areas."
    }
  ];

  // Benefits data
  const benefits = [
    {
      title: "Develop Skills",
      description: "Gain valuable experience and develop transferable skills for your personal and professional life."
    },
    {
      title: "Join a Community",
      description: "Become part of a supportive community of passionate volunteers and staff."
    },
    {
      title: "Flexible Opportunities",
      description: "We offer flexible volunteering options to fit your schedule and commitments."
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      content: "I started volunteering as a Buddy after retirement. The connection I've formed with James has been transformative for both of us.",
      author: "Sarah"
    },
    {
      content: "As a chef, I now lead cooking workshops. The participants are so engaged and grateful - it's the highlight of my week!",
      author: "Raj"
    }
  ];

  return (
    <main id="main-content" className="section">
      <div className="container">
        <section className="mb-5">
          <h1 className="mb-4">Volunteer With Us</h1>
          <div className="divider"></div>
          <p className="mb-4">Make a real difference in the lives of those experiencing homelessness by joining our volunteer team.</p>
          <div className="flex flex-wrap gap-3 mb-4">
            <a className="btn" href="#volunteer-roles">Volunteer Roles</a>
            <a className="btn" href="#why-volunteer">Why Volunteer</a>
            <a className="btn" href="#volunteer-stories">Volunteer Stories</a>
            <a className="btn" href="#get-involved">Get Involved</a>
            <a className="btn" href="#corporate">Corporate Volunteering</a>
          </div>
        </section>

        <section id="volunteer-roles" className="mb-5">
          <h2 className="mb-4">Volunteer Roles</h2>
          <div className="divider"></div>
          <div className="row">
            {volunteerRoles.slice(0, 3).map((role, index) => (
              <div className="col-4" key={index}>
                <div className="feature-block text-center fade-in">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={role.icon} />
                  </div>
                  <h3 className="feature-title">{role.title}</h3>
                  <p className="feature-text">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            {volunteerRoles.slice(3, 6).map((role, index) => (
              <div className="col-4" key={index + 3}>
                <div className="feature-block text-center fade-in">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={role.icon} />
                  </div>
                  <h3 className="feature-title">{role.title}</h3>
                  <p className="feature-text">{role.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="why-volunteer" className="mb-5">
          <h2 className="mb-4">Why Volunteer With Us</h2>
          <div className="divider"></div>
          <div className="row">
            {benefits.map((benefit, index) => (
              <div className="col-4" key={index}>
                <div className="card fade-in">
                  <h3 className="card-title">{benefit.title}</h3>
                  <p className="card-text">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="card fade-in mt-4">
            <h3 className="card-title">What We Provide</h3>
            <ul>
              <li>Comprehensive training and ongoing support</li>
              <li>Regular supervision and feedback</li>
              <li>Reimbursement of reasonable expenses</li>
              <li>References for future employment</li>
              <li>A welcoming and inclusive environment</li>
              <li>Social events and volunteer recognition</li>
            </ul>
          </div>
        </section>

        <section id="volunteer-stories" className="mb-5">
          <h2 className="mb-4">Volunteer Stories</h2>
          <div className="divider"></div>
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div className="col-6" key={index}>
                <div className="testimonial fade-in">
                  <div className="testimonial-content">"{testimonial.content}"</div>
                  <div className="testimonial-author">- {testimonial.author}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="get-involved" className="mb-5">
          <h2 className="mb-4">Get Involved</h2>
          <div className="divider"></div>
          <div className="card fade-in">
            <p className="mb-4">Ready to make a difference? Fill out our volunteer application form below and we'll be in touch.</p>
            <form className="volunteer-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6 mb-3">
                  <label htmlFor="name">Full Name *</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="location">Your Location *</label>
                  <input 
                    type="text" 
                    id="location" 
                    name="location" 
                    value={formData.location}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="role">I'm Interested In *</label>
                  <select 
                    id="role" 
                    name="role" 
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a volunteer role</option>
                    <option value="buddy">Buddy System Volunteer</option>
                    <option value="food">Food Service Volunteer</option>
                    <option value="workshop">Skills Workshop Leader</option>
                    <option value="outreach">Outreach Team Member</option>
                    <option value="admin">Admin & Office Support</option>
                    <option value="professional">Professional Skills Volunteer</option>
                    <option value="other">Other/Not Sure Yet</option>
                  </select>
                </div>
                <div className="col-6 mb-3">
                  <label htmlFor="availability">Availability *</label>
                  <select 
                    id="availability" 
                    name="availability" 
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select your availability</option>
                    <option value="weekday-daytime">Weekdays (Daytime)</option>
                    <option value="weekday-evening">Weekdays (Evening)</option>
                    <option value="weekend-daytime">Weekends (Daytime)</option>
                    <option value="weekend-evening">Weekends (Evening)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
                <div className="col-12 mb-3">
                  <label htmlFor="message">Why would you like to volunteer with us? (Optional)</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="col-12 mb-3">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    name="consent" 
                    checked={formData.consent}
                    onChange={handleInputChange}
                    required 
                  />
                  <label htmlFor="consent">I consent to Homeless Helpers storing my information for the purpose of volunteer recruitment *</label>
                </div>
                <div className="col-12 mb-3">
                  <input 
                    type="checkbox" 
                    id="newsletter" 
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="newsletter">I'd like to receive email updates about volunteering opportunities and news (optional)</label>
                </div>
              </div>
              <button type="submit" className="btn">Submit Application</button>
            </form>
            <p className="mt-4 text-sm">Questions? Contact our volunteer coordinator at <a href="mailto:volunteer@homeless.website">volunteer@homeless.website</a> or call <a href="tel:+447853811172">+447853811172</a>.</p>
          </div>
        </section>

        <section id="corporate" className="mb-5">
          <h2 className="mb-4">Corporate Volunteering</h2>
          <div className="divider"></div>
          <div className="card fade-in">
            <h3 className="card-title">Partner With Us</h3>
            <p className="mb-4">We offer meaningful corporate volunteering opportunities that benefit your team and make a real difference to those experiencing homelessness.</p>
            <div className="row">
              <div className="col-6">
                <h4>Team Volunteering Days</h4>
                <ul>
                  <li>Community space renovation projects</li>
                  <li>Food preparation and service</li>
                  <li>Organizing donation drives</li>
                  <li>Group outreach activities</li>
                </ul>
              </div>
              <div className="col-6">
                <h4>Skills-Based Volunteering</h4>
                <ul>
                  <li>Professional mentoring</li>
                  <li>IT support and digital inclusion</li>
                  <li>Marketing and communications assistance</li>
                  <li>Financial guidance workshops</li>
                </ul>
              </div>
            </div>
            <p className="mb-4">Corporate volunteering helps your organization:</p>
            <ul>
              <li>Strengthen team bonds through shared meaningful experiences</li>
              <li>Demonstrate corporate social responsibility</li>
              <li>Develop staff skills and boost morale</li>
              <li>Create lasting local community connections</li>
            </ul>
            <p>To discuss corporate volunteering partnerships, contact our Corporate Engagement Team at <a href="mailto:volunteer@homeless.website">volunteer@homeless.website</a></p>
            <Link className="btn mt-3" href="/corporate-partnerships">Corporate Partnerships</Link>
          </div>
        </section>
      </div>

      <style jsx>{`
        .section { 
          background: var(--grey-light, #f8f9fa); 
          border-radius: 12px; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
          margin-bottom: 2rem; 
          padding: 2rem; 
        }
        
        .feature-block, .card, .text-card { 
          background: #fff; 
          border-radius: 10px; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
          padding: 1.5rem; 
          margin-bottom: 1.5rem; 
          transition: box-shadow 0.3s; 
        }
        
        .feature-block:hover, .card:hover, .text-card:hover { 
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); 
        }
        
        .feature-icon { 
          font-size: 2.5rem; 
          color: var(--primary, #48d595); 
          margin-bottom: 1rem; 
        }
        
        .btn { 
          background: var(--primary, #48d595); 
          color: #fff; 
          border: none; 
          border-radius: 30px; 
          padding: 0.75rem 1.5rem; 
          font-size: 1rem; 
          cursor: pointer; 
          transition: background 0.3s, color 0.3s;
          display: inline-block;
          text-decoration: none;
          margin-right: 0.5rem;
          margin-bottom: 0.5rem;
        }
        
        .btn:hover { 
          background: var(--primary-dark, #40c085); 
          color: #fff; 
        }
        
        .divider { 
          height: 3px; 
          background: var(--primary, #48d595); 
          border-radius: 2px; 
          margin: 1.5rem 0; 
          width: 60px;
        }
        
        .container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .row {
          display: flex;
          flex-wrap: wrap;
          margin: 0 -1rem;
        }
        
        .col-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
          padding: 0 1rem;
        }
        
        .col-6 {
          flex: 0 0 50%;
          max-width: 50%;
          padding: 0 1rem;
        }
        
        .col-12 {
          flex: 0 0 100%;
          max-width: 100%;
          padding: 0 1rem;
        }
        
        .mb-3 {
          margin-bottom: 1rem;
        }
        
        .mb-4 {
          margin-bottom: 1.5rem;
        }
        
        .mb-5 {
          margin-bottom: 3rem;
        }
        
        .mt-3 {
          margin-top: 1rem;
        }
        
        .mt-4 {
          margin-top: 1.5rem;
        }
        
        .text-center {
          text-align: center;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          font-size: 1rem;
          margin-top: 0.25rem;
        }
        
        input[type="checkbox"] {
          width: auto;
          margin-right: 0.5rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        label[for="consent"], label[for="newsletter"] {
          display: inline;
          font-weight: normal;
        }
        
        .text-sm {
          font-size: 0.875rem;
        }
        
        .testimonial {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .testimonial-content {
          font-style: italic;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .testimonial-author {
          font-weight: 600;
          text-align: right;
        }
        
        /* Animation classes */
        .fade-in {
          opacity: 0;
          animation: fadeIn 1s forwards;
        }
        
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 992px) {
          .col-4 {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
        
        @media (max-width: 768px) {
          .col-4, .col-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
          
          .btn {
            display: block;
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </main>
  );
};
