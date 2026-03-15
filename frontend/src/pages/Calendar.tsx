import "../assets/scss/pages/Calendar.scss";
import {
  Tab,
  Tabs,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCalendarEventViewModel } from "../viewmodels/useCalendarEventViewModel";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CalendarModal from "../components/CalendarModal";
import "../assets/scss/global.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { Popover } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Calendar as CalendarIcon } from "lucide-react";

const Calendar = () => {
  const [room, setRoom] = useState("All Rooms");
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [eventFilter, setEventFilter] = useState("all");

  const handleDateButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setDatePickerAnchor(event.currentTarget);
  };
  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      goToToday(newDate);
    }
    setDatePickerAnchor(null);
  };

  const handleDatePickerClose = () => {
    setDatePickerAnchor(null);
  };
  const navigate = useNavigate();
  const {
    currentMonth,
    view,
    setView,
    eventsByDateHour,
    eventsByDate,
    calendarDays,
    formatDate,
    weekDaysWithDates,
    hours,
    openEvent,
    goToNext,
    selectedEvent,
    closeModal,
    openModal,
    goToPrev,
    goToToday,
  } = useCalendarEventViewModel();

  const today = dayjs().format("YYYY-MM-DD");

  const isWeekView = view === "week";
  const isDayView = view === "day";
  const selectedDate = currentMonth.format("YYYY-MM-DD");

  return (
    <Card className="calendar">
      <CardContent className="calendar__topbar">
        <div className="calendar__topbar__main">
          <div className="calendar__topbar__main__left">
            <div className="calendar__topbar__main__left__buttons">
              <button onClick={goToPrev}>{"<"}</button>

              {/* Custom date button that opens popup */}
              <button
                onClick={handleDateButtonClick}
                className="date-button"
              >
                <CalendarIcon size={18} />
                <span>{currentMonth.format("MMMM D, YYYY")}</span>
              </button>

              {/* Date Picker Popover */}
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

              <button onClick={goToNext}>{">"}</button>
            </div>

            <div className="calendar__topbar__main__left__items">
              <div className="report-filter__dropdown-item">
                <TextField
                  select
                  fullWidth
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="report-filter__select"
                >
                  <MenuItem value="All Rooms">All Rooms</MenuItem>
                  <MenuItem value="Executive Room 3A">
                    Executive Room 3A
                  </MenuItem>
                  <MenuItem value="Conference Room 2B">
                    Conference Room 2B
                  </MenuItem>
                  <MenuItem value="Meeting Room 1C">Meeting Room 1C</MenuItem>
                </TextField>
              </div>

              <Tabs
                value={eventFilter}
                onChange={(_, value) => setEventFilter(value)}
                className="calendar__topbar__main__left__tabs"
              >
                <Tab
                  label="All"
                  value="all"
                />
                <Tab
                  label="Mine"
                  value="mine"
                />
              </Tabs>
              <Tabs
                value={view}
                onChange={(_, value) => setView(value)}
                className="calendar__topbar__main__left__tabs"
              >
                <Tab
                  label="Day"
                  value="day"
                />
                <Tab
                  label="Week"
                  value="week"
                />
                <Tab
                  label="Month"
                  value="month"
                />
              </Tabs>
            </div>
          </div>

          <div className="calendar__topbar__main__right">
            <Button
              variant="text"
              className="meeting-button"
              onClick={() => navigate("/book-room")}
            >
              + New Meeting
            </Button>

            <div className="meeting-category">
              <div className="category internal"></div>
              <span>Internal</span>

              <div className="category client"></div>
              <span>Client</span>

              <div className="category executive"></div>
              <span>Executive</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardContent className="calendar__main">
        {isDayView ? (
          <div className="day">
            <div className="day__header">
              {currentMonth.format("dddd, MMMM D")}
            </div>

            <div className="day__body">
              {hours.map((hour) => {
                const cellEvents = eventsByDateHour[selectedDate]?.[hour] || [];

                return (
                  <React.Fragment key={hour}>
                    <div className="day__hour">
                      {dayjs().hour(hour).format("h A")}
                    </div>

                    <div className="day__cell">
                      {cellEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`day__event ${event.category}`}
                          onClick={() => openEvent(event)}
                        >
                          <span className="event-time">{event.startTime}</span>
                          <br />
                          <span className="event-title">{event.title}</span>
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ) : isWeekView ? (
          <div className="week">
            <div className="week__header">
              <div className="week__corner"></div>
            </div>

            <div className="week__body">
              <div className="week__grid">
                {hours.map((hour) => (
                  <React.Fragment key={hour}>
                    <div className="week__hour">
                      {dayjs().hour(hour).format("h A")}
                    </div>

                    {weekDaysWithDates.map((day) => {
                      const dateKey = day.format("YYYY-MM-DD");

                      const cellEvents =
                        eventsByDateHour[dateKey]?.[hour] || [];

                      return (
                        <div
                          key={`${dateKey}-${hour}`}
                          className="week__cell"
                        >
                          {cellEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`week__event ${event.category}`}
                              onClick={() => openEvent(event)}
                            >
                              <span className="event-time">
                                {event.startTime}
                              </span>
                              <br />
                              <span className="event-title">{event.title}</span>
                            </div>
                          ))}

                          {cellEvents.length > 2 && (
                            <span className="month__more">
                              +{cellEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="month">
            <div className="month__header">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="month__day"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="month__grid">
              {calendarDays.map((day, index) => {
                const date = day ? formatDate(day) : null;
                const dayEvents = date ? eventsByDate[date] || [] : [];

                return (
                  <div
                    key={index}
                    className={`month__cell ${
                      date === today ? "month__cell--today" : ""
                    } ${!day ? "month__cell--empty" : ""}`}
                  >
                    {day && (
                      <>
                        <span className="month__date">{day}</span>

                        {dayEvents.slice(0, 3).map((event) => (
                          <div
                            key={event.id}
                            className={`month__event ${event.category}`}
                            onClick={() => openEvent(event)}
                          >
                            {event.startTime} - {event.endTime}
                            <br /> {event.title}
                          </div>
                        ))}

                        {dayEvents.length > 3 && (
                          <span className="month__more">
                            +{dayEvents.length - 3} more
                          </span>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
      <CalendarModal
        open={openModal}
        event={selectedEvent}
        onClose={closeModal}
      />
    </Card>
  );
};

export default Calendar;
