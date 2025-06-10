import axiosInstance from "../../../packages/base-axios";
import { GetOrdersParams } from "../types";
import { LotFormSchema, OrderFormSchema } from "../validation-schema/orderSchema";

export const getOrders = async (params: GetOrdersParams) => {
  const { data } = await axiosInstance.get('/order/get/all', { params });
  return data;
};

export const createOrder = async (data: OrderFormSchema) => {
  const { data: order } = await axiosInstance.post('/order/create', data);
  return order;
};

export const deleteOrder = async (id: number) => {
  const { data } = await axiosInstance.delete('/order/delete',  { data: { id } });
  return data;
};

export const createLot = async (data: LotFormSchema) => {
  const { data: lot } = await axiosInstance.post('/order/lot/create', data);
  return lot;
};

export const deleteLot = async (id: number) => {
  const { data } = await axiosInstance.delete('/order/lot/delete',  { data: { id } });
  return data;
};