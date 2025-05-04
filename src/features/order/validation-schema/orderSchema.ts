import { z } from 'zod';
import { OrderStatus } from '../types';

// Order details schema (for each lot)
const orderDetailSchema = z.object({
  no_of_diamonds: z.number({
    required_error: 'Number of diamonds is required',
    invalid_type_error: 'Number of diamonds must be a number',
  }).int().positive('Number of diamonds must be positive'),

  price_per_caret: z.number({
    required_error: 'Price per carat is required',
    invalid_type_error: 'Price per carat must be a number',
  }).nonnegative('Price per carat cannot be negative'),

  total_caret: z.number({
    required_error: 'Total carats is required',
    invalid_type_error: 'Total carats must be a number',
  }).positive('Total carats must be positive'),

  status: z.string({
    required_error: 'Status is required',
  }).default(OrderStatus.PENDING),
});

// Main order form schema
export const orderFormSchema = z.object({
  party_id: z.string({
    required_error: 'Party is required',
  }).min(1, 'Party is required'),

  no_of_lots: z
  .number({ invalid_type_error: "Number of lots is required" })
  .min(1, "Must be at least 1"),

  jagad_no: z.string({
    required_error: 'Jagad number is required',
  }).min(1, 'Jagad number is required'),

  received_at: z.date({
    required_error: 'Received date is required',
    invalid_type_error: 'Received date must be a valid date',
  }),

  delivered_at: z.date({
    invalid_type_error: 'Delivered date must be a valid date',
  }).nullable().optional(),

  delivered_by: z.string().optional(),

  order_details: z.array(orderDetailSchema).min(1, 'At least one lot is required'),
})
.refine(
  (data) => {
    if (data.delivered_at && !data.delivered_by) return false;
    return true;
  },
  {
    message: 'Delivered by is required when delivery date is provided',
    path: ['delivered_by'],
  }
);

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
