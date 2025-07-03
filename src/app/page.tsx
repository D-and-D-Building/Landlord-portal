'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import AuthGuard from './AuthGuard';


export default function Home() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </AuthGuard>
  );
}