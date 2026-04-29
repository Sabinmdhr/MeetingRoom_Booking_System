import "../assets/scss/pages/Calendar.scss";
import {
  Tab,
  Tabs,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCalendarEventViewModel } from "../viewmodels/useCalendarEventViewModel";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CalendarModal from "../components/Calendar/CalendarModal";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState, useRef, useEffect } from "react";
import { Popover } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  PlusIcon,
} from "lucide-react";
import EditCalendarModal from "../components/Calendar/EditCalendarModal";
import MyButton from "../components/ui/Button";
import type { CalendarEvent } from "../models/calendar.model";

const GRID_VISIBLE_DAYS = 30;

export const Calendar = () => {
  // Sync horizontal scroll between the sticky date header and the body grid
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const {
    currentMonth,
    view,
    setView,
    eventsByDate,
    eventsByDateHour,
    hours,
    openEvent,
    goToNext,
    goToPrev,
    goToToday,
    selectedEvent,
    closeModal,
    // openModal,
    setSelectedDates,
    eventData,
    eventDataLoading,
    rooms,
  } = useCalendarEventViewModel();

  const [room, setRoom] = useState("All Rooms");
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  // const [eventFilter, setEventFilter] = useState("all");
  const [mode, setMode] = useState<"view" | "edit" | null>(null);
  const [dayOffset, setDayOffset] = useState(0);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [overflowAnchor, setOverflowAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [overflowEvents, setOverflowEvents] = useState<CalendarEvent[]>([]);
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const header = headerScrollRef.current;
    const body = bodyScrollRef.current;
    if (!header || !body) return;

    const onHeaderScroll = () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      body.scrollLeft = header.scrollLeft;
      isSyncingRef.current = false;
    };
    const onBodyScroll = () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      header.scrollLeft = body.scrollLeft;
      isSyncingRef.current = false;
    };

    header.addEventListener("scroll", onHeaderScroll);
    body.addEventListener("scroll", onBodyScroll);

    return () => {
      if (header) {
        header.removeEventListener("scroll", onHeaderScroll);
      }
      if (body) {
        body.removeEventListener("scroll", onBodyScroll);
      }
    };
  }, [view]);

  const handleDateButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setDatePickerAnchor(event.currentTarget);
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      goToToday(newDate);
      setDayOffset(0);
    }
    setDatePickerAnchor(null);
  };

  const handleDatePickerClose = () => setDatePickerAnchor(null);

  const navigate = useNavigate();

  const today = dayjs().format("YYYY-MM-DD");
  const isDayView = view === "day";
  const isGridView = view === "month";
  const selectedDate = currentMonth.format("YYYY-MM-DD");

  const gridDates = Array.from({ length: GRID_VISIBLE_DAYS }, (_, i) =>
    currentMonth.add(dayOffset + i, "day"),
  );
  useEffect(() => {
    const syncHeights = () => {
      rowRefs.current.forEach((row, i) => {
        const label = labelRefs.current[i];
        if (row && label) {
          label.style.height = `${row.getBoundingClientRect().height}px`;
        }
      });
    };

    const observer = new ResizeObserver(syncHeights);
    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    syncHeights(); // run once immediately

    return () => observer.disconnect();
  }, [rooms, eventsByDate, gridDates]);
  // Handle room cell click - filter by room and go to day view
  const handleRoomCellClick = (date: dayjs.Dayjs, roomName: string) => {
    setSelectedRoom(roomName);
    goToToday(date);
    setSelectedDates(date);
    setView("day");
    setDayOffset(0);
  };

  // Filter events for day view based on selected room
  const getDayViewEvents = () => {
    const allEvents = eventsByDateHour[selectedDate] || {};

    if (!selectedRoom || selectedRoom === "All Rooms") {
      return allEvents;
    }

    // Filter events by selected room
    const filteredEvents: typeof allEvents = {};
    for (const hour in allEvents) {
      filteredEvents[hour] = allEvents[hour].filter(
        (event) => event.location === selectedRoom,
      );
    }
    return filteredEvents;
  };

  return (
    <Card className="calendar">
      {/* ── TOPBAR ── */}
      <CardContent className="calendar__topbar">
        <div className="calendar__topbar__main">
          <div className="calendar__topbar__main__left">
            <div className="calendar__topbar__main__left__buttons">
              <MyButton
                onClick={
                  isGridView
                    ? () => setDayOffset((o) => o - GRID_VISIBLE_DAYS)
                    : goToPrev
                }
                text=""
                color="secondary"
                startIcon={<ChevronLeft size={18} />}
              />

              <button
                onClick={handleDateButtonClick}
                className="date-button"
              >
                <CalendarIcon size={18} />
                <span>{currentMonth.format("MMMM D, YYYY")}</span>
              </button>

              <Popover
                open={Boolean(datePickerAnchor)}
                anchorEl={datePickerAnchor}
                onClose={handleDatePickerClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    value={currentMonth}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Popover>

              <MyButton
                onClick={
                  isGridView
                    ? () => setDayOffset((o) => o + GRID_VISIBLE_DAYS)
                    : goToNext
                }
                text=""
                color="secondary"
                startIcon={<ChevronRight size={18} />}
              />
            </div>

            <div className="calendar__topbar__main__left__items">
              <div className="report-filter__dropdown-item">
                <TextField
                  select
                  fullWidth
                  value={isDayView && selectedRoom ? selectedRoom : room}
                  onChange={(e) => {
                    if (isDayView) {
                      setSelectedRoom(
                        e.target.value === "All Rooms" ? null : e.target.value,
                      );
                    } else {
                      setRoom(e.target.value);
                    }
                  }}
                  className="report-filter__select"
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

              <Tabs
                value={view}
                onChange={(_, value) => {
                  setView(value);
                  setDayOffset(0);
                  if (value === "month") {
                    setSelectedRoom(null);
                  }
                }}
                className="calendar__topbar__main__left__tabs"
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
            </div>
          </div>

          <div className="calendar__topbar__main__right">
            <MyButton
              onClick={() => navigate("/meeting-rooms")}
              variant="contained"
              customVariant="dark"
              startIcon={<Plus size={17} />}
              text="New Meeting"
            />
            <div className="meeting-category">
              <div className="category internal" />
              <span>Internal</span>
              <div className="category client" />
              <span>Client</span>
              <div className="category executive" />
              <span>Executive</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* ── MAIN ── */}
      <CardContent className="calendar__main">
        {/* DAY VIEW — 7 AM to 6 PM */}
        {isDayView && (
          <div className="day">
            <div className="day__header">
              {currentMonth.format("dddd, MMMM D")}
              {selectedRoom && <span> - {selectedRoom}</span>}
            </div>
            <div className="day__body">
              {hours.map((hour) => {
                const dayViewEvents = getDayViewEvents();
                const cellEvents = dayViewEvents[hour] || [];
                return (
                  <React.Fragment key={hour}>
                    <div className="day__hour">
                      {dayjs().hour(hour).minute(0).format("h A")}
                    </div>
                    <div className="day__cell">
                      {cellEvents.map((event) => (
                        <div
                          className={`day__event ${event.category}`}
                          onClick={(e) => {
                            setModalAnchor(e.currentTarget);
                            openEvent(event);
                            setMode("view");
                          }}
                        >
                          <span className="event-time">
                            {event.startTime} - {event.endTime}
                          </span>
                          <br />
                          <span className="event-title">
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

        {/* ROOM × DATE GRID VIEW */}
        {isGridView && (
          <div className="room-grid">
            {/* Sticky header row: corner + scrollable date labels */}
            <div className="room-grid__header">
              <div className="room-grid__corner">Rooms</div>
              <div
                className="room-grid__date-header"
                ref={headerScrollRef}
              >
                {gridDates.map((date) => {
                  const dateKey = date.format("YYYY-MM-DD");
                  const isToday = dateKey === today;
                  return (
                    <div
                      key={dateKey}
                      className={`room-grid__date-cell${isToday ? " room-grid__date-cell--today" : ""}`}
                    >
                      <span className="room-grid__date-day">
                        {date.format("ddd")}
                      </span>
                      <span className="room-grid__date-num">
                        {date.format("D")}
                      </span>
                      <span className="room-grid__date-month">
                        {date.format("MMM")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body: sticky room labels + horizontally scrollable event tiles */}
            <div className="room-grid__body">
              <div className="room-grid__room-labels">
                {rooms.map((rm, i) => (
                  <div
                    key={rm.id}
                    className="room-grid__room-label"
                    ref={(el) => (labelRefs.current[i] = el)} //  ref each label
                  >
                    <span>{rm.roomName}</span>
                  </div>
                ))}
              </div>

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
                      const dateKey = date.format("YYYY-MM-DD");
                      const allDayEvents = eventsByDate[dateKey] || [];
                      const cellEvents =
                        room === "All Rooms"
                          ? allDayEvents.filter(
                              (e) => e.location === rm.roomName,
                            )
                          : allDayEvents.filter(
                              (e) =>
                                e.location === rm.roomName &&
                                e.location === room,
                            );

                      const VISIBLE_LIMIT = 4;
                      const visibleEvents = cellEvents.slice(0, VISIBLE_LIMIT);
                      const hiddenCount = cellEvents.length - VISIBLE_LIMIT;

                      return (
                        <div
                          key={`${rm.id}-${dateKey}`}
                          className={`room-grid__cell${dateKey === today ? " room-grid__cell--today" : ""}`}
                          onMouseEnter={() =>
                            setHoveredCell(`${rm.id}-${dateKey}`)
                          }
                          onMouseLeave={() => setHoveredCell(null)}
                          onClick={() => handleRoomCellClick(date, rm.roomName)}
                        >
                          {visibleEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`room-grid__event ${event.category}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalAnchor(e.currentTarget);
                                openEvent(event);
                                setMode("view");
                              }}
                            >
                              <span className="room-grid__event-time">
                                {event.startTime} – {event.endTime}
                              </span>
                              <span className="room-grid__event-title">
                                {event.meetingTitle}
                              </span>
                            </div>
                          ))}

                          {/*  Show more button */}
                          {hiddenCount > 0 && (
                            <div
                              className="room-grid__show-more"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOverflowEvents(cellEvents);
                                setOverflowAnchor(e.currentTarget);
                              }}
                            >
                              +{hiddenCount} more
                            </div>
                          )}

                          {hoveredCell === `${rm.id}-${dateKey}` &&
                            cellEvents.length === 0 && (
                              <div
                                className="room-grid__event room-grid__event--create"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoomCellClick(date, rm.roomName);
                                }}
                              >
                                <div className="create-icon">
                                  <PlusIcon />
                                </div>
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
      {/*   Overflow events popover */}
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
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              p: 1,
            },
          },
        }}
      >
        <div className="room-grid__overflow-list">
          {overflowEvents.map((event) => (
            <div
              key={event.id}
              className={`room-grid__event ${event.category}`}
              style={{ marginBottom: 6 }}
              onClick={(e) => {
                setOverflowAnchor(null);
                setModalAnchor(e.currentTarget);
                openEvent(event);
                setMode("view");
              }}
            >
              <span className="room-grid__event-time">
                {event.startTime} – {event.endTime}
              </span>
              <span className="room-grid__event-title">
                {event.meetingTitle}
              </span>
            </div>
          ))}
        </div>
      </Popover>
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
