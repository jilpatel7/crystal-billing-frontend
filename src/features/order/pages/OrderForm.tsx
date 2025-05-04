import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import OrderDetailsList from "./OrderDetailsList";
import { motion } from "framer-motion";
import { orderFormSchema } from "../validation-schema/orderSchema";
import { OrderFormValues, OrderStatus, Party, Staff } from "../types";
import Button from "../../../components/ui/Button";
import FormSection from "../../../components/ui/FormSelection";
import SelectInput from "../../../components/ui/SelectInput";
import NumberInput from "../../../components/ui/NumberInput";
import TextInput from "../../../components/ui/TextInput";
import DateTimeInput from "../../../components/ui/DateTimeInput";

interface OrderFormProps {
  parties: Party[];
  staff: Staff[];
}

const OrderForm: React.FC<OrderFormProps> = ({ parties, staff }) => {
  const methods = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      party_id: "",
      no_of_lots: undefined,
      jagad_no: "",
      received_at: new Date(),
      delivered_at: null,
      delivered_by: "",
      order_details: [
        {
          no_of_diamonds: undefined,
          price_per_caret: undefined,
          total_caret: undefined,
          status: OrderStatus.PENDING,
        },
      ],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: OrderFormValues) => {
    // Simulate API call
    console.log("Submitting form data:", data);

    // In real world, this would be an API call:
    // await createOrder(data);

    alert("Order created successfully!");
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormSection
            title="Order Information"
            subtitle="Enter the main order details"
            icon="clipboard"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                name="party_id"
                label="Party"
                placeholder="Select a party"
                options={parties.map((party) => ({
                  value: party.id,
                  label: party.name,
                }))}
                searchable
                required
              />

              <NumberInput
                name="no_of_lots"
                label="Number of Lots"
                min={1}
                required
              />

              <TextInput
                name="jagad_no"
                label="Jagad Number"
                placeholder="Enter jagad number"
                required
              />

              <DateTimeInput name="received_at" label="Received At" required />

              <DateTimeInput name="delivered_at" label="Delivered At" />

              <SelectInput
                name="delivered_by"
                label="Delivered By"
                placeholder="Select staff member"
                options={staff.map((member) => ({
                  value: member.id,
                  label: member.name,
                }))}
                searchable
              />
            </div>
          </FormSection>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <OrderDetailsList />
        </motion.div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            icon={<Save size={18} />}
            className="flex items-center"
          >
            Save Order
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
