import api from "../api/api";

export const getDashboardDetails = async () => {
  try {
    const res = await api.get(`/api/v1/dashboard`);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching dashboard details", error);
    throw error;
  }
};
