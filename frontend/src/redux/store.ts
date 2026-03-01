import { configureStore } from '@reduxjs/toolkit'
import forgotReducer from "./forgotSlice"
import verifyotpReducer from "./verifyOtpSlice"

export const store= configureStore ({
    reducer: {
        forgot: forgotReducer,
        verifyOtp:verifyotpReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
