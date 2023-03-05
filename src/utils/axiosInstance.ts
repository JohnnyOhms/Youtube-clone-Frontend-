import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getTokenFromLocalStorage } from "./localStorage";

export const Axios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

Axios.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const accessToken = getTokenFromLocalStorage();
  config.headers = config.headers || {};
  config.headers["authorization"] = `Bearer ${accessToken}`;

  return config;
});
