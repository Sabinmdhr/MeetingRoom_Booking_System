import type { TimeSlot } from "../models/TimeSlots";

export const DemoTimeSlots= (): TimeSlot[] =>{
return [

  { id: "1", time: "09:00 AM ", available: true },
  { id: "2", time: "10:00 AM ", available: false },
  { id: "3", time: "11:00 AM ", available: true },
  { id: "4", time: "12:00 PM ", available: true },
  { id: "5", time: "01:00 PM ", available: true },
  { id: "6", time: "02:00 PM ", available: false },
  { id: "7", time: "03:00 PM ", available: true },
  { id: "8", time: "04:00 PM ", available: true },
  { id: "9", time: "05:00 PM ", available: true },
  { id: "10", time: "06:00 PM ", available: true },
];

}
