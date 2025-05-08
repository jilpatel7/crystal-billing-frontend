import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import OrderDetailsList from "./OrderDetailsList";
import { motion } from "framer-motion";
import {
  OrderFormSchema,
  orderFormSchema,
} from "../validation-schema/orderSchema";
import { Status } from "../types";
import Button from "../../../components/ui/Button";
import FormSection from "../../../components/ui/FormSelection";
import SelectInput from "../../../components/ui/SelectInput";
import TextInput from "../../../components/ui/TextInput";
import DateTimeInput from "../../../components/ui/DateTimeInput";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../services";
import { toast } from "sonner";

interface OrderFormProps {
  parties: { id: number; name: string }[];
  staff: { id: number; name: string }[];
}

const OrderForm: React.FC<OrderFormProps> = ({ parties, staff }) => {
  const methods = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      party_id: undefined,
      jagad_no: "",
      status: Status.PENDING,
      received_at: new Date(),
      delivered_at: null,
      delivered_by: null,
      order_details: [
        {
          no_of_diamonds: 0,
          price_per_caret: 0,
          total_caret: 0,
          status: Status.PENDING,
        },
      ],
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createOrder,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: OrderFormSchema) => {
    console.log("Submitting form data:", data);
    const response = await mutateAsync(data);
    console.log(response);
    if (response.response_type === "success") {
      toast.success("Order created successfully");
      reset();
    } else {
      toast.error("Failed to create order");
    }
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

              <TextInput
                name="jagad_no"
                label="Jagad Number"
                placeholder="Enter jagad number"
                required
              />

              <SelectInput
                name="status"
                label="Order Status"
                placeholder="Select status"
                options={Object.entries(Status).map(([key, value]) => ({
                  value,
                  label: key
                    .split("_")
                    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
                    .join(" "),
                }))}
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
            disabled={isSubmitting || isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting || isPending}
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
