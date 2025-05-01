import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import IconButton from "../ui/IconButton";
import { Lot } from "./type";

interface LotRowProps {
  lot: Lot;
  onEdit: (lot: Lot) => void;
  onDelete: (lotId: string) => void;
}

const LotRow: React.FC<LotRowProps> = ({ lot, onEdit, onDelete }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {lot.lotNumber}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {lot.description}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {lot.quantity}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm">
        <StatusBadge status={lot.status} />
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {formatCurrency(lot.price)}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {formatCurrency(lot.price * lot.quantity)}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <IconButton onClick={() => onEdit(lot)}>
            <Pencil className="h-4 w-4 text-blue-600" />
          </IconButton>
          <IconButton onClick={() => onDelete(lot.id)}>
            <Trash2 className="h-4 w-4 text-red-600" />
          </IconButton>
        </div>
      </td>
    </tr>
  );
};

export default LotRow;
