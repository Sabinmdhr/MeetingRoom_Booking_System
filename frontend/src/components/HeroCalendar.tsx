import { useState } from "react";

import dayjs from "dayjs";
import "../assets/scss/pages/HeroCalendar.scss";

const HeroCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const endOfMonth = currentMonth.endOf("month");

  const daysInMonth = endOfMonth.date();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="hero">
      {/* TOP BAR */}
      <div className="hero__topbar">
        <div className="topbar-left">
          <button
            onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
          >
            {"<"}
          </button>
          <button onClick={() => setCurrentMonth(dayjs())}>Today</button>
          <button onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}>
            {">"}
          </button>
        </div>

        <div className="topbar-center">{currentMonth.format("MMMM YYYY")}</div>

        <div className="topbar-right">
          <button>Month</button>
          <button>Week</button>
          <button>Day</button>
        </div>
      </div>
      {/* FULL MONTH GRID */}
      <div className="hero__calendar">
        <div className="calendar-grid">
          {/* Weekday Headers */}
          {weekDays.map((day) => (
            <div
              key={day}
              className="calendar-header"
            >
              {day}
            </div>
          ))}

          {/* Month Days */}
          {days.map((day) => (
            <div
              key={day}
              className="calendar-cell"
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default HeroCalendar;
