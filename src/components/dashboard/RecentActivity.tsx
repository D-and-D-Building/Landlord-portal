'use client';

import React from 'react';
import { Calendar, DollarSign, Home, Users, Wrench } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: 'payment',
      title: 'Rent payment received',
      description: 'Sarah Johnson paid $1,800 for Unit 4B',
      time: '2 hours ago',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100',
      user: 'SJ',
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Maintenance request submitted',
      description: 'Leaky faucet in Unit 2A kitchen',
      time: '4 hours ago',
      icon: Wrench,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      user: 'MR',
    },
    {
      id: 3,
      type: 'tenant',
      title: 'New tenant signed lease',
      description: 'Alex Chen moved into Unit 7C',
      time: '1 day ago',
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      user: 'AC',
    },
    {
      id: 4,
      type: 'property',
      title: 'Property inspection completed',
      description: '123 Main Street quarterly inspection',
      time: '2 days ago',
      icon: Home,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      user: 'PI',
    },
    {
      id: 5,
      type: 'lease',
      title: 'Lease renewal reminder',
      description: 'Unit 5A lease expires in 30 days',
      time: '3 days ago',
      icon: Calendar,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      user: 'LR',
    },
  ];

  const getStatusBadge = (type: string) => {
    switch (type) {
      case 'payment':
        return <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">Completed</Badge>;
      case 'maintenance':
        return <Badge variant="outline" className="text-amber-700 border-amber-200 bg-amber-50">Pending</Badge>;
      case 'tenant':
        return <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">New</Badge>;
      case 'property':
        return <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">Completed</Badge>;
      case 'lease':
        return <Badge variant="outline" className="text-orange-700 border-orange-200 bg-orange-50">Reminder</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.bg}`}>
              <activity.icon className={`h-5 w-5 ${activity.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                {getStatusBadge(activity.type)}
              </div>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
            </div>
            
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{activity.user}</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
}