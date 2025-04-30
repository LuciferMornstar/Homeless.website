import React from 'react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  contactInfo: string;
  website?: string;
  isEmergency: boolean;
  accessibleToHomeless: boolean;
  howToAccess: string;
}

const MentalHealthResources: React.FC = () => {
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Crisis Text Line',
      description: 'Free 24/7 mental health support via text message. Available even with minimal phone service or data.',
      contactInfo: 'Text HOME to 85258',
      website: 'https://www.crisistextline.org',
      isEmergency: true,
      accessibleToHomeless: true,
      howToAccess: 'Works with any mobile phone that can send text messages, even with low battery or limited service.'
    },
    {
      id: '2',
      title: 'Rough Sleepers Mental Health Outreach',
      description: 'Specialized mental health professionals who visit known rough sleeping locations to provide support.',
      contactInfo: 'Call 0800-123-4567',
      isEmergency: false,
      accessibleToHomeless: true,
      howToAccess: 'No referral needed. Teams visit common rough sleeping areas weekly or can be requested through shelters.'
    },
    {
      id: '3',
      title: 'Mind Charity Drop-In Centres',
      description: 'Safe spaces offering mental health support, warm drinks, and a place to rest during daytime hours.',
      contactInfo: 'Call 0300 123 3393',
      website: 'https://www.mind.org.uk',
      isEmergency: false,
      accessibleToHomeless: true,
      howToAccess: 'No appointment required. Bring ID if possible, but not required. Services are free.'
    },
    {
      id: '4',
      title: 'NHS Mental Health Crisis Line',
      description: 'Immediate support for those experiencing a mental health crisis.',
      contactInfo: 'Call 111, then select the mental health option',
      isEmergency: true,
      accessibleToHomeless: true,
      howToAccess: 'Available from any phone including public payphones (no money needed for 111 calls).'
    },
    {
      id: '5',
      title: 'Therapy Dog Sessions with Ruby',
      description: 'Scheduled therapy sessions with Ruby to help reduce anxiety and improve mental wellbeing.',
      contactInfo: 'Email ruby@homelesshelperdogs.org or call 555-123-4567',
      isEmergency: false,
      accessibleToHomeless: true,
      howToAccess: 'Ask any homeless outreach worker for a session card, or visit locations on Ruby\'s schedule posted at local shelters.'
    }
  ];

  return (
    <div className="mental-health-resources">
      <h3 className="section-title">
        <i className="fas fa-brain"></i> Mental Health Resources for Homeless Individuals
      </h3>
      
      <div className="resources-urgent">
        <h4>Emergency Support</h4>
        <div className="resources-grid">
          {resources
            .filter(resource => resource.isEmergency)
            .map(resource => (
              <div key={resource.id} className="resource-card emergency">
                <h5>{resource.title}</h5>
                <p>{resource.description}</p>
                <div className="resource-access">
                  <strong>How to access:</strong> 
                  <p>{resource.howToAccess}</p>
                </div>
                <div className="resource-contact">
                  <i className="fas fa-phone-alt"></i> {resource.contactInfo}
                </div>
                {resource.website && (
                  <a href={resource.website} target="_blank" rel="noopener noreferrer" className="resource-link">
                    <i className="fas fa-external-link-alt"></i> Visit Website
                  </a>
                )}
              </div>
            ))
          }
        </div>
      </div>
      
      <div className="resources-standard">
        <h4>Ongoing Support</h4>
        <div className="resources-grid">
          {resources
            .filter(resource => !resource.isEmergency)
            .map(resource => (
              <div key={resource.id} className="resource-card">
                <h5>{resource.title}</h5>
                <p>{resource.description}</p>
                <div className="resource-access">
                  <strong>How to access:</strong> 
                  <p>{resource.howToAccess}</p>
                </div>
                <div className="resource-contact">
                  <i className="fas fa-phone-alt"></i> {resource.contactInfo}
                </div>
                {resource.website && (
                  <a href={resource.website} target="_blank" rel="noopener noreferrer" className="resource-link">
                    <i className="fas fa-external-link-alt"></i> Visit Website
                  </a>
                )}
              </div>
            ))
          }
        </div>
      </div>
      
      <div className="resources-info">
        <p><i className="fas fa-info-circle"></i> All of these resources are accessible to individuals experiencing homelessness and trained to deal with the unique challenges faced when homeless.</p>
        <p><Link href="/mental-health" className="resources-more-link">View all mental health resources <i className="fas fa-arrow-right"></i></Link></p>
      </div>
      
      <style jsx>{`
        .mental-health-resources {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
          margin: 2rem 0;
          border-left: 4px solid #48d595;
        }
        
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          margin: 1rem 0 1.5rem;
        }
        
        .resource-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .resource-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .resource-card.emergency {
          border-left: 4px solid #e53e3e;
        }
        
        .resource-card h5 {
          color: #2d3748;
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-size: 1.1rem;
        }
        
        .resource-card p {
          color: #4a5568;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        
        .resource-access {
          background: #f1f5f9;
          padding: 0.75rem;
          border-radius: 6px;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
        }
        
        .resource-access p {
          margin: 0.25rem 0 0;
        }
        
        .resource-contact {
          color: #4a5568;
          font-weight: 500;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        
        .resource-link {
          color: #3182ce;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          display: inline-block;
        }
        
        .resource-link:hover {
          text-decoration: underline;
        }
        
        .resources-info {
          background: #e6fffa;
          border-radius: 8px;
          padding: 1rem;
          font-size: 0.9rem;
          color: #285e61;
        }
        
        .resources-info p {
          margin: 0.5rem 0;
        }
        
        .resources-more-link {
          color: #3182ce;
          font-weight: 500;
          text-decoration: none;
        }
        
        .resources-more-link:hover {
          text-decoration: underline;
        }
        
        h4 {
          color: #2d3748;
          margin: 1.5rem 0 0.5rem;
          font-size: 1.1rem;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default MentalHealthResources;
