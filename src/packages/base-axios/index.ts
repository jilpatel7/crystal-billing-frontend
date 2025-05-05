import axios from "axios";
import { VITE_API_API_BASE_URL } from "../../config";

const axiosInstance = axios.create({
  baseURL: VITE_API_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
