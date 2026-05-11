import api from "../api/api";
import type { ReportPayload } from "../models/meetingReport.model";

export const fetchReportData = async (payload: ReportPayload) => {
  const res = await api.post("/api/v1/reports", payload);
  return res.data.data; // { content: Meeting[], totalElements: number }
};

export const exportReports = async (payload: ReportPayload): Promise<Blob> => {
  const res = await api.post("/api/v1/reports/export", payload, {
    responseType: "blob",
  });
  return res.data;
};

export const fetchUsers = async () => {
  const res = await api.get("/api/v1/user/get-all");
  return res.data;
};

export const fetchRooms = async () => {
  const res = await api.get("/api/v1/room/list");
  return res.data.data;
};

export const getAllMeetingType = async () => {
  const res = await api.get("/api/v1/get-all-meeting-type");
  return res.data;
};
