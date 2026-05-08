import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useRoomTimeslotViewModel = () => {
  const location = useLocation();
  const room = location.state?.room;

  const [currentDate, setCurrentDate] = useState(new Date());
const isToday = currentDate.toDateString() === new Date().toDateString();
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const jumpToToday = () => setCurrentDate(new Date());

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  })
  const getLocalDateString = (date: Date) =>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const backendFormattedDate = getLocalDateString(currentDate);

  return {
    room,
    formattedDate,
    changeDate,
    jumpToToday,
    backendFormattedDate,
    isToday,
  };
}