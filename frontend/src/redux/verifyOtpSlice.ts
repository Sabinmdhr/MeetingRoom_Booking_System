import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit";
import type { IVerifyOtpRequest, IVerifyOtpResponse } from "../api/auth/interface";
import type { IBackendResponse } from "../api/interface";
import { verifyPasswordApi } from "../api/auth/forgotApi";

interface VerifyOtpState{
    loading: boolean;
    success: boolean;
    error: Record<string,string> | SerializedError | null;
}

const initialState: VerifyOtpState={
    loading: false,
    success: false,
    error:null,
}

export const verifyOtp = createAsyncThunk<
  IBackendResponse<IVerifyOtpResponse>, // Return type
  IVerifyOtpRequest                    // Argument type
>(
  "verify/otp",
  async (payload: IVerifyOtpRequest) => {
    const res = await verifyPasswordApi<IVerifyOtpRequest>(payload);
    return res;
  }
)

const verifyOtpSlice= createSlice({
    name: "verifyOtp",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(verifyOtp.pending,(state) => {
            state.loading= true;
            state.success = false;
            state.error= null;
        })
        .addCase(verifyOtp.fulfilled,(state) =>{
            state.loading= false;
            state.success= true;
        })
        .addCase(verifyOtp.rejected,(state, action)=>{
            state.loading= false;
            state.error= action.error;
        })
    }
})

export default verifyOtpSlice.reducer

