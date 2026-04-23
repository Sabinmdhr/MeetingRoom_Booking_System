import api from "../api/api";
import type { ReportPayload } from "../models/meetingReport.model";

export const getAllReports = async () => {
  try {
    const res = await api.get("/api/v1/reports/get-all");
    return res.data;
  } catch (error) {
    console.error("Error fetching report", error);
    throw error;
  }
};

export const exportReports = async (): Promise<Blob> => {
  const res = await api.post(
    "/api/v1/reports/export",
    {},
    { responseType: "blob" },
  );
  return res.data;
};

export const filterReport = async (data: ReportPayload) => {
  const res = await api.post("/api/v1/reports", data);
  return res.data.data.content;
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

    return res.data.data;
  } catch (error) {
    console.error("Error fetching rooms", error);
    throw error;
  }
};
// export const fetchDepartment = async () => {
//   try {
//     const res = await api.get("/api/v1/department/list");
//     console.log(res.data);

//     return res.data;
//   } catch (error) {
//     console.error("Error fetching department", error);
//     throw error;
//   }
// };

export const getAllMeetingType = async () => {
  try {
    const res = await api.get(`/api/v1/get-all-meeting-type`);
    return res.data;
  } catch (error) {
    console.error("Error fetching meeting types", error);
    throw error;
  }
};
