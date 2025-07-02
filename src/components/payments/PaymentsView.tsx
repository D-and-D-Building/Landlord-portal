'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Download, 
  DollarSign, 
  CreditCard, 
  TrendingUp,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function PaymentsView() {
  // Mock payments data
  const payments = [
    {
      id: 'PAY-001',
      tenant: 'Sarah Johnson',
      unit: 'Unit 4B',
      property: 'Sunset Apartments',
      amount: 1800,
      type: 'Rent',
      method: 'Bank Transfer',
      date: '2024-01-28',
      status: 'completed',
      reference: 'TXN123456'
    },
    {
      id: 'PAY-002',
      tenant: 'Alex Chen',
      unit: 'Unit 7C',
      property: 'Garden View Townhomes',
      amount: 2000,
      type: 'Rent',
      method: 'Credit Card',
      date: '2024-01-30',
      status: 'completed',
      reference: 'TXN123457'
    },
    {
      id: 'PAY-003',
      tenant: 'Michael Rodriguez',
      unit: 'Unit 2A',
      property: 'Riverside Condos',
      amount: 2200,
      type: 'Rent',
      method: 'Check',
      date: '2024-02-01',
      status: 'pending',
      reference: 'CHK001'
    },
    {
      id: 'PAY-004',
      tenant: 'Sarah Johnson',
      unit: 'Unit 4B',
      property: 'Sunset Apartments',
      amount: 150,
      type: 'Late Fee',
      method: 'Credit Card',
      date: '2024-02-02',
      status: 'failed',
      reference: 'TXN123458'
    }
  ];

  // Mock payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'Bank Transfer',
      count: 45,
      percentage: 60,
      totalAmount: 67500
    },
    {
      id: 2,
      type: 'Credit Card',
      count: 25,
      percentage: 33,
      totalAmount: 37500
    },
    {
      id: 3,
      type: 'Check',
      count: 5,
      percentage: 7,
      totalAmount: 7500
    }
  ];

  // Mock payment summary
  const paymentSummary = {
    totalReceived: 112500,
    thisMonth: 28400,
    pending: 4200,
    failed: 350,
    averagePaymentTime: 2.3,
    collectionRate: 94.2
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return null;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case 'Bank Transfer':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'Check':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      default:
        return <DollarSign className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="mt-2 text-gray-600">Track and manage all payment transactions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Received</p>
                <p className="text-2xl font-bold text-gray-900">${paymentSummary.totalReceived.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">${paymentSummary.thisMonth.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-gray-900">{paymentSummary.collectionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Payment Time</p>
                <p className="text-2xl font-bold text-gray-900">{paymentSummary.averagePaymentTime} days</p>
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
            placeholder="Search payments..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            <SelectItem value="credit-card">Credit Card</SelectItem>
            <SelectItem value="check">Check</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          {payments.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getMethodIcon(payment.method)}
                    <div>
                      <h3 className="font-semibold">{payment.id}</h3>
                      <p className="text-sm text-gray-600">
                        {payment.tenant} • {payment.unit} • {payment.property}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.date).toLocaleDateString()} • {payment.method} • Ref: {payment.reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold">${payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.type}</p>
                    </div>
                    {getStatusBadge(payment.status)}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getMethodIcon(method.type)}
                    <span>{method.type}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transactions</span>
                    <span className="font-semibold">{method.count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percentage</span>
                    <span className="font-semibold">{method.percentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-semibold">${method.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Payment Amount</span>
                    <span className="font-semibold">$1,875</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">On-time Payment Rate</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Late Payment Rate</span>
                    <span className="font-semibold text-amber-600">10%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Failed Payment Rate</span>
                    <span className="font-semibold text-red-600">3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-semibold">${paymentSummary.thisMonth.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Month</span>
                    <span className="font-semibold">$26,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth</span>
                    <span className="font-semibold text-green-600">+6.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">YTD Total</span>
                    <span className="font-semibold">$112,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}