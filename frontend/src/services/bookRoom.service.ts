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

export const EditBookedRoomById = async (
  bookingData: BookingRoomData,
  bookingId: number,
) => {
  try {
    const res = await api.put(
      `/api/v1/update-booked-room/${bookingId}`,
      bookingData,
    );
    return res;
  } catch (error) {
    console.error("Error editing booked room:", error);
    throw error;
  }
};

export const EditBookedRoomByRecurrenceId = async (
  bookingData: BookingRoomData,
  recurrenceId: number,
) => {
  try {
    const res = await api.put(
      `/api/v1/update-recurrence-booked-room/${recurrenceId}`,
      bookingData,
    );
    return res;
  } catch (error) {
    console.error("Error editing booked room:", error);
    throw error;
  }
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

export const updateBookedRoomById = async (
  roomBookingId: number | string,
): Promise<BookedRoomDataResponse> => {
  const body = { status: "INACTIVE" };
  const res = await api.patch(
    `/api/v1/booked-room/${roomBookingId}/change-status`,
    body,
  );
  return res.data;
};
