import dayjs from "dayjs";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const useRoomTimeslotViewModel = () => {
  const location = useLocation();
  const room = location.state?.room;

  const [currentDate, setCurrentDate] = useState(dayjs());

  const changeDate = (days: number) => {
    setCurrentDate((prev) => prev.add(days, "day"));
  };

  const jumpToToday = () => setCurrentDate(dayjs());

  const formattedDate  = currentDate.format("dddd, MMMM D");
  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const backendFormattedDate = currentDate.format("YYYY-MM-DD");
  const isPastDay =
    new Date(backendFormattedDate).getTime() < new Date().setHours(0, 0, 0, 0);
  return {
    room,
    formattedDate,
    changeDate,
    getLocalDateString,
    jumpToToday,
    backendFormattedDate,
    currentDate,
    setCurrentDate,
    isPastDay,
  };
};
