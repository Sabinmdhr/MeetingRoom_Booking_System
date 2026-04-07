import api from "../api/api";

export const getAllReports = async () => {
  try {
    const res = await api.get("/api/v1/reports/get-all");
    return res.data;
  } catch (error) {
    console.error("Error adding announcement", error);
    throw error;
  }
};

export const exportReports = async () => {
  try {
    return await api.get("/api/v1/reports/get-all");
  } catch (error) {
    console.error("Error adding announcement", error);
    throw error;
  }
};
