import React from "react";
import { Status } from "../../features/order/types";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case Status.PENDING:
        return "bg-yellow-100 text-yellow-800";
      case Status.STARTED:
        return "bg-blue-100 text-blue-800";
      case Status.COMPLETED:
        return "bg-green-100 text-green-800";
      case Status.CANCELLED:
        return "bg-red-100 text-red-800";
      case Status.ON_HOLD:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {status.replace("_", " ")}
    </span>
  );
};

export default StatusBadge;
