import { Card, CardContent, Typography } from "@mui/material";
import { Megaphone, Plus } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import "../assets/scss/global.scss";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";

import { deleteAnnouncement } from "../services/announcements.service";
import { toast } from "react-toastify";
import MyButton from "../components/ui/Button";

const Announcements = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    unpinnedData,
    fetchAnnouncements,
  } = useAnnouncementCardViewModel();

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);

      toast.error("Announcement deleted successfully");
      fetchAnnouncements();
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

  return (
    <div className="announcement__main">
      <Card className="announcement">
        {/* Header */}
        <CardContent className="announcement__header">
          <div className="announcement__title-wrapper">
            <div className="announcement__title">
              <Megaphone size={20} />
              <Typography variant="h1">Announcements</Typography>
            </div>
            <Typography
              variant="subtitle1"
              className="announcement__subtitle"
            >
              Stay updated with important notifications and updates
            </Typography>
          </div>

          <div className="announcement__header-actions">
            <MyButton
              variant="contained"
              text="New Announcement"
              startIcon={<Plus size={19} />}
              // className="announcement__top-button"
              customVariant="dark"
              onClick={handleOpen}
            />
          </div>
        </CardContent>

        {/* Content */}
        <div className="announcement__content">
          {pinnedData.length > 0 && (
            <div className="announcement__section">
              {/* <Divider className="announcement__divider" /> */}
              <CardContent className="announcement__list">
                {pinnedData.map((item) => (
                  <AnnouncementCard
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </CardContent>
            </div>
          )}

          <div className="announcement__section">
            <CardContent className="announcement__list">
              {unpinnedData.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))}
            </CardContent>
          </div>
          <div className="announcement__bottom">
            <MyButton
              variant="outlined"
              onClick={() => {}}
              text="Show More"
              type="button"
              // className="announcement__bottom-button"
              customVariant="ghost"
            />
          </div>
        </div>
      </Card>

      <AnnouncementModal
        open={open}
        handleClose={handleClose}
        refreshAnnouncements={fetchAnnouncements}
      />
    </div>
  );
};

export default Announcements;
