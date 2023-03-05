import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getTokenFromLocalStorage } from "./localStorage";

export const Axios: AxiosInstance = axios.create({
  baseURL: "https://youtubev2-server.onrender.com/",
});

Axios.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const accessToken = getTokenFromLocalStorage();
  config.headers = config.headers || {};
  config.headers["authorization"] = `Bearer ${accessToken}`;

  return config;
});
