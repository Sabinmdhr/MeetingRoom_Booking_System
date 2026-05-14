import { useState, useMemo, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { CalendarEvent, CalendarItem } from "../models/calendar.model";
import { getCalendarByMonth, getCalendarByDay } from "../services/calendar.service";
import { getBookedDataByMeetingId } from "../services/bookRoom.service";
import type { BookedRoomDataResponse } from "../models/bookRoom.model";
import { getMeetingRooms } from "../services/Meetinf_room.service";
import type { meeting_rooms } from "../models/meeting_room.model";

export type CalendarView = "day" | "month";

// Converts the raw API item into the CalendarEvent shape used by the grid and modal
const mapToCalendarEvent = (item: CalendarItem): CalendarEvent => ({
  id: item.meetingId,
  meetingTitle: item.meetingTitle,
  category: (item.meetingType?.name?.toLowerCase() ?? "internal") as CalendarEvent["category"],
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

export const useCalendarEventViewModel = () => {
  // View toggle and date navigation for the full Calendar page
  const [view, setView] = useState<CalendarView>("month");
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedDates, setSelectedDates] = useState<Dayjs>(dayjs());

  // Separate date state for the CalendarPreview (dashboard mini-calendar)
  // so it can navigate months independently from the full calendar
  const [currentDate, setcurrentDate] = useState<Dayjs>(dayjs());
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [dateRange, setDateRange] = useState<{ start: Dayjs | null; end: Dayjs | null }>({
    start: dayjs(),
    end: null,
  });

  // API data
  const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([]);
  const [monthItems, setMonthItems] = useState<CalendarItem[]>([]);
  const [rooms, setRooms] = useState<meeting_rooms[]>([]);
  const [loading, setLoading] = useState(true);

  // Event detail modal
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventData, setEventData] = useState<BookedRoomDataResponse | null>(null);
  const [eventDataLoading, setEventDataLoading] = useState(false);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await getMeetingRooms();
      setRooms(res.data.content ?? res.data ?? []);
    } catch (e) {
      console.error("Failed to fetch rooms", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMonthEvents = useCallback(async (date: Dayjs) => {
    try {
      const res = await getCalendarByMonth(date.format("YYYY-MM-DD"));
      const items: CalendarItem[] = res.data ?? [];
      setBookedDates(new Set(items.map((i) => i.date)));
      setMonthItems(items);
      setMonthEvents(items.map(mapToCalendarEvent));
    } catch (e) {
      console.error("Failed to fetch month events", e);
    }
  }, []);

  const fetchEventDetail = useCallback(async (meetingId: number) => {
    setEventDataLoading(true);
    try {
      // The service return type is declared as BookedRoomDataResponse but the
      // actual response is { data: BookedRoomDataResponse, success, message }
      const res = await getBookedDataByMeetingId(meetingId);
      setEventData((res as any)?.data ?? res);
    } catch (e) {
      console.error("Failed to fetch event detail", e);
    } finally {
      setEventDataLoading(false);
    }
  }, []);

  // Load rooms once on mount
  useEffect(() => {
    fetchRooms();
  }, []);

  // Re-fetch month events when the full calendar navigates to a new month
  useEffect(() => {
    fetchMonthEvents(currentMonth);
  }, [currentMonth.month(), currentMonth.year()]);

  // Re-fetch month events when the dashboard mini-calendar moves to a different month
  useEffect(() => {
    if (
      currentDate.month() !== currentMonth.month() ||
      currentDate.year() !== currentMonth.year()
    ) {
      fetchMonthEvents(currentDate);
    }
  }, [currentDate.month(), currentDate.year()]);

  // Month grid: groups events by date string for O(1) cell lookup
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    monthEvents.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    // Sort each day's events by start time so they appear in order
    Object.values(map).forEach((events) =>
      events.sort((a, b) =>
        dayjs(`2000-01-01 ${a.startTime}`).valueOf() -
        dayjs(`2000-01-01 ${b.startTime}`).valueOf(),
      ),
    );
    return map;
  }, [monthEvents]);

  // CalendarPreview: meetings within the selected date range
  const meetings = useMemo(() => {
    if (!dateRange.start) return [];
    return monthItems.filter((m) => {
      const d = dayjs(m.date);
      if (!dateRange.end) return d.isSame(dateRange.start, "day");
      return (
        d.isSame(dateRange.start, "day") ||
        d.isSame(dateRange.end, "day") ||
        (d.isAfter(dateRange.start) && d.isBefore(dateRange.end))
      );
    });
  }, [monthItems, dateRange]);

  // CalendarPreview: clicking a day starts or extends the date range selection
  const handleDateClick = (day: Dayjs) => {
    if (!dateRange.start || dateRange.end) {
      // Start a new selection
      setDateRange({ start: day, end: null });
    } else if (day.isBefore(dateRange.start)) {
      // Clicked before the start — swap so start is always the earlier date
      setDateRange({ start: day, end: dateRange.start });
    } else {
      setDateRange({ start: dateRange.start, end: day });
    }
  };

  // Returns true if a day falls within the current date range selection
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

  // Month view: go forward/back one month
  const goToNext = () => setCurrentMonth((prev) => prev.add(1, "month"));
  const goToPrev = () => setCurrentMonth((prev) => prev.subtract(1, "month"));

  // Jump to a specific date — used by the date picker and room cell click
  const goToToday = (date?: Dayjs) => {
    const target = date ?? dayjs();
    setCurrentMonth(target);
    setSelectedDates(target);
  };

  const openEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    fetchEventDetail(event.id);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setEventData(null);
  };

  return {
    // Full Calendar page
    view,
    setView,
    currentMonth,
    setCurrentMonth,
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

    // CalendarPreview (dashboard mini-calendar)
    currentDate,
    setcurrentDate,
    bookedDates,
    meetings,
    handleDateClick,
    isInRange,
    dateRange,
    setDateRange,
    clearSelection,
  };
};
