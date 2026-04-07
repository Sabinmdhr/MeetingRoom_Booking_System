import { useEffect, useState } from "react";
import type { TimeSlot } from "../models/timeSlots.model";
import { fetchRoomSlots } from "../services/roomSchedule.service";

export const useRoomScheduleViewModel= ()=>{
  // const [slots, setSlots] = useState<TimeSlot[]>([]);
  // const [selectedStart, setSelectedStart] = useState<string | null>(null);
  // const [selectedEnd, setSelectedEnd] = useState<string | null>(null);
  const [openSchedule, setOpenSchedule] = useState(false);

  const handleOpen = ()=>{
    setOpenSchedule(true);
  }
  const handleClose= ()=>{
    setOpenSchedule(false);
  }  

// useEffect(() => {
//     loadSlots();
//   }, []);

//   const loadSlots = async () => {
//     const data = await fetchRoomSlots();
//     setSlots(data);
//   }

//   const selectSlot = (start: string, end: string) => {
//     setSelectedStart(start);
//     setSelectedEnd(end);
//   }

//   const duration =
//     selectedStart && selectedEnd
//       ? calculateDuration(selectedStart, selectedEnd)
//       : 0;

  return {
    openSchedule,
    handleOpen,
    handleClose,
    // slots,
    // selectedStart,
    // selectedEnd,
    // duration,
    // selectSlot,
  }
}

// function calculateDuration(start: string, end: string) {
//   const s = new Date(`2020-01-01 ${start}`);
//   const e = new Date(`2020-01-01 ${end}`);
//   return (e.getTime() - s.getTime()) / 60000;
// }