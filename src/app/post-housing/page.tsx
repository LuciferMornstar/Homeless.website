'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faHandsHelping, 
  faArrowUp, 
  faUsers, 
  faHeart, 
  faGraduationCap, 
  faLaptop, 
  faCertificate, 
  faFileAlt, 
  faBriefcase, 
  faPeopleArrows
} from '@fortawesome/free-solid-svg-icons';

// Define proper TypeScript interfaces
interface FeatureBlockProps {
  icon: any; // We'll fix this any type later
  title: string;
  text: string;
  linkHref: string;
  linkText: string;
}

interface MilestoneProps {
  position: 'left' | 'right';
  title: string;
  text: string;
  checklist: string[];
}

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: any; // We'll fix this any type later
}

interface ResourceCardProps {
  icon: any; // We'll fix this any type later
  title: string;
  description: string;
}

interface TestimonialProps {
  content: string;
  author: string;
}

// Feature Block Component
const FeatureBlock: React.FC<FeatureBlockProps> = ({ icon, title, text, linkHref, linkText }) => (
  <div className="feature-block fade-in">
    <div className="feature-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-text">{text}</p>
    <Link href={linkHref} className="btn btn-sm">
      {linkText}
    </Link>
  </div>
);

// Timeline Milestone Component
const Milestone: React.FC<MilestoneProps> = ({ position, title, text, checklist }) => (
  <div className={`milestone milestone-${position} animated-element`}>
    <div className="milestone-content">
      <h3 className="milestone-title">{title}</h3>
      <p>{text}</p>
      <ul className="checklist mt-3">
        {checklist.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

// Card Component
const Card: React.FC<CardProps> = ({ title, children, icon = null }) => (
  <div className="card animated-element">
    <div className="card-content">
      {icon && (
        <div className="feature-icon mb-3">
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <h3 className="card-title">{title}</h3>
      {children}
    </div>
  </div>
);

// Resource Card Component
const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description }) => (
  <div className="resource-card">
    <div className="resource-icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div className="resource-content">
      <div className="resource-title">{title}</div>
      <p>{description}</p>
    </div>
  </div>
);

// Testimonial Component
const Testimonial: React.FC<TestimonialProps> = ({ content, author }) => (
  <div className="testimonial fade-in">
    <div className="testimonial-content">{content}</div>
    <div className="testimonial-author">- {author}</div>
  </div>
);

export default function Page() {
  useEffect(() => {
    // Animation for elements as they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      threshold: 0.1
    });
    
    const animatedElements = document.querySelectorAll('.animated-element');
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      animatedElements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title slide-up">After Housing Support</h1>
            <p className="hero-subtitle slide-up">Resources and guidance for maintaining stable housing and building a sustainable future</p>
            <div className="slide-up">
              <a href="#housing-stability" className="btn btn-lg">Housing Stability</a>
              <a href="#community-support" className="btn btn-outline btn-lg">Community Support</a>
            </div>
          </div>
        </div>
      </section>

      {/* Aria-live region for accessibility */}
      <div 
        id="notification-area" 
        aria-live="polite" 
        role="status" 
        style={{position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden'}}
      >
        Notifications will appear here.
      </div>
      
      {/* The Journey After Housing Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center mb-4">The Journey After Housing</h2>
          <div className="divider mb-4"></div>
          <p className="text-center mb-5">Securing housing is a significant milestone, but it's just the beginning of your journey. Our post-housing support helps you maintain stability and build a sustainable future.</p>
          
          <div className="row">
            <div className="col-4">
              <FeatureBlock 
                icon={faHome}
                title="Housing Stability"
                text="Learn essential skills for maintaining your housing, from budgeting to understanding tenant rights and responsibilities."
                linkHref="#housing-stability"
                linkText="Learn More"
              />
            </div>
            <div className="col-4">
              <FeatureBlock 
                icon={faHandsHelping}
                title="Community Connection"
                text="Build a support network and discover community resources to help you thrive in your new environment."
                linkHref="#community-support"
                linkText="Find Support"
              />
            </div>
            <div className="col-4">
              <FeatureBlock 
                icon={faArrowUp}
                title="Moving Forward"
                text="Access education, employment, and wellbeing resources to build long-term stability and growth."
                linkHref="#moving-forward"
                linkText="Explore Options"
              />
            </div>
          </div>
        </div>
      </section>

      {/* First Year Timeline Section */}
      <section id="first-year" className="section bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Your First Year in Housing</h2>
          <div className="divider mb-4"></div>
          
          <div className="timeline">
            <Milestone 
              position="left"
              title="First 30 Days"
              text="Focus on setting up essentials: utilities, basic furnishings, and getting to know your neighborhood. Make sure all housing paperwork is properly filed."
              checklist={[
                "Set up utilities (water, electricity, gas)",
                "Meet neighbors and locate essential services",
                "Create a budget for housing expenses",
                "Ensure all required documentation is submitted"
              ]}
            />
            
            <Milestone 
              position="right"
              title="2-3 Months"
              text="Establish routines and begin addressing medium-term needs. Connect with local support services and build community relationships."
              checklist={[
                "Register with local healthcare providers",
                "Explore employment or education opportunities",
                "Join community groups or activities",
                "Establish regular check-ins with your support worker"
              ]}
            />
            
            <Milestone 
              position="left"
              title="4-6 Months"
              text="Focus on stabilizing your situation and addressing any challenges. Build skills for long-term housing maintenance."
              checklist={[
                "Complete any housing skills training",
                "Build emergency savings if possible",
                "Address any maintenance issues promptly",
                "Develop relationships with neighbors and community"
              ]}
            />
            
            <Milestone 
              position="right"
              title="7-12 Months"
              text="Look toward the future and longer-term sustainability. Evaluate your progress and set goals for the coming year."
              checklist={[
                "Review your budget and financial situation",
                "Consider career development or education plans",
                "Build a stronger support network",
                "Celebrate your achievements and milestones"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Housing Stability Section */}
      <section id="housing-stability" className="section">
        <div className="container">
          <h2 className="text-center mb-4">Maintaining Housing Stability</h2>
          <div className="divider mb-4"></div>
          
          <div className="row">
            <div className="col-6">
              <Card title="Understanding Your Tenancy">
                <p className="card-text mb-4">
                  Knowing your rights and responsibilities as a tenant is crucial for maintaining stable housing. Make sure you:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">Understand your tenancy agreement thoroughly</li>
                  <li className="mb-2">Know what maintenance you're responsible for</li>
                  <li className="mb-2">Understand your landlord's obligations</li>
                  <li className="mb-2">Keep copies of all correspondence with your landlord</li>
                  <li>Know how to report repairs properly</li>
                </ul>
                <Link href="/resources" className="btn btn-sm">Tenant Rights Guide</Link>
              </Card>
            </div>
            
            <div className="col-6">
              <Card title="Financial Management">
                <p className="card-text mb-4">
                  Managing your finances effectively is essential for maintaining your housing. Key strategies include:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">Creating a monthly budget that prioritizes rent and utilities</li>
                  <li className="mb-2">Setting up direct debits for regular payments</li>
                  <li className="mb-2">Building an emergency fund for unexpected expenses</li>
                  <li className="mb-2">Understanding all benefits you're entitled to</li>
                  <li>Seeking help early if you're struggling with payments</li>
                </ul>
                <Link href="/resources" className="btn btn-sm">Budgeting Tools</Link>
              </Card>
            </div>
          </div>
          
          <div className="text-card animated-element mt-4">
            <h3 className="mb-3">What To Do If You're Struggling</h3>
            <p className="mb-4">
              If you're finding it difficult to maintain your housing, it's important to act quickly. Don't wait until problems become overwhelming:
            </p>
            <ol className="mb-4">
              <li className="mb-2"><strong>Contact your support worker or housing officer immediately</strong> if you're having trouble paying rent or bills</li>
              <li className="mb-2"><strong>Seek debt advice</strong> from organizations like Citizens Advice or StepChange</li>
              <li className="mb-2"><strong>Check if you're receiving all benefits</strong> you're entitled to</li>
              <li className="mb-2"><strong>Talk to your landlord early</strong> if you're having payment difficulties</li>
              <li><strong>Contact our helpline at +447853811172</strong> for guidance and support</li>
            </ol>
            <p className="font-weight-bold">
              Remember: Most housing problems can be resolved if addressed early. Don't let shame or fear prevent you from seeking help.
            </p>
          </div>
        </div>
      </section>

      {/* Community Support Section */}
      <section id="community-support" className="section bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Building Your Support Network</h2>
          <div className="divider mb-4"></div>
          
          <p className="text-center mb-5">Having a strong support network is crucial for maintaining stable housing and overall wellbeing. Here are resources and ways to connect:</p>
          
          <div className="row">
            <div className="col-4">
              <Card title="Peer Support Groups" icon={faUsers}>
                <p className="card-text mb-4">
                  Connect with others who have experienced homelessness and are now in housing. Share experiences, advice, and encouragement.
                </p>
                <ul className="mb-4">
                  <li className="mb-2">Weekly meetups in local community centers</li>
                  <li className="mb-2">Online forums and chat groups</li>
                  <li>Mentoring opportunities</li>
                </ul>
                <Link href="/network" className="btn btn-sm">Find Groups Near You</Link>
              </Card>
            </div>
            
            <div className="col-4">
              <Card title="Community Resources" icon={faHandsHelping}>
                <p className="card-text mb-4">
                  Discover local resources and organizations that can provide ongoing support:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">Community centers and libraries</li>
                  <li className="mb-2">Faith-based organizations</li>
                  <li className="mb-2">Food banks and community kitchens</li>
                  <li>Neighborhood associations</li>
                </ul>
                <Link href="/resources" className="btn btn-sm">Local Resource Directory</Link>
              </Card>
            </div>
            
            <div className="col-4">
              <Card title="Buddy System" icon={faHeart}>
                <p className="card-text mb-4">
                  Our Buddy System pairs you with a volunteer who can provide one-to-one support during your transition:
                </p>
                <ul className="mb-4">
                  <li className="mb-2">Regular check-ins and practical support</li>
                  <li className="mb-2">Help navigating local services</li>
                  <li className="mb-2">Social connection and emotional support</li>
                  <li>Guidance with practical housing issues</li>
                </ul>
                <Link href="/volunteer" className="btn btn-sm">Request a Buddy</Link>
              </Card>
            </div>
          </div>
          
          <div className="text-card animated-element mt-4">
            <h3 className="mb-3">Building Healthy Relationships</h3>
            <p className="mb-4">
              Transitioning into housing can sometimes mean reassessing relationships. It's important to build connections that support your goals and well-being:
            </p>
            <ul className="mb-4">
              <li className="mb-2">Consider which relationships are supportive of your new circumstances</li>
              <li className="mb-2">Set healthy boundaries with friends and family if needed</li>
              <li className="mb-2">Explore new social activities and groups aligned with your goals</li>
              <li>Build relationships with neighbors and community members</li>
            </ul>
            <p>
              Our support workers can help you navigate relationship challenges and build a healthy social network.
            </p>
          </div>
        </div>
      </section>

      {/* Moving Forward Section */}
      <section id="moving-forward" className="section">
        <div className="container">
          <h2 className="text-center mb-4">Moving Forward: Building Your Future</h2>
          <div className="divider mb-4"></div>
          
          <p className="text-center mb-5">Stable housing provides a foundation to build your future. These resources can help you take the next steps:</p>
          
          <div className="row mb-4">
            <div className="col-6">
              <Card title="Education & Skills Development">
                <p className="card-text mb-4">
                  Improving your skills and education can open new opportunities:
                </p>
                <ResourceCard 
                  icon={faGraduationCap}
                  title="Adult Education Classes"
                  description="Free and low-cost courses available at local colleges and online"
                />
                <ResourceCard 
                  icon={faLaptop}
                  title="Digital Skills Training"
                  description="Learn essential computer skills for work and daily life"
                />
                <ResourceCard 
                  icon={faCertificate}
                  title="Vocational Qualifications"
                  description="Practical qualifications for specific careers and trades"
                />
                <Link href="/resources" className="btn btn-sm mt-3">Education Resources</Link>
              </Card>
            </div>
            
            <div className="col-6">
              <Card title="Employment Support">
                <p className="card-text mb-4">
                  Finding and maintaining employment is key to long-term stability:
                </p>
                <ResourceCard 
                  icon={faFileAlt}
                  title="CV and Interview Preparation"
                  description="One-to-one support to prepare job applications"
                />
                <ResourceCard 
                  icon={faBriefcase}
                  title="Job Search Assistance"
                  description="Help finding suitable vacancies and applying for positions"
                />
                <ResourceCard 
                  icon={faPeopleArrows}
                  title="Work Mentoring"
                  description="Support during your first months of employment"
                />
                <Link href="/employment" className="btn btn-sm mt-3">Employment Support</Link>
              </Card>
            </div>
          </div>
          
          <div className="row">
            <div className="col-6">
              <Card title="Health & Wellbeing">
                <p className="card-text mb-4">
                  Taking care of your physical and mental health is essential for stability:
                </p>
                <ul className="mb-4">
                  <li className="mb-2"><strong>Register with a GP</strong> - We can help you find and register with a local doctor</li>
                  <li className="mb-2"><strong>Mental Health Support</strong> - Access to counseling and support groups</li>
                  <li className="mb-2"><strong>Addiction Recovery Services</strong> - Confidential support for recovery</li>
                  <li><strong>Wellness Activities</strong> - Free or low-cost fitness and mindfulness sessions</li>
                </ul>
                <Link href="/healthcare" className="btn btn-sm">Health Resources</Link>
              </Card>
            </div>
            
            <div className="col-6">
              <Card title="Financial Growth">
                <p className="card-text mb-4">
                  Build financial stability and security for your future:
                </p>
                <ul className="mb-4">
                  <li className="mb-2"><strong>Financial Literacy Workshops</strong> - Learn about savings, credit, and debt management</li>
                  <li className="mb-2"><strong>Banking Access</strong> - Help setting up bank accounts and understanding services</li>
                  <li className="mb-2"><strong>Debt Management</strong> - Support dealing with existing debts</li>
                  <li><strong>Saving and Planning</strong> - Tools for building financial security</li>
                </ul>
                <Link href="/resources" className="btn btn-sm">Financial Resources</Link>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="section bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Success Stories</h2>
          <div className="divider mb-4"></div>
          
          <div className="row">
            <div className="col-4">
              <Testimonial 
                content="After three years of homelessness, getting my own flat was just the beginning. The post-housing support helped me learn to budget, maintain my home, and eventually find work. Two years later, I'm stable, employed, and even volunteering to help others."
                author="Michael, 42"
              />
            </div>
            <div className="col-4">
              <Testimonial 
                content="The buddy system was a lifeline for me. Having someone to call when I was struggling with bills or feeling isolated made all the difference. My buddy helped me connect with local groups, and now I have a real community around me."
                author="Sarah, 38"
              />
            </div>
            <div className="col-4">
              <Testimonial 
                content="I was terrified of losing my housing again. The skills workshops taught me how to manage my tenancy properly, talk to my landlord, and handle repairs. Three years on, I'm in the same flat and have even started a small business from home."
                author="James, 51"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Need Support With Your Housing?</h2>
          <p className="cta-text">Our team is ready to help you maintain your housing and build a stable future</p>
          <a href={`mailto:helpme@homeless.website`} className="btn btn-lg btn-primary mr-3">Email Us</a>
          <a href={`tel:+447853811172`} className="btn btn-lg btn-secondary">Call Our Support Line</a>
        </div>
      </section>
    </main>
  );
}
