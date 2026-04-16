import type { BookingRoomData } from "../models/bookRoom.model";
import api from "../api/api";

export const BookRoom = async (bookingData: BookingRoomData) => {
  const res = await api.post("/api/v1/book-room", bookingData);
  return res;
};
