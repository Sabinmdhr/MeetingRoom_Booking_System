import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/Dashboard/DashboardCard";
import { Building2, ChartColumn, Timer, Users } from "lucide-react";
import CalendarPreview from "../components/Dashboard/CalendarPreview";
import DashboardAnnouncements from "../components/Dashboard/DashboardAnnouncements";
import useDashboardViewModel from "../viewmodels/useDashboardViewModel";
import { Spinner } from "../components/ui/Spinner";
import DashboardUpMeetings from "../components/Dashboard/DashboardUpMeetings";
import "../assets/scss/pages/Dashboard.scss";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/";
    return null;
  }

  const { dashboardData, error, loading } = useDashboardViewModel();

  if (loading) return <Spinner />;
  if (error) return <div>{error}</div>;
  const avg = Number.isFinite(dashboardData?.avgDurationOfMeetings)
    ? Math.round(dashboardData?.avgDurationOfMeetings ?? 0)
    : 0;

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
          onClick: () => {
            navigate("/meeting-rooms");
          },
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
          onClick: () => {
            navigate("/participants");
          },
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
          number: "2-4 PM",
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
      <div className="dashboard-container__header">
        <DashboardCard cards={cards} />
      </div>
      <div className="dashboard-container__content">
        <div className="dashboard-container__content__announcements">
          <DashboardAnnouncements />
        </div>
        <div className="dashboard-container__content__dashboardupmeetings">
          <DashboardUpMeetings />
        </div>
      </div>

      <div className="dashboard_calenderpreview">
        <CalendarPreview />
      </div>
    </div>
  );
}
