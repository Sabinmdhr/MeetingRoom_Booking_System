// import { axiosInstance } from "../api/api";
import type { LoginRequest, LoginResponse } from "../models/auth.model";
import api from "../api/api";
export const loginService = async (
  data: LoginRequest,
) => {
  // const api = axiosInstance({}); // create instance
  const response = await api.post("/api/v1/login", data);
  return response.data.data;
};

export const logoutService = async () => {
  // const api = axiosInstance({});

  // create instance
  const body = {
    refreshToken: localStorage.getItem("refreshToken"),
  };
  const result = await api.post("/api/v1/logout", body);
  return result.data;
};
