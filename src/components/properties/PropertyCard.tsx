'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, MapPin, Home, Users, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: number;
  name: string;
  address: string;
  type: string;
  units: number;
  occupied: number;
  monthlyRevenue: number;
  image: string;
  status: 'active' | 'maintenance' | 'vacant';
}

interface PropertyCardProps {
  property: Property;
  viewMode: 'grid' | 'list';
}

export function PropertyCard({ property, viewMode }: PropertyCardProps) {
  const occupancyRate = Math.round((property.occupied / property.units) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Maintenance</Badge>;
      case 'vacant':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Vacant</Badge>;
      default:
        return null;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-6">
          <div className="relative h-20 w-20 rounded-lg overflow-hidden">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
              {getStatusBadge(property.status)}
            </div>
            <div className="flex items-center mt-1 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.address}</span>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-sm text-gray-600">Units</p>
              <p className="text-lg font-semibold">{property.units}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Occupancy</p>
              <p className="text-lg font-semibold">{occupancyRate}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-lg font-semibold">${property.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>

          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          {getStatusBadge(property.status)}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.address}</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Home className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-600">Units</p>
            <p className="font-semibold text-gray-900">{property.units}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-600">Occupied</p>
            <p className="font-semibold text-gray-900">{property.occupied}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-600">Revenue</p>
            <p className="font-semibold text-gray-900">${(property.monthlyRevenue / 1000).toFixed(0)}k</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Occupancy</span>
            <span className="font-medium">{occupancyRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
        </div>

        <Link href={`/properties/${property.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}