'use client';

import React from 'react';
import ModernTemplate from '@/components/ModernTemplate';
import LoadingSpinner from '@/components/LoadingSpinner';
import ServiceCard from '@/components/ServiceCard';
import { useOrganizations } from '@/lib/useOrganizations';

export default function OrganizationsPage() {
  const { organizations, isLoading, isError } = useOrganizations();

  if (isLoading) return <LoadingSpinner />;
  if (isError) return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-red-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-800">Error Loading Organizations</h2>
        <p>Sorry, something went wrong. Please try again later.</p>
      </div>
    </div>
  );

  return (
    <ModernTemplate title="Organizations" subtitle="Support services and communities">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {organizations.map((org: any) => (
          <ServiceCard
            key={org.OrganizationID}
            title={org.Name}
            description={org.Description}
            address={org.Address}
            city={org.City}
            postCode={org.PostCode}
            phone={org.Phone}
            email={org.Email}
            website={org.Website}
            servicesOffered={org.ServicesOffered}
            openingHours={org.HoursOfOperation}
            detailsUrl={`/organizations/${org.OrganizationID}`}
            nhsFunded={!!org.IsVerified}
          />
        ))}
      </div>
    </ModernTemplate>
  );
}
