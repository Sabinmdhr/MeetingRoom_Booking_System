import { useEffect, useState } from "react";
import { getDashboardDetails } from "../services/dashboard.service";

type DashboardData = {
  totalRooms: number;
  totalUsers: number;
  avgDurationOfMeetings: number;
};

const useDashboardViewModel = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardDetails = async () => {
    try {
      setLoading(true);
      const result = await getDashboardDetails();
      setDashboardData(result.data);
    } catch (err) {
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardDetails();
  }, []);

  return { dashboardData, loading, error };
};

export default useDashboardViewModel;
