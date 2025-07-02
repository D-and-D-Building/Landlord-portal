'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TenantsView } from '@/components/tenants/TenantsView';

export default function TenantsPage() {
  return (
    <DashboardLayout>
      <TenantsView />
    </DashboardLayout>
  );
}