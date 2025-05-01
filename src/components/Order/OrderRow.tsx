import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react";
import { Lot, Order } from "./type";
import StatusBadge from "../ui/StatusBadge";
import IconButton from "../ui/IconButton";
import LotTable from "./LotTable";

interface OrderRowProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: () => void;
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
  onToggleExpand,
  isExpanded,
}) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

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
    <>
      <tr
        className={`${
          isExpanded ? "bg-blue-50" : "bg-white hover:bg-gray-50"
        } transition-colors cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleExpand();
        }}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <button
              className="mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            <span className="text-sm font-medium text-gray-900">
              {order.orderNumber}
            </span>
          </div>
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
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height}px` }}
          >
            <div ref={contentRef} className="bg-gray-50 border-t px-8 py-4">
              <div className="text-sm font-medium text-gray-500 mb-3">Lots</div>
              <LotTable
                lots={order.lots}
                onEditLot={onEditLot}
                onDeleteLot={onDeleteLot}
                onCreateLot={onCreateLot}
                orderId={order.id}
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default OrderRow;
