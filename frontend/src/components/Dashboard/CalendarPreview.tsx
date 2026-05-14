import dayjs, { Dayjs } from "dayjs";
import { Box, Typography, IconButton, Paper, Chip } from "@mui/material";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Dot, MapPin, X } from "lucide-react";
import { useCalendarEventViewModel } from "../../viewmodels/useCalendarEventViewModel";
import "../../assets/scss/components/Dashboard/CalendarPreview.scss";
import MyButton from "../ui/Button";
import { formatDisplayTime, timeStringToMinutes } from "../../utils/timeUtils";
import { useNavigate } from "react-router-dom";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Extracts r,g,b values from a colorCode string like "rgb(255, 0, 0)"
const extractRgb = (colorCode: string) =>
  colorCode.match(/\((.*?)\)/)?.[1] ?? "0,0,0";

const CalendarPreview: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentDate,
    setcurrentDate,
    bookedDates,
    meetings,
    handleDateClick,
    isInRange,
    dateRange,
    setDateRange,
    clearSelection,
  } = useCalendarEventViewModel();

  const today = dayjs();

  const changeMonth = (direction: number) => {
    setDateRange({ start: null, end: null });
    setcurrentDate((prev) => prev.add(direction, "month"));
  };

  // Builds the grid: leading nulls for empty slots before the 1st of the month
  const getDaysInMonth = (date: Dayjs): (Dayjs | null)[] => {
    const startDay = date.startOf("month").day();
    const days: (Dayjs | null)[] = Array(startDay).fill(null);
    for (let i = 1; i <= date.daysInMonth(); i++) {
      days.push(date.date(i));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const isToday = (d: Dayjs | null) => d?.isSame(today, "day") ?? false;
  const isBooked = (d: Dayjs | null) =>
    d ? bookedDates.has(d.format("YYYY-MM-DD")) : false;

  return (
    <Paper className="calendar-container">
      <Box className="calendar-header">
        <Typography className="title">
          <CalendarIcon size={18} /> Calendar Preview
        </Typography>

        {dateRange.end != null && (
          <MyButton
            className="clearselection-btn"
            startIcon={<X size={16} />}
            text="Clear Selection"
            customVariant="ghost"
            onClick={clearSelection}
          />
        )}
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
          {DAYS_OF_WEEK.map((day) => (
            <Typography key={day} className="day-label">
              {day}
            </Typography>
          ))}

          {days.map((day, index) => (
            <Box
              key={index}
              className={`day-cell ${isInRange(day) ? "selected" : ""} ${isToday(day) ? "today" : ""}`}
              onClick={() => day && handleDateClick(day)}
            >
              {day ? day.date() : ""}
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
          <Typography
            className="today-meetings__header"
            sx={{ fontWeight: 600, fontSize: 19 }}
          >
            {dateRange.start && dateRange.end
              ? `Meetings from ${dateRange.start.format("MMM D")} - ${dateRange.end.format("MMM D")}`
              : dateRange.start
                ? `Meetings on ${dateRange.start.format("MMM D")}`
                : "Select dates"}
          </Typography>

          <div className="today-meetings__list">
            {meetings.map((m) => (
              <Box className="today-meetings__card" key={m.meetingId}>
                <Box className="today-meetings__subcard">
                  <Typography className="today-meetings__title">
                    {m.meetingTitle}
                  </Typography>
                  <Chip
                    label={m.meetingType.name}
                    className="dashboard-upmeetings__chip"
                    style={{
                      background: `rgba(${extractRgb(m.meetingType.colorCode)}, 0.8)`,
                      color: "#fff",
                    }}
                  />
                </Box>
                <div className="today-meetings__subtitle">
                  <Typography sx={{ fontWeight: 500 }}>
                    {m.date ? dayjs(m.date).format("MMM D") : ""}
                  </Typography>
                  <Dot />
                  <Typography>
                    {formatDisplayTime(timeStringToMinutes(m.startTime))} -{" "}
                    {formatDisplayTime(timeStringToMinutes(m.endTime))}
                  </Typography>
                </div>
                <hr />
                <div className="today-meetings__location">
                  <Typography className="today-meetings__roomname">
                    <MapPin size={14} style={{ marginTop: "2px" }} />
                    {m.roomName}
                  </Typography>
                </div>
              </Box>
            ))}
          </div>
        </Box>
      )}

      <MyButton
        className="calenderpreview-btn"
        startIcon={<CalendarIcon size={18} />}
        variant="outlined"
        fullWidth
        text="Open Full Calendar View"
        customVariant="primary"
        onClick={() => navigate("/Calendar")}
      />
    </Paper>
  );
};

export default CalendarPreview;
