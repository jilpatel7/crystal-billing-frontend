import { z } from 'zod';

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const addressSchema = z.object({
  id: z.number().optional().nullable(),
  address: z.string().min(1, 'Address is required'),
  landmark: z.string().min(1, 'Landmark is required'),
  pincode: z.string().length(6, 'Pincode must be 6 digits').regex(/^[0-9]+$/, 'Pincode must contain only numbers'),
});

export const partyFormSchema = z.object({
  id: z.number().optional().nullable(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  personal_phone: z.string().min(1, 'Phone number is required'),
  office_phone: z.string().min(1, 'Office phone number is required'),
  // company_logo: z.string().url('Invalid logo URL'),
  gstin_no: z.string()
  .regex(gstRegex, 'Invalid GST number')
  .optional()
  .or(z.literal('')),
  party_addresses: z.array(addressSchema).min(1, 'At least one address is required'),
  removed_address_ids: z.array(z.number()).optional().nullable(),
});

export type PartyFormSchema = z.infer<typeof partyFormSchema>;
