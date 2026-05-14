import "../assets/scss/pages/Calendar.scss";
import { Tab, Tabs, Card, CardContent, TextField, MenuItem, Popover } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useCalendarEventViewModel } from "../viewmodels/useCalendarEventViewModel";
import CalendarModal from "../components/Calendar/CalendarModal";
import MyButton from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { CalendarEvent } from "../models/calendar.model";
import { TimeSlotSelector } from "../components/Meeting-Rooms/TimeSlotSelector";
import { useDispatch } from "react-redux";
import { updateBookingRoomFormData } from "../redux/bookRoomSlice";
import { useAppSelector } from "../redux/store";
import { usePermissions } from "../hooks/usePermissions";
import { useBookingRoomViewModel } from "../viewmodels/useBookingRoomViewModel";
import { useSettingsViewModel } from "../viewmodels/useSettingsViewModel";
import { formatDisplayTime, timeStringToMinutes } from "../utils/timeUtils";

// Must stay in sync with $col-width and $col-gap in Calendar.scss
const COL_WIDTH = 180;
const COL_GAP = 8;

// Max events shown per cell before collapsing into "+N more"
const VISIBLE_EVENT_LIMIT = 4;

// Extracts the r,g,b values from a colorCode like "rgb(255, 0, 0)"
const extractRgb = (colorCode: string) =>
  colorCode.match(/\((.*?)\)/)?.[1] ?? "0,0,0";

export const Calendar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const perms = usePermissions();
  const { meetingTypes } = useSettingsViewModel();
  const { updateBookingTimeAndDate, setSlot, slot } = useBookingRoomViewModel();
  const { roomId } = useAppSelector((state) => state.bookingRoom);

  const {
    view,
    setView,
    currentMonth,
    setCurrentMonth,
    eventsByDate,
    openEvent,
    goToNext,
    goToPrev,
    goToToday,
    selectedEvent,
    closeModal,
    setSelectedDates,
    eventData,
    selectedDates,
    eventDataLoading,
    rooms,
    loading,
  } = useCalendarEventViewModel();

  const [mode, setMode] = useState<"view" | null>(null);
  const [modalAnchor, setModalAnchor] = useState<HTMLElement | null>(null);
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(null);
  const [overflowAnchor, setOverflowAnchor] = useState<HTMLElement | null>(null);
  const [overflowEvents, setOverflowEvents] = useState<CalendarEvent[]>([]);
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Scroll sync: the body is the only scrollable element.
  // The header mirrors it via JS so column headers stay aligned.
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  // Set the first room as default once rooms load
  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0].roomName);
      dispatch(updateBookingRoomFormData({ roomId: rooms[0].id }));
    }
  }, [rooms]);

  // Attach scroll sync listener when in month view
  useEffect(() => {
    if (view !== "month") return;

    // Defer to next paint so refs are guaranteed to be populated
    const t = setTimeout(() => {
      const body = bodyScrollRef.current;
      const header = headerScrollRef.current;
      if (!body || !header) return;

      const sync = () => {
        if (isSyncing.current) return;
        isSyncing.current = true;
        header.scrollLeft = body.scrollLeft;
        isSyncing.current = false;
      };

      body.addEventListener("scroll", sync);
      return () => body.removeEventListener("scroll", sync);
    }, 0);

    return () => clearTimeout(t);
  }, [view]);

  const scrollToToday = useCallback(() => {
    const body = bodyScrollRef.current;
    if (!body || !dayjs().isSame(currentMonth, "month")) return;
    const dayIndex = dayjs().date() - 1;
    const offset = dayIndex * (COL_WIDTH + COL_GAP) - body.clientWidth / 2 + COL_WIDTH / 2;
    body.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [currentMonth]);

  // Auto-scroll to today when the view or month changes
  useEffect(() => {
    if (view !== "month") return;
    requestAnimationFrame(() => requestAnimationFrame(scrollToToday));
  }, [view, currentMonth.month(), currentMonth.year(), rooms.length]);

  const todayStr = dayjs().format("YYYY-MM-DD");
  const isDayView = view === "day";
  const isMonthView = view === "month";
  const isPastDate = (date: dayjs.Dayjs) => date.startOf("day").isBefore(dayjs().startOf("day"));

  const gridDates = Array.from({ length: currentMonth.daysInMonth() }, (_, i) =>
    currentMonth.date(i + 1),
  );

  const handleRoomCellClick = (date: dayjs.Dayjs, roomId: number) => {
    goToToday(date);
    setSelectedDates(date);
    setView("day");
    dispatch(updateBookingRoomFormData({ roomId }));
  };

  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setModalAnchor(e.currentTarget as HTMLElement);
    openEvent(event);
    setMode("view");
  };

  const handleRoomSelect = (roomName: string, id: number) => {
    setSelectedRoom(roomName);
    dispatch(updateBookingRoomFormData({ roomId: id }));
  };

  const handleTodayClick = () => {
    if (currentMonth.isSame(dayjs(), "month")) {
      scrollToToday();
    } else {
      goToToday();
    }
  };

  const canProceedToBooking = slot.startTime !== "00:00" || slot.endTime !== "00:00";

  return (
    <Card className="calendar">
      {/* Top bar: navigation, view tabs, room selector, action buttons */}
      <CardContent className="calendar__topbar">
        <div className="cal-bar">
          <div className="cal-bar__left">
            {isMonthView && (
              <div className="cal-nav">
                <MyButton
                  onClick={goToPrev}
                  text=""
                  customVariant="ghost"
                  color="secondary"
                  startIcon={<ChevronLeft size={19} />}
                  size="large"
                />
                <MyButton
                  startIcon={<CalendarIcon size={20} />}
                  text={<span>{currentMonth.format("MMMM YYYY")}</span>}
                  customVariant="ghost"
                  size="medium"
                  className="cal-nav__date-btn"
                  onClick={(e) => setDatePickerAnchor(e.currentTarget)}
                />
                <MyButton
                  customVariant="ghost"
                  onClick={goToNext}
                  text={<ChevronRight size={19} />}
                  color="secondary"
                />
                <div style={{ marginLeft: "25px" }}>
                  <MyButton
                    onClick={handleTodayClick}
                    variant="outlined"
                    customVariant="ghost"
                    text="Today"
                  />
                </div>
              </div>
            )}

            <div className="cal-filters">
              <Tabs
                value={view}
                onChange={(_, v) => {
                  setView(v);
                  if (v === "month") setSelectedRoom(null);
                }}
                className="cal-tabs"
              >
                <Tab label="Day" value="day" />
                <Tab label="Month" value="month" />
              </Tabs>

              {perms.canManageRooms && isDayView && (
                <div className="cal-room-select">
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={selectedRoom ?? ""}
                    onChange={(e) => {
                      const room = rooms.find((r) => r.roomName === e.target.value);
                      if (room) handleRoomSelect(room.roomName, room.id);
                    }}
                  >
                    {rooms.map((rm) => (
                      <MenuItem key={rm.id} value={rm.roomName}>
                        {rm.roomName}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              )}
            </div>
          </div>

          <div className="cal-bar__right">
            {perms.canManageRooms && isDayView && (
              <MyButton
                onClick={() => {
                  updateBookingTimeAndDate({
                    startTime: slot.startTime,
                    endTime: slot.endTime,
                    startDate: slot.startDate,
                  });
                  navigate("/book-room");
                }}
                disabled={!canProceedToBooking}
                variant="contained"
                customVariant={canProceedToBooking ? "dark" : ""}
                startIcon={<Plus size={17} />}
                text="Proceed to booking"
              />
            )}

            {perms.canManageRooms && isMonthView && (
              <MyButton
                onClick={() => navigate("/meeting-rooms")}
                variant="contained"
                customVariant="dark"
                startIcon={<Plus size={17} />}
                text="Add New Meeting"
              />
            )}

            {/* Meeting type color legend shown in day view */}
            {isDayView && (
              <div style={{ display: "flex", gap: "12px" }}>
                {meetingTypes.map((m) => (
                  <div key={m.id} className="cat-legend">
                    <div>
                      <i
                        className="cat-dot"
                        style={{ background: `rgba(${extractRgb(m.colorCode)}, 0.8)` }}
                      />
                      <span>{m.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Main content area */}
      <CardContent className="calendar__main">
        {isDayView && (
          <TimeSlotSelector
            id={roomId}
            key={roomId}
            onSave={setSlot}
            calendarView={true}
            selectedDate={selectedDates}
          />
        )}

        {isMonthView && (
          <div className="room-grid">
            {/* Sticky header row with room label corner + date strip */}
            <div className="room-grid__header">
              <div className="room-grid__corner">Rooms</div>
              <div className="room-grid__date-strip" ref={headerScrollRef}>
                {gridDates.map((date) => {
                  const key = date.format("YYYY-MM-DD");
                  return (
                    <div
                      key={key}
                      className={`room-grid__date-cell${key === todayStr ? " room-grid__date-cell--today" : ""}`}
                    >
                      <span className="room-grid__date-cell__day">{date.format("ddd")}</span>
                      <span className="room-grid__date-cell__num">{date.format("D")}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="room-grid__body">
              <div className="room-grid__labels">
                {rooms.map((rm) => (
                  <div key={rm.id} className="room-grid__label">
                    <span>{rm.roomName}</span>
                  </div>
                ))}
              </div>

              {/* Scrollable grid — only this element scrolls horizontally */}
              <div className="room-grid__scroll" ref={bodyScrollRef}>
                {loading ? (
                  // Skeleton rows while data loads
                  <div className="room-grid__skeleton">
                    {Array.from({ length: 3 }).map((_, ri) => (
                      <div key={ri} className="room-grid__row">
                        {Array.from({ length: 7 }).map((_, ci) => (
                          <div key={ci} className="room-grid__cell room-grid__cell--skeleton" />
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  rooms.map((rm) => (
                    <div key={rm.id} className="room-grid__row">
                      {gridDates.map((date) => {
                        const key = date.format("YYYY-MM-DD");
                        const cellEvents = (eventsByDate[key] ?? []).filter(
                          (e) => e.location === rm.roomName,
                        );
                        const visible = cellEvents.slice(0, VISIBLE_EVENT_LIMIT);
                        const hiddenCount = cellEvents.length - visible.length;
                        const cellId = `${rm.id}-${key}`;
                        const past = isPastDate(date);

                        return (
                          <div
                            key={cellId}
                            className={[
                              "room-grid__cell",
                              key === todayStr ? "room-grid__cell--today" : "",
                              past ? "room-grid__cell--past" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onMouseEnter={() => setHoveredCell(cellId)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => {
                              if (past) return;
                              handleRoomCellClick(date, rm.id);
                            }}
                          >
                            {visible.map((event) => {
                              const rgb = extractRgb(event.meetingType.colorCode);
                              return (
                                <div
                                  key={event.id}
                                  className="room-grid__event"
                                  style={{
                                    borderLeft: `5px solid rgba(${rgb})`,
                                    backgroundColor: `rgba(${rgb}, 0.3)`,
                                  }}
                                  onClick={(e) => handleEventClick(e, event)}
                                >
                                  <span className="room-grid__event__time">
                                    {formatDisplayTime(timeStringToMinutes(event.startTime))} –{" "}
                                    {formatDisplayTime(timeStringToMinutes(event.endTime))}
                                  </span>
                                  <span className="room-grid__event__title">
                                    {event.meetingTitle}
                                  </span>
                                </div>
                              );
                            })}

                            {/* Book strip shown on hover for future dates */}
                            {hoveredCell === cellId && !past && (
                              <div
                                className="room-grid__book-strip"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoomCellClick(date, rm.id);
                                }}
                              >
                                <Plus size={12} strokeWidth={2.5} />
                                <span>Book</span>
                              </div>
                            )}

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
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {/* Date picker popover — clicking a day jumps the calendar to that month */}
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
              if (!d) return;
              setCurrentMonth(d);
              setSelectedDates(d);
              setDatePickerAnchor(null);
            }}
            slotProps={{ actionBar: { actions: [] } }}
          />
        </LocalizationProvider>
      </Popover>

      {/* Overflow popover — shows all events when a cell has more than VISIBLE_EVENT_LIMIT */}
      <Popover
        open={Boolean(overflowAnchor)}
        anchorEl={overflowAnchor}
        onClose={() => setOverflowAnchor(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: { sx: { borderRadius: 2, width: 240, p: 1, boxShadow: "0 8px 30px rgba(0,0,0,0.14)" } },
        }}
      >
        <div className="overflow-list">
          {overflowEvents.map((event) => {
            const rgb = extractRgb(event.meetingType.colorCode);
            return (
              <div
                key={event.id}
                className="room-grid__event"
                style={{
                  borderLeft: `5px solid rgba(${rgb})`,
                  backgroundColor: `rgba(${rgb}, 0.3)`,
                }}
                onClick={(e) => {
                  setOverflowAnchor(null);
                  handleEventClick(e, event);
                }}
              >
                <span className="room-grid__event__time">
                  {formatDisplayTime(timeStringToMinutes(event.startTime))} –{" "}
                  {formatDisplayTime(timeStringToMinutes(event.endTime))}
                </span>
                <span className="room-grid__event__title">{event.meetingTitle}</span>
              </div>
            );
          })}
        </div>
      </Popover>

      <CalendarModal
        open={mode === "view"}
        event={selectedEvent}
        anchorEl={modalAnchor}
        eventData={eventData!}
        eventDataLoading={eventDataLoading}
        onClose={() => {
          setMode(null);
          closeModal();
          setModalAnchor(null);
        }}
        onEdit={() => setMode(null)}
      />
    </Card>
  );
};

export default Calendar;
