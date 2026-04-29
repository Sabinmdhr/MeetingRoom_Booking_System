import type {
  AnnouncementListRequest,
  Announcements,
} from "../models/announcements.model";
import api from "../api/api";

export const updateAnnouncement = async (id: number, data: Announcements) => {
  try {
    const res = await api.put(`/api/v1/announcement/${id}/update`, data);
    console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error updating announcement", error);
    throw error;
  }
};

export const getAnnouncements = async (data: AnnouncementListRequest) => {
  try {
    const res = await api.post("/api/v1/announcement/list", data);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching announcement", error);
    throw error;
  }
};
export const getPinnedAnnouncement = async (data: AnnouncementListRequest) => {
  try {
    const res = await api.post("/api/v1/announcement/get", data);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching announcement", error);
    throw error;
  }
};
export const getUnpinnedAnnouncement = async (
  data: AnnouncementListRequest,
) => {
  try {
    const res = await api.post("/api/v1/announcement/get", data);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching announcement", error);
    throw error;
  }
};

export const addAnnouncement = async (data: Announcements) => {
  try {
    console.log("Sending payload:", data);
    const res = await api.post("/api/v1/announcement/add", data);
    return res.data;
  } catch (error) {
    console.error("Error adding announcement", error);
    throw error;
  }
};

export const markAsRead = async (id: number) => {
  console.log(id);

  try {
    const res = await api.patch(`/api/v1/announcement/${id}/mark-as-read`);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error updating announcement", error);
    throw error;
  }
};

export const updatePinStatus = async (id: number) => {
  console.log(id);

  try {
    const res = await api.patch(`/api/v1/announcement/${id}/change-pin-status`);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.error("Error updating announcement", error);
    throw error;
  }
};

export const deleteBulk = async (ids: number[]) => {
  try {
    const res = await api.delete("/api/v1/announcements/batch", {
      data: { ids },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting announcements", error);
    throw error;
  }
};

export const deleteAnnouncement = async (id: number) => {
  try {
    const res = await api.delete(`/api/v1/announcement/${id}/delete`);
    console.log(res);
    console.log("Successfully deleted the announcement.");
  } catch (error) {
    console.error("Error deleting announcement", error);
    throw error;
  }
};
