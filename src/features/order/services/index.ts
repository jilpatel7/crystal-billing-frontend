import axiosInstance from "../../../packages/base-axios";
import { GetOrdersParams } from "../types";

export const getOrders = async (params: GetOrdersParams) => {
  const { data } = await axiosInstance.get('/order/get/all', { params });
  return data;
};

// export const createOrder = async (order: any) => {
//   const { data } = await axiosInstance.post(`/api/order/create`, order);
//   return data;
// };

// export const getOrderById = async (id: string) => {
//   const { data } = await axiosInstance.get(`/api/order/get/${id}`);
//   return data;
// };

// export const updateOrder = async (id: string, order: any) => {
//   const { data } = await axiosInstance.put(`/api/order/update/${id}`, order);
//   return data;
// };

// export const deleteOrder = async (id: string) => {
//   const { data } = await axiosInstance.delete(`/api/order/delete/${id}`);
//   return data;
// };
