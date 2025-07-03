'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, Users, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { AddTenantModal } from '@/components/tenants/AddTenantModal';
import { CreateInvoiceModal } from '@/components/billing/CreateInvoiceModal';

export function QuickActions() {
  const [isAddTenantModalOpen, setIsAddTenantModalOpen] = useState(false);
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState(false);

  const actions = [
    {
      title: 'Add Property',
      description: 'Create a new property listing',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
      type: 'link',
      href: '/properties/new',
    },
    {
      title: 'New Tenant',
      description: 'Add a tenant to a unit',
      icon: Users,
      color: 'bg-green-600 hover:bg-green-700',
      type: 'modal',
      onClick: () => setIsAddTenantModalOpen(true),
    },
    {
      title: 'Generate Invoice',
      description: 'Create rent or utility invoice',
      icon: FileText,
      color: 'bg-purple-600 hover:bg-purple-700',
      type: 'modal',
      onClick: () => setIsCreateInvoiceModalOpen(true),
    },
    {
      title: 'Settings',
      description: 'Manage preferences',
      icon: Settings,
      color: 'bg-gray-600 hover:bg-gray-700',
      type: 'link',
      href: '/settings',
    },
  ];

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => (
          action.type === 'link' ? (
            <Link href={action.href || '#'} key={action.title} className="h-auto">
              <Button
                variant="outline"
                className="h-auto flex-col items-start p-4 text-left bg-white hover:bg-gray-50 border-gray-200 w-full"
              >
                <div className={`rounded-lg p-2 ${action.color} mb-3`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{action.title}</p>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
              </Button>
            </Link>
          ) : (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto flex-col items-start p-4 text-left bg-white hover:bg-gray-50 border-gray-200 w-full"
              onClick={action.onClick}
            >
              <div className={`rounded-lg p-2 ${action.color} mb-3`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{action.title}</p>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
            </Button>
          )
        ))}
      </div>

      <AddTenantModal
        isOpen={isAddTenantModalOpen}
        onClose={() => setIsAddTenantModalOpen(false)}
      />
      <CreateInvoiceModal
        isOpen={isCreateInvoiceModalOpen}
        onClose={() => setIsCreateInvoiceModalOpen(false)}
      />
    </div>
  );
}