import { Card, CardContent, Typography } from "@mui/material";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../../viewmodels/useAnnouncementCardViewModel";

import {
  deleteAnnouncement,
  markAsRead,
  updatePinStatus,
} from "../../services/announcements.service";
import type { Announcements } from "../../models/announcements.model";
import { toast } from "react-toastify";
import "../../assets/scss/components/Dashboard/DashboardAnnouncements.scss";
import MyButton from "../ui/Button";
import { useNavigate } from "react-router-dom";


const DashboardAnnouncements = () => {
  const navigate = useNavigate();
  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    fetchPinnedAnnouncements,
    fetchUnpinnedAnnouncements,
  } = useAnnouncementCardViewModel();


  const handleMarkRead = async (id: number) => {
    try {
      await markAsRead(id);
      const apply = (list: Announcements[]) =>
        list.map((item) => (item.id === id ? { ...item, read: true } : item));
      setPinnedData(apply);
      setUnpinnedData(apply);
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);
      toast.success("Announcement deleted successfully");
      fetchPinnedAnnouncements();
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete announcement");
    }
  };

  const handleUpdate = (updatedItem: any) => {
    setPinnedData((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
      ),
    );
  };

  const handleTogglePin = (updatedItem: Announcements) => {
    if (updatedItem.pinned) {
      setPinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev].slice(0, 5);
      });
      setPinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev].slice(0, 5);
      });
    } else {
      // Unpinned from dashboard — refresh since the dashboard only shows pinned
      setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    }
  };

  const handlePinChange = async (id: number) => {
    try {
      await updatePinStatus(id);
      toast.success("Pin status updated");
    } catch (error) {
      console.error("Failed to update pin status", error);
      toast.error("Failed to update pin status");
      fetchUnpinnedAnnouncements();
    }
  };


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
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ p: 1 }}
            >
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
                pinnedCount={pinnedData.length}
                click={false}
                selectedIds={[]}
                setSelectedIds={() => {}}
                setClick={() => {}}
              />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardAnnouncements;
