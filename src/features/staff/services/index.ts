import axiosInstance from "../../../packages/base-axios";
import { IGetDataParams } from "../../../types";
import { StaffFormSchema } from "../validation-schema/staffSchema";
import {
  AttendanceFormData,
  LeaveRequestFormData,
} from "../validation-schema/attendanceSchema";

export const getAllStaffIdsAndNames = async () => {
  const { data } = await axiosInstance.get("/company-staff/get/allIdsAndNames");
  return data;
};

export const getStaff = async (params: IGetDataParams) => {
  const { data } = await axiosInstance.get("/company-staff/get/all", {
    params,
  });
  return data;
};

export const createStaff = async (data: StaffFormSchema) => {
  const { data: staff } = await axiosInstance.post(
    "/company-staff/create",
    data
  );
  return staff;
};

export const deleteStaff = async (id: number) => {
  const { data } = await axiosInstance.delete(`/company-staff/delete`, {
    data: { id },
  });
  return data;
};

export const updateStaff = async (data: StaffFormSchema) => {
  const { data: staff } = await axiosInstance.put(
    "/company-staff/update",
    data
  );
  return staff;
};

export const getSingleStaff = async (id: number) => {
  const response = await axiosInstance.get(`/company-staff/get`, {
    params: { id },
  });
  return response.data;
};

// Attendance Management Services
export const markAttendance = async (data: AttendanceFormData) => {
  const { data: attendance } = await axiosInstance.post(
    "/company-staff/attendance/mark",
    data
  );
  return attendance;
};

export const getAttendance = async (params: {
  staff_id?: number;
  month?: string;
}) => {
  console.log("params", params);
  const { data } = await axiosInstance.get("/company-staff/attendance/get", {
    params,
  });
  return data;
};

export const requestLeave = async (data: LeaveRequestFormData) => {
  const { data: leave } = await axiosInstance.post(
    "/company-staff/attendance/leave-request",
    data
  );
  return leave;
};

export const getStaffAttendanceSummary = async (
  staff_id: number,
  month: number,
  year: number
) => {
  const { data } = await axiosInstance.get(
    `/company-staff/attendance/summary`,
    {
      params: { staff_id, month, year },
    }
  );
  return data;
};
