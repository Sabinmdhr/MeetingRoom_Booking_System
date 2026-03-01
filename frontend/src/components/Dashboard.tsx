import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "./DashboardCard";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return null;
  }
  return (
    <div className="dashboard-container">
      <CssBaseline />

      <TopNavbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <DashboardCard />
        </main>
      </div>
    </div>
  );
}
