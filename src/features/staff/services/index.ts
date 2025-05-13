import axiosInstance from "../../../packages/base-axios";
import { IGetDataParams } from "../../../types";
import { StaffFormSchema } from "../validation-schema/staffSchema";

export const getAllStaffIdsAndNames = async () => {
  const { data } = await axiosInstance.get('/company-staff/get/allIdsAndNames');
  return data;
};

export const getStaff = async (params: IGetDataParams) => {
  const { data } = await axiosInstance.get('/company-staff/get/all', {params});
  return data;
}

export const createStaff = async (data: StaffFormSchema) => {
  const { data: staff } = await axiosInstance.post('/company-staff/create', data);
  return staff;
};