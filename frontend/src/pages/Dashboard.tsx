import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/Dashboard/DashboardCard";
import { Building2, Calendar, ChartColumn, Timer, Users } from "lucide-react";
import CalendarPreview from "../components/Dashboard/CalendarPreview";
import DashboardAnnouncements from "../components/Dashboard/DashboardAnnouncements";
import useDashboardViewModel from "../viewmodels/useDashboardViewModel";
import { useNavigate } from "react-router-dom";
import DashboardUpMeetings from "../components/Dashboard/DashboardUpMeetings";
import "../assets/scss/pages/Dashboard.scss"

export default function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/";
    return null;
  }

  const { dashboardData, error, loading } = useDashboardViewModel();

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>{error}</div>;
  const avg = Math.round(dashboardData?.avgDurationOfMeetings ?? 0);
  const cards = dashboardData
    ? [
        {
          id: 1,
          title: "Total Rooms",
          number: dashboardData.totalRooms,
          icon: (
            <Building2
              color="blue"
              size={19}
            />
          ),
          description: `↑ ${dashboardData.totalRooms ?? 0} available now`,
        },

        {
          id: 2,
          title: "Active Users",
          number: dashboardData.totalUsers,
          icon: (
            <Users
              color="purple"
              size={19}
            />
          ),
          description: "Across all departments",
        },
        {
          id: 3,
          title: "Avg Duration",
          number:
            avg >= 60
              ? `${Math.floor(avg / 60)}h${avg % 60 ? ` ${avg % 60} mins` : ""}`
              : `${avg} mins`,
          icon: <Timer size={19} />,
          description: "Per meeting",
        },
        {
          id: 4,
          title: "Peak Hours",
          number: "2-4PM",
          icon: (
            <ChartColumn
              color="#AD46FF"
              size={19}
            />
          ),
          description: "Busiest time",
        },
      ]
    : [];

  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <DashboardCard cards={cards} />

        
        <div className="dashboard-subcontainer">
          <div className="dashboard__announcements">
          </div>
          <DashboardAnnouncements />
          <div className="dashboard_dashboardupmeetings">
          <DashboardUpMeetings   />
          </div>
        </div>

        

        <div className="dashboard_calenderpreview">
          <CalendarPreview />
        </div>
      </main>
    </div>
  );
}
