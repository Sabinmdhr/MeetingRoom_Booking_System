import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Chip,
  colors,
} from "@mui/material";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Dot,
} from "lucide-react";
import { useCalendarEventViewModel } from "../../viewmodels/useCalendarEventViewModel";
import "../../assets/scss/components/Dashboard/CalendarPreview.scss";
import MyButton from "../ui/Button";
import { formatDisplayTime, timeStringToMinutes } from "../../utils/timeUtils";
import { useNavigate } from "react-router-dom";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarPreview: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentDate,
    setcurrentDate,
    bookedDates,
    meetings,
    selectedDates,
    setSelectedDates,
  } = useCalendarEventViewModel();
  const today = dayjs();

  // const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today);

  // Month navigation
  const changeMonth = (direction: number) => {
    setcurrentDate((prev) => prev.add(direction, "month"));
  };

  // Generate month grid
  const getDaysInMonth = (date: Dayjs) => {
    const startOfMonth = date.startOf("month");
    const daysInMonth = date.daysInMonth();

    const startDay = startOfMonth.day();

    const days: (Dayjs | null)[] = [];

    // empty slots before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(date.date(i));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const isToday = (d: Dayjs | null) => (d ? d.isSame(today, "day") : false);

  const isSelected = (d: Dayjs | null) =>
    d && selectedDates ? d.isSame(selectedDates, "day") : false;

  const isBooked = (d: Dayjs | null) => {
    if (!d) return false;
    return bookedDates.has(d.format("YYYY-MM-DD"));
  };

  return (
    <Paper className="calendar-container">
      <Box className="calendar-header">
        <Typography className="title">
          <CalendarIcon size={18} /> Calendar Preview
        </Typography>
      </Box>

      <Box className="calendar-box">
        <Box className="calendar-nav">
          <IconButton className="nav-btn left" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={18} />
          </IconButton>

          <Typography className="month-label">
            {currentDate.format("MMMM YYYY")}
          </Typography>

          <IconButton className="nav-btn right" onClick={() => changeMonth(1)}>
            <ChevronRight size={18} />
          </IconButton>
        </Box>

        <Box className="calendar-grid">
          {daysOfWeek.map((day) => (
            <Typography key={day} className="day-label">
              {day}
            </Typography>
          ))}

          {days.map((day, index) => (
            <Box
              key={index}
              className={`day-cell 
                ${isSelected(day) ? "selected" : ""} 
                ${isToday(day) ? "today" : ""}`}
              onClick={() => day && setSelectedDates(day)}
            >
              {day ? day.date() : ""}

              {/* BOOKING DOT */}
              {isBooked(day) && <Box className="booking-dot" />}
            </Box>
          ))}
        </Box>
      </Box>

      {meetings.length === 0 ? (
        <Box className="today-meetings__empty">
          <CalendarIcon size={30} className="empty-icon" />
          <Typography className="empty-text">No meetings scheduled</Typography>
        </Box>
      ) : (
        <Box className="today-meetings">
          <Typography className="today-meetings__header">
            {selectedDates && !selectedDates.isSame(today, "day")
              ? `Meetings on ${selectedDates.format("MMM D")}`
              : "Today’s Meetings"}
            <span className="today-meetings__badge">{meetings.length}</span>
          </Typography>
          {meetings.map((m) => (
            <Box className="today-meetings__card" key={m.meetingId}>
              <Box className="today-meetings__subcard">
                <Typography className="today-meetings__title">
                  {m.meetingTitle}
                </Typography>
                <div className="today-meetings__subtitle">
                  <Typography>
                  {formatDisplayTime(timeStringToMinutes(m.startTime))} 
                  </Typography>
                  <Dot/>
                  <Typography>
                  {m.roomName}
                  </Typography>
                </div>
              </Box>
              <Box>
                <Chip
                  label={m.meetingType.name}
                  className="today-meetings__chip"
                  style={{ color: `rgba${m.meetingType.colorCode}` }}
                />
              </Box>
            </Box>
          ))}
          </Box>
      )}
          <MyButton
            variant="outlined"
            fullWidth
            text="Open Full Calender"
            customVariant="ghost"
            onClick={() => navigate("/Calendar")}
          />
    </Paper>
  );
};

export default CalendarPreview;
