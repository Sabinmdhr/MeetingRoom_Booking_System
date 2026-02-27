import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit";
import { forgotPassApi } from "../api/auth/forgotApi";
import type { IForgotPasswordRequest, IForgotPasswordResponse } from "../api/auth/interface";
import type { IBackendResponse } from "../api/interface";

interface ForgotState{
    loading: boolean;
    success: boolean;
    error: Record<string,string> | SerializedError |null;
}

const initialState: ForgotState={
    loading: false,
    success: false,
    error: null,
}

export const forgotPassword = createAsyncThunk<
  IBackendResponse<IForgotPasswordResponse>, // Return type
  string                  // Argument type
>(
    "forgot/password",
    async(email:string) =>{
        const res = await forgotPassApi<IForgotPasswordRequest>({email});
        return res;
    }
)

const forgotSlice= createSlice({
    name: "forgot",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(forgotPassword.pending,(state) => {
            state.loading= true;
            state.error= null;
            state.success = false;
        })
        .addCase(forgotPassword.fulfilled,(state) =>{
            state.loading= false;
            state.success= true;
        })
        .addCase(forgotPassword.rejected,(state, action)=>{
            state.loading= false;
            state.error= action.error;
        })
    }
})

export default forgotSlice.reducer
