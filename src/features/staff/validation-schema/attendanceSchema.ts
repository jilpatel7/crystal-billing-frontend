import { z } from "zod";
import { AttendanceStatus } from "../types";

export const attendanceSchema = z
  .object({
    staff_id: z.number().min(1, "Staff member is required"),
    attendance_date: z.date({
      required_error: "Date is required",
    }),
    status: z.nativeEnum(AttendanceStatus, {
      required_error: "Attendance status is required",
    }),
    reason: z.string().optional(),
  })
  .refine(
    (data) => {
      // If status is ABSENT or HALF_DAY, reason is required
      if (
        data.status === AttendanceStatus.ABSENT ||
        data.status === AttendanceStatus.HALF_DAY
      ) {
        return data.reason && data.reason.trim().length > 0;
      }
      return true;
    },
    {
      message: "Reason is required for absent or half day",
      path: ["reason"],
    }
  );

export const leaveRequestSchema = z
  .object({
    staff_id: z.number().min(1, "Staff member is required"),
    start_date: z.date({
      required_error: "Start date is required",
    }),
    end_date: z.date({
      required_error: "End date is required",
    }),
    status: z.nativeEnum(AttendanceStatus, {
      required_error: "Leave type is required",
    }),
    reason: z.string().min(1, "Reason is required"),
  })
  .refine(
    (data) => {
      return data.end_date >= data.start_date;
    },
    {
      message: "End date must be after or equal to start date",
      path: ["end_date"],
    }
  )
  .refine(
    (data) => {
      // Only ABSENT or HALF_DAY are valid for leave requests
      return (
        data.status === AttendanceStatus.ABSENT ||
        data.status === AttendanceStatus.HALF_DAY
      );
    },
    {
      message: "Leave type must be either absent or half day",
      path: ["status"],
    }
  );

export type AttendanceFormData = z.infer<typeof attendanceSchema>;
export type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>;
