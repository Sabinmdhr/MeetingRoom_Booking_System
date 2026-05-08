import api from "../api/api";

export const fetchCurrentUser = async () => {
  try {
    const res = await api.get("/api/v1/users/current-user");
    return res.data;
  } catch (error) {
    console.error("Error fetching current user", error);
    throw error;
  }
};
export const updateProfile = async (data: any) => {
  try {
    const res = await api.patch(`/api/v1/users/logged-in-user/update`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating the user", error);
    throw error;
  }
};
