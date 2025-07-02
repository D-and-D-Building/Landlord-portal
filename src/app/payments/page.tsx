'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PaymentsView } from '@/components/payments/PaymentsView';

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <PaymentsView />
    </DashboardLayout>
  );
}