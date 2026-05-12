import type {
  AnnouncementListRequest,
  Announcements,
} from "../models/announcements.model";
import api from "../api/api";

export const getAnnouncement = async (data: AnnouncementListRequest) => {
  const res = await api.post("/api/v1/announcement/get", data);
  return res.data;
};

// export const getUnpinnedAnnouncement = async (
//   data: AnnouncementListRequest,
// ) => {
//   const res = await api.post("/api/v1/announcement/get", data);
//   return res.data;
// };

export const getScheduledAnnouncement = async (
  data: AnnouncementListRequest,
) => {
  const res = await api.post("/api/v1/announcement/get-scheduled", data);

  return res.data.data.content;
};

// Used for admin/full-list views (not the announcements page)
export const getAnnouncements = async (data: AnnouncementListRequest) => {
  const res = await api.post("/api/v1/announcement/list", data);
  return res.data;
};

export const addAnnouncement = async (data: Announcements) => {
  const res = await api.post("/api/v1/announcement/add", data);
  return res.data;
};

export const updateAnnouncement = async (id: number, data: Announcements) => {
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
  const res = await api.delete("/api/v1/announcements/batch", {
    data: { ids },
  });
  return res.data;
};

export const getAllAnnouncements = async (data: AnnouncementListRequest) => {
  try {
    const res = await api.post("/api/v1/announcement/list", data);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.error("Error fetching announcement", error);
    throw error;
  }
};
