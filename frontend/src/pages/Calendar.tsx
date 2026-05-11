import "../assets/scss/pages/Calendar.scss";
import {
  Tab,
  Tabs,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Popover,
  alpha,
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
import { TimeSlotSelector } from "../components/Meeting-Rooms/TimeSlotSelector";
import { useDispatch } from "react-redux";
import { updateBookingRoomFormData } from "../redux/bookRoomSlice";
import { useAppSelector } from "../redux/store";
import { usePermissions } from "../hooks/usePermissions";
import { useBookingRoomViewModel } from "../viewmodels/useBookingRoomViewModel";
import { useSettingsViewModel } from "../viewmodels/useSettingsViewModel";

// Must stay in sync with $col-width and $col-gap in Calendar.scss
const COL_WIDTH = 180;
const COL_GAP = 8;

// Max events rendered per cell before collapsing into "+N more"
const VISIBLE_EVENT_LIMIT = 4;

export const Calendar = () => {
  const navigate = useNavigate();
  const perms = usePermissions();
  const { meetingTypes } = useSettingsViewModel();
  const { updateBookingTimeAndDate, setSlot, slot, PastimeColor, bookedColor } =
    useBookingRoomViewModel();

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
    loading,
  } = useCalendarEventViewModel();

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
  const { roomId } = useAppSelector((state) => state.bookingRoom);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  //  Scroll sync
  // Body is the only user-scrollable element. Header mirrors it via JS.
  // We use a setTimeout so the listener always attaches after React has painted
  // the month-view DOM (fixes the intermittent "header doesn't scroll" bug).
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0].roomName);
      dispatch(updateBookingRoomFormData({ roomId: rooms[0].id }));
    }
  }, [rooms]);

  useEffect(() => {
    if (view !== "month") return;

    // Defer to next paint — refs may be null if effect fires before DOM update
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
      // Store cleanup on the element so we can remove it correctly
      (body as any)._calSyncCleanup = () =>
        body.removeEventListener("scroll", sync);
    }, 0);

    return () => {
      clearTimeout(t);
      const body = bodyScrollRef.current;
      if (body && (body as any)._calSyncCleanup) {
        (body as any)._calSyncCleanup();
        delete (body as any)._calSyncCleanup;
      }
    };
  }, [view]);

  //  Scroll to today
  const scrollToToday = useCallback(() => {
    const body = bodyScrollRef.current;
    if (!body) return;
    if (!dayjs().isSame(currentMonth, "month")) return;

    const dayIndex = dayjs().date() - 1;
    const offset =
      dayIndex * (COL_WIDTH + COL_GAP) - body.clientWidth / 2 + COL_WIDTH / 2;
    body.scrollTo({ left: Math.max(0, offset), behavior: "smooth" });
  }, [currentMonth]);

  // Auto-scroll on mount, view switch, and month navigation
  useEffect(() => {
    if (view !== "month") return;
    const t = setTimeout(scrollToToday, 120);
    return () => clearTimeout(t);
  }, [view, currentMonth.month(), currentMonth.year(), scrollToToday]);

  //  Derived
  const todayStr = dayjs().format("YYYY-MM-DD");
  const isDayView = view === "day";
  const isMonthView = view === "month";

  const gridDates = Array.from({ length: currentMonth.daysInMonth() }, (_, i) =>
    currentMonth.date(i + 1),
  );

  const dayViewEvents = (() => {
    const all = eventsByDateHour[currentMonth.format("YYYY-MM-DD")] ?? {};
    if (!selectedRoom) return all;
    const out: typeof all = {};
    for (const h in all)
      out[h] = all[h].filter((e) => e.location === selectedRoom);
    return out;
  })();

  //  Handlers
  const handleRoomCellClick = (date: dayjs.Dayjs, roomName: string) => {
    setSelectedRoom(roomName);
    goToToday(date);
    setSelectedDates(date);
    setView("day");
  };

  const dispatch = useDispatch();
  const handleEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    e.stopPropagation();
    setModalAnchor(e.currentTarget as HTMLElement);
    openEvent(event);
    setMode("view");
  };

  const handleTodayClick = () => {
    if (currentMonth.isSame(dayjs(), "month")) {
      scrollToToday();
    } else {
      goToToday();
    }
  };

  //  Render
  return (
    <Card className="calendar">
      {/* TOP BAR */}
      <CardContent className="calendar__topbar">
        <div className="cal-bar">
          <div className="cal-bar__left">
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
                <CalendarIcon size={15} />
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

              {isDayView && (
                <div className="cal-room-select">
                  <TextField
                    select
                    fullWidth
                    size="small"
                    value={selectedRoom}
                    onChange={(e) => {
                      setSelectedRoom(e.target.value);
                    }}
                  >
                    <MenuItem value="All Rooms">All Rooms</MenuItem>
                    {rooms.map((rm) => (
                      <MenuItem
                        key={rm.id}
                        value={rm.roomName}
                        onClick={() => {
                          dispatch(
                            updateBookingRoomFormData({
                              roomId: rm.id,
                            }),
                          );
                        }}
                      >
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
                }}
                disabled={
                  slot.startTime === "00:00" && slot.endTime === "00:00"
                }
                variant="contained"
                customVariant={`${slot.startTime != "00:00" || slot.endTime != "00:00" ? `dark` : ""}`}
                startIcon={<Plus size={17} />}
                text="Procced to booking"
              />
            )}
            {perms.canManageRooms && !isDayView && (
              <MyButton
                onClick={() => {
                  navigate("/meeting-rooms");
                }}
                variant="contained"
                customVariant="dark"
                startIcon={<Plus size={17} />}
                text="Add New Meeting"
              />
            )}
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "space-between",
              }}
            >
              {isDayView &&
                meetingTypes.map((m) => (
                  <div className="cat-legend">
                    <i
                      className="cat-dot "
                      style={{ background: `rgb${m.colorCode}` }}
                    />
                    <span>{m.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </CardContent>

      {/* MAIN */}
      <CardContent className="calendar__main">
        {/* DAY VIEW */}
        {isDayView && (
          <TimeSlotSelector
            id={roomId}
            key={roomId}
            onSave={setSlot}
            calendarView={true}
          />
        )}

        {/* MONTH GRID */}
        {isMonthView && (
          <div className="room-grid">
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

            <div className="room-grid__body">
              <div className="room-grid__labels">
                {rooms.map((rm) => (
                  <div key={rm.id} className="room-grid__label">
                    <span>{rm.roomName}</span>
                  </div>
                ))}
              </div>

              {/* THE only scrollable element */}
              <div className="room-grid__scroll" ref={bodyScrollRef}>
                {/* Loading skeleton — shown while rooms or events are fetching */}
                {loading ? (
                  <div className="room-grid__skeleton">
                    {Array.from({ length: 3 }).map((_, ri) => (
                      <div key={ri} className="room-grid__row">
                        {Array.from({ length: 7 }).map((_, ci) => (
                          <div
                            key={ci}
                            className="room-grid__cell room-grid__cell--skeleton"
                          />
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
                        const visible = cellEvents.slice(
                          0,
                          VISIBLE_EVENT_LIMIT,
                        );
                        const hiddenCount = cellEvents.length - visible.length;
                        const cellId = `${rm.id}-${key}`;
                        const isHovered = hoveredCell === cellId;

                        return (
                          <div
                            key={cellId}
                            className={`room-grid__cell${key === todayStr ? " room-grid__cell--today" : ""}`}
                            onMouseEnter={() => setHoveredCell(cellId)}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => {
                              handleRoomCellClick(date, rm.roomName);
                              dispatch(
                                updateBookingRoomFormData({ roomId: rm.id }),
                              );
                            }}
                          >
                            {visible.map((event) => {
                              const raw = event.meetingType?.colorCode;

                              return (
                                <div
                                  key={event.id}
                                  style={{
                                    borderLeft: `5px solid rgb${raw}`,
                                    backgroundColor: alpha(`rgb${raw}`, 0.3),
                                    // opacity: 0.6,
                                  }}
                                  className="room-grid__event"
                                  onClick={(e) => handleEventClick(e, event)}
                                >
                                  <span className="room-grid__event__time">
                                    {event.startTime} – {event.endTime}
                                  </span>
                                  <span className="room-grid__event__title">
                                    {event.meetingTitle}
                                  </span>
                                </div>
                              );
                            })}
                            {/* {visible.map((event) => (
                              <div
                                key={event.id}
                                style={{
                                  backgroundColor: `rgba(${colors})`,
                                }}
                                className={`room-grid__event`}
                                onClick={(e) => handleEventClick(e, event)}
                              >
                                <span className="room-grid__event__time">
                                  {event.startTime} – {event.endTime}
                                </span>
                                <span className="room-grid__event__title">
                                  {event.meetingTitle}
                                </span>
                              </div>
                            ))} */}

                            {isHovered && (
                              <div
                                className="room-grid__book-strip"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRoomCellClick(date, rm.roomName);
                                  dispatch(
                                    updateBookingRoomFormData({
                                      roomId: rm.id,
                                    }),
                                  );
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

      {/* DATE PICKER
          - slotProps removes the OK/Cancel bar so clicking a day fires immediately
          - onAccept is the correct event for "user confirmed a date"             */}
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
            // onAccept fires when the user clicks a day (no OK button needed)
            onAccept={(d) => {
              if (d) {
                setCurrentMonth(d);
                setSelectedDates(d);
              }
              setDatePickerAnchor(null);
            }}
            // Remove the action bar (OK / Cancel buttons) entirely
            slotProps={{
              actionBar: { actions: [] },
            }}
          />
        </LocalizationProvider>
      </Popover>

      {/* OVERFLOW POPOVER */}
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
              boxShadow: "0 8px 30px rgba(0,0,0,0.14)",
            },
          },
        }}
      >
        <div className="overflow-list">
          {overflowEvents.map((event) => {
            const raw = event.meetingType?.colorCode;

            return (
              <div
                key={event.id}
                className={`room-grid__event`}
                onClick={(e) => {
                  setOverflowAnchor(null);
                  handleEventClick(e, event);
                }}
                style={{
                  borderLeft: `5px solid rgb${raw}`,
                  background: alpha(`rgb${raw}`, 0.3),
                }}
              >
                <span className="room-grid__event__time">
                  {event.startTime} – {event.endTime}
                </span>
                <span className="room-grid__event__title">
                  {event.meetingTitle}
                </span>
              </div>
            );
          })}
        </div>
      </Popover>

      {/* MODALS */}
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
