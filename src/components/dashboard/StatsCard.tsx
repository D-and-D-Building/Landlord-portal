'use client';

import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'purple' | 'emerald' | 'red' | 'amber';
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-200',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-200',
  },
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  red: {
    bg: 'bg-red-50',
    icon: 'text-red-600',
    border: 'border-red-200',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    border: 'border-amber-200',
  },
};

export function StatsCard({ title, value, change, trend, icon: Icon, color }: StatsCardProps) {
  const variant = colorVariants[color];

  return (
    <div className={cn(
      'rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md',
      variant.border
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          <p className={cn(
            'mt-2 text-sm',
            trend === 'up' && 'text-green-600',
            trend === 'down' && 'text-red-600',
            trend === 'neutral' && 'text-gray-600'
          )}>
            {change}
          </p>
        </div>
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg',
          variant.bg
        )}>
          <Icon className={cn('h-6 w-6', variant.icon)} />
        </div>
      </div>
    </div>
  );
}