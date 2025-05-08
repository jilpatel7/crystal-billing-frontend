import axiosInstance from "../../../packages/base-axios";

export const getAllPartyIdsAndNames = async () => {
  const { data } = await axiosInstance.get('/party/get/allIdsAndNames');
  return data;
};
