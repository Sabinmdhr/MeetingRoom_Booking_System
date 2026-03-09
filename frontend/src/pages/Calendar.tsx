import "../assets/scss/pages/Calendar.scss";
import CalendarModal from "../components/CalendarModal";
import { Tab, Tabs, Button } from "@mui/material";
import dayjs from "dayjs";
import { useCalendarViewModel } from "../viewmodels/useCalendarEventViewModel";
import React from "react";
import { useNavigate } from "react-router-dom";

const Calendar = () => {
  const navigate = useNavigate();
  const {
    currentMonth,
    view,
    setView,
    events,
    calendarDays,
    formatDate,
    openEvent,
    openModal,
    selectedEvent,
    closeModal,
    goToNext,
    goToPrev,
    goToToday,
  } = useCalendarViewModel();

  const hours = Array.from({ length: 10 }, (_, i) => 9 + i); // 9 AM - 6 PM
  const weekStart = currentMonth.startOf("week"); // Sunday
  const weekDaysWithDates = Array.from({ length: 7 }, (_, i) =>
    weekStart.add(i, "day"),
  );

  const isWeekView = view === "week";

  return (
    <section className="hero">
      {/* TOP BAR */}
      <div className="hero__topbar">
        <div className="topbar-left">
          <button onClick={goToPrev}>{"<"}</button>
          <button onClick={goToToday}>Today</button>
          <button onClick={goToNext}>{">"}</button>
        </div>

        <div className="topbar-center">{currentMonth.format("MMMM YYYY")}</div>

        <div className="topbar-right">
          <div className="topbar-right-section">
            <Tabs
              value={view}
              onChange={(_, value) => setView(value)}
              className="calendar-tabs"
            >
              <Tab
                label="Day"
                value="day"
              />
              {}
              <Tab
                label="Week"
                value="week"
              />
              <Tab
                label="Month"
                value="month"
              />
            </Tabs>
            <div>
              <Button
                variant="text"
                className="meeting-button"
                onClick={() => {
                  navigate("/book-room");
                }}
              >
                + New Meeting
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDAR BODY */}
      {isWeekView ? (
        <div className="week-view">
          {/* Header Row */}
          <div className="week-header">
            <div className="week-header-corner"></div>
            {weekDaysWithDates.map((day) => (
              <div
                key={day.format("YYYY-MM-DD")}
                className="week-day"
              >
                {day.format("D ddd")}
              </div>
            ))}
          </div>

          {/* Time + Cells */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* Time column */}
              <div className="week-hour">
                {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>

              {/* Cells for each day */}
              {weekDaysWithDates.map((day) => {
                const cellEvents = events.filter((e) => {
                  const eventHour = parseInt(
                    dayjs(
                      `${e.date} ${e.startTime}`,
                      "YYYY-MM-DD h:mm A",
                    ).format("H"),
                  );
                  return (
                    e.date === day.format("YYYY-MM-DD") && eventHour === hour
                  );
                });

                return (
                  <div
                    key={`${day.format("YYYY-MM-DD")}-${hour}`}
                    className="week-cell"
                  >
                    {cellEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`week-event ${event.category == "Executive" ? `executive` : event.category == "Client" ? `client` : `internal`}`}
                        onClick={() => openEvent(event)}
                      >
                        {event.title}
                        <br />
                        {event.startTime}
                      </div>
                    ))}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <>
          {/* Month View */}
          <div className="calendar-header-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="calendar-header"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-cell ${day ? "" : "empty"}`}
              >
                {day && (
                  <>
                    <span className="date-number">{day}</span>
                    {events
                      .filter((event) => event.date === formatDate(day))
                      .map((event) => (
                        <div
                          key={event.id}
                          className={`calendar-event ${event.category == "Executive" ? `executive` : event.category == "Client" ? `client` : `internal`}`}
                          onClick={() => openEvent(event)}
                        >
                          {event.title}
                          <br />
                          {event.startTime}{" "}
                        </div>
                      ))}
                  </>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* EVENT MODAL */}
      <CalendarModal
        open={openModal}
        event={selectedEvent}
        onClose={closeModal}
      />
    </section>
  );
};

export default Calendar;
