'use client';

import React from 'react';

export function OccupancyChart() {
  const occupancyRate = 88.2;
  const totalUnits = 186;
  const occupiedUnits = 164;
  const vacantUnits = totalUnits - occupiedUnits;

  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(occupancyRate / 100) * circumference} ${circumference}`;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Occupancy Rate</h3>
      
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="relative h-32 w-32 mx-auto">
            <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{occupancyRate}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              <span className="text-sm text-gray-600">Occupied</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{occupiedUnits} units</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">Vacant</span>
            </div>
            <span className="text-sm font-medium text-gray-900">{vacantUnits} units</span>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">Total Units</p>
            <p className="text-lg font-semibold text-gray-900">{totalUnits}</p>
          </div>
        </div>
      </div>
    </div>
  );
}