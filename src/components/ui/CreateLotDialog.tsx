import { FormProvider, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./shad-cn/dialog";
import {
  LotFormSchema,
  orderDetailSchema,
} from "../../features/order/validation-schema/orderSchema";
import { Status } from "../../features/order/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createLot } from "../../features/order/services";
import { toast } from "sonner";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import { PlusCircle } from "lucide-react";
import Button from "./Button";

interface CreateLotDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  refetchOrders: () => void;
}

function CreateLotDialog({
  isOpen,
  onClose,
  orderId,
  refetchOrders,
}: CreateLotDialogProps) {
  const methods = useForm<LotFormSchema>({
    resolver: zodResolver(orderDetailSchema),
    defaultValues: {
      no_of_diamonds: 0,
      price_per_caret: 0,
      total_caret: 0,
      status: Status.PENDING,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createLot,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = async (data: LotFormSchema) => {
    console.log("Submitting form data:", data);
    console.log("orderId", orderId);
    const response = await mutateAsync({ ...data, order_id: orderId });
    console.log(response);
    if (response.response_type === "success") {
      toast.success("Lot created successfully");
      reset();
      onClose();
      refetchOrders();
    } else {
      toast.error("Failed to create lot");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Lot</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <NumberInput
                  name={`no_of_diamonds`}
                  label="Number of Diamonds"
                  required
                />

                <NumberInput
                  name={`price_per_caret`}
                  label="Price per Carat"
                  min={0}
                  step={0.01}
                  currency
                  required
                />

                <NumberInput
                  name={`total_caret`}
                  label="Total Carats"
                  step={0.01}
                  required
                />

                <SelectInput
                  name={`status`}
                  label="Order Status"
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || isPending}
                icon={<PlusCircle size={18} />}
                className="flex items-center"
              >
                Add Lot
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreateLotDialog;
