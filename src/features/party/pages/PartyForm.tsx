import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import {
  partyFormSchema,
  PartyFormSchema,
} from "../validation-schema/partySchema";
import FormSection from "../../../components/ui/FormSelection";
import TextInput from "../../../components/ui/TextInput";
import AddressList from "../components/AddressList";
import Button from "../../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { createParty } from "../services";
import { toast } from "sonner";

const PartyForm: React.FC = () => {
  const methods = useForm<PartyFormSchema>({
    resolver: zodResolver(partyFormSchema),
    defaultValues: {
      name: "",
      email: "",
      personal_phone: "",
      office_phone: "",
      // company_logo: "",
      gstin_no: "",
      party_addresses: [
        {
          address: "",
          landmark: "",
          pincode: "",
        },
      ],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createParty,
  });

  const onSubmit = async (data: PartyFormSchema) => {
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
            title="Party Information"
            subtitle="Enter the main party details"
            icon="user"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                name="name"
                label="Party Name"
                placeholder="Enter party name"
                required
              />

              <TextInput
                name="email"
                label="Email Address"
                placeholder="Enter email address"
                type="email"
                required
              />

              <TextInput
                name="personal_phone"
                label="Personal Phone"
                placeholder="Enter 10-digit phone number"
                required
              />

              <TextInput
                name="office_phone"
                label="Office Phone"
                placeholder="Enter 10-digit phone number"
                required
              />

              {/* <TextInput
                name="company_logo"
                label="Company Logo URL"
                placeholder="Enter logo URL"
                required
              /> */}

              <TextInput
                name="gstin_no"
                label="GST Number"
                placeholder="Enter GST number"
              />
            </div>
          </FormSection>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AddressList />
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
            Save Party
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PartyForm;
