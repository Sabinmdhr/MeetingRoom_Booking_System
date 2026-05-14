import type { Announcement, AnnouncementListRequest } from "../models/announcements.model";
import api from "../api/api";

// Fetch pinned or unpinned announcements (paginated)
export const getAnnouncement = async (data: AnnouncementListRequest) => {
  const res = await api.post("/api/v1/announcement/get", data);
  return res.data;
};

// Fetch scheduled announcements (paginated).
// The backend wraps the page inside res.data.data, so we unwrap it here
// so callers always get { content, totalElements } directly.
export const getScheduledAnnouncement = async (data: AnnouncementListRequest) => {
  const res = await api.post("/api/v1/announcement/get-scheduled", data);
  return res.data?.data ?? { content: [], totalElements: 0 };
};

export const addAnnouncement = async (data: Omit<Announcement, "id">) => {
  const res = await api.post("/api/v1/announcement/add", data);
  return res.data;
};

export const updateAnnouncement = async (id: number, data: Partial<Announcement>) => {
  const res = await api.put(`/api/v1/announcement/${id}/update`, data);
  return res.data;
};

export const markAsRead = async (id: number) => {
  const res = await api.patch(`/api/v1/announcement/${id}/mark-as-read`);
  return res.data;
};

export const updatePinStatus = async (id: number) => {
  const res = await api.patch(`/api/v1/announcement/${id}/change-pin-status`);
  return res.data;
};

export const deleteAnnouncement = async (id: number) => {
  await api.delete(`/api/v1/announcement/${id}/delete`);
};

export const deleteBulk = async (ids: number[]) => {
  const res = await api.delete("/api/v1/announcements/batch", { data: { ids } });
  return res.data;
};
