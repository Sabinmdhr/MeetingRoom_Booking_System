import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Meeting_room } from "../models/Meeting_room.model";

interface MeetingRoomState{
  meetingRoom : Meeting_room[];
  selectedMeetingRoom: Meeting_room | null;
  isEditOpen: boolean;
}

const initialState : MeetingRoomState ={
  meetingRoom: [],
  selectedMeetingRoom: null,
  isEditOpen : false,
}

const meetingRoomSlice = createSlice({
  name: "MeetingRooms",
  initialState,
  reducers: {
    setMeetingRoom : (state, action: PayloadAction<Meeting_room[]>) =>{
          state.meetingRoom = action.payload;
    },
    openEditForm: (state, action: PayloadAction<Meeting_room>)=>{
        state.selectedMeetingRoom = action.payload;
        state.isEditOpen = true;
    },

    closeEditForm : (state)=>{
      state.isEditOpen = !state.isEditOpen;
      state.selectedMeetingRoom = null;
    },
  }
})


export const {closeEditForm, openEditForm, setMeetingRoom} = meetingRoomSlice.actions;

export default meetingRoomSlice.reducer;