import React from "react";
import { OrderStatus } from "../../types";

interface StatusFilterProps {
  selectedStatus: OrderStatus | null;
  onChange: (status: OrderStatus | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatus,
  onChange,
}) => {
  const statuses: OrderStatus[] = [
    "PENDING",
    "STARTED",
    "COMPLETED",
    "CANCELLED",
    "ON_HOLD",
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <label
        htmlFor="status-filter"
        className="text-sm font-medium text-gray-700"
      >
        Status:
      </label>
      <select
        id="status-filter"
        value={selectedStatus || ""}
        onChange={(e) =>
          onChange(e.target.value ? (e.target.value as OrderStatus) : null)
        }
        className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
      >
        <option value="">All statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilter;
