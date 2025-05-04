import React from 'react';

interface ChartPlaceholderProps {
  type?: 'bar' | 'line' | 'pie';
  height?: number;
  className?: string;
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  type = 'line',
  height = 200,
  className = ''
}) => {
  return (
    <div 
      className={`w-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-md ${className}`}
      style={{ height: `${height}px` }}
    >
      <div className="text-center text-gray-500">
        <p className="font-medium">{type.charAt(0).toUpperCase() + type.slice(1)} Chart</p>
        <p className="text-sm">Chart visualization will appear here</p>
      </div>
    </div>
  );
};