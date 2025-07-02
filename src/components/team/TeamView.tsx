'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  MapPin, 
  Edit, 
  Trash2,
  Crown,
  Shield,
  User,
  Settings
} from 'lucide-react';

export function TeamView() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock team members data
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@propertyhub.com',
      phone: '+1 (555) 123-4567',
      role: 'owner',
      department: 'Management',
      properties: ['Sunset Apartments', 'Riverside Condos'],
      joinDate: '2020-01-15',
      status: 'active',
      avatar: 'JD',
      lastActive: '2024-01-20'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@propertyhub.com',
      phone: '+1 (555) 987-6543',
      role: 'manager',
      department: 'Property Management',
      properties: ['Garden View Townhomes'],
      joinDate: '2021-03-20',
      status: 'active',
      avatar: 'SJ',
      lastActive: '2024-01-19'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@propertyhub.com',
      phone: '+1 (555) 456-7890',
      role: 'clerk',
      department: 'Administration',
      properties: [],
      joinDate: '2022-06-10',
      status: 'active',
      avatar: 'MW',
      lastActive: '2024-01-18'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@propertyhub.com',
      phone: '+1 (555) 321-0987',
      role: 'manager',
      department: 'Maintenance',
      properties: ['Sunset Apartments', 'Riverside Condos', 'Garden View Townhomes'],
      joinDate: '2021-09-05',
      status: 'inactive',
      avatar: 'ED',
      lastActive: '2024-01-10'
    }
  ];

  const roleIcons = {
    owner: Crown,
    manager: Shield,
    clerk: User,
  };

  const roleColors = {
    owner: 'text-yellow-600 bg-yellow-100 border-yellow-200',
    manager: 'text-blue-600 bg-blue-100 border-blue-200',
    clerk: 'text-gray-600 bg-gray-100 border-gray-200',
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const Icon = roleIcons[role as keyof typeof roleIcons];
    return (
      <Badge className={roleColors[role as keyof typeof roleColors]}>
        <Icon className="h-3 w-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteMember = (memberId: number) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      // In a real app, this would make an API call
      alert('Team member removed successfully! (This is a demo)');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="mt-2 text-gray-600">Manage your property management team</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Crown className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Owners</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.role === 'owner').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Managers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.role === 'manager').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <User className="h-8 w-8 text-gray-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Clerks</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.role === 'clerk').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-2xl font-bold text-gray-900">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
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
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="clerk">Clerk</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <p className="text-sm text-gray-600">{member.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(member.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Role</span>
                {getRoleBadge(member.role)}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {member.phone}
                </div>
              </div>

              {member.properties.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Assigned Properties</p>
                  <div className="flex flex-wrap gap-1">
                    {member.properties.map((property) => (
                      <Badge key={property} variant="outline" className="text-xs">
                        {property}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-between text-xs text-gray-500">
                <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                <span>Last active: {new Date(member.lastActive).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or add a new team member.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}