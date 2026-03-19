import { configureStore } from "@reduxjs/toolkit";
import forgotReducer from "./forgotSlice";
import verifyotpReducer from "./verifyOtpSlice";
import createPasswordReducer from "./createPasswordSlice";
import participantsReducer from "./ParticipantsSlice";
import meetingRoomReducer from "./MeetingRoomSlice"
export const store = configureStore({
  reducer: {
    forgot: forgotReducer,
    verifyOtp: verifyotpReducer,
    createPassword: createPasswordReducer,
    participants: participantsReducer,
    meetingRoom: meetingRoomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import {  useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;