import axiosInstance from "../../../packages/base-axios";
import { LoginFormData } from "../validation-schema/loginSchema";

export const login = async (data: LoginFormData) => {
  const { data: user } = await axiosInstance.post('/auth/login', data);
  return user;
};