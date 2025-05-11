import axiosInstance from "../../../packages/base-axios";
import { IGetDataParams } from "../../../types";

export const getAllPartyIdsAndNames = async () => {
  const { data } = await axiosInstance.get('/party/get/allIdsAndNames');
  return data;
};

export const getParty = async (params: IGetDataParams) => {
  const { data } = await axiosInstance.get('/party/get/all', {params});
  return data;
}
