import { createSlice } from "@reduxjs/toolkit";
import type { LoginResponse } from "../models/auth.model";


const initialState :LoginResponse  = {
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  role: localStorage.getItem("userRole") || "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setAuth:(state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.role = action.payload.role;
    },
    clearAuth: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.role = "";
    }
  }

})


export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;