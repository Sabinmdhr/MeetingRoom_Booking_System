// import { useState, useMemo, useEffect, useCallback } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import type {
//   CalendarEvent,
//   CalenderDay,
//   CalenderMonth,
// } from "../models/calendar.model";
// import {
//   getCalendarByMonth,
//   getCalenderByDay,
// } from "../services/calendar.service";
// import { getBookedDataByMeetingId } from "../services/bookRoom.service";
// import type { BookedRoomDataResponse } from "../models/bookRoom.model";
// import { getMeetingRooms } from "../services/Meetinf_room.service";
// import type { meeting_rooms } from "../models/meeting_room.model";

// export type CalendarView = "day" | "month";

// //  Mappers
// // These convert raw API shapes into the CalendarEvent shape the UI uses.

// const mapMonthItem = (item: CalenderMonth): CalendarEvent => ({
//   id: item.meetingId,
//   meetingTitle: item.meetingTitle,
//   category: (item.meetingType?.name?.toLowerCase() ??
//     "internal") as CalendarEvent["category"],
//   date: item.date,
//   startTime: item.startTime,
//   endTime: item.endTime,
//   location: item.roomName,
//   organizer: "",
//   participants: [],
//   description: "",
//   department: "",
// });

// const mapDayItem = (item: CalenderDay): CalendarEvent => ({
//   id: item.meetingId,
//   meetingTitle: item.meetingTitle,
//   category: (item.meetingType?.name?.toLowerCase() ??
//     "internal") as CalendarEvent["category"],
//   date: item.date,
//   startTime: item.startTime,
//   endTime: item.endTime,
//   location: item.roomName,
//   organizer: "",
//   participants: [],
//   description: "",
//   department: "",
// });

// //  Hook ─

// export const useCalendarEventViewModel = () => {
//   // ─ Shared navigation state ─
//   // currentMonth  → Calendar page: drives the header label and grid columns
//   // currentDate   → CalendarPreview: drives its own mini-calendar display
//   // selectedDates → which day the day-view API call fetches
//   const [view, setView] = useState<CalendarView>("month");
//   const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
//   const [currentDate, setcurrentDate] = useState<Dayjs>(dayjs());
//   const [selectedDates, setSelectedDates] = useState<Dayjs>(dayjs());

//   // ─ Event / modal
//   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
//     null,
//   );
//   const [eventData, setEventData] = useState<BookedRoomDataResponse | null>(
//     null,
//   );
//   const [eventDataLoading, setEventDataLoading] = useState(false);

//   // ─ Raw API data ─
//   const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([]);
//   const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);
//   // monthMeetings keeps the original CalenderDay[] shape that CalendarPreview needs
//   const [monthMeetings, setMonthMeetings] = useState<CalenderDay[]>([]);
//   const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
//   const [rooms, setRooms] = useState<meeting_rooms[]>([]);
//   const [loading, setLoading] = useState(false);

//   // ─ Date-range selection (CalendarPreview only) ─
//   const [dateRange, setDateRange] = useState<{
//     start: Dayjs | null;
//     end: Dayjs | null;
//   }>({
//     start: null,
//     end: null,
//   });

//   // ─ Fetchers ─

//   const fetchRooms = useCallback(async () => {
//     try {
//       const res = await getMeetingRooms();
//       setRooms(res.data.content ?? res.data ?? []);
//     } catch (e) {
//       console.error("Error fetching rooms", e);
//     }
//   }, []);

//   // Fetches events for a given month. Used by both Calendar page and CalendarPreview.
//   const fetchMonthEvents = useCallback(async (date: Dayjs) => {
//     try {
//       const res = await getCalendarByMonth(date.format("YYYY-MM-DD"));
//       const items: CalenderMonth[] = res.data ?? [];
//       setBookedDates(new Set(items.map((i) => i.date)));
//       setMonthMeetings(items as unknown as CalenderDay[]); // CalendarPreview reads this
//       setMonthEvents(items.map(mapMonthItem)); // Calendar grid reads this
//     } catch (e) {
//       console.error("Error fetching month events", e);
//     }
//   }, []);

//   // Fetches events for a single day. Used by Calendar day view.
//   const fetchDayEvents = useCallback(async (date: Dayjs) => {
//     try {
//       setLoading(true);
//       const res = await getCalenderByDay(date.format("YYYY-MM-DD"));
//       const items: CalenderDay[] = res.data ?? [];
//       setDayEvents(items.map(mapDayItem));
//     } catch (e) {
//       console.error("Error fetching day events", e);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetches full details for one meeting (shown in the event modal).
//   const fetchEvent = useCallback(async (meetingId: number) => {
//     try {
//       setEventDataLoading(true);
//       const res = await getBookedDataByMeetingId(meetingId);
//       setEventData(res);
//     } catch (e) {
//       console.error("Error fetching event detail", e);
//     } finally {
//       setEventDataLoading(false);
//     }
//   }, []);

//   // ─ Effects

//   // Fetch rooms once on mount
//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   // Calendar page: re-fetch month events when the user navigates to a new month
//   useEffect(() => {
//     fetchMonthEvents(currentMonth);
//   }, [currentMonth.month(), currentMonth.year()]);

//   // CalendarPreview: re-fetch when its mini-calendar moves to a different month
//   useEffect(() => {
//     // Skip if it's the same month/year as currentMonth to avoid a duplicate request
//     if (
//       currentDate.month() !== currentMonth.month() ||
//       currentDate.year() !== currentMonth.year()
//     ) {
//       fetchMonthEvents(currentDate);
//     }
//   }, [currentDate.month(), currentDate.year()]);

//   // Day view: re-fetch whenever the selected day changes
//   useEffect(() => {
//     fetchDayEvents(selectedDates);
//   }, [selectedDates.format("YYYY-MM-DD")]);

//   // ─ Derived data

//   // Calendar grid: date string → list of events on that date
//   const eventsByDate = useMemo(() => {
//     const map: Record<string, CalendarEvent[]> = {};
//     monthEvents.forEach((e) => {
//       if (!map[e.date]) map[e.date] = [];
//       map[e.date].push(e);
//     });
//     return map;
//   }, [monthEvents]);

//   // Calendar day view: date string → hour number → list of events
//   const eventsByDateHour = useMemo(() => {
//     const map: Record<string, Record<number, CalendarEvent[]>> = {};
//     dayEvents.forEach((e) => {
//       const hour = dayjs(
//         `${e.date} ${e.startTime}`,
//         "YYYY-MM-DD h:mm A",
//       ).hour();
//       if (!map[e.date]) map[e.date] = {};
//       if (!map[e.date][hour]) map[e.date][hour] = [];
//       map[e.date][hour].push(e);
//     });
//     return map;
//   }, [dayEvents]);

//   // CalendarPreview: meetings filtered to the selected date range
//   const meetings = useMemo(() => {
//     if (!dateRange.start) return [];
//     return monthMeetings.filter((m) => {
//       const d = dayjs(m.date);
//       if (!dateRange.end) return d.isSame(dateRange.start, "day");
//       return (
//         d.isSame(dateRange.start, "day") ||
//         d.isSame(dateRange.end, "day") ||
//         (d.isAfter(dateRange.start) && d.isBefore(dateRange.end))
//       );
//     });
//   }, [monthMeetings, dateRange]);

//   // Hours shown in day view: 7 AM to 6 PM
//   const hours = Array.from({ length: 12 }, (_, i) => 7 + i);

//   // ─ Date-range helpers (CalendarPreview) ─

//   const handleDateClick = (day: Dayjs) => {
//     if (!dateRange.start || (dateRange.start && dateRange.end)) {
//       // Start a fresh selection
//       setDateRange({ start: day, end: null });
//     } else {
//       // Complete the range
//       if (day.isBefore(dateRange.start)) {
//         setDateRange({ start: day, end: dateRange.start });
//       } else {
//         setDateRange({ start: dateRange.start, end: day });
//       }
//     }
//   };

//   const isInRange = (d: Dayjs | null) => {
//     if (!d || !dateRange.start) return false;
//     if (!dateRange.end) return d.isSame(dateRange.start, "day");
//     return (
//       d.isSame(dateRange.start, "day") ||
//       d.isSame(dateRange.end, "day") ||
//       (d.isAfter(dateRange.start) && d.isBefore(dateRange.end))
//     );
//   };

//   const clearSelection = () => setDateRange({ start: null, end: null });

//   // ─ Navigation (Calendar page)

//   const goToNext = () => {
//     setCurrentMonth((prev) =>
//       view === "day" ? prev.add(1, "day") : prev.add(1, "month"),
//     );
//   };

//   const goToPrev = () => {
//     setCurrentMonth((prev) =>
//       view === "day" ? prev.subtract(1, "day") : prev.subtract(1, "month"),
//     );
//   };

//   // Jump to a specific date. Keeps both currentMonth and selectedDates in sync.
//   const goToToday = (date?: Dayjs) => {
//     const target = date ?? dayjs();
//     setCurrentMonth(target);
//     setSelectedDates(target);
//   };

//   // ─ Modal actions ─

//   const openEvent = (event: CalendarEvent) => {
//     setSelectedEvent(event);
//     fetchEvent(event.id);
//   };

//   const closeModal = () => {
//     setSelectedEvent(null);
//     setEventData(null);
//   };

//   // ─ Return

//   return {
//     // Calendar page
//     view,
//     setView,
//     currentMonth,
//     setCurrentMonth,
//     hours,
//     eventsByDate,
//     eventsByDateHour,
//     selectedEvent,
//     eventData,
//     eventDataLoading,
//     setEventData,
//     rooms,
//     loading,
//     openEvent,
//     closeModal,
//     goToNext,
//     goToPrev,
//     goToToday,
//     selectedDates,
//     setSelectedDates,

//     // CalendarPreview
//     currentDate,
//     setcurrentDate,
//     bookedDates,
//     meetings,
//     handleDateClick,
//     isInRange,
//     dateRange,
//     setDateRange,
//     clearSelection,
//   };
// };

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
import { getBookedDataByMeetingId } from "../services/bookRoom.service";
import type { BookedRoomDataResponse } from "../models/bookRoom.model";
import { getMeetingRooms } from "../services/Meetinf_room.service";
import type { meeting_rooms } from "../models/meeting_room.model";

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
    start: null,
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

  // Re-fetch when the CalendarPreview mini-calendar moves to a different month
  useEffect(() => {
    if (
      currentDate.month() !== currentMonth.month() ||
      currentDate.year() !== currentMonth.year()
    ) {
      fetchMonthEvents(currentDate);
    }
  }, [currentDate.month(), currentDate.year()]);

  // Re-fetch day events whenever the selected day changes
  useEffect(() => {
    fetchDayEvents(selectedDates);
  }, [selectedDates.format("YYYY-MM-DD")]);

  //  Derived maps ─

  // Month grid: "YYYY-MM-DD" → CalendarEvent[]
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    monthEvents.forEach((e) => {
      if (!map[e.date]) map[e.date] = [];
      map[e.date].push(e);
    });
    return map;
  }, [monthEvents]);

  // Day view: "YYYY-MM-DD" → hour (0-23) → CalendarEvent[]
  const eventsByDateHour = useMemo(() => {
    const map: Record<string, Record<number, CalendarEvent[]>> = {};
    dayEvents.forEach((e) => {
      const hour = dayjs(
        `${e.date} ${e.startTime}`,
        "YYYY-MM-DD h:mm A",
      ).hour();
      if (!map[e.date]) map[e.date] = {};
      if (!map[e.date][hour]) map[e.date][hour] = [];
      map[e.date][hour].push(e);
    });
    return map;
  }, [dayEvents]);

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

  const clearSelection = () => setDateRange({ start: null, end: null });

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
    eventsByDateHour,
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
  };
};
