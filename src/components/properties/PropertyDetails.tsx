'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  MapPin, 
  Home, 
  Users, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  Download
} from 'lucide-react';
import Image from 'next/image';
import html2pdf from 'html2pdf.js';
import { useProperty } from '@/context/PropertyContext';

interface PropertyDetailsProps {
  propertyId: string;
}

export function PropertyDetails({ propertyId }: PropertyDetailsProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { state } = useProperty();

  const property = state.properties.find(p => p.id === propertyId);

  if (!property) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Property Not Found</h1>
        </div>
        <p className="text-gray-600">The property with ID &quot;{propertyId}&quot; could not be found.</p>
      </div>
    );
  }

  // Mock units data
  const units = [
    { id: '1A', tenant: 'John Doe', rent: 1200, status: 'occupied', leaseEnd: '2024-12-31' },
    { id: '1B', tenant: 'Jane Smith', rent: 1200, status: 'occupied', leaseEnd: '2024-11-30' },
    { id: '2A', tenant: null, rent: 1300, status: 'vacant', leaseEnd: null },
    { id: '2B', tenant: 'Mike Johnson', rent: 1300, status: 'occupied', leaseEnd: '2025-01-15' },
  ];

  // Mock maintenance requests
  const maintenanceRequests = [
    { id: 1, unit: '1A', issue: 'Leaky faucet', priority: 'medium', status: 'pending', date: '2024-01-15' },
    { id: 2, unit: '2B', issue: 'AC not working', priority: 'high', status: 'in-progress', date: '2024-01-14' },
  ];

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      // In a real app, this would make an API call to delete the property
      alert('Property deleted successfully! (This is a demo)');
      router.push('/properties');
    }
  };

  const handleExportPdf = () => {
    const element = document.getElementById('property-details-content');
    if (element) {
      html2pdf().from(element).save(`property_${property.name.replace(/ /g, '_')}_details.pdf`);
    }
  };

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

  const getUnitStatusBadge = (status: string) => {
    switch (status) {
      case 'occupied':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Occupied</Badge>;
      case 'vacant':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Vacant</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Maintenance</Badge>;
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{property.name}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getStatusBadge(property.status)}
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={handleExportPdf}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Property Image and Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Total Units</span>
                </div>
                <span className="font-semibold">{property.units}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Occupied</span>
                </div>
                <span className="font-semibold">{property.occupied}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Monthly Revenue</span>
                </div>
                <span className="font-semibold">${property.monthlyRevenue.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type</span>
                  <span className="font-medium">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Area</span>
                  <span className="font-medium">{property.totalArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parking Spaces</span>
                  <span className="font-medium">{property.parkingSpaces}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Manager</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">{property.manager.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Phone</span>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="font-medium">{property.manager.phone}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Email</span>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="font-medium">{property.manager.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{property.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="outline">{amenity}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="units" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <Card key={unit.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Unit {unit.id}</CardTitle>
                    {getUnitStatusBadge(unit.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rent</span>
                    <span className="font-medium">${unit.rent}</span>
                  </div>
                  {unit.tenant && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tenant</span>
                        <span className="font-medium">{unit.tenant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lease End</span>
                        <span className="font-medium">{unit.leaseEnd}</span>
                      </div>
                    </>
                  )}
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
                        <p className="text-sm text-gray-600">Unit {request.unit} • {request.date}</p>
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

        <TabsContent value="financials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">${property.monthlyRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">{Math.round((property.occupied / property.units) * 100)}%</p>
                <p className="text-sm text-gray-600">{property.occupied} of {property.units} units</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Rent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-purple-600">${Math.round(property.monthlyRevenue / property.occupied)}</p>
                <p className="text-sm text-gray-600">per unit</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}