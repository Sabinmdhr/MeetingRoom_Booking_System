import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/Dashboard/DashboardCard";
import "../assets/scss/global.scss";
import { Building2, Calendar, ChartColumn, Timer } from "lucide-react";
import Announcements from "./Announcements";

export default function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "/";
    return null;
  }

  const cards = [
    {
      id: 1,
      title: "Total Rooms",
      number: 12,
      icon: (
        <Building2
          color="blue"
          size={19}
        />
      ),
      description: "↑ 8 available now",
    },
    {
      id: 2,
      title: "Today's Meetings",
      number: 24,
      icon: (
        <Calendar
          color="purple"
          size={19}
        />
      ),
      description: "4 in progress",
    },

    {
      id: 3,
      title: "Avg Duration",
      number: "1.2h",
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
  ];

  return (
    <div className="dashboard-container">
      <main className="dashboard-content">
        <DashboardCard cards={cards} />
        <div className="dashboard__announcements">
          <Announcements />
        </div>
      </main>
    </div>
  );
}
