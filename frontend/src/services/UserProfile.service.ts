import api from "../api/api";
import type { UserProfileInfo } from "../models/profileSection.model";

export const fetchCurrentUser = async () => {
  const res = await api.get("/api/v1/users/current-user");
  return res.data;
};

export const updateProfile = async (data: Partial<UserProfileInfo> & { id: number }) => {
  const res = await api.patch("/api/v1/users/logged-in-user/update", data);
  return res.data;
};
