// import { axiosInstance } from "../api/api";
import { toast } from "react-toastify";
import api from "../api/api";
import { useAuth } from "../hooks/useAuth";
import type { AddRoomModal } from "../models/meeting_room.model";

export const addRoom = async (data: AddRoomModal) => {
  // const api = axiosInstance({});
  try {
    const response = await api.post("/api/v1/room/add", data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error adding meeting room:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

export const getMeetingRooms = async () => {
  try {
    const response = await api.post("/api/v1/room/active-list", { pageNo: 0 });
    return response.data;
  } catch (error) {
    console.error("Error fetching meeting rooms:", error);
    throw error;
  }
};
export const getMeetingRoomResources = async () => {
  try {
    const res = await api.get("/api/v1/room/active-resource");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const addMeetingResources = async (name: string) => {
  try {
    const res = api.post("/api/v1/room/resource", { name });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteMeetingRoom = async (roomId: number) => {
  try {
    const response = await api.patch(`/api/v1/room/${roomId}/change-status`, {
      status: "INACTIVE",
    });
    // console.log("deleted");

    return response;
  } catch (error) {
    console.error("Error deleting meeting room:", error);
    throw error;
  }
};

export const EditMeetingRoom = async (id: number, data: AddRoomModal) => {
  try {
    await api.put(`/api/v1/room/${id}/update`, data);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMeeting = async () => {
  try {
    const res = await api.get("/api/v1/upcoming-meeting");
    return res.data;
  } catch (error) {
    console.error("Error fetching upcoming meetings", error);
    throw error;
  }
};

export const selfBookedRoom = async () => {
  try {
    const res = await api.get("api/v1/get-self-booked-room");
    return res.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};
