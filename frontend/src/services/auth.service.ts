import { axiosInstance } from "../api/api";
import type { LoginRequest, LoginResponse } from "../models/auth.model";

export const loginService = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const api = axiosInstance({}); // create instance
  const response = await api.post("/api/v1/login", data);
  return response.data;
};

export const logoutService = async () => {
  const api = axiosInstance({});

  // create instance
  const body = {
    refreshToken: localStorage.getItem("refreshToken"),
  };
  const result = await api.post("/api/v1/logout", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
    },
  });
  return result.data;
};
