import { useEffect, useState } from "react";
import { DateRange, GetOrdersParams, Lot, Status } from "../types";
import FilterBar from "../components/OrderFilter/FilterBar";
import OrderTable from "../components/OrderTable";
import Pagination from "../../../components/ui/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLot, deleteOrder, getOrders } from "../services";
import { useNavigate } from "react-router-dom";
import CreateLotDialog from "../../../components/ui/CreateLotDialog";
import DeleteConfirmationDialog from "../../../components/ui/DeleteConfirmationDialog";
import { toast } from "sonner";

function OrderList() {
  const navigate = useNavigate();
  const [showCreateLotDialog, setShowCreateLotDialog] = useState<{
    isOpen: boolean;
    order: number | null;
  }>({
    isOpen: false,
    order: null,
  });

  const [showEditLotDialog, setShowEditLotDialog] = useState<{
    isOpen: boolean;
    lotData: Lot | null;
  }>({
    isOpen: false,
    lotData: null,
  });

  const [showDeleteLotDialog, setShowDeleteLotDialog] = useState<{
    isOpen: boolean;
    lotId: number | null;
  }>({
    isOpen: false,
    lotId: null,
  });

  const [showDeleteOrderDialog, setShowDeleteOrderDialog] = useState<{
    isOpen: boolean;
    orderId: number | null;
  }>({
    isOpen: false,
    orderId: null,
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

  const queryClient = useQueryClient();
  const { mutateAsync: deleteLotMutation, isPending: isLotDeletePending } =
    useMutation({
      mutationFn: deleteLot,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
    });

  const { mutateAsync: deleteOrderMutation, isPending: isOrderDeletePending } =
    useMutation({
      mutationFn: deleteOrder,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
    });

  const onDeleteLot = async () => {
    if (!showDeleteLotDialog.lotId) return;

    try {
      await deleteLotMutation(showDeleteLotDialog.lotId);
      toast.success("Lot deleted successfully");
    } catch (error) {
      console.error("Failed to delete", error);
      toast.error("Failed to delete lot");
    }
  };

  const onDeleteOrder = async () => {
    if (!showDeleteOrderDialog.orderId) return;

    try {
      await deleteOrderMutation(showDeleteOrderDialog.orderId);
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Failed to delete", error);
      toast.error("Failed to delete order");
    }
  };

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
          onEditOrder={(order) => {
            navigate("/order/edit/" + order.id);
          }}
          onDeleteOrder={(orderId) => {
            setShowDeleteOrderDialog({ isOpen: true, orderId });
          }}
          onEditLot={(lot) => {
            setShowEditLotDialog({
              isOpen: true,
              lotData: lot,
            });
          }}
          onDeleteLot={(lotId) => {
            setShowDeleteLotDialog({ isOpen: true, lotId });
          }}
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

        <CreateLotDialog
          isOpen={showEditLotDialog.isOpen}
          onClose={() => setShowEditLotDialog({ isOpen: false, lotData: null })}
          orderId={showEditLotDialog.lotData?.order_id as number}
          refetchOrders={refetch}
          lotData={showEditLotDialog.lotData}
        />

        <DeleteConfirmationDialog
          isOpen={showDeleteLotDialog.isOpen}
          onClose={() => setShowDeleteLotDialog({ isOpen: false, lotId: null })}
          onConfirm={() => {
            onDeleteLot();
          }}
          isLoading={isLotDeletePending}
        />

        <DeleteConfirmationDialog
          isOpen={showDeleteOrderDialog.isOpen}
          onClose={() =>
            setShowDeleteOrderDialog({ isOpen: false, orderId: null })
          }
          onConfirm={() => {
            onDeleteOrder();
          }}
          isLoading={isOrderDeletePending}
        />
      </main>
    </div>
  );
}

export default OrderList;
