import type { TimeSlot } from "../models/timeSlots.model";

export const fetchRoomSlots = async (): Promise<TimeSlot[]> => {
  // call backend API
  const response = await fetch("/api/rooms/slots");
  return response.json();
};

export const createBooking = async (data: any) => {
  const response = await fetch("/api/book-room", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
};