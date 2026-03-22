import { useState } from "react";
import { validateBookingForm } from "../utils/bookingValidation";
import type { SelectChangeEvent } from "@mui/material";
import type { BookingForm } from "../models/booking.model";

const initialVales: BookingForm ={
    meetingTitle: "",
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    meetingType: "",
    description: ""
}

export const useBookingForm = () =>{
    const [values, setValues] = useState<BookingForm>(initialVales)
    const [errors, setErrors] = useState<Partial<Record<keyof BookingForm, string>>>({})

    const handleChange=(e: | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) =>{ // yo function run hunxa whenever input changes. TypeScript type: React.ChangeEvent<HTMLInputElement>means the event comes from an input. HTMLInputElement for text, date , time. HTMLTextAreaElement for description. HTMLSelectElement for dropdowns.
        const {name,value}= e.target //When a user types in input field, React fires an event. e contains information about the input. name-- identifies the field. value-- current user input

        setValues(prev=>({ ...prev, [name]: value})) // ...prev copies existing values. [name]: value updates changed field dynamically.
    }

    const handleSubmit=(e: React.FormEvent) =>{
        e.preventDefault()
        const validationErrors= validateBookingForm(values)
        setErrors(validationErrors)
        if(Object.keys(validationErrors).length > 0) return // if validation fails submission is stopped.
        console.log("Booking submitted", values)
    }

    return{
        values,
        errors,
        handleChange,
        handleSubmit,
    }
}