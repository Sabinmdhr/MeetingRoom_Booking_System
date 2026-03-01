import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import { Outlet } from "react-router-dom";
import "../assets/scss/layout/DashboardLayout.scss";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      {/* Navbar at top */}
      <TopNavbar />

      {/* Sidebar + Content below navbar */}
      <div className="dashboard-body">
        <Sidebar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
