import { useState, useEffect } from "react";
import { DateRange, Order, OrderStatus } from "../types";
import FilterBar from "../components/OrderFilter/FilterBar";
import OrderTable from "../components/OrderTable";
import Pagination from "../components/Pagination";
import { MOCK_ORDERS } from "../../../data/mockData";

function OrderList() {
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(MOCK_ORDERS);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: null,
    to: null,
  });
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null
  );

  // // Modal states
  // const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  // const [isLotModalOpen, setIsLotModalOpen] = useState(false);
  // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // const [currentOrder, setCurrentOrder] = useState<Order | undefined>(
  //   undefined
  // );
  // const [currentLot, setCurrentLot] = useState<Lot | undefined>(undefined);
  // const [currentOrderIdForLot, setCurrentOrderIdForLot] = useState<string>("");
  // const [deleteType, setDeleteType] = useState<"order" | "lot">("order");
  // const [deleteId, setDeleteId] = useState<string>("");

  // Apply filters whenever filter states change
  useEffect(() => {
    let result = orders;

    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
          order.customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
          order.lots.some(
            (lot) =>
              lot.lotNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
              lot.description.toLowerCase().includes(lowerCaseSearchTerm)
          )
      );
    }

    // Apply date range filter
    if (dateRange.from && dateRange.to) {
      result = result.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate >= dateRange.from! && orderDate <= dateRange.to!;
      });
    }

    // Apply status filter
    if (selectedStatus) {
      result = result.filter((order) => order.status === selectedStatus);
    }

    setFilteredOrders(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [orders, searchTerm, dateRange, selectedStatus]);

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>

        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onCreateOrder={() => {}}
        />

        <OrderTable
          orders={currentOrders}
          onEditOrder={() => {}}
          onDeleteOrder={() => {}}
          onEditLot={() => {}}
          onDeleteLot={() => {}}
          onCreateLot={() => {}}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Modals
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSave={handleSaveOrder}
        order={currentOrder}
      />

      <LotModal
        isOpen={isLotModalOpen}
        onClose={() => setIsLotModalOpen(false)}
        onSave={handleSaveLot}
        lot={currentLot}
        orderId={currentOrderIdForLot}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={
          deleteType === "order" ? confirmDeleteOrder : confirmDeleteLot
        }
        title={`Delete ${deleteType === "order" ? "Order" : "Lot"}`}
        message={`Are you sure you want to delete this ${deleteType}? This action cannot be undone.`}
      /> */}
    </div>
  );
}

export default OrderList;
