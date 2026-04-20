import type { BookingRoomData, GetBookedRoomData } from "../models/bookRoom.model";
import api from "../api/api";

export const BookRoom = async (bookingData: BookingRoomData) => {
  const res = await api.post("/api/v1/book-room", bookingData);
  return res;
};

export const getBookedDataById= async (roomId: number): Promise<GetBookedRoomData> =>{
  const res= await api.get<GetBookedRoomData>(`/api/v1/get-booked-room/${roomId}`);
  return res.data;
}

