// viewmodels/useCalendarViewModel.ts
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import type { CalendarEvent } from "../models/calendar.model";

export const useCalendarViewModel = () => {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [view, setView] = useState<"day" | "week" | "month">("month");
  const [openModal, setOpenModal] = useState(false);

  // Mock events (replace with API later)
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: "Board Meeting",
      category: "Executive",
      date: "2026-03-11",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: "Board Room 5A",
      organizer: "Sarah Johnson",
      participants: [],
      description: "Quarterly board meeting to review company performance.",
      department: "Account Management",
    },
    {
      id: 2,
      title: "Frontend Dev Meeting",
      category: "Internal",
      date: "2026-03-10",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: "Board Room 6A",
      organizer: "Sabin Manandhar",
      participants: [],
      description: "Frontend sync meeting.",
      department: "Engineering",
    },
    {
      id: 3,
      title: "Frontend Dev Meeting",
      category: "Client",
      date: "2026-03-10",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: "Board Room 6A",
      organizer: "Sabin Manandhar",
      participants: [],
      description: "Frontend sync meeting.",
      department: "Engineering",
    },
  ];

  // ========== Month View Calculations ==========
  const startOfMonth = currentMonth.startOf("month").day(); // 0=Sun
  const daysInMonth = currentMonth.endOf("month").date();
  const totalDays = startOfMonth + daysInMonth;
  const rowsNeeded = Math.ceil(totalDays / 7);
  const totalCells = rowsNeeded * 7;

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = [...Array(startOfMonth).fill(null), ...monthDays];

  while (calendarDays.length < totalCells) {
    calendarDays.push(null);
  }

  const formatDate = (day: number) =>
    currentMonth.date(day).format("YYYY-MM-DD");

  // ========== Week View Calculations ==========
  // get start of week based on current view
  const weekStart =
    view === "week"
      ? currentMonth.startOf("week") // Sunday of the current week
      : currentMonth.startOf("month");

  // generate 7 consecutive days for the week
  const weekDaysWithDates = Array.from({ length: 7 }, (_, i) =>
    weekStart.add(i, "day"),
  );
  const hours = Array.from({ length: 10 }, (_, i) => 9 + i); // 9 AM - 6 PM

  // ========== Event Handlers ==========
  const openEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  // ========== Navigation ==========
  const goToNext = () => {
    setCurrentMonth((prev) =>
      view === "week" ? prev.add(1, "week") : prev.add(1, "month"),
    );
  };

  const goToPrev = () => {
    setCurrentMonth((prev) =>
      view === "week" ? prev.subtract(1, "week") : prev.subtract(1, "month"),
    );
  };
  const goToToday = () => setCurrentMonth(dayjs());

  return {
    currentMonth,
    view,
    setView,
    events,
    calendarDays, // month view
    formatDate,
    weekDaysWithDates, // week view
    hours, // week view hours
    openEvent,
    openModal,
    selectedEvent,
    closeModal,
    goToNext,
    goToPrev,
    goToToday,
  };
};
