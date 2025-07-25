export interface StaffMember {
  id: number;
  address: string;
  age: number;
  first_name: string;
  last_name: string;
  gender: "male" | "female" | "other";
  primary_phone: string;
  secondary_phone: string | null;
  created_at: string;
  updated_at: string;
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  HALF_DAY = "half-day",
}

export interface AttendanceRecord {
  id: number;
  staff_id: number;
  date: string;
  status: AttendanceStatus;
  reason?: string;
  created_at: string;
  updated_at: string;
}

export interface LeaveRequest {
  staff_id: number;
  start_date: string;
  end_date: string;
  status: AttendanceStatus;
  reason: string;
}
