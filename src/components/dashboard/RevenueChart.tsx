'use client';

import React from 'react';

export function RevenueChart() {
  // Mock data for the chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenue = [65000, 72000, 68000, 84250, 78000, 84250];

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
        <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {revenue.map((value, index) => {
          const height = (value / Math.max(...revenue)) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full flex items-end justify-center mb-2">
                <div
                  className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg w-8 transition-all hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-600">{months[index]}</span>
              <span className="text-xs font-medium text-gray-900">
                ${(value / 1000).toFixed(0)}k
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}