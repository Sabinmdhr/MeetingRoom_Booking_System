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
import { set } from "zod";
import { current } from "@reduxjs/toolkit";
import { useAuth } from "../../hooks/useAuth";
import { permissions } from "../../utils/permissions";
import { useLocation } from "react-router-dom";

interface TimeSlotSelectorProps {
  onSave?: (slot: {
    startTime: string;
    endTime: string;
    startDate: string;
  }) => void;
  initialSlot?: { startTime: string; endTime: string };
  id?: number;
  calendarView: boolean;
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
}: TimeSlotSelectorProps) => {
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
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
  const { bookedSlots, handleGetBookedRoomByDay, bookedColor, PastimeColor } =
    useBookingRoomViewModel();

const isOverlapping = (start: number, end: number) => {
  return bookedSlots.some((slot) => {
    const slotStart = timeStringToMinutes(slot.start);
    const slotEnd = timeStringToMinutes(slot.end);

    return start < slotEnd && end > slotStart;
  });
};
  const {
    formattedDate,
    isToday,
    changeDate,
    jumpToToday,
    backendFormattedDate,
    isPastDay,
  } = useRoomTimeslotViewModel();

  useEffect(() => {
    setStartTime(0);
    setEndTime(0);
  }, [backendFormattedDate]);
  const { roomId } = useAppSelector((state) => state.bookingRoom);
  useEffect(() => {
    handleGetBookedRoomByDay(backendFormattedDate, roomId);
    console.log("Room", roomId);
  }, [backendFormattedDate]);

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
      startTime: minutesToTimeString(startTime),
      endTime: minutesToTimeString(endTime),
      startDate: backendFormattedDate,
    });
    // updateBookingTimeAndDate({startTime, endTime, date:formattedDate})
    console.log(minutesToTimeString(startTime));
    console.log(bookedSlots, "bookedslots");
    console.log(minutesToTimeString(endTime));
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
      initialStart: startTime,
      initialEnd: endTime,
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
    if (
      isOverlapping((newStart), (newEnd))
    )
      return;
    if (
      isOverlapping((newStart), (newEnd))
    )
      return;

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

          // Keep within bounds
          if (newStart < START_MINUTES) newStart = START_MINUTES;
          if (newStart + duration > END_MINUTES)
            newStart = END_MINUTES - duration;
          if (isPastDay) return;
          if (isToday && newStart < currentMinutes) return;

          if (
            isOverlapping(
              (newStart ),
              (newStart + duration),
            )
          )
            return;

          setStartTime(newStart);
          setEndTime(newStart + duration);
        } else if (interaction.mode === "resize-top") {
          let newStart = interaction.initialStart + snappedDelta;
          if (newStart < START_MINUTES) newStart = START_MINUTES;
          if (newStart > endTime - 10) newStart = endTime - 10; // Min 10 min duration
          if (isPastDay) return;
          if (isToday && newStart < currentMinutes) return;

          if (
            isOverlapping(
              (newStart ),
              (endTime),
            )
          )
            return;
          setStartTime(newStart);
        } else if (interaction.mode === "resize-bottom") {
          let newEnd = interaction.initialEnd + snappedDelta;
          if (newEnd > END_MINUTES) newEnd = END_MINUTES;
          if (newEnd < startTime + 10) newEnd = startTime + 10; // Min 10 min duration

          if (
            isOverlapping(
              (startTime),
              (newEnd),
            )
          )
            return;
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
          {calendarView && (
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
            style={!calendarView ? { marginLeft: "50%" } : {}}
          >
            <Typography className="timeslot-date">{formattedDate}</Typography>
            <Typography className="jump-today" onClick={jumpToToday}>
              Jump to Today
            </Typography>
          </Box>
          <MyButton
            onClick={() => changeDate(1)}
            variant="outlined"
            text="Next"
            customVariant="ghost"
            endIcon={<ChevronRight size={18} />}
          />
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
                ...(calendarView && {
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
              {calendarView ? (
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
              ) : (
                ` ${formatDisplayTime(timeStringToMinutes(slot.start))} -
              ${formatDisplayTime(timeStringToMinutes(slot.end))}`
              )}
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
          {startTime != 0 && (
            <div
              className="slot"
              style={{
                top: getYFromMinutes(startTime),
                height: (endTime - startTime) * MINUTE_HEIGHT,
                display: "flex",
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

              {mannualScroll && (
                <div className="content">
                  <div className="timeBox">{formatDisplayTime(startTime)}</div>
                  <div className="separator">-</div>
                  <div className="timeBox">{formatDisplayTime(endTime)}</div>
                </div>
              )}

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

      <div className="footer">
        <div className="timeDuration">
          <div className="timeDisplayWrapper">
            <div className="timeBox">{formatDisplayTime(startTime)}</div>
            <div className="separator">-</div>
            <div className="timeBox">{formatDisplayTime(endTime)}</div>
          </div>
          <div className="durationDisplay">
            Duration: {formatDuration(startTime, endTime)}
          </div>
        </div>
      </div>
    </div>
  );
};
