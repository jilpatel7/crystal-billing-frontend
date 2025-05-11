import React from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  sortable?: boolean;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
  onSort?: (field: keyof T, direction: "ASC" | "DESC") => void;
  sortField?: keyof T;
  sortDirection?: "ASC" | "DESC";
  actions?: (item: T) => React.ReactNode;
}

export function Table<T extends { id: string | number }>({
  columns,
  data,
  isLoading = false,
  emptyMessage = "No data found",
  loadingMessage = "Loading data...",
  onSort,
  sortField,
  sortDirection,
  actions,
}: TableProps<T>) {
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    const isSorted = sortField === column.accessor;

    if (!isSorted)
      return <ChevronsUpDown size={16} className="ml-1 text-gray-400" />;

    return sortDirection === "ASC" ? (
      <ChevronUp size={16} className="ml-1 text-blue-600" />
    ) : (
      <ChevronDown size={16} className="ml-1 text-blue-600" />
    );
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort || typeof column.accessor !== "string")
      return;

    const newDirection =
      sortField === column.accessor && sortDirection === "ASC" ? "DESC" : "ASC";
    onSort(column.accessor, newDirection);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
        <div className="text-xl font-medium text-gray-500 mb-2">
          {loadingMessage}
        </div>
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
        <div className="text-xl font-medium text-gray-500 mb-2">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  } ${column.className || ""}`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
              {actions && (
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, rowIndex) => (
              <tr
                key={item.id}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
                      column.className || ""
                    }`}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : String(item[column.accessor] ?? "-")}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
