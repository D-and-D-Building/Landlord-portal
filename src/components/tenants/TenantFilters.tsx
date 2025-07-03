'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

interface TenantFiltersProps {
  onSearchChange: (searchTerm: string) => void;
  onStatusChange: (status: string) => void;
  onPaymentStatusChange: (paymentStatus: string) => void;
  onPropertyChange: (propertyId: string) => void;
  properties: { id: string; name: string }[];
}

export function TenantFilters({
  onSearchChange,
  onStatusChange,
  onPaymentStatusChange,
  onPropertyChange,
  properties,
}: TenantFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tenants..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      
      <select
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => onPropertyChange(e.target.value)}
      >
        <option value="">All Properties</option>
        {properties.map((property) => (
          <option key={property.id} value={property.id}>
            {property.name}
          </option>
        ))}
      </select>

      <select
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
      </select>

      <select
        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => onPaymentStatusChange(e.target.value)}
      >
        <option value="">Payment Status</option>
        <option value="paid">Paid</option>
        <option value="pending">Pending</option>
        <option value="overdue">Overdue</option>
      </select>

      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
}