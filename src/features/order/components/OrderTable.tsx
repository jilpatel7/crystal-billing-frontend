import React from "react";
import OrderRow from "./OrderRow";
import { Lot, Order } from "../types";
import * as Accordion from "@radix-ui/react-accordion";

interface OrderTableProps {
  orders: Order[];
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: number) => void;
  onEditLot: (lot: Lot) => void;
  onDeleteLot: (lotId: number) => void;
  onCreateLot: (orderId: number) => void;
  isLoading: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onEditOrder,
  onDeleteOrder,
  onEditLot,
  onDeleteLot,
  onCreateLot,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
        <div className="text-xl font-medium text-gray-500 mb-2">Loading...</div>
        <p className="text-gray-400 mb-4">
          Please wait while we fetch your orders
        </p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
        <div className="text-xl font-medium text-gray-500 mb-2">
          No orders found
        </div>
        <p className="text-gray-400 mb-4">
          Try adjusting your filters or create a new order
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Order Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Party
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Lots
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Jagad No.
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Received At
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <Accordion.Root type="single" collapsible asChild>
          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
                onEditOrder={onEditOrder}
                onDeleteOrder={onDeleteOrder}
                onEditLot={onEditLot}
                onDeleteLot={onDeleteLot}
                onCreateLot={onCreateLot}
              />
            ))}
          </tbody>
        </Accordion.Root>
      </table>
    </div>
  );
};

export default OrderTable;
