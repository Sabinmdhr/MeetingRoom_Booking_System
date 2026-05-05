import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingRoomData } from "../models/bookRoom.model";

const initialState: BookingRoomData = {
  meetingTitle: "",
  roomId: 1,
  startDate: "",
  startTime: "",
  endTime: "",
  meetingTypeId: 0,
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

    setBookingRoomFormData: (state, action: PayloadAction<BookingRoomData>) => {
      return action.payload;
    },

    updateBookingRoomFormData: (
      state,
      action: PayloadAction<Partial<BookingRoomData>>,
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    toggleParticipantsSelection: (state, action: PayloadAction<number>) => {
      const participantId = action.payload;
      const isSelected = state.internalParticipantIds.includes(participantId);

      if (isSelected) {
        state.internalParticipantIds = state.internalParticipantIds.filter(
          (id) => id !== participantId,
        );
      } else {
        state.internalParticipantIds.push(participantId);
      }
    },
    toggleExternalParticipantsSelection: (
      state,
      action: PayloadAction<{ name: String; email: string }>,
    ) => {
      const participant = action.payload;
      const isSelected = state.externalParticipants.some(
        (p) => p.email === participant.email,
      );

      if (isSelected) {
        state.externalParticipants = state.externalParticipants.filter(
          (p) => p.email !== participant.email,
        );
      }
    },
    clearBookingRoomFormData: () => {
      return initialState;
    },
  },
});

export const {
  updateBookingRoomFormData,
  toggleExternalParticipantsSelection,
  toggleParticipantsSelection,
  clearBookingRoomFormData,
  setBookingRoomFormData,
} = BookingRoomSlice.actions;

export default BookingRoomSlice.reducer;
