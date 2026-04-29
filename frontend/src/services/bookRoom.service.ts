import type {
  BookedRoomDataResponse,
  BookingRoomData,
  GetBookedRoomDataResponse,
} from "../models/bookRoom.model";
import api from "../api/api";

export const BookRoom = async (bookingData: BookingRoomData) => {
  const res = await api.post("/api/v1/book-room", bookingData);
  return res;
};

export const getBookedDataByRoomId = async (
  roomId: number,
): Promise<GetBookedRoomDataResponse> => {
  const res = await api.get(`/api/v1/get-room-meetings/${roomId}`);
  return res.data;
};

export const getBookedDataByMeetingId = async (
  roomBookingId: number,
): Promise<BookedRoomDataResponse> => {
  const res = await api.get(`/api/v1/get-booked-room/${roomBookingId}`);
  return res.data;
};
