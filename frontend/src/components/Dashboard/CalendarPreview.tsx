import { useState } from "react";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import "../../assets/scss/components/Dashboard/CalendarPreview.scss";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const CalendarPreview: React.FC = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    return days;
  };

  const isToday = (day: number | null) => {
    return (
      day !== null &&
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number | null) => {
    if (!selectedDate || day === null) return false;

    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const days = getDaysInMonth(currentDate);

  return (
    <Paper className="calendar-container">
      <Box className="calendar-header">
        <Typography className="title"><Calendar size={18} />Calendar Preview</Typography>
      </Box>

      <Box className="calendar-box">
        {/* Month Navigation */}
      <Box className="calendar-nav">
        <IconButton className="nav-btn left" onClick={() => changeMonth(-1)}>
          <ChevronLeft size={18} />
        </IconButton>

        <Typography className="month-label">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>

        <IconButton className="nav-btn right" onClick={() => changeMonth(1)}>
          <ChevronRight size={18} />
        </IconButton>
      </Box>

      {/* Calendar Grid */}
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
            onClick={() => {
              if (day) {
                setSelectedDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                );
              }
            }}>
            {day}
          </Box>
        ))}
      </Box>
      </Box>

      <Box className="calendar-footer">
        <Typography>Today’s Meetings <span className="badge">3</span></Typography>
      </Box>
    </Paper>
  )
}

export default CalendarPreview