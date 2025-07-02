'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TenantDetails } from '@/components/tenants/TenantDetails';

export default function TenantDetailsPage() {
  const params = useParams();
  const tenantId = params.id as string;

  return (
    <DashboardLayout>
      <TenantDetails tenantId={tenantId} />
    </DashboardLayout>
  );
}