'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportsView } from '@/components/reports/ReportsView';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <ReportsView />
    </DashboardLayout>
  );
}