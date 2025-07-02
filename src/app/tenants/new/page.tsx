'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AddTenantModal } from '@/components/tenants/AddTenantModal';

export default function NewTenantPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Tenant</h1>
          <p className="mt-2 text-gray-600">Create a new tenant profile</p>
        </div>
        <AddTenantModal isOpen={true} onClose={() => window.history.back()} />
      </div>
    </DashboardLayout>
  );
}