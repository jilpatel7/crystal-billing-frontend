import { z } from "zod";

const phoneRegex = /^[0-9]{10}$/;

export const staffFormSchema = z.object({
  id: z.number().optional().nullable(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  age: z
    .number()
    .min(1, "Age is required")
    .min(18, "Age must be greater than 18"),
  primary_phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  secondary_phone: z
    .string()
    .min(1, "Secondary phone number is required")
    .regex(phoneRegex, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
});

export type StaffFormSchema = z.infer<typeof staffFormSchema>;
