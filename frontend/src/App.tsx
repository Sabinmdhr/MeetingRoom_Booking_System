import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import CreatePassword from "./pages/CreatePassword";
import VerifyPassword from "./pages/VerifyPassword";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
// import Calendar from "./pages/Calendar";

import MeetingRooms from "./pages/MeetingRooms";
import Announcement from "./pages/Announcements";
import Report from "./pages/Report";
import Participants from "./pages/Participants";
import Settings from "./pages/Settings";
import Calendar from "./pages/Calendar";
import BookRoom from "./pages/BookRoom";
import UserProfile from "./pages/UserProfile";
import RoomTimeslot from "./pages/RoomTimeslot/RoomTimeslot";
import { ProtectedRoutes } from "./layouts/ProtectedRoutes";
import UpcomingMeetings from "./pages/UpcomingMeetings";
// import TestTimeline from "./pages/TestTimeline";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-password" element={<VerifyPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />

        {/* Dashboard Layout Route */}
        <Route path="/" element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes roles={["ADMIN", "MANAGER", "STAFF"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route path="calendar" element={<Calendar />} />
          <Route
            path="book-room"
            element={
              <ProtectedRoutes roles={["ADMIN", "MANAGER"]}>
                <BookRoom />
              </ProtectedRoutes>
            }
          />
          <Route
            path="meeting-rooms"
            element={
              <ProtectedRoutes roles={["ADMIN", "MANAGER"]}>
                <MeetingRooms />
              </ProtectedRoutes>
            }
          />
          <Route
            path="room-timeslot"
            element={
              <ProtectedRoutes roles={["ADMIN", "MANAGER"]}>
                <RoomTimeslot />
              </ProtectedRoutes>
            }
          />
          <Route path="announcements" element={<Announcement />} />
          <Route
            path="report"
            element={
              <ProtectedRoutes roles={["ADMIN"]}>
                <Report />
              </ProtectedRoutes>
            }
          />
          <Route
            path="participants"
            element={
              <ProtectedRoutes roles={["ADMIN", "MANAGER"]}>
                <Participants />
              </ProtectedRoutes>
            }
          />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="upcoming-meetings" element={<UpcomingMeetings />} />
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
