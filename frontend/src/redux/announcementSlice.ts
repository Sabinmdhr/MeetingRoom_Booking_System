// This slice is currently unused — the announcement page manages its own
// local state via useAnnouncementCardViewModel. Keeping this here in case
// we need to share announcement data with other parts of the app later.
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Announcement } from "../models/announcements.model";

interface AnnouncementState {
  pinnedData: Announcement[];
  unpinnedData: Announcement[];
}

const initialState: AnnouncementState = {
  pinnedData: [],
  unpinnedData: [],
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {
    setPinnedData: (state, action: PayloadAction<Announcement[]>) => {
      state.pinnedData = action.payload;
    },
    setUnpinnedData: (state, action: PayloadAction<Announcement[]>) => {
      state.unpinnedData = action.payload;
    },
    addAnnouncement: (state, action: PayloadAction<Announcement>) => {
      state.unpinnedData.unshift(action.payload);
    },
  },
});

export const { setPinnedData, setUnpinnedData, addAnnouncement } = announcementSlice.actions;
export default announcementSlice.reducer;
