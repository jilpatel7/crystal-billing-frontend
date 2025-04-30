import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  className = ''
}) => {
  return (
    <Card className={`${className}`}>
      <div className="px-5 py-4 flex items-center">
        <div className="p-2 rounded-md bg-blue-50 text-blue-600">
          {icon}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
            {change && (
              <span 
                className={`ml-2 text-sm font-medium ${
                  change.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change.isPositive ? '+' : ''}{change.value}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};