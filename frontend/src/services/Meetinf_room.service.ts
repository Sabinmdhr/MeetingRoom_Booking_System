// import { axiosInstance } from "../api/api";
import api from "../api/api";
import type { AddRoomModal} from "../models/Meeting_room.model";

//  const meetingRooms: meeting_rooms[] =
//   [
//      {
//     id: "1",
//     title: "Manang",

//     participants: ["Sabin", "Suman"],
//     capacity: 10,
//     available: true,
//     features: ["Projector", "Whiteboard"],
//     next_available_time: "4:00 PM",
//     next_booking_time: "",
//   },
//   {
//     id: "2",
//     title: "Mustang",
//     participants: ["Sabin", "Sumanss"],
//     capacity: 10,
//     available: false,
//     features: ["Projector", "Whiteboard", "Video Conferencing", "Wi-Fi"],
//     next_available_time: null,
//     next_booking_time: "5:00PM",
//   },
//   {
//     id: "3",
//     title: "Ghandruk",
//     participants: ["Sabin", "Sumanss"],
//     capacity: 1,
//     available: false,
//     features: ["Projector", "Whiteboard", "Video Conferencing"],
//     next_available_time: null,
//     next_booking_time: "5:00PM",
//   },
//   ]

export const addRoom = async (data: AddRoomModal) => {
  // const api = axiosInstance({});
  try {

  const response = await api.post("/api/v1/room/add", data);
  return response.data;
  } catch (error: any) {
    console.error("Error adding meeting room:", error.response?.data || error.message);
    throw error;
  }
};

export const getMeetingRooms = async () => {
  // const api = axiosInstance({});
  // const body = {
  //   pageNo: 0,
  // };
  try {
    const response = await api.get("/api/v1/room/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching meeting rooms:", error);
    throw error;
  }
};
// const meetingRooms = getMeetingRooms();
// export const getMeetingRoomById = async (id: string): Promise<meeting_rooms> => {
//   await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
//   const room = meetingRooms.data.data.find((room) => room.id === id);
//   if (!room) {
//     throw new Error("Meeting room not found");
//   }
//   return room;
// };
