import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { motion } from "framer-motion";
import FormSection from "../../../components/ui/FormSelection";
import TextInput from "../../../components/ui/TextInput";
import Button from "../../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  staffFormSchema,
  StaffFormSchema,
} from "../validation-schema/staffSchema";
import { createStaff, getSingleStaff, updateStaff } from "../services";
import NumberInput from "../../../components/ui/NumberInput";
import SelectInput from "../../../components/ui/SelectInput";
import TextArea from "../../../components/ui/TextArea";
import { useNavigate } from "react-router-dom";

interface StaffFormProps {
  id?: string;
}

const StaffForm: React.FC<StaffFormProps> = ({ id }) => {
  const navigate = useNavigate();
  const methods = useForm<StaffFormSchema>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      age: 0,
      primary_phone: "",
      secondary_phone: "",
      address: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: id ? updateStaff : createStaff,
  });

  const onSubmit = async (data: StaffFormSchema) => {
    try {
      const response = await mutateAsync(
        id ? { ...data, id: Number(id) } : data
      );
      if (response.response_type === "success") {
        toast.success(`Staff member ${id ? "updated" : "added"} successfully`);
        navigate("/staff");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Failed to submit form", error);
      toast.error("Failed to submit the form");
    }
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      getSingleStaff(Number(id)).then((staffData) => {
        reset(staffData.data);
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
            title="Staff Member Information"
            subtitle="Enter the staff details"
            icon="user"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                name="first_name"
                label="First Name"
                placeholder="Enter first name"
                required
              />

              <TextInput
                name="last_name"
                label="Last Name"
                placeholder="Enter last name"
                required
              />

              <TextInput
                name="primary_phone"
                label="Primary Phone"
                placeholder="Enter your primary phone number"
                required
              />

              <TextInput
                name="secondary_phone"
                label="Secondary Phone"
                placeholder="Enter your secondary phone number"
                required
              />

              <NumberInput name="age" label="Age" required min={18} max={100} />

              <SelectInput
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                searchable
                required
              />
            </div>
            <div className="mt-6">
              <TextArea
                label="Adress"
                name="address"
                placeholder="Enter your address"
                required
              />
            </div>
          </FormSection>
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
            Save Staff Member
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default StaffForm;
