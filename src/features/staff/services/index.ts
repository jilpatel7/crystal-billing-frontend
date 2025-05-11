import axiosInstance from "../../../packages/base-axios";
import { IGetDataParams } from "../../../types";

export const getAllStaffIdsAndNames = async () => {
  const { data } = await axiosInstance.get('/company-staff/get/allIdsAndNames');
  return data;
};

export const getStaff = async (params: IGetDataParams) => {
  const { data } = await axiosInstance.get('/company-staff/get/all', {params});
  return data;
}
