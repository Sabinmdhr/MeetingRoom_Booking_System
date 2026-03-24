import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Participants } from "../models/participants.model";
import type { groupCard } from "../models/groupCard.model";
interface ParticipantsState {
  participants: Participants[];
  selectedParticipant: Participants | null;
  isEditOpen: boolean;
  selectedParticipants: string[];
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
    setParticipants: (state, action: PayloadAction<Participants[]>) => {
      state.participants = action.payload;
    },

    setSelectedGroup: (state, action: PayloadAction<groupCard>) => {
      state.selectedGroup = action.payload;
    },

    toggleParticipantsSelection: (state, action : PayloadAction<string>) =>{
      const id  = action.payload;
      {
        state.selectedParticipants.includes(id) ? state.selectedParticipants = state.selectedParticipants.filter((pId)=>pId !== id) : state.selectedParticipants.push(id)
      }
    },

    clearSelectedParticipants: (state) =>{
      state.selectedParticipants = [];
    },

    openEditForm: (state, action: PayloadAction<Participants>) => {
      state.selectedParticipant = action.payload;
      state.isEditOpen = true;
    },

    openForm : (state) =>{
state.isEditOpen = true;
    },


    closeEditForm: (state) => {
      state.isEditOpen = !state.isEditOpen;
      state.selectedParticipant = null;
      state.selectedGroup = null;
    },
  },
});

export const { setParticipants, openForm,setSelectedGroup,openEditForm, closeEditForm, toggleParticipantsSelection, clearSelectedParticipants } =
  participantsSlice.actions;

export default participantsSlice.reducer;
