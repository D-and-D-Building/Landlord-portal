'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TenantCard } from './TenantCard';
import { TenantFilters } from './TenantFilters';
import { AddTenantModal } from './AddTenantModal';
import { Plus, LayoutGrid, List } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis
} from '@/components/ui/pagination';

export function TenantsView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [propertyFilter, setPropertyFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Number of tenants to display per page

  // Mock property data (should come from a global state or API in a real app)
  const properties = [
    { id: '1', name: 'Sunset Apartments' },
    { id: '2', name: 'Riverside Condos' },
    { id: '3', name: 'Garden View Townhomes' },
  ];

  // Mock tenant data
  const tenants = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
      unit: 'Unit 4B',
      propertyName: 'Sunset Apartments',
      propertyId: '1',
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
      unit: 'Unit 2A',
      propertyName: 'Riverside Condos',
      propertyId: '2',
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
      unit: 'Unit 7C',
      propertyName: 'Garden View Townhomes',
      propertyId: '3',
      rentAmount: 2000,
      leaseStart: '2024-03-01',
      leaseEnd: '2025-02-28',
      status: 'active' as const,
      paymentStatus: 'pending' as const,
      avatar: 'AC',
    },
    {
      id: 4,
      name: 'Emily White',
      email: 'emily.w@email.com',
      phone: '+1 (555) 111-2222',
      unit: 'Unit 10A',
      propertyName: 'Sunset Apartments',
      propertyId: '1',
      rentAmount: 1950,
      leaseStart: '2024-06-01',
      leaseEnd: '2025-05-31',
      status: 'active' as const,
      paymentStatus: 'paid' as const,
      avatar: 'EW',
    },
    {
      id: 5,
      name: 'David Lee',
      email: 'david.l@email.com',
      phone: '+1 (555) 333-4444',
      unit: 'Unit 5B',
      propertyName: 'Sunset Apartments',
      propertyId: '1',
      rentAmount: 1700,
      leaseStart: '2023-09-01',
      leaseEnd: '2024-08-31',
      status: 'inactive' as const,
      paymentStatus: 'paid' as const,
      avatar: 'DL',
    },
    {
      id: 6,
      name: 'Olivia Kim',
      email: 'olivia.k@email.com',
      phone: '+1 (555) 666-7777',
      unit: 'Unit 1C',
      propertyName: 'Riverside Condos',
      propertyId: '2',
      rentAmount: 2300,
      leaseStart: '2024-02-01',
      leaseEnd: '2025-01-31',
      status: 'active' as const,
      paymentStatus: 'paid' as const,
      avatar: 'OK',
    },
    {
      id: 7,
      name: 'James Brown',
      email: 'james.b@email.com',
      phone: '+1 (555) 888-9999',
      unit: 'Unit 8D',
      propertyName: 'Garden View Townhomes',
      propertyId: '3',
      rentAmount: 2100,
      leaseStart: '2023-11-01',
      leaseEnd: '2024-10-31',
      status: 'active' as const,
      paymentStatus: 'pending' as const,
      avatar: 'JB',
    },
    {
      id: 8,
      name: 'Sophia Garcia',
      email: 'sophia.g@email.com',
      phone: '+1 (555) 222-3333',
      unit: 'Unit 12B',
      propertyName: 'Sunset Apartments',
      propertyId: '1',
      rentAmount: 1850,
      leaseStart: '2024-04-01',
      leaseEnd: '2025-03-31',
      status: 'active' as const,
      paymentStatus: 'paid' as const,
      avatar: 'SG',
    },
  ];

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tenant.propertyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || tenant.status === statusFilter;
    const matchesPaymentStatus = paymentStatusFilter === '' || tenant.paymentStatus === paymentStatusFilter;
    const matchesProperty = propertyFilter === '' || tenant.propertyId === propertyFilter;

    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesProperty;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTenants = filteredTenants.slice(startIndex, endIndex);

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
        <TenantFilters
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onPaymentStatusChange={setPaymentStatusFilter}
          onPropertyChange={setPropertyFilter}
          properties={properties}
        />
        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when items per page changes
            }}
          >
            <option value={6}>6 per page</option>
            <option value={12}>12 per page</option>
            <option value={24}>24 per page</option>
          </select>
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
        {currentTenants.map((tenant) => (
          <TenantCard
            key={tenant.id}
            tenant={tenant}
            viewMode={viewMode}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(prev => Math.max(1, prev - 1));
              }}
              isActive={currentPage > 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(prev => Math.min(totalPages, prev + 1));
              }}
              isActive={currentPage < totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}

      {/* Add Tenant Modal */}
      <AddTenantModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}