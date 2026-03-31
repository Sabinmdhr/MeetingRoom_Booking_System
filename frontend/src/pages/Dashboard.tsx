import "../assets/scss/pages/Dashboard.scss";
import DashboardCard from "../components/Dashboard/DashboardCard";
import "../assets/scss/global.scss";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  ChartColumn,
  DollarSign,
  Timer,
  TriangleAlert,
  UsersRound,
} from "lucide-react";

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
      title: "Utilization Rate",
      number: "76%",
      icon: (
        <ArrowUpRight
          color="green"
          size={19}
        />
      ),
      description: "↑ 5% from last week",
    },
    {
      id: 4,
      title: "Active Users",
      number: 156,
      icon: (
        <UsersRound
          color="red"
          size={19}
        />
      ),
      description: "Across all departments",
    },
    {
      id: 5,
      title: "Cost Savings",
      number: "$12.5K",
      icon: (
        <DollarSign
          color="green"
          size={19}
        />
      ),
      description: "↑ This month",
    },
    {
      id: 6,
      title: "Avg Duration",
      number: "1.2h",
      icon: <Timer size={19} />,
      description: "Per meeting",
    },
    {
      id: 7,
      title: "Cancellations",
      number: 8,
      icon: (
        <TriangleAlert
          color="orange"
          size={19}
        />
      ),
      description: "This week",
    },
    {
      id: 8,
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
      </main>
    </div>
  );
}
