import { privateAPI, publicAPI } from "./axios";

export const loginUser = async (email: string, password: string) => {
  const res = await publicAPI.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (email: string, password: string) => {
  const res = await publicAPI.post("/auth/register", { email, password });
  return res.data;
};
