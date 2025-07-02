'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BillingView } from '@/components/billing/BillingView';

export default function BillingPage() {
  return (
    <DashboardLayout>
      <BillingView />
    </DashboardLayout>
  );
}