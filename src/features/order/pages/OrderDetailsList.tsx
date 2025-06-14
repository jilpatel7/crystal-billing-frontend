import { Dispatch, SetStateAction } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PlusCircle, Trash2 } from "lucide-react";
import { Status } from "../types";
import FormSection from "../../../components/ui/FormSelection";
import Button from "../../../components/ui/Button";
import NumberInput from "../../../components/ui/NumberInput";
import SelectInput from "../../../components/ui/SelectInput";
import { OrderFormSchema } from "../validation-schema/orderSchema";

interface OrderDetailsListProps {
  setRemoveLotIds: Dispatch<SetStateAction<number[]>>;
}

const OrderDetailsList = ({ setRemoveLotIds }: OrderDetailsListProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<OrderFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "order_details",
    keyName: "_internalId",
  });

  const handleAddLot = () => {
    append({
      no_of_diamonds: 0,
      price_per_caret: 0,
      total_caret: 0,
      status: Status.PENDING,
    });
  };

  const orderDetailsErrors = errors.order_details;

  return (
    <FormSection
      title="Diamond Lots"
      subtitle="Add details for each lot"
      icon="gem"
    >
      <div className="space-y-4">
        {fields.map((field, index) => {
          const lotErrors = orderDetailsErrors?.[index];

          return (
            <div
              key={field.id}
              className={`bg-white border rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                lotErrors ? "border-red-300" : "border-indigo-100"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Lot #{index + 1}
                </h3>
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => {
                      if (field.id) {
                        setRemoveLotIds((prev) => [
                          ...prev,
                          field.id as number,
                        ]);
                      }
                      remove(index);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <NumberInput
                  name={`order_details.${index}.no_of_diamonds`}
                  label="Number of Diamonds"
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
                  step={0.01}
                  required
                />

                <SelectInput
                  name={`order_details.${index}.status`}
                  label="Lot Status"
                  placeholder="Select status"
                  options={Object.entries(Status).map(([key, value]) => ({
                    value,
                    label: key
                      .split("_")
                      .map(
                        (word) => word.charAt(0) + word.slice(1).toLowerCase()
                      )
                      .join(" "),
                  }))}
                  required
                  isClearable={false}
                />
              </div>

              {lotErrors && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">
                    Please fill in all required fields for this lot correctly
                  </p>
                </div>
              )}
            </div>
          );
        })}
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
