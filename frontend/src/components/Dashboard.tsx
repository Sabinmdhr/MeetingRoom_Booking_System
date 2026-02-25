import CssBaseline from "@mui/material/CssBaseline";
import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import "../assets/scss/pages/Dashboard.scss";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <CssBaseline />

      <TopNavbar />

      <div className="dashboard-body">
        <Sidebar />

        <main className="dashboard-content">
          <h2>Main Content Here</h2>
        </main>
      </div>
    </div>
  );
}
