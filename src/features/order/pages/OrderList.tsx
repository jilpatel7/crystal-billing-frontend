import { useEffect, useState } from "react";
import { DateRange, GetOrdersParams, Status } from "../types";
import FilterBar from "../components/OrderFilter/FilterBar";
import OrderTable from "../components/OrderTable";
import Pagination from "../../../components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services";
import { useNavigate } from "react-router-dom";
import CreateLotDialog from "../../../components/ui/CreateLotDialog";

function OrderList() {
  const navigate = useNavigate();
  const [showCreateLotDialog, setShowCreateLotDialog] = useState<{
    isOpen: boolean;
    order: number | null;
  }>({
    isOpen: false,
    order: null,
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const queryParams: GetOrdersParams = {
    page: currentPage,
    limit: ordersPerPage,
    search: debouncedTerm,
    dateFrom: String(dateRange.from ?? ""),
    dateTo: String(dateRange.to ?? ""),
    status: selectedStatus,
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["orders", queryParams],
    queryFn: () => getOrders(queryParams),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, dateRange, selectedStatus]);

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Orders Management
            </h1>
          </div>
          <p className="text-gray-600">
            View, track, and manage all customer orders efficiently from one
            place.
          </p>
        </header>

        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onCreateOrder={() => {
            navigate("/order/create");
          }}
        />

        <OrderTable
          orders={data?.data?.data ?? []}
          onEditOrder={() => {}}
          onDeleteOrder={() => {}}
          onEditLot={() => {}}
          onDeleteLot={() => {}}
          onCreateLot={(orderId) => {
            setShowCreateLotDialog({ isOpen: true, order: orderId });
          }}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={data?.data?.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <CreateLotDialog
          isOpen={showCreateLotDialog.isOpen}
          onClose={() => setShowCreateLotDialog({ isOpen: false, order: null })}
          orderId={showCreateLotDialog.order as number}
          refetchOrders={refetch}
        />
      </main>
    </div>
  );
}

export default OrderList;
