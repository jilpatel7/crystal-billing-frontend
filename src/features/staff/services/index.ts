import axiosInstance from "../../../packages/base-axios";

export const getAllStaffIdsAndNames = async () => {
  const { data } = await axiosInstance.get('/company-staff/get/allIdsAndNames');
  return data;
};
