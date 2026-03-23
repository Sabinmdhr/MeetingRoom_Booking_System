import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/DashboardCard";
import "../assets/scss/global.scss";

export default function Dashboard() {
  const accessToken = localStorage.getItem("accesstoken");
  if (!accessToken) {
    window.location.href = "/";
    return null;
  }
  
  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <DashboardCard />
      </main>
    </div>
  );
}
