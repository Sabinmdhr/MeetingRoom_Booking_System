import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePassword from "./pages/CreatePassword";
import VerifyPassword from "./pages/VerifyPassword";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
// import Calendar from "./pages/Calendar";

import MeetingRooms from "./pages/MeetingRooms";
import Announcements from "./pages/Announcements";
import Report from "./pages/Report";
import Participants from "./pages/Participants";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import BookRoom from "./pages/BookRoom";
import UserProfile from "./pages/UserProfile";
import RoomTimeslot from "./pages/RoomTimeslot/RoomTimeslot";
// import TestTimeline from "./pages/TestTimeline";


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="/verify-password"
          element={<VerifyPassword />}
        />
        <Route
          path="/create-password"
          element={<CreatePassword />}
        />

        {/* Dashboard Layout Route */}
        <Route
          path="/"
          element={<DashboardLayout />}
        >
          <Route
            path="dashboard"
            element={<Dashboard />}
          />
          <Route
            path="calendar"
            element={<Calendar />}
          />
          <Route
            path="book-room"
            element={<BookRoom />}
          />
          <Route
            path="meeting-rooms"
            element={<MeetingRooms />}
          />
          <Route
            path="room-timeslot"
            element={<RoomTimeslot />}
          />
          <Route
            path="announcements"
            element={<Announcements />}
          />
          <Route
            path="report"
            element={<Report />}
          />
          <Route
            path="participants"
            element={<Participants />}
          />
          <Route
            path="settings"
            element={<Settings />}
          />
          <Route
            path="profile"
            element={<UserProfile />}
          />
          {/* <Route
          path="/test"
          element={<TestTimeline/>  }
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
