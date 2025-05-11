import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "../../../components/ui/StatusBadge";
import IconButton from "../../../components/ui/IconButton";
import { Lot } from "../types";

interface LotRowProps {
  lot: Lot;
  onEdit: (lot: Lot) => void;
  onDelete: (lotId: number) => void;
  index: number;
}

const LotRow: React.FC<LotRowProps> = ({ lot, onEdit, onDelete, index }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {index + 1}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {lot.no_of_diamonds}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {lot.total_caret}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
        {formatCurrency(lot.price_per_caret)}
      </td>
      <td className="px-6 py-3 whitespace-nowrap text-sm">
        <StatusBadge status={lot.status} />
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
