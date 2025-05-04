import React from "react";
import { DateRange } from "../../types";

interface QuickFilterProps {
  onChange: (dateRange: DateRange) => void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({ onChange }) => {
  const options = [
    { label: "All time", value: "all" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last week", value: "last-week" },
    { label: "Last month", value: "last-month" },
    { label: "Last 6 months", value: "last-6-months" },
    { label: "Last year", value: "last-year" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const now = new Date();
    const from = new Date();
    let to = new Date();

    switch (value) {
      case "yesterday":
        from.setDate(now.getDate() - 1);
        to = new Date(from);
        break;
      case "last-week":
        from.setDate(now.getDate() - 7);
        break;
      case "last-month":
        from.setMonth(now.getMonth() - 1);
        break;
      case "last-6-months":
        from.setMonth(now.getMonth() - 6);
        break;
      case "last-year":
        from.setFullYear(now.getFullYear() - 1);
        break;
      default:
        // All time
        from.setFullYear(1970);
        break;
    }

    onChange({ from, to });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
      <label
        htmlFor="quick-filter"
        className="text-sm font-medium text-gray-700"
      >
        Quick filter:
      </label>
      <select
        id="quick-filter"
        onChange={handleChange}
        className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
        defaultValue="all"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default QuickFilter;
