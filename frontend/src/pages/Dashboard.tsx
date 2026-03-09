
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


        <main className="dashboard-content">
          <DashboardCard />
        </main>
    </div>
  );
}
