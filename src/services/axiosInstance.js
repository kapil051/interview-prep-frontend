import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const publicAxios = axios.create({
  baseURL: API_BASE_URL,
});

const privateAxios = axios.create({
  baseURL: API_BASE_URL,
});

privateAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
