import axiosInstance from "../../../packages/base-axios";
import { IGetDataParams } from "../../../types";
import { PartyFormSchema } from "../validation-schema/partySchema";

export const getAllPartyIdsAndNames = async () => {
  const { data } = await axiosInstance.get('/party/get/allIdsAndNames');
  return data;
};

export const getParty = async (params: IGetDataParams) => {
  const { data } = await axiosInstance.get('/party/get/all', {params});
  return data;
}

export const createParty = async (data: PartyFormSchema) => {
  const { data: party } = await axiosInstance.post('/party/create', data);
  return party;
};