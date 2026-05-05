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

export const updateProfile = async (id: number, data: any) => {
  try {
    const res = await api.put(`/api/v1/user/${id}/update`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating the user", error);
    throw error;
  }
};
