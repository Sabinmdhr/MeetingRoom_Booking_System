import CssBaseline from "@mui/material/CssBaseline";

import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  const accesstoken = localStorage.getItem("accesstoken");
  if (!accesstoken) {
    window.location.href = "/";
    return null;
  }
  return (
    <div className="dashboard-container">
      <CssBaseline />

      <div className="dashboard-body">
        <main className="dashboard-content">
          <DashboardCard />
        </main>
      </div>
    </div>
  );
}
