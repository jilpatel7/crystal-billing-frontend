import React from "react";
import SearchBar from "./SearchBar";
import StatusFilter from "./StatusFilter";
import QuickFilter from "./QuickFilter";
import { Plus, X } from "lucide-react";
import Button from "../../../../components/ui/Button";
import DateRangeFilter from "./DateRangeFilter";
import { DateRange, Status } from "../../types";
import { getAllPartyIdsAndNames } from "../../../party/services";
import { useQuery } from "@tanstack/react-query";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  selectedStatus: Status | null;
  onStatusChange: (status: Status | null) => void;
  onCreateOrder: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  selectedStatus,
  onStatusChange,
  onCreateOrder,
}) => {
  const handleClearFilters = () => {
    onSearchChange("");
    onDateRangeChange({ from: null, to: null });
    onStatusChange(null);
  };

  const { data: parties, isLoading: isLoadingParties } = useQuery({
    queryKey: ["parties"],
    queryFn: () => getAllPartyIdsAndNames(),
  });

  console.log(parties);

  const handleSuggestionSelect = (party: { id: string; name: string }) => {
    // You can add additional logic here when a suggestion is selected
    // For example, you might want to filter orders by the selected party
    console.log("Selected party:", party);
  };

  const hasActiveFilters =
    searchValue || dateRange.from || dateRange.to || selectedStatus;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4 justify-between mb-4">
        <div className="flex-1 max-w-md">
          <SearchBar
            value={searchValue}
            onChange={onSearchChange}
            suggestions={parties?.data || []}
            isLoadingSuggestions={isLoadingParties}
            onSuggestionSelect={handleSuggestionSelect}
            placeholder="Search parties by name..."
          />
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
            onClick={onCreateOrder}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Order
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-wrap">
        <DateRangeFilter dateRange={dateRange} onChange={onDateRangeChange} />
        <StatusFilter
          selectedStatus={selectedStatus}
          onChange={onStatusChange}
        />
        <QuickFilter onChange={onDateRangeChange} dateRange={dateRange} />
      </div>
    </div>
  );
};

export default FilterBar;
