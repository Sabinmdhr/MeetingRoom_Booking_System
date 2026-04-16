// import "../assets/scss/pages/Calendar.scss";
// import {
//   Tab,
//   Tabs,
//   Card,
//   CardContent,
//   TextField,
//   MenuItem,
// } from "@mui/material";

// import { useCalendarEventViewModel } from "../viewmodels/useCalendarEventViewModel";
// import { useNavigate } from "react-router-dom";
// import dayjs from "dayjs";
// import CalendarModal from "../components/Calendar/CalendarModal";
// import "../assets/scss/global.scss";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import React, { useState } from "react";
// import { Popover } from "@mui/material";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
// import { Calendar as CalendarIcon, Plus } from "lucide-react";
// import EditCalendarModal from "../components/Calendar/EditCalendarModal";
// import MyButton from "../components/ui/Button";

// export const Calendar = () => {
//   const [room, setRoom] = useState("All Rooms");
//   const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
//     null,
//   );
//   const [eventFilter, setEventFilter] = useState("all");
//   const [mode, setMode] = useState<"view" | "edit" | null>(null);

//   const handleDateButtonClick = (event: React.MouseEvent<HTMLElement>) => {
//     setDatePickerAnchor(event.currentTarget);
//   };

//   const handleDateChange = (newDate: dayjs.Dayjs | null) => {
//     if (newDate) {
//       goToToday(newDate);
//     }
//     setDatePickerAnchor(null);
//   };

//   const handleDatePickerClose = () => {
//     setDatePickerAnchor(null);
//   };

//   const navigate = useNavigate();
//   const {
//     currentMonth,
//     view,
//     setView,
//     eventsByDateHour,
//     eventsByDate,
//     calendarDays,
//     formatDate,
//     weekDaysWithDates,
//     hours,
//     openEvent,
//     goToNext,
//     selectedEvent,
//     closeModal,
//     goToPrev,
//     goToToday,
//   } = useCalendarEventViewModel();

//   const today = dayjs().format("YYYY-MM-DD");

//   const isWeekView = view === "week";
//   const isDayView = view === "day";
//   const isMonthView = view === "month";
//   const selectedDate = currentMonth.format("YYYY-MM-DD");

//   return (
//     <Card className="calendar">
//       <CardContent className="calendar__topbar">
//         <div className="calendar__topbar__main">
//           <div className="calendar__topbar__main__left">
//             <div className="calendar__topbar__main__left__buttons">
//               <button onClick={goToPrev}>{"<"}</button>

//               <button
//                 onClick={handleDateButtonClick}
//                 className="date-button"
//               >
//                 <CalendarIcon size={18} />
//                 <span>{currentMonth.format("MMMM D, YYYY")}</span>
//               </button>

//               <Popover
//                 open={Boolean(datePickerAnchor)}
//                 anchorEl={datePickerAnchor}
//                 onClose={handleDatePickerClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//               >
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <StaticDatePicker
//                     value={currentMonth}
//                     onChange={handleDateChange}
//                   />
//                 </LocalizationProvider>
//               </Popover>

//               <button onClick={goToNext}>{">"}</button>
//             </div>

//             <div className="calendar__topbar__main__left__items">
//               <div className="report-filter__dropdown-item">
//                 <TextField
//                   select
//                   fullWidth
//                   value={room}
//                   onChange={(e) => setRoom(e.target.value)}
//                   className="report-filter__select"
//                 >
//                   <MenuItem value="All Rooms">All Rooms</MenuItem>
//                   <MenuItem value="Executive Room 3A">
//                     Executive Room 3A
//                   </MenuItem>
//                   <MenuItem value="Conference Room 2B">
//                     Conference Room 2B
//                   </MenuItem>
//                   <MenuItem value="Meeting Room 1C">Meeting Room 1C</MenuItem>
//                 </TextField>
//               </div>

//               <Tabs
//                 value={eventFilter}
//                 onChange={(_, value) => setEventFilter(value)}
//                 className="calendar__topbar__main__left__tabs"
//               >
//                 <Tab
//                   label="All"
//                   value="all"
//                 />
//                 <Tab
//                   label="Mine"
//                   value="mine"
//                 />
//               </Tabs>

//               <Tabs
//                 value={view}
//                 onChange={(_, value) => setView(value)}
//                 className="calendar__topbar__main__left__tabs"
//               >
//                 <Tab
//                   label="Day"
//                   value="day"
//                 />
//                 <Tab
//                   label="Week"
//                   value="week"
//                 />
//                 <Tab
//                   label="Month"
//                   value="month"
//                 />
//               </Tabs>
//             </div>
//           </div>

//           <div className="calendar__topbar__main__right">
//             {/* <Button
//               variant="text"
//               className="meeting-button"
//               onClick={() => navigate("/book-room")}
//             >
//               + New Meeting
//             </Button> */}

//             <MyButton
//               onClick={() => {
//                 navigate("/book-room");
//               }}
//               variant="contained"
//               customVariant="dark"
//               startIcon={<Plus size={17} />}
//               text="New Meeting"
//               // className="meeting-button"
//             />

//             <div className="meeting-category">
//               <div className="category internal"></div>
//               <span>Internal</span>
//               <div className="category client"></div>
//               <span>Client</span>
//               <div className="category executive"></div>
//               <span>Executive</span>
//             </div>
//           </div>
//         </div>
//       </CardContent>

//       <CardContent className="calendar__main">
//         {/* DAY VIEW */}
//         {isDayView && (
//           <div className="day">
//             <div className="day__header">
//               {currentMonth.format("dddd, MMMM D")}
//             </div>

//             <div className="day__body">
//               {hours.map((hour) => {
//                 const cellEvents = eventsByDateHour[selectedDate]?.[hour] || [];

//                 return (
//                   <React.Fragment key={hour}>
//                     <div className="day__hour">
//                       {dayjs().hour(hour).format("h A")}
//                     </div>

//                     <div className="day__cell">
//                       {cellEvents.map((event) => (
//                         <div
//                           key={event.id}
//                           className={`day__event ${event.category}`}
//                           onClick={() => {
//                             openEvent(event);
//                             setMode("view");
//                           }}
//                         >
//                           <span className="event-time">{event.startTime}</span>
//                           <br />
//                           <span className="event-title">{event.title}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//         {/* WEEK VIEW */}
//         {isWeekView && (
//           <div className="week">
//             <div className="week__header">
//               <div className="week__corner">Rooms</div>
//               {weekDaysWithDates.map((day) => (
//                 <div
//                   key={day.format("YYYY-MM-DD")}
//                   className="week__day"
//                 >
//                   <span className="week__day__name">{day.format("ddd")}</span>
//                   <span
//                     className={`week__day__date ${
//                       day.format("YYYY-MM-DD") === today ? "today" : ""
//                     }`}
//                   >
//                     {day.format("D")}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <div className="week__body">
//               <div className="week__grid">
//                 {hours.map((hour) => (
//                   <React.Fragment key={hour}>
//                     {/* FIX: render the hour label, not a hardcoded array */}
//                     <div className="week__hour">
//                       {dayjs().hour(hour).format("h A")}
//                     </div>

//                     {weekDaysWithDates.map((day) => {
//                       const dateKey = day.format("YYYY-MM-DD");
//                       const cellEvents =
//                         eventsByDateHour[dateKey]?.[hour] || [];

//                       return (
//                         <div
//                           key={`${dateKey}-${hour}`}
//                           className="week__cell"
//                         >
//                           {cellEvents.map((event) => (
//                             <div
//                               key={event.id}
//                               className={`week__event ${event.category}`}
//                               onClick={() => {
//                                 openEvent(event);
//                                 setMode("view");
//                               }}
//                             >
//                               <span className="event-time">
//                                 {event.startTime}
//                               </span>
//                               <br />
//                               <span className="event-title">{event.title}</span>
//                             </div>
//                           ))}
//                         </div>
//                       );
//                     })}
//                   </React.Fragment>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* MONTH VIEW */}
//         {isMonthView && (
//           <div className="month">
//             <div className="month__header">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <div
//                   key={day}
//                   className="month__day"
//                 >
//                   {day}
//                 </div>
//               ))}
//             </div>

//             <div className="month__grid">
//               {calendarDays.map((day, index) => {
//                 const date = day ? formatDate(day) : null;
//                 const dayEvents = date ? eventsByDate[date] || [] : [];

//                 return (
//                   <div
//                     key={index}
//                     className={`month__cell ${
//                       date === today ? "month__cell--today" : ""
//                     } ${!day ? "month__cell--empty" : ""}`}
//                   >
//                     {day && (
//                       <>
//                         <span className="month__date">{day}</span>

//                         {dayEvents.slice(0, 3).map((event) => (
//                           <div
//                             key={event.id}
//                             className={`month__event ${event.category}`}
//                             onClick={() => {
//                               openEvent(event);
//                               setMode("view");
//                             }}
//                           >
//                             {event.startTime} - {event.endTime}
//                             <br /> {event.title}
//                           </div>
//                         ))}
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </CardContent>

//       <CalendarModal
//         open={mode === "view"}
//         event={selectedEvent}
//         onClose={() => {
//           setMode(null);
//           closeModal();
//         }}
//         onEdit={() => setMode("edit")}
//       />

//       <EditCalendarModal
//         openEdit={mode === "edit"}
//         event={selectedEvent}
//         onCloseAll={() => {
//           setMode(null);
//           closeModal();
//         }}
//         onBack={() => setMode("view")}
//       />
//     </Card>
//   );
// };

// export default Calendar;

// new
import "../assets/scss/pages/Calendar.scss";
import {
  Tab,
  Tabs,
  Card,
  CardContent,
  TextField,
  MenuItem,
} from "@mui/material";
import { useCalendarEventViewModel } from "../viewmodels/useCalendarEventViewModel";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import CalendarModal from "../components/Calendar/CalendarModal";
import "../assets/scss/global.scss";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState, useRef, useEffect } from "react";
import { Popover } from "@mui/material";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import EditCalendarModal from "../components/Calendar/EditCalendarModal";
import MyButton from "../components/ui/Button";

const ROOMS = [
  { id: "room-3a", name: "Executive Room 3A" },
  { id: "room-2b", name: "Conference Room 2B" },
  { id: "room-1c", name: "Meeting Room 1C" },
];

const GRID_VISIBLE_DAYS = 8;

export const Calendar = () => {
  const [room, setRoom] = useState("All Rooms");
  const [datePickerAnchor, setDatePickerAnchor] = useState<HTMLElement | null>(
    null,
  );
  const [eventFilter, setEventFilter] = useState("all");
  const [mode, setMode] = useState<"view" | "edit" | null>(null);
  const [dayOffset, setDayOffset] = useState(0);

  // Sync horizontal scroll between the sticky date header and the body grid
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    const header = headerScrollRef.current;
    const body = bodyScrollRef.current;
    if (!header || !body) return;

    const onHeaderScroll = () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      body.scrollLeft = header.scrollLeft;
      isSyncingRef.current = false;
    };
    const onBodyScroll = () => {
      if (isSyncingRef.current) return;
      isSyncingRef.current = true;
      header.scrollLeft = body.scrollLeft;
      isSyncingRef.current = false;
    };

    header.addEventListener("scroll", onHeaderScroll);
    body.addEventListener("scroll", onBodyScroll);
    return () => {
      header.removeEventListener("scroll", onHeaderScroll);
      body.removeEventListener("scroll", onBodyScroll);
    };
  }, []);

  const handleDateButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setDatePickerAnchor(event.currentTarget);
  };

  const handleDateChange = (newDate: dayjs.Dayjs | null) => {
    if (newDate) {
      goToToday(newDate);
      setDayOffset(0);
    }
    setDatePickerAnchor(null);
  };

  const handleDatePickerClose = () => setDatePickerAnchor(null);

  const navigate = useNavigate();
  const {
    currentMonth,
    view,
    setView,
    eventsByDate,
    eventsByDateHour,
    hours,
    openEvent,
    goToNext,
    selectedEvent,
    closeModal,
    goToPrev,
    goToToday,
  } = useCalendarEventViewModel();

  const today = dayjs().format("YYYY-MM-DD");
  const isDayView = view === "day";
  const isGridView = view === "month";
  const selectedDate = currentMonth.format("YYYY-MM-DD");

  const gridDates = Array.from({ length: GRID_VISIBLE_DAYS }, (_, i) =>
    currentMonth.add(dayOffset + i, "day"),
  );

  return (
    <Card className="calendar">
      {/* ── TOPBAR ── */}
      <CardContent className="calendar__topbar">
        <div className="calendar__topbar__main">
          <div className="calendar__topbar__main__left">
            <div className="calendar__topbar__main__left__buttons">
              <button
                onClick={
                  isGridView
                    ? () => setDayOffset((o) => o - GRID_VISIBLE_DAYS)
                    : goToPrev
                }
              >
                {"<"}
              </button>

              <MyButton
                onClick={
                  isGridView
                    ? () => setDayOffset((o) => o - GRID_VISIBLE_DAYS)
                    : goToPrev
                }
                text=""
                startIcon="<"
              />
              <button
                onClick={handleDateButtonClick}
                className="date-button"
              >
                <CalendarIcon size={18} />
                <span>{currentMonth.format("MMMM D, YYYY")}</span>
              </button>

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

              <button
                onClick={
                  isGridView
                    ? () => setDayOffset((o) => o + GRID_VISIBLE_DAYS)
                    : goToNext
                }
              >
                {">"}
              </button>
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
                onChange={(_, value) => {
                  setView(value);
                  setDayOffset(0);
                }}
                className="calendar__topbar__main__left__tabs"
              >
                <Tab
                  label="Day"
                  value="day"
                />
                <Tab
                  label="Month"
                  value="month"
                />
              </Tabs>
            </div>
          </div>

          <div className="calendar__topbar__main__right">
            <MyButton
              onClick={() => navigate("/book-room")}
              variant="contained"
              customVariant="dark"
              startIcon={<Plus size={17} />}
              text="New Meeting"
            />
            <div className="meeting-category">
              <div className="category internal" />
              <span>Internal</span>
              <div className="category client" />
              <span>Client</span>
              <div className="category executive" />
              <span>Executive</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* ── MAIN ── */}
      <CardContent className="calendar__main">
        {/* DAY VIEW — 7 AM to 6 PM */}
        {isDayView && (
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
                      {dayjs().hour(hour).minute(0).format("h A")}
                    </div>
                    <div className="day__cell">
                      {cellEvents.map((event) => (
                        <div
                          key={event.id}
                          className={`day__event ${event.category}`}
                          onClick={() => {
                            openEvent(event);
                            setMode("view");
                          }}
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
        )}

        {/* ROOM × DATE GRID VIEW */}
        {isGridView && (
          <div className="room-grid">
            {/* Sticky header row: corner + scrollable date labels */}
            <div className="room-grid__header">
              <div className="room-grid__corner">Rooms</div>
              <div
                className="room-grid__date-header"
                ref={headerScrollRef}
              >
                {gridDates.map((date) => {
                  const dateKey = date.format("YYYY-MM-DD");
                  const isToday = dateKey === today;
                  return (
                    <div
                      key={dateKey}
                      className={`room-grid__date-cell${isToday ? " room-grid__date-cell--today" : ""}`}
                    >
                      <span className="room-grid__date-day">
                        {date.format("ddd")}
                      </span>
                      <span className="room-grid__date-num">
                        {date.format("D")}
                      </span>
                      <span className="room-grid__date-month">
                        {date.format("MMM")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Body: sticky room labels + horizontally scrollable event tiles */}
            <div className="room-grid__body">
              <div className="room-grid__room-labels">
                {ROOMS.map((rm) => (
                  <div
                    key={rm.id}
                    className="room-grid__room-label"
                  >
                    <span>{rm.name}</span>
                  </div>
                ))}
              </div>

              <div
                className="room-grid__scroll"
                ref={bodyScrollRef}
              >
                {ROOMS.map((rm) => (
                  <div
                    key={rm.id}
                    className="room-grid__row"
                  >
                    {gridDates.map((date) => {
                      const dateKey = date.format("YYYY-MM-DD");
                      const allDayEvents = eventsByDate[dateKey] || [];
                      const cellEvents =
                        room === "All Rooms"
                          ? allDayEvents.filter((e) => e.location === rm.name)
                          : allDayEvents.filter(
                              (e) =>
                                e.location === rm.name && e.location === room,
                            );

                      return (
                        <div
                          key={`${rm.id}-${dateKey}`}
                          className={`room-grid__cell${dateKey === today ? " room-grid__cell--today" : ""}`}
                        >
                          {cellEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`room-grid__event ${event.category}`}
                              onClick={() => {
                                openEvent(event);
                                setMode("view");
                              }}
                            >
                              <span className="room-grid__event-time">
                                {event.startTime} – {event.endTime}
                              </span>
                              <span className="room-grid__event-title">
                                {event.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CalendarModal
        open={mode === "view"}
        event={selectedEvent}
        onClose={() => {
          setMode(null);
          closeModal();
        }}
        onEdit={() => setMode("edit")}
      />
      <EditCalendarModal
        openEdit={mode === "edit"}
        event={selectedEvent}
        onCloseAll={() => {
          setMode(null);
          closeModal();
        }}
        onBack={() => setMode("view")}
      />
    </Card>
  );
};

export default Calendar;
