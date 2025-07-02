'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TenantCard } from './TenantCard';
import { TenantFilters } from './TenantFilters';
import { AddTenantModal } from './AddTenantModal';
import { Plus, LayoutGrid, List } from 'lucide-react';

export function TenantsView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock tenant data
  const tenants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      unit: 'Unit 4B - Sunset Apartments',
      rentAmount: 1800,
      leaseStart: '2024-01-15',
      leaseEnd: '2024-12-31',
      status: 'active' as const,
      paymentStatus: 'paid' as const,
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      phone: '+1 (555) 987-6543',
      unit: 'Unit 2A - Riverside Condos',
      rentAmount: 2200,
      leaseStart: '2023-08-01',
      leaseEnd: '2024-07-31',
      status: 'active' as const,
      paymentStatus: 'overdue' as const,
      avatar: 'MR',
    },
    {
      id: 3,
      name: 'Alex Chen',
      email: 'alex.chen@email.com',
      phone: '+1 (555) 456-7890',
      unit: 'Unit 7C - Garden View Townhomes',
      rentAmount: 2000,
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      status: 'active' as const,
      paymentStatus: 'pending' as const,
      avatar: 'AC',
    },
  ];

  const handleViewDetails = (tenantId: number) => {
    // For now, we'll show an alert. In a real app, this would navigate to a details page
    const tenant = tenants.find(t => t.id === tenantId);
    if (tenant) {
      alert(`Viewing details for ${tenant.name}\n\nThis would typically open a detailed view or navigate to a tenant details page.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
          <p className="mt-2 text-gray-600">Manage your tenant relationships</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between">
        <TenantFilters />
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tenants Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {tenants.map((tenant) => (
          <TenantCard
            key={tenant.id}
            tenant={tenant}
            viewMode={viewMode}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Add Tenant Modal */}
      <AddTenantModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}