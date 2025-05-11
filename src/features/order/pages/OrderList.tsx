// import { useState, useEffect } from "react";
// import { DateRange, GetOrdersParams, Order, Status } from "../types";
// import FilterBar from "../components/OrderFilter/FilterBar";
// import OrderTable from "../components/OrderTable";
// import Pagination from "../components/Pagination";
// import { MOCK_ORDERS } from "../../../data/mockData";
// import { useQuery } from "@tanstack/react-query";
// import { getOrders } from "../services";
// import { useNavigate } from "react-router-dom";

// function OrderList() {
//   const navigate = useNavigate();
//   const [orders] = useState<Order[]>(MOCK_ORDERS);
//   const [filteredOrders, setFilteredOrders] = useState<Order[]>(MOCK_ORDERS);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [ordersPerPage] = useState(10);

//   // Filter states
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dateRange, setDateRange] = useState<DateRange>({
//     from: null,
//     to: null,
//   });
//   const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

//   const queryParams: GetOrdersParams = {
//     page: currentPage,
//     limit: ordersPerPage,
//     search: searchTerm,
//     dateFrom: String(dateRange.from ?? ""),
//     dateTo: String(dateRange.to ?? ""),
//   };

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["orders", queryParams],
//     queryFn: () => getOrders(queryParams),
//   });

//   useEffect(() => {
//     let result = orders;

//     // Apply search filter
//     if (searchTerm) {
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();
//       result = result.filter(
//         (order) =>
//           order.orderNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
//           order.customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
//           order.lots.some(
//             (lot) =>
//               lot.lotNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
//               lot.description.toLowerCase().includes(lowerCaseSearchTerm)
//           )
//       );
//     }

//     // Apply date range filter
//     if (dateRange.from && dateRange.to) {
//       result = result.filter((order) => {
//         const orderDate = new Date(order.date);
//         return orderDate >= dateRange.from! && orderDate <= dateRange.to!;
//       });
//     }

//     // Apply status filter
//     if (selectedStatus) {
//       result = result.filter((order) => order.status === selectedStatus);
//     }

//     setFilteredOrders(result);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [orders, searchTerm, dateRange, selectedStatus]);

//   // Get current orders for pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(
//     indexOfFirstOrder,
//     indexOfLastOrder
//   );
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   // Handle page change
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   if (isError) {
//     <div>Error: {error.message}</div>;
//   }

//   if (isLoading) {
//     <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
//         <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>

//         <FilterBar
//           searchValue={searchTerm}
//           onSearchChange={setSearchTerm}
//           dateRange={dateRange}
//           onDateRangeChange={setDateRange}
//           selectedStatus={selectedStatus}
//           onStatusChange={setSelectedStatus}
//           onCreateOrder={() => {
//             navigate("/orders/create");
//           }}
//         />

//         <OrderTable
//           orders={currentOrders}
//           onEditOrder={() => {}}
//           onDeleteOrder={() => {}}
//           onEditLot={() => {}}
//           onDeleteLot={() => {}}
//           onCreateLot={() => {}}
//         />

//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </main>
//     </div>
//   );
// }

// export default OrderList;

import { useEffect, useState } from "react";
import { DateRange, GetOrdersParams, Status } from "../types";
import FilterBar from "../components/OrderFilter/FilterBar";
import OrderTable from "../components/OrderTable";
import Pagination from "../components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const navigate = useNavigate();

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

  const { data, isLoading, isError, error } = useQuery({
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
            navigate("/orders/create");
          }}
        />

        <OrderTable
          orders={data?.data?.data ?? []}
          onEditOrder={() => {}}
          onDeleteOrder={() => {}}
          onEditLot={() => {}}
          onDeleteLot={() => {}}
          onCreateLot={() => {}}
          isLoading={isLoading}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={data?.data?.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
}

export default OrderList;
