import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../../../components/ui/StatusBadge";
import IconButton from "../../../components/ui/IconButton";
import LotTable from "./LotTable";
import { Lot, Order } from "../types";

interface OrderRowProps {
  order: Order;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (orderId: string) => void;
  onEditLot: (lot: Lot) => void;
  onDeleteLot: (lotId: string) => void;
  onCreateLot: (orderId: string) => void;
}

const OrderRow: React.FC<OrderRowProps> = ({
  order,
  onEditOrder,
  onDeleteOrder,
  onEditLot,
  onDeleteLot,
  onCreateLot,
}) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <Accordion.Item value={order.id.toString()} asChild>
      <>
        <tr className="bg-white hover:bg-gray-50 transition-colors cursor-pointer">
          <td className="px-6 py-4 whitespace-nowrap">
            <Accordion.Header asChild>
              <div className="flex items-center">
                <Accordion.Trigger
                  className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none data-[state=open]:rotate-180 transition-transform"
                  aria-label="Toggle Lots"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronDown className="h-5 w-5" />
                </Accordion.Trigger>
                <span className="text-sm font-medium text-gray-900">
                  {order.orderNumber}
                </span>
              </div>
            </Accordion.Header>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.customerName}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatDate(order.date)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <StatusBadge status={order.status} />
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.lots.length}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {formatCurrency(order.total)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex justify-end space-x-2">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onEditOrder(order);
                }}
              >
                <Pencil className="h-4 w-4 text-blue-600" />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteOrder(order.id);
                }}
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </IconButton>
            </div>
          </td>
        </tr>

        <tr className="border-b">
          <td colSpan={7} className="p-0">
            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <div className="bg-gray-50 border-t px-8 py-4">
                <div className="text-sm font-medium text-gray-500 mb-3">
                  Lots
                </div>
                <LotTable
                  lots={order.lots}
                  onEditLot={onEditLot}
                  onDeleteLot={onDeleteLot}
                  onCreateLot={onCreateLot}
                  orderId={order.id}
                />
              </div>
            </Accordion.Content>
          </td>
        </tr>
      </>
    </Accordion.Item>
  );
};

export default OrderRow;
