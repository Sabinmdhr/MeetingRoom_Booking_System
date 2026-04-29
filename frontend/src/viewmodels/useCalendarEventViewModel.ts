// import { useState, useMemo, useEffect } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import type { CalendarEvent, CalenderDay } from "../models/calendar.model";
// import {
//   getCalendarByMonth,
//   getCalenderByDay,
// } from "../services/calendar.service";
// import { getBookedDataByMeetingId } from "../services/bookRoom.service";
// import type { BookedRoomDataResponse } from "../models/bookRoom.model";

// export type CalendarView = "day" | "week" | "month";

// export const useCalendarEventViewModel = () => {
//   const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
//   const [view, setView] = useState<CalendarView>("month");
//   const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
//     null,
//   );
//   const [openModal, setOpenModal] = useState(false);

//   const [currentDate, setcurrentDate] = useState(dayjs());
//   const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());

//   const [eventData, setEventData] = useState<BookedRoomDataResponse>();
//   const fetchCalender = async () => {
//     try {
//       console.log("MONTH:", currentDate.format("YYYY-MM-DD"));
//       const res = await getCalendarByMonth(currentDate.format("YYYY-MM-DD"));
//       console.log(res);

//       console.log("MONTH API DATA:", res.data);
//       const dates = new Set(res.data.map((item: any) => item.date));

//       console.log("BOOKED DATES:", [...dates]);
//       setBookedDates(dates);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchEvent = async (meetingId: number) => {
//     try {
//       const res = await getBookedDataByMeetingId(meetingId);
//       console.log("ans:", res);
//       setEventData(res);
//       console.log(eventData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCalender();
//     fetchEvent(5);
//   }, [currentDate.month(), currentDate.year()]);

//   const [meetings, setMeetings] = useState<CalenderDay[]>([]);
//   const [selectedDates, setSelectedDates] = useState(dayjs());
//   const [loading, setLoading] = useState(false);

//   const fetchMeetings = async (date: string) => {
//     try {
//       setLoading(true);
//       const res = await getCalenderByDay(date);
//       setMeetings(res.data || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMeetings(selectedDates.format("YYYY-MM-DD"));
//   }, [selectedDates]);

//   const openEvent = (event: CalendarEvent) => {
//     setSelectedEvent(event);
//     console.log("This is:" + event.id);

//     setOpenModal(true);
//   };

//   const closeModal = () => {
//     setOpenModal(false);
//     setSelectedEvent(null);
//   };

//   const events: CalendarEvent[] = useMemo(
//     () => [
//       {
//         id: 1,
//         meetingTitle: "Board Meeting",
//         category: "executive",
//         date: "2026-04-24",
//         startTime: "10:00 AM",
//         endTime: "12:00 PM",
//         location: "Manang",
//         organizer: "Elon Musk",
//         participants: [],
//         description: "Quarterly board meeting",
//         department: "Account Management",
//       },
//       {
//         id: 2,
//         meetingTitle: "Frontend Dev Meeting",
//         category: "internal",
//         date: "2026-04-24",
//         startTime: "10:00 AM",
//         endTime: "12:00 PM",
//         location: "Mustang",
//         organizer: "Lionel Messi",
//         participants: [],
//         description: "Frontend sync meeting",
//         department: "Engineering",
//       },
//       {
//         id: 3,
//         meetingTitle: "Client Meeting",
//         category: "client",
//         date: "2026-04-24",
//         startTime: "10:00 AM",
//         endTime: "12:00 PM",
//         location: "Langtang",
//         organizer: "Lionel Messi",
//         participants: [],
//         description: "Client sync",
//         department: "Engineering",
//       },
//       {
//         id: 4,
//         meetingTitle: "Client Onboarding",
//         category: "client",
//         date: "2026-04-24",
//         startTime: "2:00 PM",
//         endTime: "3:00 PM",
//         location: "Manang",
//         organizer: "Lionel Messi",
//         participants: [],
//         description: "Client sync",
//         department: "Engineering",
//       },
//       {
//         id: 4,
//         meetingTitle: "Client Onboarding",
//         category: "client",
//         date: "2026-04-24",
//         startTime: "2:00 PM",
//         endTime: "3:00 PM",
//         location: "Mustang",
//         organizer: "Lionel Messi",
//         participants: [],
//         description: "Client sync",
//         department: "Engineering",
//       },
//     ],
//     [],
//   );

//   // MONTH VIEW CALCULATION
//   const startOfMonth = currentMonth.startOf("month").day();
//   const daysInMonth = currentMonth.daysInMonth();
//   const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

//   const calendarDays = [
//     ...Array(startOfMonth).fill(null),
//     ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
//     ...Array(totalCells - (startOfMonth + daysInMonth)).fill(null),
//   ];

//   const formatDate = (day: number) =>
//     currentMonth.date(day).format("YYYY-MM-DD");

//   // WEEK VIEW CALCULATION
//   const weekStart = currentMonth.startOf("week");
//   const weekDaysWithDates = Array.from({ length: 7 }, (_, i) =>
//     weekStart.add(i, "day"),
//   );

//   // 7 AM – 6 PM (hours 7 through 18)
//   const hours = Array.from({ length: 12 }, (_, i) => 7 + i);

//   // INDEX EVENTS BY DATE
//   const eventsByDate = useMemo(() => {
//     const map: Record<string, CalendarEvent[]> = {};
//     events.forEach((event) => {
//       if (!map[event.date]) map[event.date] = [];
//       map[event.date].push(event);
//     });
//     return map;
//   }, [events]);

//   // INDEX EVENTS BY DATE + HOUR
//   const eventsByDateHour = useMemo(() => {
//     const map: Record<string, Record<number, CalendarEvent[]>> = {};
//     events.forEach((event) => {
//       const date = event.date;
//       const startHour = dayjs(
//         `${event.date} ${event.startTime}`,
//         "YYYY-MM-DD h:mm A",
//       ).hour();
//       if (!map[date]) map[date] = {};
//       if (!map[date][startHour]) map[date][startHour] = [];
//       map[date][startHour].push(event);
//     });
//     return map;
//   }, [events]);

//   // NAVIGATION
//   const goToNext = () => {
//     setCurrentMonth((prev) => {
//       if (view === "day") return prev.add(1, "day");
//       if (view === "week") return prev.add(1, "week");
//       return prev.add(1, "month");
//     });
//   };

//   const goToPrev = () => {
//     setCurrentMonth((prev) => {
//       if (view === "day") return prev.subtract(1, "day");
//       if (view === "week") return prev.subtract(1, "week");
//       return prev.subtract(1, "month");
//     });
//   };

//   const goToToday = (date?: Dayjs) => {
//     setCurrentMonth(date ?? dayjs());
//   };

//   return {
//     currentMonth,
//     view,
//     setView,
//     events,
//     calendarDays,
//     hours,
//     formatDate,
//     weekDaysWithDates,
//     openEvent,
//     openModal,
//     selectedEvent,
//     closeModal,
//     goToNext,
//     goToPrev,
//     goToToday,
//     eventsByDate,
//     eventsByDateHour,
//     currentDate,
//     setcurrentDate,
//     bookedDates,
//     meetings,
//     loading,
//     selectedDates,
//     setSelectedDates,
//     fetchEvent,
//     eventData,
//     setEventData,
//   };
// };

import { useState, useMemo, useEffect, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { CalenderMonth } from "../models/calendar.model";
import {
  getCalendarByMonth,
  getCalenderByDay,
} from "../services/calendar.service";
import { getBookedDataByMeetingId } from "../services/bookRoom.service";
import type { BookedRoomDataResponse } from "../models/bookRoom.model";

import { getMeetingRooms } from "../services/Meetinf_room.service";
import type { meeting_rooms } from "../models/meeting_room.model";
import type { CalendarEvent, CalenderDay } from "../models/calendar.model";
import { useAuth } from "../hooks/useAuth";

export type CalendarView = "day" | "week" | "month";

//   Maps API response to CalendarEvent shape the UI expects
const mapMonthItem = (item: CalenderMonth): CalendarEvent => ({
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
});

const mapDayItem = (item: CalenderDay): CalendarEvent => ({
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
});

export const useCalendarEventViewModel = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [view, setView] = useState<CalendarView>("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);

  const [currentDate, setcurrentDate] = useState(dayjs());
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const [monthMeetings, setMonthMeetings] = useState<CalenderDay[]>([]);

  const fetchCalender = async () => {
    try {
      console.log("MONTH:", currentDate.format("YYYY-MM-DD"));
      const res = await getCalendarByMonth(currentDate.format("YYYY-MM-DD"));
      console.log("MONTH API DATA:", res.data);
      setMonthMeetings(res.data || []);
      const dates = new Set(res.data.map((item: any) => item.date));
      console.log("BOOKED DATES:", [...dates]);
      setBookedDates(dates);
    } catch (error) {
      console.error("Error fetching rooms", error);
    }
  };
  const { role } = useAuth();
  const [eventData, setEventData] = useState<BookedRoomDataResponse | null>(
    null,
  );
  const [eventDataLoading, setEventDataLoading] = useState(false);

  //   Real events from API (replaces static array)
  const [monthEvents, setMonthEvents] = useState<CalendarEvent[]>([]);
  const [dayEvents, setDayEvents] = useState<CalendarEvent[]>([]);

  const [meetingss, setMeetingss] = useState<CalenderDay[]>([]);
  const [selectedDates, setSelectedDates] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  const [rooms, setRooms] = useState<meeting_rooms[]>([]);

  const fetchRooms = useCallback(async () => {
    try {
      const res = await getMeetingRooms();
      setRooms(res.data.content ?? res.data ?? []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  //   Fetch month data — populates the grid view
  // const fetchCalender = useCallback(async () => {
  //   try {
  //     const res = await getCalendarByMonth(currentDate.format("YYYY-MM-DD"));
  //     const items: CalenderMonth[] = res.data ?? [];

  //     // booked dates for dot indicators
  //     const dates = new Set(items.map((item) => item.date));
  //     setBookedDates(dates);

  //     //   Map to CalendarEvent for the grid
  //     setMonthEvents(items.map(mapMonthItem));
  //   } catch (error) {
  //     console.error("Error fetching month calendar", error);
  //   }
  // }, [currentDate]);

  //   Fetch day data — populates the day view
  // const fetchMeetings = useCallback(async (date: string) => {
  //   try {
  //     setLoading(true);
  //     const res = await getCalenderByDay(date);
  //     const items: CalenderDay[] = res.data ?? [];
  //     setMeetingss(items);
  //     //   Also map to CalendarEvent for day view rendering
  //     setDayEvents(items.map(mapDayItem));
  //   } catch (error) {
  //     console.error("Error fetching day calendar", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  //   Fetch specific meeting details for the modal
  const fetchEvent = useCallback(async (meetingId: number) => {
    try {
      setEventDataLoading(true);
      const res = await getBookedDataByMeetingId(meetingId);
      console.log(res);

      setEventData(res);
    } catch (error) {
      console.error("Error fetching meeting details", error);
    } finally {
      setEventDataLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalender();
  }, [currentDate.month(), currentDate.year()]);

  const [dateRange, setDateRange] = useState<{
    start: Dayjs | null;
    end: Dayjs | null;
  }>({ start: null, end: null });

  // const fetchMeetings= async(date: string)=>{
  //   try {
  //     setLoading(true);
  //     const res= await getCalenderByDay(date);
  //     setMeetings(res.data || []);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   finally{
  //     setLoading(false);
  //   }
  // }

  // useEffect(()=>{
  //   fetchMeetings(selectedDates.format("YYYY-MM-DD"));
  // },[selectedDates])

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
    if (!dateRange.end) {
      return d.isSame(dateRange.start, "day");
    }
    return (
      d.isSame(dateRange.start, "day") ||
      d.isSame(dateRange.end, "day") ||
      (d.isAfter(dateRange.start) && d.isBefore(dateRange.end))
    );
  };

  const meetings = useMemo(() => {
    if (!dateRange.start) return [];

    return monthMeetings.filter((m) => {
      const meetingDate = dayjs(m.date);

      if (!dateRange.end) {
        return meetingDate.isSame(dateRange.start, "day");
      }

      return (
        meetingDate.isSame(dateRange.start, "day") ||
        meetingDate.isSame(dateRange.end, "day") ||
        (meetingDate.isAfter(dateRange.start) &&
          meetingDate.isBefore(dateRange.end))
      );
    });
  }, [monthMeetings, dateRange]);

  const clearSelection = () => {
    setDateRange({ start: null, end: null });
  };
  // useEffect(() => {
  //   fetchMeetings(selectedDates.format("YYYY-MM-DD"));
  // }, [selectedDates]);

  const openEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setOpenModal(true);
    //   Fetch real details when an event is clicked
    fetchEvent(event.id);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
    setEventData(null);
  };

  //   Use real API events, not static
  const events = view === "day" ? dayEvents : monthEvents;

  // MONTH VIEW CALCULATION
  const startOfMonth = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const totalCells = Math.ceil((startOfMonth + daysInMonth) / 7) * 7;

  const calendarDays = [
    ...Array(startOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ...Array(totalCells - (startOfMonth + daysInMonth)).fill(null),
  ];

  const formatDate = (day: number) =>
    currentMonth.date(day).format("YYYY-MM-DD");

  const weekStart = currentMonth.startOf("week");
  const weekDaysWithDates = Array.from({ length: 7 }, (_, i) =>
    weekStart.add(i, "day"),
  );

  const hours = Array.from({ length: 12 }, (_, i) => 7 + i);

  //   Index month events by date for grid view
  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    monthEvents.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });
    return map;
  }, [monthEvents]);

  //   Index day events by hour for day view
  const eventsByDateHour = useMemo(() => {
    const map: Record<string, Record<number, CalendarEvent[]>> = {};
    dayEvents.forEach((event) => {
      const date = event.date;
      const startHour = dayjs(
        `${event.date} ${event.startTime}`,
        "YYYY-MM-DD h:mm A",
      ).hour();
      if (!map[date]) map[date] = {};
      if (!map[date][startHour]) map[date][startHour] = [];
      map[date][startHour].push(event);
    });
    return map;
  }, [dayEvents]);

  const goToNext = () => {
    setDateRange({ start: null, end: null });
    setCurrentMonth((prev) => {
      if (view === "day") return prev.add(1, "day");
      if (view === "week") return prev.add(1, "week");
      return prev.add(1, "month");
    });
  };

  const goToPrev = () => {
    setCurrentMonth((prev) => {
      if (view === "day") return prev.subtract(1, "day");
      if (view === "week") return prev.subtract(1, "week");
      setDateRange({ start: null, end: null });
      return prev.subtract(1, "month");
    });
  };

  const goToToday = (date?: Dayjs) => {
    setCurrentMonth(date ?? dayjs());
  };

  return {
    currentMonth,
    view,
    setView,
    events,
    calendarDays,
    hours,
    formatDate,
    weekDaysWithDates,
    openEvent,
    openModal,
    selectedEvent,
    closeModal,
    goToNext,
    goToPrev,
    goToToday,
    eventsByDate,
    eventsByDateHour,
    currentDate,
    setcurrentDate,
    bookedDates,
    meetings,
    loading,
    selectedDates,
    setSelectedDates,
    handleDateClick,
    isInRange,
    dateRange,
    setDateRange,
    clearSelection,
    fetchEvent,
    eventData,
    eventDataLoading,
    setEventData,
    rooms,
  };
};
