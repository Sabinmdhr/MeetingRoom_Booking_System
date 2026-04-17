import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingRoomData } from "../models/bookRoom.model";

const initialState: BookingRoomData = {
  meetingTitle: "",
  roomId: 0,
  date: "",
  startTime: "",
  endTime: "",
  meetingType: "INTERNAL",
  description: "",
  externalParticipants: [],
  internalParticipantIds: [],
  recurrenceEndDate: "",
  recurrenceType: "NONE",
  weekDays: [],
};

const BookingRoomSlice = createSlice({
  name: "BookingRoom",
  initialState,
  reducers: {
    updateBookingRoomFormData: (
      state,
      action: PayloadAction<Partial<BookingRoomData>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearBookingRoomFormData: (
     
    ) => {
      return initialState;
    },
  },
});

export const { updateBookingRoomFormData, clearBookingRoomFormData } = BookingRoomSlice.actions;

export default BookingRoomSlice.reducer;
