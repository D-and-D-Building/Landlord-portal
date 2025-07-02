'use client';

import React from 'react';
import { Plus, FileText, Users, Settings } from 'lucide-react';
import { Button } from '../ui/button';

export function QuickActions() {
  const actions = [
    {
      title: 'Add Property',
      description: 'Create a new property listing',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      href: '/properties/new',
    },
    {
      title: 'New Tenant',
      description: 'Add a tenant to a unit',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      href: '/tenants/new',
    },
    {
      title: 'Generate Invoice',
      description: 'Create rent or utility invoice',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      href: '/billing/new',
    },
    {
      title: 'Settings',
      description: 'Manage preferences',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700',
      href: '/settings',
    },
  ];

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            className="h-auto flex-col items-start p-4 text-left bg-white hover:bg-gray-50 border-gray-200"
          >
            <div className={`rounded-lg p-2 ${action.color} mb-3`}>
              <action.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{action.title}</p>
              <p className="text-sm text-gray-500">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}