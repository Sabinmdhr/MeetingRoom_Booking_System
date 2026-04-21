import type { BookingRoomData, GetBookedRoomDataResponse } from "../models/bookRoom.model";
import api from "../api/api";

export const BookRoom = async (bookingData: BookingRoomData) => {
  const res = await api.post("/api/v1/book-room", bookingData);
  return res;
};

export const getBookedDataById= async (roomId: number): Promise<GetBookedRoomDataResponse> =>{
  const res= await api.get(`/api/v1/get-room-meetings/${roomId}`);
  return res.data;
}

