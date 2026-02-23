import { configureStore } from '@reduxjs/toolkit'
import forgotReducer from "./forgotSlice"

export const store= configureStore ({
    reducer: {
        forgot: forgotReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch