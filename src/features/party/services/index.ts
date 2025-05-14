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

export const deleteParty = async (id: number) => {
  const { data } = await axiosInstance.delete(`/party/delete`, { data: { id } });
  return data;
};

export const updateParty = async (data: PartyFormSchema) => {
  const { data: party } = await axiosInstance.put('/party/update', data);
  return party;
};

export const getSingleParty = async (id: number) => {
  const response = await axiosInstance.get(`/party/get`, { params: { id } });
  return response.data;
};