import { z } from "zod";
import { Status } from "../types"; // enum Status { PENDING = 'PENDING', SUCCESS = 'SUCCESS', ... }

// Lot schema
export const orderDetailSchema = z.object({
  id: z
    .number({
      invalid_type_error: "Lot ID must be a number",
    })
    .optional()
    .nullable(),
  no_of_diamonds: z
    .number({
      required_error: "Number of diamonds is required",
      invalid_type_error: "Number of diamonds must be a number",
    })
    .int("Number of diamonds must be an integer")
    .positive("Number of diamonds must be greater than 0"),

  price_per_caret: z
    .number({
      required_error: "Price per carat is required",
      invalid_type_error: "Price per carat must be a number",
    })
    .positive("Price per carat must be greater than 0"),

  total_caret: z
    .number({
      required_error: "Total carats is required",
      invalid_type_error: "Total carats must be a number",
    })
    .positive("Total carats must be greater than 0"),

  status: z.nativeEnum(Status, {
    required_error: "Lot status is required",
    invalid_type_error: "Invalid lot status",
  }),

  order_id: z
    .number({
      invalid_type_error: "Order ID must be a number",
    })
    .optional()
    .nullable(),
});

// Order schema
export const orderFormSchema = z
  .object({
    id: z
      .number({
        invalid_type_error: "Order ID must be a number",
      })
      .optional()
      .nullable(),
    party_id: z
      .number({
        required_error: "Party is required",
        invalid_type_error: "Party ID must be a number",
      })
      .min(1, "Party is required"),

    status: z.nativeEnum(Status, {
      required_error: "Order status is required",
      invalid_type_error: "Invalid order status",
    }),

    jagad_no: z
      .string({
        required_error: "Jagad number is required",
      })
      .min(1, "Jagad number is required"),

    received_at: z
      .date({
        required_error: "Received date is required",
        // invalid_type_error: "Received date must be a valid date",
      })
      .refine((date) => date <= new Date(), {
        message: "Received date cannot be in the future",
      }),

    delivered_at: z
      .date({
        invalid_type_error: "Delivered date must be a valid date",
      })
      .nullable()
      .optional(),

    delivered_by: z
      .number({
        invalid_type_error: "Delivered by must be a number",
      })
      .nullable()
      .optional(),

    order_details: z
      .array(orderDetailSchema)
      .min(1, "At least one lot is required"),
    removed_lot_ids: z.array(z.number()).optional().nullable(),
  })
  // delivered_at and delivered_by must either both be set or both be null
  .refine(
    (data) =>
      (data.delivered_at &&
        data.delivered_by !== null &&
        data.delivered_by !== undefined) ||
      (!data.delivered_at &&
        (data.delivered_by === null || data.delivered_by === undefined)),
    {
      message:
        "Both Delivered At and Delivered By must be filled or both must be empty",
      path: ["delivered_by"],
    }
  )
  // delivered_at must not be before received_at
  .refine(
    (data) => !data.delivered_at || data.delivered_at >= data.received_at,
    {
      message: "Delivered date cannot be before Received date",
      path: ["delivered_at"],
    }
  )
  // if order status is SUCCESS, all lot statuses must also be SUCCESS
  .refine(
    (data) =>
      data.status !== Status.COMPLETED ||
      data.order_details.every((detail) => detail.status === Status.COMPLETED),
    {
      message: "All lot statuses must be SUCCESS when order status is SUCCESS",
      path: ["order_details"],
    }
  );

export type OrderFormSchema = z.infer<typeof orderFormSchema>;
export type LotFormSchema = z.infer<typeof orderDetailSchema>;
