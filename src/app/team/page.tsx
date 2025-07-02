'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TeamView } from '@/components/team/TeamView';

export default function TeamPage() {
  return (
    <DashboardLayout>
      <TeamView />
    </DashboardLayout>
  );
}