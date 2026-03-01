import { useState } from "react";
import dayjs from "dayjs";
import "../assets/scss/pages/HeroCalendar.scss";

const HeroCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");

  const daysInMonth = endOfMonth.date();
  const startDay = startOfMonth.day(); // 0-6

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyStartCells = Array.from({ length: startDay });

  const totalUsedCells = days.length + emptyStartCells.length;

  const rowsNeeded = Math.ceil(totalUsedCells / 7);
  const totalCells = rowsNeeded * 7;

  const emptyEndCells = Array.from({
    length: totalCells - totalUsedCells,
  });

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <section className="hero">
      <div className="hero__topbar">
        <div>
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

        <div>{currentMonth.format("MMMM YYYY")}</div>
      </div>

      <div className="hero__calendar">
        <div
          className="calendar-grid"
          style={{
            gridTemplateRows: `50px repeat(${rowsNeeded}, 1fr)`,
          }}
        >
          {weekDays.map((day) => (
            <div
              key={day}
              className="calendar-header"
            >
              {day}
            </div>
          ))}

          {emptyStartCells.map((_, i) => (
            <div
              key={`start-${i}`}
              className="calendar-cell empty"
            />
          ))}

          {days.map((day) => (
            <div
              key={day}
              className="calendar-cell"
            >
              <span className="date-number">{day}</span>
            </div>
          ))}

          {emptyEndCells.map((_, i) => (
            <div
              key={`end-${i}`}
              className="calendar-cell empty"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCalendar;
