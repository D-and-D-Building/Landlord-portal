'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AddPropertyForm } from '@/components/properties/AddPropertyForm';

export default function NewPropertyPage() {
  return (
    <DashboardLayout>
      <AddPropertyForm />
    </DashboardLayout>
  );
}