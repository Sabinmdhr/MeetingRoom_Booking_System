import { Card, CardContent, Typography } from "@mui/material";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../../viewmodels/useAnnouncementCardViewModel";
import { deleteAnnouncement } from "../../services/announcements.service";
import type { Announcements } from "../../models/announcements.model";
import { toast } from "react-toastify";
import { Pin } from "lucide-react";

import "../../assets/scss/components/Dashboard/DashboardAnnouncements.scss";
import MyButton from "../ui/Button";
import { useNavigate } from "react-router-dom";
const DashboardAnnouncements = () => {
  const navigate = useNavigate();
  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    // unpinnedData,
    fetchAnnouncements,
    // hasMore,
  } = useAnnouncementCardViewModel();

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);

      toast.error("Announcement deleted successfully");
      fetchAnnouncements(true);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleUpdate = (updatedItem: any) => {
    setPinnedData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
    setUnpinnedData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  const handleTogglePin = (updatedItem: Announcements) => {
    if (updatedItem.pinned) {
      setPinnedData((prev) => [updatedItem, ...prev].slice(0, 5));
      setUnpinnedData((prev) =>
        prev.filter((item) => item.id !== updatedItem.id),
      );
    } else {
      setUnpinnedData((prev) => [updatedItem, ...prev]);
      setPinnedData((prev) =>
        prev.filter((item) => item.id !== updatedItem.id),
      );
    }
  };
  return (
    <div className="dashboard-announcements">
      <Card className="dashboard-announcements__section">
        <div className="dashboard-announcements__top">
          <div className="dashboard-announcements__title">
            <Pin
              color="#8646C3"
              fill="#8646C3"
              size={23}
            />
            <Typography variant="h3">Pinned Announcements</Typography>
          </div>

          <div className="dashboard-announcements__button">
            <MyButton
              text="View All"
              customVariant="ghost"
              size="small"
              onClick={() => navigate("/announcements")}
            />
          </div>
        </div>

        <CardContent className="announcement__list">
          {pinnedData.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
              onTogglePin={handleTogglePin}
              pinnedCount={pinnedData.length}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnnouncements;
