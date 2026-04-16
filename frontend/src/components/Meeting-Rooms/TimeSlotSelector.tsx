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
import dayjs from "dayjs";
import { useRoomTimeslotViewModel } from "../../viewmodels/useRoomTimeslotViewModel";
import { Button, Divider, Typography, Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingRoomViewModel } from "../../viewmodels/useBookingRoomViewModel";
interface TimeSlotSelectorProps {
  onSave?: (slot: { startTime: string; endTime: string }) => void;
  initialSlot?: { startTime: string; endTime: string };
}

const PIXELS_PER_HOUR = 60;
const MINUTE_HEIGHT = PIXELS_PER_HOUR / 60; // 1px per minute
const START_HOUR = 7;
const END_HOUR = 18;
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
  initialSlot,
}: TimeSlotSelectorProps) => {
  const [startTime, setStartTime] = useState<number>(
    initialSlot ? timeStringToMinutes(initialSlot.startTime) : 600, // 10:00 default
  );
  const [endTime, setEndTime] = useState<number>(
    initialSlot ? timeStringToMinutes(initialSlot.endTime) : 610, // 10:10 default
  );

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
  const { updateBookingTimeAndDate } = useBookingRoomViewModel();

  useEffect(() => {
    onSave?.({
      startTime: minutesToTimeString(startTime),
      endTime: minutesToTimeString(endTime),
    });
    // updateBookingTimeAndDate({startTime, endTime, date:formattedDate})
    console.log(minutesToTimeString(startTime));
  }, [startTime, endTime, onSave]);

  const getYFromMinutes = (minutes: number) =>
    (minutes - START_MINUTES) * MINUTE_HEIGHT;
  const getMinutesFromY = (y: number) =>
    Math.round(y / MINUTE_HEIGHT) + START_MINUTES;

  const handlePointerDown = (e: React.PointerEvent, mode: InteractionMode) => {
    e.stopPropagation();
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
    if (interaction.mode !== "none") return;

    const timelineRect = timelineRef.current?.getBoundingClientRect();
    if (!timelineRect) return;

    const clickY =
      e.clientY - timelineRect.top + (timelineRef.current?.scrollTop || 0);
    const clickedMinutes = getMinutesFromY(clickY);
    const snappedStart = snapToInterval(clickedMinutes, 5);

    const newStart = clamp(snappedStart, START_MINUTES, END_MINUTES - 10);
    const newEnd = clamp(newStart + 10, START_MINUTES + 10, END_MINUTES);

    setStartTime(newStart);
    setEndTime(newEnd);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (interaction.mode === "none") return;

    const deltaY = e.clientY - interaction.startY;
    const deltaMinutes = Math.round(deltaY / MINUTE_HEIGHT);
    const snappedDelta = snapToInterval(deltaMinutes, 5);

    if (interaction.mode === "drag") {
      const duration = interaction.initialEnd - interaction.initialStart;
      let newStart = interaction.initialStart + snappedDelta;

      // Keep within bounds
      if (newStart < START_MINUTES) newStart = START_MINUTES;
      if (newStart + duration > END_MINUTES) newStart = END_MINUTES - duration;

      setStartTime(newStart);
      setEndTime(newStart + duration);
    } else if (interaction.mode === "resize-top") {
      let newStart = interaction.initialStart + snappedDelta;
      if (newStart < START_MINUTES) newStart = START_MINUTES;
      if (newStart > endTime - 5) newStart = endTime - 5; // Min 5 min duration
      setStartTime(newStart);
    } else if (interaction.mode === "resize-bottom") {
      let newEnd = interaction.initialEnd + snappedDelta;
      if (newEnd > END_MINUTES) newEnd = END_MINUTES;
      if (newEnd < startTime + 5) newEnd = startTime + 5; // Min 5 min duration
      setEndTime(newEnd);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setInteraction({ ...interaction, mode: "none" });
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const hours = Array.from(
    { length: END_HOUR - START_HOUR + 1 },
    (_, i) => START_HOUR + i,
  );

  const { formattedDate, changeDate, jumpToToday,backendFormattedDate } = useRoomTimeslotViewModel();

  return (
    <div className="container" style={{ height: TOTAL_HEIGHT }}>
      <div className="header">
        {/* <div className="day">{dayjs().format("ddd")}</div> */}
        {/* <div className="date">{dayjs().format("MMM D")}</div> */}
        <Box className="timeslot-nav">
          <Button
            className="timeslot-btn"
            size="small"
            onClick={() => changeDate(-1)}
            variant="outlined"
          >
            <ChevronLeft size={18} />
            Previous
          </Button>
          <Box className="date">
            <Typography className="timeslot-date">{formattedDate}</Typography>
            <Typography className="jump-today" onClick={jumpToToday}>
              Jump to Today
            </Typography>
          </Box>
          <Button
            className="timeslot-btn"
            size="small"
            onClick={() => changeDate(1)}
            variant="outlined"
          >
            Next
            <ChevronRight size={18} />
          </Button>
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
                height: 1,
                background: "#eee",
              }}
            />
          ))}

          {/* The Slot */}
          <div
            className="slot"
            style={{
              top: getYFromMinutes(startTime),
              height: (endTime - startTime) * MINUTE_HEIGHT,
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
              {/* Slot content could go here */}
              <div className="timeBox">{formatDisplayTime(startTime)}</div>
              <div className="separator">-</div>
              <div className="timeBox">{formatDisplayTime(endTime)}</div>
            </div>

            <div
              className="slotHandle bottom"
              onPointerDown={(e) => handlePointerDown(e, "resize-bottom")}
            >
              <div className="dot"></div>
            </div>
          </div>
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

        <div className="bookRoomActions">
          <Button variant="contained">Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              updateBookingTimeAndDate({
                startTime: minutesToTimeString(startTime),
                endTime: minutesToTimeString(endTime),
                date: backendFormattedDate,
              });
            }}
          >
            Proceed to Booking
          </Button>
        </div>
      </div>
    </div>
  );
};
