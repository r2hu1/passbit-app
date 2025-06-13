import { privateAPI, publicAPI } from "./axios";

export const loginUser = async (email: string, password: string) => {
  const res = await publicAPI.post("/auth/login", { email, password });
  return res.data;
};

export const registerUser = async (email: string, password: string) => {
  const res = await publicAPI.post("/auth/register", { email, password });
  return res.data;
};

export const verifyEmail = async (otp: string) => {
  const res = await privateAPI.post("/user/verify-otp", { otp });
  return res.data;
};

export const sendVerificationEmail = async () => {
  const res = await privateAPI.get("/email/send-otp");
  return res.data;
};
