'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PropertyDetails } from '@/components/properties/PropertyDetails';

export default function PropertyDetailsPage() {
  const params = useParams();
  const propertyId = params.id as string;

  return (
    <DashboardLayout>
      <PropertyDetails propertyId={propertyId} />
    </DashboardLayout>
  );
}