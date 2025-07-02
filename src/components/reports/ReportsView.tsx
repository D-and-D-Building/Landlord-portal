'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Home,
  Calendar,
  FileText,
  PieChart
} from 'lucide-react';

export function ReportsView() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock financial data
  const financialData = {
    revenue: {
      current: 84250,
      previous: 78900,
      growth: 6.8
    },
    expenses: {
      current: 23400,
      previous: 21800,
      growth: 7.3
    },
    netIncome: {
      current: 60850,
      previous: 57100,
      growth: 6.6
    },
    occupancyRate: {
      current: 88.2,
      previous: 85.7,
      growth: 2.9
    }
  };

  // Mock property performance data
  const propertyPerformance = [
    {
      name: 'Sunset Apartments',
      revenue: 28800,
      occupancy: 91.7,
      units: 24,
      avgRent: 1200
    },
    {
      name: 'Riverside Condos',
      revenue: 32400,
      occupancy: 88.9,
      units: 18,
      avgRent: 1800
    },
    {
      name: 'Garden View Townhomes',
      revenue: 23050,
      occupancy: 83.3,
      units: 12,
      avgRent: 1925
    }
  ];

  // Mock tenant analytics
  const tenantAnalytics = {
    totalTenants: 54,
    newTenants: 8,
    renewals: 12,
    moveOuts: 3,
    averageTenancy: 18,
    satisfactionScore: 4.2
  };

  // Mock maintenance data
  const maintenanceData = {
    totalRequests: 23,
    completed: 18,
    pending: 5,
    averageResolution: 3.2,
    totalCost: 4850,
    categories: [
      { name: 'Plumbing', count: 8, cost: 1800 },
      { name: 'Electrical', count: 5, cost: 1200 },
      { name: 'HVAC', count: 4, cost: 1100 },
      { name: 'General', count: 6, cost: 750 }
    ]
  };

  const reportTypes = [
    {
      title: 'Financial Summary',
      description: 'Revenue, expenses, and profit analysis',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Property Performance',
      description: 'Individual property metrics and comparisons',
      icon: Home,
      color: 'text-blue-600'
    },
    {
      title: 'Tenant Analytics',
      description: 'Tenant demographics and behavior insights',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Maintenance Report',
      description: 'Maintenance requests and cost analysis',
      icon: BarChart3,
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="mt-2 text-gray-600">Comprehensive insights into your property portfolio</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportTypes.map((report) => (
          <Card key={report.title} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <report.icon className={`h-8 w-8 ${report.color}`} />
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Reports */}
      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${financialData.revenue.current.toLocaleString()}</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{financialData.revenue.growth}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  vs ${financialData.revenue.previous.toLocaleString()} last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${financialData.expenses.current.toLocaleString()}</span>
                  <span className="text-sm text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{financialData.expenses.growth}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  vs ${financialData.expenses.previous.toLocaleString()} last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Net Income</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">${financialData.netIncome.current.toLocaleString()}</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{financialData.netIncome.growth}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  vs ${financialData.netIncome.previous.toLocaleString()} last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{financialData.occupancyRate.current}%</span>
                  <span className="text-sm text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{financialData.occupancyRate.growth}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  vs {financialData.occupancyRate.previous}% last period
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rental Income</span>
                  <span className="font-semibold">${(financialData.revenue.current * 0.92).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Late Fees</span>
                  <span className="font-semibold">${(financialData.revenue.current * 0.03).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Utility Charges</span>
                  <span className="font-semibold">${(financialData.revenue.current * 0.05).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <div className="space-y-4">
            {propertyPerformance.map((property) => (
              <Card key={property.name}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <p className="text-sm text-gray-600">{property.units} units</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8 text-center">
                      <div>
                        <p className="text-sm text-gray-600">Revenue</p>
                        <p className="text-lg font-semibold">${property.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Occupancy</p>
                        <p className="text-lg font-semibold">{property.occupancy}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Avg Rent</p>
                        <p className="text-lg font-semibold">${property.avgRent}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tenants</span>
                  <span className="font-semibold">{tenantAnalytics.totalTenants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New This Month</span>
                  <span className="font-semibold text-green-600">+{tenantAnalytics.newTenants}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Renewals</span>
                  <span className="font-semibold">{tenantAnalytics.renewals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Move-outs</span>
                  <span className="font-semibold text-red-600">-{tenantAnalytics.moveOuts}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tenant Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Tenancy</span>
                  <span className="font-semibold">{tenantAnalytics.averageTenancy} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Satisfaction Score</span>
                  <span className="font-semibold">{tenantAnalytics.satisfactionScore}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retention Rate</span>
                  <span className="font-semibold">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">On-time Payments</span>
                  <span className="font-semibold">94%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Tenant Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Lease Expiry Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <PieChart className="h-4 w-4 mr-2" />
                  Demographics Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Requests</span>
                  <span className="font-semibold">{maintenanceData.totalRequests}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{maintenanceData.completed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-amber-600">{maintenanceData.pending}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Resolution</span>
                  <span className="font-semibold">{maintenanceData.averageResolution} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Cost</span>
                  <span className="font-semibold">${maintenanceData.totalCost.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {maintenanceData.categories.map((category) => (
                  <div key={category.name} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-600 ml-2">({category.count} requests)</span>
                    </div>
                    <span className="font-semibold">${category.cost.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}