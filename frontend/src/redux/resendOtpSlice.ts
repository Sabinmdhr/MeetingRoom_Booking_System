import { createAsyncThunk, createSlice, type SerializedError } from "@reduxjs/toolkit";
import type { IResendOtpRequest, IResendOtpResponse } from "../api/auth/interface";
import type { IBackendResponse } from "../api/interface";
import { resendOtpApi } from "../api/auth/forgotApi";

interface ResendOtpState {
    loading: boolean;
    success: boolean;
    error: Record<string, string> | SerializedError | null;
}
const initialState: ResendOtpState={
    loading: false,
    success: false,
    error: null,
}

export const resendOtp= createAsyncThunk< //createAsyncThunk<ReturnType, PayloadType>
    IBackendResponse<IResendOtpResponse>,
    IResendOtpRequest
>(
    "resend/otp",
    async(payload: IResendOtpRequest) =>{
        const res= await resendOtpApi<IResendOtpRequest>(payload);
        return res;
    }
)

const resendOtpSlice= createSlice({
    name: "resendOtp",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(resendOtp.pending, (state)=>{
            state.loading= true;
            state.success= false;
            state.error= null;
        })
        .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    }
})

export default resendOtpSlice.reducer;