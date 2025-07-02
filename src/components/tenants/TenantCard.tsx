'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal, Mail, Phone, Calendar, DollarSign } from 'lucide-react';

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  unit: string;
  rentAmount: number;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'inactive' | 'pending';
  paymentStatus: 'paid' | 'pending' | 'overdue';
  avatar: string;
}

interface TenantCardProps {
  tenant: Tenant;
  viewMode: 'grid' | 'list';
  onViewDetails: (tenantId: number) => void;
}

export function TenantCard({ tenant, viewMode, onViewDetails }: TenantCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      default:
        return null;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      default:
        return null;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-6">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {tenant.avatar}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{tenant.name}</h3>
              <div className="flex items-center space-x-2">
                {getStatusBadge(tenant.status)}
                {getPaymentBadge(tenant.paymentStatus)}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{tenant.unit}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                {tenant.email}
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                {tenant.phone}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-center">
              <p className="text-sm text-gray-600">Rent</p>
              <p className="text-lg font-semibold">${tenant.rentAmount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Lease End</p>
              <p className="text-lg font-semibold">{new Date(tenant.leaseEnd).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(tenant.id)}
            >
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
              {tenant.avatar}
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{tenant.name}</h3>
          <p className="text-sm text-gray-600">{tenant.unit}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="h-4 w-4 mr-2" />
            {tenant.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="h-4 w-4 mr-2" />
            {tenant.phone}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center mb-1">
              <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-xs text-gray-600">Monthly Rent</span>
            </div>
            <p className="font-semibold text-gray-900">${tenant.rentAmount.toLocaleString()}</p>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <Calendar className="h-4 w-4 text-gray-400 mr-1" />
              <span className="text-xs text-gray-600">Lease End</span>
            </div>
            <p className="font-semibold text-gray-900">{new Date(tenant.leaseEnd).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          {getStatusBadge(tenant.status)}
          {getPaymentBadge(tenant.paymentStatus)}
        </div>

        <Button 
          className="w-full" 
          variant="outline"
          onClick={() => onViewDetails(tenant.id)}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}