import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import { OrderFormValues } from "../types";
import FormSection from "../../../components/ui/FormSelection";
import Button from "../../../components/ui/Button";
import NumberInput from "../../../components/ui/NumberInput";

const OrderDetailsList: React.FC = () => {
  const { control } = useFormContext<OrderFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "order_details",
  });

  const handleAddLot = () => {
    append({
      no_of_diamonds: undefined,
      price_per_caret: undefined,
      total_caret: undefined,
      status: "pending",
    });
  };

  return (
    <FormSection
      title="Diamond Lots"
      subtitle="Add details for each lot"
      icon="gem"
    >
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-white border border-indigo-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800">
                Lot #{index + 1}
              </h3>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NumberInput
                name={`order_details.${index}.no_of_diamonds`}
                label="Number of Diamonds"
                min={1}
                required
              />

              <NumberInput
                name={`order_details.${index}.price_per_caret`}
                label="Price per Carat"
                min={0}
                step={0.01}
                currency
                required
              />

              <NumberInput
                name={`order_details.${index}.total_caret`}
                label="Total Carats"
                min={0}
                step={0.01}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={handleAddLot}
          icon={<PlusCircle size={18} />}
          className="w-full md:w-auto flex items-center"
        >
          Add Another Lot
        </Button>
      </div>
    </FormSection>
  );
};

export default OrderDetailsList;
