'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MultiStepPropertyForm } from '@/components/properties/MultiStepPropertyForm';

export default function NewPropertyPage() {
  return (
    <DashboardLayout>
      <MultiStepPropertyForm />
    </DashboardLayout>
  );
}