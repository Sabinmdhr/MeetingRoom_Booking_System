import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/DashboardCard"
export default function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
    return null;
  }
  return (
    <div className="dashboard-container">


      <div className="dashboard-body">
       

        <main className="dashboard-content">
          <DashboardCard/>
        </main>
      </div>
    </div>
  );
}
