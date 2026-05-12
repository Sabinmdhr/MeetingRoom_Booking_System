import api from "../api/api";
import type { CalendarByDay } from "../models/calendar.model";
import type { CalenderDay, CalenderMonth } from "../models/calendar.model";

export const getCalendarByWeek = async () => {
  try {
    const res = await api.post(`/api/v1/calender/week`);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching calendar by Week", error);
    throw error;
  }
};

export const getCalendarByMonth = async (date: string) => {
  try {
    const res = await api.post<{ data: CalenderMonth[] }>(
      `/api/v1/calender/month`,
      { date },
    );
    // console.log(res);

    return res.data;
  } catch (error) {
    console.error("Error fetching calendar by month", error);
    throw error;
  }
};

export const getCalendarByDay = async (
  date: string,
  role: string,
): Promise<CalendarByDay[]> => {
  try {
    const res = await api.post<{ data: CalendarByDay[] }>(
      "api/v1/calender/day",
      {
        date,
      },
    );

  

    return res.data.data ?? [];
  } catch (error) {
    console.error("Error fetching calendar by day", error);
    throw error;
  }
};
export const getCalenderByDay = async (date: string) => {
  try {
    const res = await api.post<{ data: CalenderDay[] }>(
      `/api/v1/calender/day`,
      { date: date },
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching calendar by day", error);
    throw error;
  }
};
