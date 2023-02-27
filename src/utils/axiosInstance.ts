import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const Axios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/vi",
});

Axios.interceptors.request.use((config: AxiosRequestConfig | any) => {
  const accessToken: string = "";
  config.headers = config.headers || {};
  config.headers["authorization"] = `Bearer ${accessToken}`;

  return config;
});
