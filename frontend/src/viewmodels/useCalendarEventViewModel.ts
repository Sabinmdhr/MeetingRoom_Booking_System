import { useState, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { CalendarEvent } from "../models/calendar.model";

export type CalendarView = "day" | "week" | "month";

export const useCalendarEventViewModel = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [view, setView] = useState<CalendarView>("month");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [openModal, setOpenModal] = useState(false);

  const openEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  /* =============================
     EVENTS (memoized)
  ============================== */

  const events: CalendarEvent[] = useMemo(
    () => [
      {
        id: 1,
        title: "Board Meeting",
        category: "executive",
        date: "2026-03-15",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Board Room 5A",
        organizer: "Sarah Johnson",
        participants: [],
        description: "Quarterly board meeting",
        department: "Account Management",
      },
      {
        id: 2,
        title: "Frontend Dev Meeting",
        category: "internal",
        date: "2026-03-15",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Board Room 6A",
        organizer: "Sabin Manandhar",
        participants: [],
        description: "Frontend sync meeting",
        department: "Engineering",
      },
      {
        id: 3,
        title: "Client Meeting",
        category: "client",
        date: "2026-03-15",
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        location: "Board Room 6A",
        organizer: "Sabin Manandhar",
        participants: [],
        description: "Client sync",
        department: "Engineering",
      },
      {
        id: 4,
        title: "Client Meeting",
        category: "client",
        date: "2026-03-15",
        startTime: "12:00 PM",
        endTime: "1:00 PM",
        location: "Board Room 6A",
        organizer: "Sabin Manandhar",
        participants: [],
        description: "Client sync",
        department: "Engineering",
      },
    ],
    [],
  );

  /* =============================
     MONTH VIEW CALCULATION
  ============================== */

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

  /* =============================
     WEEK VIEW CALCULATION
  ============================== */

  const weekStart = currentMonth.startOf("week");

  const weekDaysWithDates = Array.from({ length: 7 }, (_, i) =>
    weekStart.add(i, "day"),
  );

  const hours = Array.from({ length: 10 }, (_, i) => 9 + i);

  /* =============================
     INDEX EVENTS BY DATE
  ============================== */

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};

    events.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });

    return map;
  }, [events]);

  /* =============================
     INDEX EVENTS BY DATE + HOUR
  ============================== */

  const eventsByDateHour = useMemo(() => {
    const map: Record<string, Record<number, CalendarEvent[]>> = {};

    events.forEach((event) => {
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
  }, [events]);

  /* =============================
     NAVIGATION
  ============================== */

  const goToNext = () => {
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
  };
};
