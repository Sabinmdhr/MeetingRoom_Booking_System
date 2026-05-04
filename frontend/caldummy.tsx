import "../assets/scss/pages/Calendar.scss";
import {
  Tab,
  Tabs,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Popover,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useCalendarEventViewModel } from "../viewmodels/useCalendarEventViewModel";
import CalendarModal from "../components/Calendar/CalendarModal";
import EditCalendarModal from "../components/Calendar/EditCalendarModal";
import MyButton from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import type { CalendarEvent } from "../models/calendar.model";

// How many events to show per cell before showing "+N more"
const VISIBLE_EVENT_LIMIT = 4;

// Width of each date column in pixels — must match $col-width in the SCSS
const COL_WIDTH = 180;
const COL_GAP = 8;

export const Calendar = () => {
  const navigate = useNavigate();
  const {
    view,
    setView,
    currentMonth,
    setCurrentMonth,
    eventsByDate,
    eventsByDateHour,
    hours,
    openEvent,
    goToNext,
    goToPrev,
    goToToday,
    selectedEvent,
    closeModal,
    setSelectedDates,
    eventData,
    eventDataLoading,
    rooms,
  } = useCalendarEventViewModel();

  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [overflowAnchor, setOverflowAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [overflowEvents, setOverflowEvents] = useState<CalendarEvent[]>([]);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // ── Scroll sync: header date row ↔ body grid ──────────────────────────────
  // Only the body (__scroll) is truly scrollable by the user.
  // The header (__date-header) has overflow:hidden and is driven by JS only.
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    const header = headerScrollRef.current;
    const body = bodyScrollRef.current;
    if (!header || !body) return;

    const fromBody = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      header.scrollLeft = body.scrollLeft;
      isSyncing.current = false;
    };

    body.addEventListener("scroll", fromBody);
    return () => body.removeEventListener("scroll", fromBody);
  }, [view]);

  // ── Scroll to today ───────────────────────────────────────────────────────
  // Calculates the pixel offset of today's column and smoothly scrolls to it.
  const scrollToToday = useCallback(() => {
    const body = bodyScrollRef.current;
    if (!body) return;

    const today = dayjs();
    const firstDay = currentMonth.startOf("month");

    // If today isn't in the current month, no column to scroll to
    if (!today.isSame(firstDay, "month")) return;

    // Day index within the month (0-based)
    const dayIndex = today.date() - 1;
    // Each column occupies COL_WIDTH + COL_GAP pixels
    // Subtract half the container width to center today on screen
    const offset =
      dayIndex * (COL_WIDTH + COL_GAP) - body.clientWidth / 2 + COL_WIDTH / 2;

    body.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [currentMonth]);

  // Auto-scroll to today when the month view first loads or month changes
  useEffect(() => {
    if (view === "month") {
      // Small delay so the DOM has rendered the columns
      const timer = setTimeout(scrollToToday, 100);
      return () => clearTimeout(timer);
    }
  }, [view, currentMonth.month(), currentMonth.year(), scrollToToday]);

  // ── Derived ───────────────────────────────────────────────────────────────
  const today = dayjs().format("YYYY-MM-DD");
  const isDayView = view === "day";
  const isMonthView = view === "month";

  // All days of the current month — no hardcoded count
  const gridDates = Array.from({ length: currentMonth.daysInMonth() }, (_, i) =>
    currentMonth.date(i + 1),
  );

  // Day-view events, optionally filtered to the room selected from the grid
  const dayViewEvents = (() => {
    const all = eventsByDateHour[currentMonth.format("YYYY-MM-DD")] ?? {};
    if (!selectedRoom) return all;
    const filtered: typeof all = {};
    for (const h in all) {
      filtered[h] = all[h].filter((e) => e.location === selectedRoom);
    }
    return filtered;
  })();

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleRoomCellClick = (date: dayjs.Dayjs, roomName: string) => {
    setSelectedRoom(roomName);
    goToToday(date);
    setSelectedDates(date);
    setView("day");
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setModalAnchor(e.currentTarget as HTMLElement);
    openEvent(event);
    setMode("view");
  };

  const handleTodayClick = () => {
    const now = dayjs();
    // If already on the current month, just scroll; otherwise navigate then scroll
    if (
      currentMonth.month() === now.month() &&
      currentMonth.year() === now.year()
    ) {
      scrollToToday();
    } else {
      goToToday(); // resets currentMonth to today's month
      // scrollToToday fires via the useEffect above once currentMonth updates
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Card className="calendar">
      {/* ════════════════════════════════════ TOP BAR */}
      <CardContent className="calendar__topbar">
        <div className="calendar__topbar__inner">
          {/* Left: navigation + filters */}
          <div className="calendar__topbar__left">
            <div className="cal-nav">
              <MyButton
                onClick={goToPrev}
                text=""
                color="secondary"
                startIcon={<ChevronLeft size={18} />}
              />

              <button
                className="cal-nav__date-btn"
                onClick={(e) => setDatePickerAnchor(e.currentTarget)}
              >
                <CalendarIcon size={16} />
                <span>{currentMonth.format("MMMM YYYY")}</span>
              </button>

              <MyButton
                onClick={goToNext}
                text=""
                color="secondary"
                startIcon={<ChevronRight size={18} />}
              />

              {isMonthView && (
                <MyButton
                  onClick={handleTodayClick}
                  variant="outlined"
                  customVariant="ghost"
                  text="Today"
                />
              )}
            </div>

            {/* Room filter + view tabs */}
            <div className="cal-filters">
              <Tabs
                value={view}
                onChange={(_, value) => {
                  setView(value);
                  if (value === "month") setSelectedRoom(null);
                }}
                className="cal-tabs"
              >
                <Tab
                  label="Day"
                  value="day"
                />
                <Tab
                  label="Month"
                  value="month"
                />
              </Tabs>

              {isDayView && (
                <div className="cal-room-select">
                  <TextField
                    select
                    fullWidth
                    size="small"
                    className="report-filter__select"
                    value={selectedRoom ?? "All Rooms"}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelectedRoom(val === "All Rooms" ? null : val);
                    }}
                  >
                    <MenuItem value="All Rooms">All Rooms</MenuItem>
                    {rooms.map((rm) => (
                      <MenuItem
                        key={rm.id}
                        value={rm.roomName}
                      >
                        {rm.roomName}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              )}
            </div>
          </div>

          {/* Right: actions + legend */}
          <div className="calendar__topbar__right">
            <MyButton
              onClick={() => navigate("/meeting-rooms")}
              variant="contained"
              customVariant="dark"
              startIcon={<Plus size={17} />}
              text="New Meeting"
            />
            <div className="cat-legend">
              <span className="cat-legend__dot cat-legend__dot--internal" />
              <span>Internal</span>
              <span className="cat-legend__dot cat-legend__dot--client" />
              <span>Client</span>
              <span className="cat-legend__dot cat-legend__dot--executive" />
              <span>Executive</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* ════════════════════════════════════ MAIN */}
      <CardContent className="calendar__main">
        {/* ── DAY VIEW ──────────────────────────────────── */}
        {isDayView && (
          <div className="day">
            <div className="day__header">
              <span>{currentMonth.format("dddd, MMMM D, YYYY")}</span>
              {selectedRoom && (
                <span className="day__header__room">— {selectedRoom}</span>
              )}
            </div>

            <div className="day__body">
              {hours.map((hour) => {
                const events = dayViewEvents[hour] ?? [];
                return (
                  <React.Fragment key={hour}>
                    <div className="day__hour">
                      {dayjs().hour(hour).minute(0).format("h A")}
                    </div>
                    <div className="day__cell">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className={`day__event day__event--${event.category}`}
                          onClick={(e) => handleEventClick(e, event)}
                        >
                          <span className="day__event-time">
                            {event.startTime} – {event.endTime}
                          </span>
                          <span className="day__event-title">
                            {event.meetingTitle}
                          </span>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* ── MONTH GRID VIEW ───────────────────────────── */}
        {isMonthView && (
          <div className="room-grid">
            {/* Sticky header: "Rooms" corner + scrolling date labels */}
            <div className="room-grid__header">
              <div className="room-grid__corner">Rooms</div>

              {/* overflow:hidden — scrolled via JS only, synced to body */}
              <div
                className="room-grid__date-strip"
                ref={headerScrollRef}
              >
                {gridDates.map((date) => {
                  const key = date.format("YYYY-MM-DD");
                  const isToday = key === today;
                  return (
                    <div
                      key={key}
                      className={`room-grid__date-cell${isToday ? " room-grid__date-cell--today" : ""}`}
                    >
                      <span className="room-grid__date-cell__day">
                        {date.format("ddd")}
                      </span>
                      <span className="room-grid__date-cell__num">
                        {date.format("D")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body: sticky room labels + scrollable event rows */}
            <div className="room-grid__body">
              {/* Sticky left column */}
              <div className="room-grid__labels">
                {rooms.map((rm) => (
                  <div
                    key={rm.id}
                    className="room-grid__label"
                  >
                    <span>{rm.roomName}</span>
                  </div>
                ))}
              </div>

              {/* Scrollable grid — this is the ONLY scrollable element */}
              <div
                className="room-grid__scroll"
                ref={bodyScrollRef}
              >
                {rooms.map((rm) => (
                  <div
                    key={rm.id}
                    className="room-grid__row"
                  >
                    {gridDates.map((date) => {
                      const key = date.format("YYYY-MM-DD");
                      const cellEvents = (eventsByDate[key] ?? []).filter(
                        (e) => e.location === rm.roomName,
                      );
                      const visible = cellEvents.slice(0, VISIBLE_EVENT_LIMIT);
                      const hiddenCount = cellEvents.length - visible.length;
                      const cellId = `${rm.id}-${key}`;
                      const isToday = key === today;

                      return (
                        <div
                          key={cellId}
                          className={`room-grid__cell${isToday ? " room-grid__cell--today" : ""}`}
                          onMouseEnter={() => setHoveredCell(cellId)}
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => handleRoomCellClick(date, rm.roomName)}
                        >
                          {visible.map((event) => (
                            <div
                              key={event.id}
                              className={`room-grid__event room-grid__event--${event.category}`}
                              onClick={(e) => handleEventClick(e, event)}
                            >
                              <span className="room-grid__event__time">
                                {event.startTime} – {event.endTime}
                              </span>
                              <span className="room-grid__event__title">
                                {event.meetingTitle}
                              </span>
                            </div>
                          ))}

                          {hiddenCount > 0 && (
                            <button
                              className="room-grid__more-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOverflowEvents(cellEvents);
                                setOverflowAnchor(e.currentTarget);
                              }}
                            >
                              +{hiddenCount} more
                            </button>
                          )}

                          {hoveredCell === cellId &&
                            cellEvents.length === 0 && (
                              <div
                                className="room-grid__cell-placeholder"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoomCellClick(date, rm.roomName);
                                }}
                              >
                                <Plus size={15} />
                                <span>Book</span>
                              </div>
                            )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* ════════════════════════════════════ DATE PICKER */}
      <Popover
        open={Boolean(datePickerAnchor)}
        anchorEl={datePickerAnchor}
        onClose={() => setDatePickerAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDatePicker
            value={currentMonth}
            onChange={(d) => {
              if (d) {
                setCurrentMonth(d);
                setSelectedDates(d);
              }
              setDatePickerAnchor(null);
            }}
          />
        </LocalizationProvider>
      </Popover>

      {/* ════════════════════════════════════ OVERFLOW EVENTS */}
      <Popover
        open={Boolean(overflowAnchor)}
        anchorEl={overflowAnchor}
        onClose={() => setOverflowAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 2,
              width: 240,
              p: 1,
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            },
          },
        }}
      >
        <div className="overflow-list">
          {overflowEvents.map((event) => (
            <div
              key={event.id}
              className={`room-grid__event room-grid__event--${event.category} overflow-list__item`}
              onClick={(e) => {
                setOverflowAnchor(null);
                handleEventClick(e, event);
              }}
            >
              <span className="room-grid__event__time">
                {event.startTime} – {event.endTime}
              </span>
              <span className="room-grid__event__title">
                {event.meetingTitle}
              </span>
            </div>
          ))}
        </div>
      </Popover>

      {/* ════════════════════════════════════ MODALS */}
      <CalendarModal
        open={mode === "view"}
        event={selectedEvent}
        anchorEl={modalAnchor}
        eventData={eventData}
        eventDataLoading={eventDataLoading}
        onClose={() => {
          setMode(null);
          closeModal();
          setModalAnchor(null);
        }}
        onEdit={() => setMode("edit")}
      />
      <EditCalendarModal
        openEdit={mode === "edit"}
        event={selectedEvent}
        onCloseAll={() => {
          setMode(null);
          closeModal();
        }}
        onBack={() => setMode("view")}
      />
    </Card>
  );
};

export default Calendar;
