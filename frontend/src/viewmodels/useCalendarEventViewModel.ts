import { useState, useMemo, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import type {
  CalendarEvent,
  CalenderDay,
  CalenderMonth,
} from "../models/calendar.model";
import {
  getCalendarByMonth,
  getCalenderByDay,
} from "../services/calendar.service";
import {
  getBookedDataByMeetingId,
  updateBookedRoomById,
  updateBookedRoomByRecurrenceId,
} from "../services/bookRoom.service";
import type { BookedRoomDataResponse } from "../models/bookRoom.model";
import { getMeetingRooms } from "../services/Meetinf_room.service";
import type { meeting_rooms } from "../models/meeting_room.model";
import { toast } from "react-toastify";

export type CalendarView = "day" | "month";

//  Mappers

const mapToCalendarEvent = (
  item: CalenderMonth | CalenderDay,
): CalendarEvent => ({
  id: item.meetingId,
  meetingTitle: item.meetingTitle,
  category: (item.meetingType?.name?.toLowerCase() ??
    "internal") as CalendarEvent["category"],
  date: item.date,
  startTime: item.startTime,
  endTime: item.endTime,
  location: item.roomName,
  organizer: "",
  participants: [],
  description: "",
  department: "",
  meetingType: item.meetingType,
});

//  Hook ─

export const useCalendarEventViewModel = () => {
  //  View & date navigation
  const [view, setView] = useState<CalendarView>("month");
  // currentMonth drives both the Calendar page header AND the month grid
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  // selectedDates drives which day the day-view API fetches
  const [selectedDates, setSelectedDates] = useState<Dayjs>(dayjs());

  //  CalendarPreview (dashboard mini-calendar) ─
  // Separate date state so the preview navigates independently from the full calendar
  const [currentDate, setcurrentDate] = useState<Dayjs>(dayjs());
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({
    start: dayjs(),
    end: null,
  });

  //  API data ─
  const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([]);
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
  // Raw shape kept for CalendarPreview's meeting list (needs meetingType.colorCode etc.)
  const [monthMeetings, setMonthMeetings] = useState<CalenderDay[]>([]);
  const [rooms, setRooms] = useState<meeting_rooms[]>([]);
  const [loading, setLoading] = useState(true);

  //  Event modal
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [eventData, setEventData] = useState<BookedRoomDataResponse | null>(
    null,
  );
  const [eventDataLoading, setEventDataLoading] = useState(false);

  //  Fetchers ─

  const fetchRooms = useCallback(async () => {
    try {
      const res = await getMeetingRooms();
      setRooms(res.data.content ?? res.data ?? []);
    } catch (e) {
      console.error("Error fetching rooms", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMonthEvents = useCallback(async (date: Dayjs) => {
    try {
      const res = await getCalendarByMonth(date.format("YYYY-MM-DD"));
      const items: CalenderMonth[] = res.data ?? [];
      setBookedDates(new Set(items.map((i) => i.date)));
      setMonthMeetings(items as unknown as CalenderDay[]);
      setMonthEvents(items.map(mapToCalendarEvent));
    } catch (e) {
      console.error("Error fetching month events", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDayEvents = useCallback(async (date: Dayjs) => {
    try {
      const res = await getCalenderByDay(date.format("YYYY-MM-DD"));
      const items: CalenderDay[] = res.data ?? [];
      setDayEvents(items.map(mapToCalendarEvent));
    } catch (e) {
      console.error("Error fetching day events", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEventDetail = useCallback(async (meetingId: number) => {
    try {
      setEventDataLoading(true);
      const res = await getBookedDataByMeetingId(meetingId);
      // @ts-ignore
      setEventData(res?.data);
    } catch (e) {
      console.error("Error fetching event detail", e);
    } finally {
      setEventDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  // Re-fetch when the Calendar page navigates to a new month
  useEffect(() => {
    fetchMonthEvents(currentMonth);
  }, [currentMonth.month(), currentMonth.year()]);

  const [refresh, setRefresh] = useState(false);
  const handleDeleteBookedMeetingById = async (id: number | string) => {
    try {
      const res = await updateBookedRoomById(id);
      toast.success("Meeting is Succcessfully Deleted");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Cannot Delete the meeting");
      console.log(error);
    }
  };
  const handleDeleteBookedMeetingByRecurrenceId = async (
    id: number | string,
  ) => {
    try {
      const res = await updateBookedRoomByRecurrenceId(id);
      toast.success("Meeting is Succcessfully Deleted");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error("Cannot Delete the meeting");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMonthEvents(currentMonth);
  }, [refresh, currentMonth]);
  // Re-fetch when the CalendarPreview mini-calendar moves to a different month
  useEffect(() => {
    if (
      currentDate.month() !== currentMonth.month() ||
      currentDate.year() !== currentMonth.year()
    ) {
      fetchMonthEvents(currentDate);
    }
  }, [currentDate.month(), currentDate.year]);

  // Re-fetch day events whenever the selected day changes
  useEffect(() => {
    fetchDayEvents(selectedDates);
  }, [selectedDates.format("YYYY-MM-DD")]);

  //  Derived maps

  // Month grid: "YYYY-MM-DD" → CalendarEvent[]
  // const eventsByDate = useMemo(() => {
  //   const map: Record<string, CalendarEvent[]> = {};
  //   monthEvents.forEach((e) => {
  //     if (!map[e.date]) map[e.date] = [];
  //     map[e.date].push(e);
  //   });
  //   return map;
  // }, [monthEvents]);

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};

    monthEvents.forEach((e) => {
      if (!map[e.date]) {
        map[e.date] = [];
      }

      map[e.date].push(e);
    });

    // Sort events by start time for each date
    Object.keys(map).forEach((date) => {
      map[date].sort((a, b) => {
        const timeA = dayjs(`2000-01-01 ${a.startTime}`);
        const timeB = dayjs(`2000-01-01 ${b.startTime}`);

        return timeA.valueOf() - timeB.valueOf();
      });
    });

    return map;
  }, [monthEvents]);

  // CalendarPreview: meetings within the selected date range
  const meetings = useMemo(() => {
    if (!dateRange.start) return [];
    return monthMeetings.filter((m) => {
      const d = dayjs(m.date);
      if (!dateRange.end) return d.isSame(dateRange.start, "day");
      return (
        d.isSame(dateRange.start, "day") ||
        d.isSame(dateRange.end, "day") ||
        (d.isAfter(dateRange.start) && d.isBefore(dateRange.end))
      );
    });
  }, [monthMeetings, dateRange]);

  // Hours rendered in day view: 7 AM – 6 PM
  const hours = Array.from({ length: 12 }, (_, i) => 7 + i);

  //  CalendarPreview date-range helpers

  const handleDateClick = (day: Dayjs) => {
    if (!dateRange.start || (dateRange.start && dateRange.end)) {
      setDateRange({ start: day, end: null });
    } else {
      if (day.isBefore(dateRange.start)) {
        setDateRange({ start: day, end: dateRange.start });
      } else {
        setDateRange({ start: dateRange.start, end: day });
      }
    }
  };

  const isInRange = (d: Dayjs | null) => {
    if (!d || !dateRange.start) return false;
    if (!dateRange.end) return d.isSame(dateRange.start, "day");
    return (
      d.isSame(dateRange.start, "day") ||
      d.isSame(dateRange.end, "day") ||
      (d.isAfter(dateRange.start) && d.isBefore(dateRange.end))
    );
  };

  const clearSelection = () => setDateRange({ start: dayjs(), end: null });

  //  Navigation ─

  // In month view: move one month. In day view: move one day.
  const goToNext = () =>
    setCurrentMonth((prev) =>
      view === "day" ? prev.add(1, "day") : prev.add(1, "month"),
    );

  const goToPrev = () =>
    setCurrentMonth((prev) =>
      view === "day" ? prev.subtract(1, "day") : prev.subtract(1, "month"),
    );

  // Jump to a specific date (date picker, room cell click)
  const goToToday = (date?: Dayjs) => {
    const target = date ?? dayjs();
    setCurrentMonth(target);
    setSelectedDates(target);
  };

  //  Modal actions

  const openEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    fetchEventDetail(event.id);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setEventData(null);
  };

  //  Return

  return {
    // Calendar page
    view,
    setView,
    currentMonth,
    setCurrentMonth,
    hours,
    eventsByDate,
    selectedEvent,
    eventData,
    setEventData,
    eventDataLoading,
    rooms,
    loading,
    openEvent,
    closeModal,
    goToNext,
    goToPrev,
    goToToday,
    selectedDates,
    setSelectedDates,

    // CalendarPreview (dashboard)
    currentDate,
    setcurrentDate,
    bookedDates,
    meetings,
    handleDateClick,
    isInRange,
    dateRange,
    setDateRange,
    clearSelection,

    handleDeleteBookedMeetingById,
    handleDeleteBookedMeetingByRecurrenceId,
  };
};
