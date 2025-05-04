import React from "react";
import LotRow from "./LotRow";
import { Plus } from "lucide-react";
import Button from "../../../components/ui/Button";
import { Lot } from "../types";

interface LotTableProps {
  lots: Lot[];
  onEditLot: (lot: Lot) => void;
  onDeleteLot: (lotId: string) => void;
  onCreateLot: (orderId: string) => void;
  orderId: string;
}

const LotTable: React.FC<LotTableProps> = ({
  lots,
  onEditLot,
  onDeleteLot,
  onCreateLot,
  orderId,
}) => {
  if (lots.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 mb-2">No lots found for this order</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCreateLot(orderId)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add First Lot
        </Button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCreateLot(orderId)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Lot
        </Button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Lot Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantity
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
              Unit Price
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
          {lots.map((lot) => (
            <LotRow
              key={lot.id}
              lot={lot}
              onEdit={onEditLot}
              onDelete={onDeleteLot}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LotTable;
