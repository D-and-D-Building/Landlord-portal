'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SubscriptionView } from '@/components/subscription/SubscriptionView';

export default function SubscriptionPage() {
  return (
    <DashboardLayout>
      <SubscriptionView />
    </DashboardLayout>
  );
}