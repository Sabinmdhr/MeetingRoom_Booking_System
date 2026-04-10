import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useRoomTimeslotViewModel = () => {
  const location = useLocation();
  const room = location.state?.room;

  const [currentDate, setCurrentDate] = useState(new Date());

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

  return {
    room,
    formattedDate,
    changeDate,
    jumpToToday,
  }
}