import api from "../api/api";

export const getAllReports = async () => {
  try {
    const res = await api.get("/api/v1/reports/get-all");
    return res.data;
  } catch (error) {
    console.error("Error fetching report", error);
    throw error;
  }
};

export const exportReports = async () => {
  try {
    const res = await api.post("/api/v1/reports/export", {
      responseType: "blob",
    });
    return res.data;
  } catch (error) {
    console.error("Error exporting report", error);
    throw error;
  }
};

export const filterReport = async (data: any) => {
  try {
    const res = await api.post("/api/v1/reports", data);
    // console.log(res);
    console.log(res.data.data.content);
    return res.data.data.content;
  } catch (error) {
    console.error("Error filtering report", error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const res = await api.get("/api/v1/user/get-all");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

export const fetchRoom = async () => {
  try {
    const res = await api.get("/api/v1/room/list");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching rooms", error);
    throw error;
  }
};
export const fetchDepartment = async () => {
  try {
    const res = await api.get("/api/v1/department/list");
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error fetching department", error);
    throw error;
  }
};
