import React from "react";
import Button from "./Button";
import SearchBar from "../../features/order/components/OrderFilter/SearchBar";
import { Plus, X } from "lucide-react";

interface TableFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
  createButtonText?: string;
}

const TableFilter: React.FC<TableFilterProps> = ({
  searchValue,
  onSearchChange,
  onCreate,
  createButtonText = "Create",
}) => {
  const handleClearFilters = () => {
    onSearchChange("");
  };

  const hasActiveFilters = searchValue;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <SearchBar value={searchValue} onChange={onSearchChange} />
        </div>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              className="self-start flex items-center"
              onClick={handleClearFilters}
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
          <Button
            variant="primary"
            className="self-start flex items-center"
            onClick={onCreate}
          >
            <Plus className="h-4 w-4 mr-1" />
            {createButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TableFilter;
