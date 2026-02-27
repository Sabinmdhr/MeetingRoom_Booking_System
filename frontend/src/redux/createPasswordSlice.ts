import { createAsyncThunk,createSlice, type SerializedError } from "@reduxjs/toolkit";
import type { IBackendResponse } from "../api/interface";
import type { ICreatePasswordRequest, ICreatePasswordResponse } from "../api/auth/interface";
import { createPasswordApi } from "../api/auth/forgotApi";

interface CreatePasswordState{
    loading: boolean;
    success: boolean;
    error: Record<string, string> | SerializedError | null;
}

const initialState: CreatePasswordState={
    loading: false,
    success: false,
    error: null,
}

export const createPassword= createAsyncThunk<
    IBackendResponse<ICreatePasswordResponse>,
    ICreatePasswordRequest
>(
    "reset/password",
    async(payload: ICreatePasswordRequest) =>{
        const res= await createPasswordApi<ICreatePasswordRequest>(payload);
        return res;
    }
)

export const createPasswordSlice= createSlice({
    name: 'createPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
        .addCase(createPassword.pending,(state)=>{
            state.loading= true;
            state.success= false;
            state.error= null;
        })
        .addCase(createPassword.fulfilled,(state)=>{
            state.loading= false;
            state.success= true;
        })
        .addCase(createPassword.rejected,(state, action)=>{
            state.loading= false;
            state.error= action.error;
        })
    }
})

export default createPasswordSlice.reducer