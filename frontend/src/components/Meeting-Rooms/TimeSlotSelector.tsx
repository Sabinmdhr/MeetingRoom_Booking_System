import React, { useState, useRef, useEffect } from "react";
import "../../assets/scss/components/TimeSlotSelector.scss";
import {
  clamp,
  formatDisplayTime,
  formatDuration,
  minutesToTimeString,
  snapToInterval,
  timeStringToMinutes,
} from "../../utils/timeUtils";
import { useRoomTimeslotViewModel } from "../../viewmodels/useRoomTimeslotViewModel";
import { Typography, Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingRoomViewModel } from "../../viewmodels/useBookingRoomViewModel";
import MyButton from "../ui/Button";
import { useAppSelector } from "../../redux/store";
import { useAuth } from "../../hooks/useAuth";
import { permissions } from "../../utils/permissions";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

interface TimeSlotSelectorProps {
  onSave?: (slot: {
    startTime: string;
    endTime: string;
    startDate: string;
  }) => void;
  initialSlot?: { startTime: string; endTime: string };
  id?: number;
  calendarView?: boolean;
  setCalendarView?: (val: boolean) => void;
  DialogView?: boolean;
  editingId?: number;
  selectedDate?: Dayjs;
}

const PIXELS_PER_HOUR = 120;
const MINUTE_HEIGHT = PIXELS_PER_HOUR / 60; // 1px per minute
const START_HOUR = 0;
const END_HOUR = 24;
const START_MINUTES = START_HOUR * 60;
const END_MINUTES = END_HOUR * 60;
const TOTAL_HEIGHT = (END_HOUR - START_HOUR) * PIXELS_PER_HOUR;

type InteractionMode =
  | "none"
  | "drag"
  | "resize-top"
  | "resize-bottom"
  | "create";
export const TimeSlotSelector = ({
  onSave,
  calendarView,
  DialogView,
  editingId,
  setCalendarView,
  selectedDate,
}: TimeSlotSelectorProps) => {
  const {
    formattedDate,
    changeDate,
    jumpToToday,
    backendFormattedDate,
    isPastDay,
    currentDate,
    setCurrentDate,
    getLocalDateString,
  } = useRoomTimeslotViewModel();

  const { roomId, startDate } = useAppSelector((state) => state.bookingRoom);
  const editingDate = startDate ? dayjs(startDate) : currentDate;

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(dayjs(selectedDate));
    }
  }, [selectedDate]);
  const bookingRoomFormData = useAppSelector((state) => state.bookingRoom);
  const defaultStartTime = bookingRoomFormData?.startTime
    ? timeStringToMinutes(bookingRoomFormData.startTime)
    : null;
  const defaultEndTime = bookingRoomFormData?.startTime
    ? timeStringToMinutes(bookingRoomFormData.endTime)
    : null;
  const isToday = editingDate.isSame(dayjs(), "day");
  const [startTime, setStartTime] = useState<number | null>(defaultStartTime);
  const [endTime, setEndTime] = useState<number | null>(defaultEndTime);
  const { role } = useAuth();
  const perms = permissions[role as keyof typeof permissions];
  const [interaction, setInteraction] = useState<{
    mode: InteractionMode;
    startY: number;
    initialStart: number;
    initialEnd: number;
  }>({
    mode: "none",
    startY: 0,
    initialStart: 0,
    initialEnd: 0,
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  const {
    bookedSlots,
    handleGetBookedRoomByDay,
    updateBookingTimeAndDate,
    bookedColor,
    PastimeColor,
    selectedColor,
  } = useBookingRoomViewModel();

  // const navigate = useNavigate();

  const isOverlapping = (start: number, end: number) => {
    return bookedSlots.some((slot) => {
      if (slot.id === editingId) return false;
      const slotStart = timeStringToMinutes(slot.start);
      const slotEnd = timeStringToMinutes(slot.end);

      return start < slotEnd && end > slotStart;
    });
  };
  // useEffect(() => {
  //   setStartTime(0);
  //   setEndTime(0);
  // }, [backendFormattedDate]);

  useEffect(() => {
    handleGetBookedRoomByDay(backendFormattedDate, roomId);
    setStartTime(defaultStartTime);
    setEndTime(defaultEndTime);
    // setStartTime(null);
  }, [backendFormattedDate]);
  useEffect(() => {
    handleGetBookedRoomByDay(editingDate.format("YYYY-MM-DD"), roomId);
    console.log("Room", roomId);
  }, [editingDate]);
  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };
  useEffect(() => {
    if (!timelineRef.current) return;
    const minutesNow = getCurrentMinutes();

    const min = START_MINUTES;
    const max = END_HOUR * 60;

    const clamped = Math.max(min, Math.min(minutesNow, max));
    const y = getYFromMinutes(clamped);

    timelineRef.current?.scrollTo({ top: y - 50, behavior: "smooth" });
  }, []);
  useEffect(() => {
    onSave?.({
      startTime: minutesToTimeString(startTime ?? 0),
      endTime: minutesToTimeString(endTime ?? 0),
      startDate: backendFormattedDate,
    });
  }, [startTime, endTime, onSave]);

  const getYFromMinutes = (minutes: number) =>
    (minutes - START_MINUTES) * MINUTE_HEIGHT;
  const getMinutesFromY = (y: number) =>
    Math.round(y / MINUTE_HEIGHT) + START_MINUTES;

  const [mannualScroll, setManualScroll] = useState(false);
  const handlePointerDown = (e: React.PointerEvent, mode: InteractionMode) => {
    if (!perms.canBookRoom) return;
    e.stopPropagation();
    setManualScroll(true);
    const timelineRect = timelineRef.current?.getBoundingClientRect();
    if (!timelineRect) return;

    setInteraction({
      mode,
      startY: e.clientY,
      initialStart: startTime ?? 0,
      initialEnd: endTime ?? 0,
    });

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleGridClick = (e: React.PointerEvent) => {
    if (!perms.canBookRoom) return;
    if (interaction.mode !== "none") return;

    const timelineRect = timelineRef.current?.getBoundingClientRect();
    if (!timelineRect) return;

    // setManualScroll(true);
    const clickY =
      e.clientY - timelineRect.top + (timelineRef.current?.scrollTop || 0);
    const clickedMinutes = getMinutesFromY(clickY);
    const snappedStart = snapToInterval(clickedMinutes, 5);

    const newStart = clamp(snappedStart, START_MINUTES, END_MINUTES - 10);
    const newEnd = clamp(newStart + 10, START_MINUTES + 10, END_MINUTES);
    if (isPastDay) return;
    if (isToday && newStart < currentMinutes) return;
    if (isOverlapping(newStart, newEnd)) return;

    setStartTime(newStart);
    setEndTime(newEnd);
  };

  const handlePointerMove = perms.canBookRoom
    ? (e: React.PointerEvent) => {
        if (interaction.mode === "none") return;

        const deltaY = e.clientY - interaction.startY;
        const deltaMinutes = Math.round(deltaY / MINUTE_HEIGHT);
        const snappedDelta = snapToInterval(deltaMinutes, 5);

        if (interaction.mode === "drag") {
          const duration = interaction.initialEnd - interaction.initialStart;
          let newStart = interaction.initialStart + snappedDelta;
          newStart = clamp(newStart, START_MINUTES, END_MINUTES - duration);
          // Keep within bounds
          if (newStart < START_MINUTES) newStart = START_MINUTES;
          if (newStart + duration > END_MINUTES)
            newStart = END_MINUTES - duration;
          if (isPastDay) return;
          if (isToday && newStart < currentMinutes) return;

          if (isOverlapping(newStart, newStart + duration)) return;

          setStartTime(newStart);
          setEndTime(newStart + duration);
        } else if (interaction.mode === "resize-top") {
          let newStart = interaction.initialStart + snappedDelta;
          newStart = clamp(newStart, START_MINUTES, endTime ?? 0 - 10);
          // if (newStart < START_MINUTES) newStart = START_MINUTES;
          // if (newStart > endTime - 10) newStart = endTime - 10; // Min 10 min duration
          if (isPastDay) return;
          if (isToday && newStart < currentMinutes) return;

          if (isOverlapping(newStart, endTime ?? 0)) return;
          setStartTime(newStart);
        } else if (interaction.mode === "resize-bottom") {
          let newEnd = interaction.initialEnd + snappedDelta;
          if (newEnd > END_MINUTES) newEnd = END_MINUTES;
          if (newEnd < (startTime ?? 0) + 10) newEnd = (startTime ?? 0) + 10; // Min 10 min duration

          if (isOverlapping(startTime ?? 0, newEnd)) return;
          setEndTime(newEnd);
        }
      }
    : undefined;

  const handlePointerUp = (e: React.PointerEvent) => {
    setInteraction({ ...interaction, mode: "none" });
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const hours = Array.from(
    { length: END_HOUR - START_HOUR + 1 },
    (_, i) => START_HOUR + i,
  );
  const currentMinutes = getCurrentMinutes();

  return (
    <div className="container">
      <div className="header">
        <Box className="timeslot-nav">
          {calendarView && !DialogView && (
            <MyButton
              onClick={() => changeDate(-1)}
              variant="outlined"
              text="Previous"
              customVariant="ghost"
              endIcon={<ChevronLeft size={18} />}
            />
          )}
          <Box
            className="date"
            style={
              !calendarView
                ? { marginLeft: "50%" }
                : DialogView
                  ? {
                      margin: " 4px auto",
                    }
                  : {}
            }
          >
            <Typography className="timeslot-date">{formattedDate}</Typography>
            {!DialogView && (
              <Typography className="jump-today" onClick={jumpToToday}>
                Jump to Today
              </Typography>
            )}
          </Box>
          {!DialogView && (
            <MyButton
              onClick={() => changeDate(1)}
              variant="outlined"
              text="Next"
              customVariant="ghost"
              endIcon={<ChevronRight size={18} />}
            />
          )}
        </Box>
      </div>

      <div className="timelineWrapper" ref={timelineRef}>
        <div className="timeGutter">
          {hours.map((hour) => (
            <div key={hour} className="timeLabel">
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        <div
          className="grid"
          style={{ height: TOTAL_HEIGHT }}
          onPointerDown={handleGridClick}
        >
          {/* Horizontal grid lines */}
          {hours.map((hour) => (
            <div
              key={hour}
              style={{
                position: "absolute",
                top: (hour - START_HOUR) * PIXELS_PER_HOUR,
                width: "100%",
                // height: 1,
                background: "#eee",
              }}
            />
          ))}
          {bookedSlots.map((slot, index) => (
            <div
              key={index}
              className="slot"
              style={{
                position: "absolute",
                top: getYFromMinutes(timeStringToMinutes(slot.start)),
                height:
                  (timeStringToMinutes(slot.end) -
                    timeStringToMinutes(slot.start)) *
                  MINUTE_HEIGHT,

                backgroundColor: bookedColor,
                border: `1px solid ${bookedColor}`,
                ...(calendarView &&
                  !DialogView && {
                    backgroundColor: `rgb${slot.color}`,
                    border: `1px solid rgb${slot.color}`,
                    fontSize: 10,
                    // alignItems: "normal",
                  }),
                ...(calendarView &&
                  !DialogView && {
                    backgroundColor: `rgb${slot.color}`,
                    border: `1px solid rgb${slot.color}`,
                    fontSize: 10,
                    // alignItems: "normal",
                  }),
                justifyContent: "center",
                ...(!calendarView && {
                  alignItems: "center",
                }),
                zIndex: 999,
                color: "white",
                display: "flex",
                padding: "0px",
                cursor: "not-allowed",
              }}
            >
              {calendarView
                ? !DialogView && (
                    <div
                      style={{
                        display: "flex",
                        // flexDirection: "column",
                        justifyContent: "space-between",
                        margin: "0px 12px",
                      }}
                    >
                      <Typography>{slot.title}</Typography>
                      <Typography>
                        {formatDisplayTime(timeStringToMinutes(slot.start))} -
                        {formatDisplayTime(timeStringToMinutes(slot.end))}
                      </Typography>
                    </div>
                  )
                : ` ${formatDisplayTime(timeStringToMinutes(slot.start))} -
              ${formatDisplayTime(timeStringToMinutes(slot.end))}`}
            </div>
          ))}
          {/* ---------------------prev past timeslot---------------- */}
          {isToday && (
            <div
              className="slot"
              style={{
                top: 0,
                height: snapToInterval(currentMinutes * MINUTE_HEIGHT, 5),
                backgroundColor: PastimeColor,
                pointerEvents: "auto",
                cursor: "not-allowed",
                border: "none",
              }}
            ></div>
          )}
          {isPastDay && (
            <div
              className="slot"
              style={{
                top: 0,
                height: "100%",
                backgroundColor: PastimeColor,
                pointerEvents: "auto",
                cursor: "not-allowed",
                border: "none",
              }}
            ></div>
          )}
          {/* The Slot */}

          {startTime !== null && endTime !== null && (
            <div
              className="slot"
              style={{
                top: getYFromMinutes(startTime),
                height: Math.max((endTime - startTime) * MINUTE_HEIGHT, 10),
                display: "flex",
                zIndex: 999999,
                background: `${selectedColor}`,
                // opacity: startTime ===0 ? 0: 1
                justifyContent: "center",
                alignItems: "center",
              }}
              onPointerDown={(e) => handlePointerDown(e, "drag")}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              <div
                className={`slotHandle top`}
                onPointerDown={(e) => handlePointerDown(e, "resize-top")}
              >
                <div className="dot" />
              </div>

              <div className="content">
                <div className="timeDisplayWrapper">
                  <div className="timeBox">
                    {formatDisplayTime(startTime ?? 0)}
                  </div>
                  <div className="separator">-</div>
                  <div className="timeBox">
                    {formatDisplayTime(endTime ?? 0)}
                  </div>
                </div>
                <div className="durationDisplay">
                  Duration: {formatDuration(startTime ?? 0, endTime ?? 0)}
                </div>
              </div>

              <div
                className="slotHandle bottom"
                onPointerDown={(e) => handlePointerDown(e, "resize-bottom")}
              >
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {DialogView ? (
        <div className="bookRoomActions">
          <MyButton
            variant="contained"
            text="Cancel"
            customVariant="ghost"
            onClick={() => {
              setCalendarView?.(false);
              // navigate(-1);
            }}
          />
          <MyButton
            variant="contained"
            text="Proceed to Booking"
            customVariant="dark"
            onClick={() => {
              updateBookingTimeAndDate({
                startTime: minutesToTimeString(startTime ?? 0),
                endTime: minutesToTimeString(endTime ?? 0),
                startDate:
                  editingDate.format("YYYY-MM-DD") ?? backendFormattedDate,
              });
              setCalendarView?.(false);
            }}
          />
        </div>
      ) : (
        mannualScroll && (
          <div className="footer">
            <div className="timeDuration">
              <div className="timeDisplayWrapper">
                <div className="timeBox">
                  {formatDisplayTime(startTime ?? 0)}
                </div>
                <div className="separator">-</div>
                <div className="timeBox">{formatDisplayTime(endTime ?? 0)}</div>
              </div>
              <div className="durationDisplay">
                Duration: {formatDuration(startTime ?? 0, endTime ?? 0)}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};
