import React, { useState } from "react";
import { Lot, Order } from "./type";
import OrderRow from "./OrderRow";

interface OrderTableProps {
  orders: Order[];
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  onEditLot: (lot: Lot) => void;
  onDeleteLot: (lotId: string) => void;
  onCreateLot: (orderId: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  onEditOrder,
  onDeleteOrder,
  onEditLot,
  onDeleteLot,
  onCreateLot,
}) => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

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
              Customer
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
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
              Lots
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Total
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              isExpanded={expandedOrderId === order.id}
              onToggleExpand={() =>
                setExpandedOrderId((prev) =>
                  prev === order.id ? null : order.id
                )
              }
              onEditOrder={onEditOrder}
              onDeleteOrder={onDeleteOrder}
              onEditLot={onEditLot}
              onDeleteLot={onDeleteLot}
              onCreateLot={onCreateLot}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
