import { Card, CardContent, Typography } from "@mui/material";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../../viewmodels/useAnnouncementCardViewModel";
import "../../assets/scss/components/Dashboard/DashboardAnnouncements.scss";
import MyButton from "../ui/Button";
import { useNavigate } from "react-router-dom";

// Shows only pinned announcements as a quick preview on the dashboard
const DashboardAnnouncements = () => {
  const navigate = useNavigate();

  const {
    pinnedData,
    handleMarkRead,
    handleDelete,
    handleUpdate,
    handleTogglePin,
    handlePinChange,
  } = useAnnouncementCardViewModel();

  return (
    <div className="dashboard-announcements">
      <Card className="dashboard-announcements__section">
        <div className="dashboard-announcements__top">
          <Typography variant="h3">Pinned Announcements</Typography>
          <MyButton
            text="View All"
            customVariant="ghost"
            size="small"
            onClick={() => navigate("/announcements")}
          />
        </div>

        <CardContent className="dashboard-announcements__list">
          {pinnedData.length === 0 ? (
            <Typography variant="body2" color="text.secondary" sx={{ p: 1 }}>
              No pinned announcements
            </Typography>
          ) : (
            pinnedData.map((item) => (
              <AnnouncementCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                onTogglePin={handleTogglePin}
                onMarkRead={handleMarkRead}
                onPinChange={handlePinChange}
                click={false}
                selectedIds={[]}
                setSelectedIds={() => {}}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnnouncements;
