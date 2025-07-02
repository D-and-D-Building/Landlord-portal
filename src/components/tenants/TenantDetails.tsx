'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  AlertCircle
} from 'lucide-react';

interface TenantDetailsProps {
  tenantId: string;
}

export function TenantDetails({ tenantId }: TenantDetailsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Mock tenant data - in a real app, this would be fetched based on tenantId
  const tenant = {
    id: tenantId,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    unit: 'Unit 4B',
    property: 'Sunset Apartments',
    propertyAddress: '123 Main Street, Downtown',
    rentAmount: 1800,
    leaseStart: '2024-01-15',
    leaseEnd: '2024-12-31',
    securityDeposit: 1800,
    status: 'active' as const,
    paymentStatus: 'paid' as const,
    avatar: 'SJ',
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '+1 (555) 987-6543'
    },
    employer: {
      name: 'Tech Corp Inc.',
      position: 'Software Engineer',
      income: 75000
    },
    moveInDate: '2024-01-15',
    notes: 'Excellent tenant, always pays on time. Has one small dog.'
  };

  // Mock payment history
  const paymentHistory = [
    { id: 1, date: '2024-01-01', amount: 1800, type: 'Rent', status: 'paid' },
    { id: 2, date: '2024-02-01', amount: 1800, type: 'Rent', status: 'paid' },
    { id: 3, date: '2024-03-01', amount: 1800, type: 'Rent', status: 'paid' },
    { id: 4, date: '2024-04-01', amount: 1800, type: 'Rent', status: 'pending' },
  ];

  // Mock maintenance requests
  const maintenanceRequests = [
    { id: 1, date: '2024-03-15', issue: 'Leaky faucet in kitchen', status: 'completed', priority: 'medium' },
    { id: 2, date: '2024-02-20', issue: 'AC filter replacement', status: 'completed', priority: 'low' },
  ];

  // Mock documents
  const documents = [
    { id: 1, name: 'Lease Agreement', type: 'PDF', date: '2024-01-15', size: '2.4 MB' },
    { id: 2, name: 'Security Deposit Receipt', type: 'PDF', date: '2024-01-15', size: '156 KB' },
    { id: 3, name: 'Move-in Inspection', type: 'PDF', date: '2024-01-15', size: '1.2 MB' },
  ];

  const handleDelete = () => {
    if (confirm('Are you sure you want to remove this tenant? This action cannot be undone.')) {
      // In a real app, this would make an API call to delete the tenant
      alert('Tenant removed successfully! (This is a demo)');
      router.push('/tenants');
    }
  };

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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-lg">
              {tenant.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{tenant.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{tenant.unit} - {tenant.property}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getStatusBadge(tenant.status)}
          {getPaymentBadge(tenant.paymentStatus)}
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Rent</p>
                <p className="text-2xl font-bold text-gray-900">${tenant.rentAmount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Lease End</p>
                <p className="text-2xl font-bold text-gray-900">{new Date(tenant.leaseEnd).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Security Deposit</p>
                <p className="text-2xl font-bold text-gray-900">${tenant.securityDeposit}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tenancy Duration</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.ceil((new Date(tenant.leaseEnd).getTime() - new Date(tenant.leaseStart).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{tenant.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{tenant.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{tenant.propertyAddress}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{tenant.emergencyContact.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Relationship</span>
                  <span className="font-medium">{tenant.emergencyContact.relationship}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">{tenant.emergencyContact.phone}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Employer</span>
                  <span className="font-medium">{tenant.employer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position</span>
                  <span className="font-medium">{tenant.employer.position}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income</span>
                  <span className="font-medium">${tenant.employer.income.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lease Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Move-in Date</span>
                  <span className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lease Start</span>
                  <span className="font-medium">{new Date(tenant.leaseStart).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lease End</span>
                  <span className="font-medium">{new Date(tenant.leaseEnd).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{tenant.notes}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-6">
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <h3 className="font-medium">{payment.type}</h3>
                        <p className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold">${payment.amount}</span>
                      {getPaymentBadge(payment.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <div>
                        <h3 className="font-medium">{request.issue}</h3>
                        <p className="text-sm text-gray-600">{new Date(request.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getPriorityBadge(request.priority)}
                      <Badge variant="outline">{request.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                      <p className="text-xs text-gray-500">{new Date(doc.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}