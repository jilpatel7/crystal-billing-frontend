import React from "react";
import { DateRange } from "../../types";

interface DateRangeFilterProps {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  onChange,
}) => {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? new Date(e.target.value) : null;
    onChange({ ...dateRange, from: newValue });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value ? new Date(e.target.value) : null;
    onChange({ ...dateRange, to: newValue });
  };

  const formatDateForInput = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <span className="text-sm font-medium text-gray-700">Date range:</span>
      <div className="flex gap-2 items-center">
        <div className="flex flex-col">
          <label htmlFor="date-from" className="text-xs text-gray-500">
            From
          </label>
          <input
            id="date-from"
            type="date"
            value={formatDateForInput(dateRange.from)}
            onChange={handleFromChange}
            className="block rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="date-to" className="text-xs text-gray-500">
            To
          </label>
          <input
            id="date-to"
            type="date"
            value={formatDateForInput(dateRange.to)}
            onChange={handleToChange}
            className="block rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeFilter;
