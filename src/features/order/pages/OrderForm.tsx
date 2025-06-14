import React, { useEffect, useState } from "react";
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
import { createOrder, getSingleOrder, updateOrder } from "../services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface OrderFormProps {
  parties: { id: number; name: string }[];
  staff: { id: number; name: string }[];
  id?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({ parties, staff, id }) => {
  const navigate = useNavigate();
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
    mutationFn: id ? updateOrder : createOrder,
  });

  const [removeLotIds, setRemoveLotIds] = useState<number[]>([]);

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: OrderFormSchema) => {
    const response = await mutateAsync(
      id ? { ...data, id: Number(id), removed_lot_ids: removeLotIds } : data
    );
    if (response.response_type === "success") {
      toast.success(`${id ? "Order updated" : "Order created"} successfully`);
      reset();
      navigate("/order");
    } else {
      toast.error(`${id ? "Failed to update" : "Failed to create"} order`);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleOrder(Number(id)).then((orderData) => {
        reset({
          ...orderData.data,
          received_at: orderData.data.received_at
            ? new Date(orderData.data.received_at)
            : new Date(),
          delivered_at: orderData.data.delivered_at
            ? new Date(orderData.data.delivered_at)
            : null,
        });
      });
    }
  }, [id, reset]);

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
                isClearable={false}
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
                isClearable={false}
              />

              <DateTimeInput
                name="received_at"
                label="Received At"
                required
                isClearable={false}
              />

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
          <OrderDetailsList setRemoveLotIds={setRemoveLotIds} />
        </motion.div>

        <div className="flex items-center justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setRemoveLotIds([]);
            }}
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
            {id ? "Update Order" : "Create Order"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
