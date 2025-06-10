import axios from "axios";
import { getData } from "./storage/fn";

if (!process.env.EXPO_PUBLIC_API_ENDPOINT) {
  throw new Error("API_ENDPOINT is not defined");
}

export const publicAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

privateAPI.interceptors.request.use(
  async (config) => {
    const token = await getData({ key: "token" });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
