'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  DollarSign, 
  Calendar, 
  FileText,
  Send,
  Eye
} from 'lucide-react';
import { CreateInvoiceModal } from './CreateInvoiceModal';

export function BillingView() {
  const [selectedTab, setSelectedTab] = useState('invoices');
  const [isCreateInvoiceModalOpen, setIsCreateInvoiceModalOpen] = useState(false);

  // Mock invoices data
  const invoices = [
    {
      id: 'INV-001',
      tenant: 'Sarah Johnson',
      unit: 'Unit 4B',
      property: 'Sunset Apartments',
      amount: 1800,
      type: 'Rent',
      dueDate: '2024-02-01',
      status: 'paid',
      paidDate: '2024-01-28'
    },
    {
      id: 'INV-002',
      tenant: 'Michael Rodriguez',
      unit: 'Unit 2A',
      property: 'Riverside Condos',
      amount: 2200,
      type: 'Rent',
      dueDate: '2024-02-01',
      status: 'overdue',
      paidDate: null
    },
    {
      id: 'INV-003',
      tenant: 'Alex Chen',
      unit: 'Unit 7C',
      property: 'Garden View Townhomes',
      amount: 2000,
      type: 'Rent',
      dueDate: '2024-02-01',
      status: 'pending',
      paidDate: null
    },
    {
      id: 'INV-004',
      tenant: 'Sarah Johnson',
      unit: 'Unit 4B',
      property: 'Sunset Apartments',
      amount: 150,
      type: 'Utilities',
      dueDate: '2024-02-15',
      status: 'pending',
      paidDate: null
    }
  ];

  // Mock recurring billing data
  const recurringBilling = [
    {
      id: 'RB-001',
      tenant: 'Sarah Johnson',
      unit: 'Unit 4B',
      property: 'Sunset Apartments',
      amount: 1800,
      type: 'Rent',
      frequency: 'Monthly',
      nextDue: '2024-03-01',
      status: 'active'
    },
    {
      id: 'RB-002',
      tenant: 'Michael Rodriguez',
      unit: 'Unit 2A',
      property: 'Riverside Condos',
      amount: 2200,
      type: 'Rent',
      frequency: 'Monthly',
      nextDue: '2024-03-01',
      status: 'active'
    }
  ];

  // Mock billing summary
  const billingSummary = {
    totalInvoiced: 45600,
    totalPaid: 38400,
    totalPending: 4200,
    totalOverdue: 3000,
    thisMonth: {
      invoiced: 12800,
      paid: 10600,
      pending: 2200
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Overdue</Badge>;
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
          <p className="mt-2 text-gray-600">Manage rent collection and billing</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsCreateInvoiceModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Billing Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invoiced</p>
                <p className="text-2xl font-bold text-gray-900">${billingSummary.totalInvoiced.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">${billingSummary.totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">${billingSummary.totalPending.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900">${billingSummary.totalOverdue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search invoices..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="utilities">Utilities</SelectItem>
            <SelectItem value="fees">Fees</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="recurring">Recurring Billing</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <h3 className="font-semibold">{invoice.id}</h3>
                      <p className="text-sm text-gray-600">
                        {invoice.tenant} • {invoice.unit} • {invoice.property}
                      </p>
                      <p className="text-xs text-gray-500">
                        Due: {new Date(invoice.dueDate).toLocaleDateString()}
                        {invoice.paidDate && ` • Paid: ${new Date(invoice.paidDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold">${invoice.amount}</p>
                      <p className="text-sm text-gray-600">{invoice.type}</p>
                    </div>
                    {getStatusBadge(invoice.status)}
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recurring" className="space-y-4">
          {recurringBilling.map((billing) => (
            <Card key={billing.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="h-8 w-8 text-green-500" />
                    <div>
                      <h3 className="font-semibold">{billing.tenant}</h3>
                      <p className="text-sm text-gray-600">
                        {billing.unit} • {billing.property}
                      </p>
                      <p className="text-xs text-gray-500">
                        {billing.frequency} • Next due: {new Date(billing.nextDue).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold">${billing.amount}</p>
                      <p className="text-sm text-gray-600">{billing.type}</p>
                    </div>
                    {getStatusBadge(billing.status)}
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
        {/* ... existing content ... */}
      </TabsContent>
      </Tabs>

      <CreateInvoiceModal
        isOpen={isCreateInvoiceModalOpen}
        onClose={() => setIsCreateInvoiceModalOpen(false)}
      />
    </div>
  );
}