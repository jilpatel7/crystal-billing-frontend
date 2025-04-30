import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barColor?: string;
  trackColor?: string;
  label?: string;
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className = '',
  barColor = 'bg-blue-500',
  trackColor = 'bg-gray-200',
  label,
  showValue = false
}) => {
  const percentage = Math.min(Math.max(0, value), max) / max * 100;
  
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-500">{value}/{max}</span>
          )}
        </div>
      )}
      <div className={`w-full h-2 ${trackColor} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${barColor} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};