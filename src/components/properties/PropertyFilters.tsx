'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';

export function PropertyFilters() {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search properties..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="">All Types</option>
        <option value="apartment">Apartment</option>
        <option value="condo">Condo</option>
        <option value="townhouse">Townhouse</option>
        <option value="single-family">Single Family</option>
      </select>

      <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="maintenance">Maintenance</option>
        <option value="vacant">Vacant</option>
      </select>

      <Button variant="outline">
        <Filter className="h-4 w-4 mr-2" />
        More Filters
      </Button>
    </div>
  );
}