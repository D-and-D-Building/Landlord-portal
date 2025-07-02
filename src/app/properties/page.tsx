'use client';

import React from 'react';
import { PropertiesView } from '@/components/properties/PropertiesView';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function PropertiesPage() {
  return (
    <DashboardLayout>
      <PropertiesView />
    </DashboardLayout>
  );
}