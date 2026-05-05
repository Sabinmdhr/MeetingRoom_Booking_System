import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { groupCard } from "../models/groupCard.model";
import type { ParticipantResponse } from "../models/participants.model";
interface ParticipantsState {
  participants: ParticipantResponse[];
  selectedParticipant: ParticipantResponse | null;
  isEditOpen: boolean;
  selectedParticipants: number[];
  selectedGroup: groupCard | null;
}

const initialState: ParticipantsState = {
  participants: [],
  selectedParticipant: null,
  isEditOpen: false,
  selectedParticipants: [],
  selectedGroup: null,
};

const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setParticipants: (state, action: PayloadAction<ParticipantResponse[]>) => {
      state.participants = action.payload;
    },

    setSelectedGroup: (state, action: PayloadAction<groupCard>) => {
      state.selectedGroup = action.payload;
    },

    // toggleParticipantsSelection: (state, action: PayloadAction<number>) => {
    //   const id = action.payload;
    //   {
    //     state.selectedParticipants.includes(id)
    //       ? (state.selectedParticipants = state.selectedParticipants.filter(
    //           (pId) => pId !== id,
    //         ))
    //       : state.selectedParticipants.push(id);
    //   }
    // },

    clearSelectedParticipants: (state) => {
      state.selectedParticipants = [];
    },

    openEditForm: (state, action: PayloadAction<ParticipantResponse>) => {
      state.selectedParticipant = action.payload;
      state.isEditOpen = true;
    },

    openForm: (state) => {
      state.isEditOpen = true;
    },

    closeEditForm: (state) => {
      state.isEditOpen = !state.isEditOpen;
      state.selectedParticipant = null;
      state.selectedGroup = null;
    },
  },
});

export const {
  setParticipants,
  openForm,
  setSelectedGroup,
  openEditForm,
  closeEditForm,
  // toggleParticipantsSelection,
  clearSelectedParticipants,
} = participantsSlice.actions;

export default participantsSlice.reducer;
