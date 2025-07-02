'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from './PropertyCard';
import { PropertyFilters } from './PropertyFilters';
import { Plus, LayoutGrid, List } from 'lucide-react';

export function PropertiesView() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock property data
  const properties = [
    {
      id: 1,
      name: 'Sunset Apartments',
      address: '123 Main Street, Downtown',
      type: 'Apartment',
      units: 24,
      occupied: 22,
      monthlyRevenue: 28800,
      image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'active' as const,
    },
    {
      id: 2,
      name: 'Riverside Condos',
      address: '456 River Road, Riverside',
      type: 'Condo',
      units: 18,
      occupied: 16,
      monthlyRevenue: 32400,
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'active' as const,
    },
    {
      id: 3,
      name: 'Garden View Townhomes',
      address: '789 Garden Lane, Suburbs',
      type: 'Townhouse',
      units: 12,
      occupied: 10,
      monthlyRevenue: 24000,
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800',
      status: 'maintenance' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="mt-2 text-gray-600">Manage your property portfolio</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex items-center justify-between">
        <PropertyFilters />
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

      {/* Properties Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
}