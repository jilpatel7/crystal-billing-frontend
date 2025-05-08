import axiosInstance from "../../../packages/base-axios";
import { GetOrdersParams } from "../types";
import { OrderFormSchema } from "../validation-schema/orderSchema";

export const getOrders = async (params: GetOrdersParams) => {
  const { data } = await axiosInstance.get('/order/get/all', { params });
  return data;
};

export const createOrder = async (data: OrderFormSchema) => {
  const { data: order } = await axiosInstance.post('/order/create', data);
  return order;
};