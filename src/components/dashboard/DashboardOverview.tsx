'use client';

import React from 'react';
import { StatsCard } from './StatsCard';
import { RevenueChart } from './RevenueChart';
import { OccupancyChart } from './OccupancyChart';
import { RecentActivity } from './RecentActivity';
import { QuickActions } from './QuickActions';
import {
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Home,
  AlertCircle
} from 'lucide-react';

export function DashboardOverview() {
  const stats = [
    {
      title: 'Total Properties',
      value: '24',
      change: '+2 this month',
      trend: 'up' as const,
      icon: Building,
      color: 'blue' as const,
    },
    {
      title: 'Total Units',
      value: '186',
      change: '+8 this month',
      trend: 'up' as const,
      icon: Home,
      color: 'green' as const,
    },
    {
      title: 'Occupied Units',
      value: '164',
      change: '88.2% occupancy',
      trend: 'up' as const,
      icon: Users,
      color: 'purple' as const,
    },
    {
      title: 'Monthly Revenue',
      value: '$84,250',
      change: '+12.5% from last month',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'emerald' as const,
    },
    {
      title: 'Outstanding Rent',
      value: '$12,840',
      change: '6 tenants pending',
      trend: 'down' as const,
      icon: AlertCircle,
      color: 'red' as const,
    },
    {
      title: 'Maintenance Requests',
      value: '8',
      change: '3 urgent',
      trend: 'neutral' as const,
      icon: TrendingUp,
      color: 'amber' as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
        <p className="mt-2 text-gray-600">Here is what is happening with your properties today.</p>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <RevenueChart />
        <OccupancyChart />
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
}