import React from 'react';

interface ActivityItemProps {
  avatar: string;
  name: string;
  action: string;
  time: string;
  iconBg?: string;
  icon?: React.ReactNode;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  avatar,
  name,
  action,
  time,
  iconBg = 'bg-blue-100',
  icon
}) => {
  return (
    <div className="flex items-start py-3">
      <div className="relative mr-4">
        {avatar ? (
          <img src={avatar} alt={name} className="h-8 w-8 rounded-full" />
        ) : (
          <div className={`h-8 w-8 rounded-full ${iconBg} flex items-center justify-center text-blue-600`}>
            {icon || <span className="text-sm font-medium">{name.charAt(0)}</span>}
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm text-gray-800">
          <span className="font-medium">{name}</span> {action}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{time}</p>
      </div>
    </div>
  );
};