import api from "../api/api";
import type { CalendarItem } from "../models/calendar.model";

// Fetch all meetings for a given month (used by the month grid)
export const getCalendarByMonth = async (date: string) => {
  const res = await api.post<{ data: CalendarItem[] }>("/api/v1/calender/month", { date });
  return res.data;
};

// Fetch all meetings for a given day (used by the day view and CalendarPreview)
export const getCalendarByDay = async (date: string) => {
  const res = await api.post<{ data: CalendarItem[] }>("/api/v1/calender/day", { date });
  return res.data;
};
