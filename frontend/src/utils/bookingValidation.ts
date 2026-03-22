import type { BookingForm } from "../models/booking.model"

export const validateBookingForm = (values: BookingForm) =>{ // values: BookingFormValues -- The function expects an object shaped like this:export interface BookingFormValues {   meetingTitle: string roomId: string date: string... }
 
    const errors: Partial<Record<keyof BookingForm , string>> = {}  // checks form values and returns validation error. keyof BookingFormValues means Give me all the keys of this object. Record<KeyType, ValueType> -- Record is a TypeScript utility type. eg. Record<"name" | "age", string> Partial means: All fields are optional. Without Partial: You must include every field. But validation doesn't work like that. Sometimes only one field has an error.

    if(!values.meetingTitle){
        errors.meetingTitle="Meeting title is required"
    }
    if(!values.roomId){
        errors.roomId="Room is required"
    }
    if (!values.date) {
        errors.date = "Date is required"
    }
    if (!values.startTime) {
        errors.startTime = "Start time required"
    }
    if (!values.endTime) {
        errors.endTime = "End time required"
    } 
    return errors
}                                                                       