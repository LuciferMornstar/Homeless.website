'use client';

import _React from 'react';
import _Link from 'next/link';
import _Image from 'next/image';

export default function DogProfilePage() {
  // Dog profiles database
  const _dogProfiles = {
    '1': {
      name: 'Ruby',
      breed: 'Dachshund',
      age: '3 years',
      status: 'Ready for placement',
      sex: 'Female',
      color: 'Red',
      weight: '11 lbs',
      rescueDate: 'January 15, 2025',
      trainingLevel: 'Advanced',
      description: 'Ruby is an exceptionally intelligent dachshund with a strong desire to please. She was rescued from an overcrowded shelter where her potential went unnoticed. Initially shy, Ruby has blossomed into a confident, alert companion who excels at detecting subtle changes in human behavior.',
      specialSkills: ['Alert barking on command', 'Personal space maintenance', 'Handler focusing during anxiety', 'Distress signal recognition'],
      supportTypes: [
        {
          supportType: 'Anxiety Reduction',
          description: 'Ruby is trained to detect anxiety signals and provide comforting pressure and presence.',
          benefitsForHomeless: 'Homeless individuals often experience heightened anxiety due to uncertain living conditions. Ruby\'s presence has been shown to reduce stress hormones and help individuals engage with support services.',
          certificationLevel: 'Professional Anxiety Support Certified'
        },
        {
          supportType: 'Personal Security Alert',
          description: 'Ruby is trained to bark on command or when detecting threatening behavior, creating a deterrent effect.',
          benefitsForHomeless: 'Vulnerable individuals face increased risk of harassment or assault. Ruby provides both a psychological and practical security measure.',
          certificationLevel: 'Basic Personal Protection Training'
        },
        {
          supportType: 'Sleep Protection',
          description: 'Ruby maintains heightened awareness during sleep periods, alerting to unexpected approach.',
          benefitsForHomeless: 'Sleep vulnerability is a major concern for rough sleepers. Ruby helps maintain safety during rest periods.',
          certificationLevel: 'Night Alert Certified'
        }
      ],
      placementRequirements: [
        'Ability to provide daily exercise and mental stimulation',
        'Secure living environment (may be temporary housing)',
        'Commitment to continuing training reinforcement',
        'Monthly check-ins with our support team for the first year',
        'No history of animal abuse or neglect'
      ],
      healthDetails: {
        vaccinations: 'Up to date',
        spayed: 'Yes',
        microchipped: 'Yes',
        dietaryNeeds: 'Grain-free food recommended',
        medications: 'None currently required'
      },
      images: [
        '/public/Assets/dogs/1.jpeg',
        '/public/Assets/dogs/11.jpeg',
        '/public/Assets/dogs/6.jpeg'
      ],
      trainingProgress: [
        { skill: 'Basic obedience', progress: 100 },
        { skill: 'Alert barking', progress: 95 },
        { skill: 'Distress recognition', progress: 90 },
        { skill: 'Public behavior', progress: 85 },
        { skill: 'Handler focus', progress: 92 }
      ],
      successStories: [
        {
          client: 'Sarah T.',
          situation: 'Previously homeless single mother',
          outcome: 'Ruby helped Sarah feel secure in transitional housing, reducing anxiety enough to focus on job applications.',
          testimonial: 'Ruby has been my guardian angel. Her presence helped me sleep at night and stay calm during stressful situations.'
        }
      ],
      adoptionStatus: 'Available for qualified applicants',
      contactDetails: {
        coordinator: 'Jessica Miller',
        email: 'jessica@morningstarrescues.org',
        phone: '0800-555-DOGS'
      }
    },
    // Add more dog profiles as needed
  };

  // ...remaining code...
}
