'use client';

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import LoadingSpinner from '@/components/LoadingSpinner';
import ServiceCard from '@/components/ServiceCard';
import { useMentalHealthResources } from '@/lib/useMentalHealthResources';
import { MentalHealthResource } from '@/lib/mentalHealthService';

export default function MentalHealthResourcesPage() {
  const { resources, isLoading, isError } = useMentalHealthResources();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-800">Error Loading Resources</h2>
        <p>Sorry, something went wrong. Please try again later.</p>
      </div>
    </div>
  );

  return (
    <ModernTemplate title="Mental Health Resources" subtitle="Support services for mental wellbeing">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {resources.map((r: MentalHealthResource) => (
          <ServiceCard
            key={r.ResourceID}
            title={r.Name}
            description={r.Description}
            address={r.Address}
            city={r.City}
            postCode={r.PostCode}
            phone={r.Phone}
            email={r.Email}
            website={r.Website}
            servicesOffered={r.ServicesOffered}
            acceptsDogs={r.AcceptsDogs}
            isAccessible={false}
            openingHours={r.DropInSchedule}
            nhsFunded={r.NHSFunded}
            detailsUrl={`/mental-health-resources/${r.ResourceID}`}
          />
        ))}
      </div>
    </ModernTemplate>
  );
}
