import { Card, CardContent, Typography } from "@mui/material";
import { Megaphone, Plus } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";

import { deleteAnnouncement } from "../services/announcements.service";
import { toast } from "react-toastify";
import MyButton from "../components/ui/Button";
import { Checkbox } from "@mui/material";
import type { Announcements } from "../models/announcements.model";

const Announcements = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [click, setClick] = useState(false);
  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    unpinnedData,
    fetchAnnouncements,
    hasMore,
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
    <div className="announcement__main">
      <Card className="announcement">
        {/* Header */}
        <CardContent className="announcement__header">
          <div className="announcement__title-wrapper">
            <div className="announcement__title">
              <Megaphone size={23} />
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
              text={click ? "Cancel" : "Select"}
              customVariant="ghost"
              onClick={() => {
                setClick(!click);
              }}
            />

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
                  <div
                    key={item.id}
                    className="checkbox__card"
                  >
                    {/* {click && <Checkbox />} */}
                    <AnnouncementCard
                      item={item}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      onTogglePin={handleTogglePin}
                      pinnedCount={pinnedData.length}
                      click={click}
                      setClick={setClick}
                    />
                  </div>
                ))}
              </CardContent>
            </div>
          )}

          <div className="announcement__section">
            <CardContent className="announcement__list">
              {unpinnedData.map((item) => (
                <div
                  key={item.id}
                  className="checkbox__card"
                >
                  <AnnouncementCard
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                    onTogglePin={handleTogglePin}
                    pinnedCount={pinnedData.length}
                    click={click}
                    setClick={setClick}
                  />
                </div>
              ))}
            </CardContent>
          </div>
          <div className="announcement__bottom">
            {click && (
              <MyButton
                onClick={() => {}}
                text="Delete"
                variant="outlined"
                customVariant="danger"
              />
            )}
            <MyButton
              variant="outlined"
              onClick={() => fetchAnnouncements(false)}
              text="Show More"
              customVariant={hasMore ? "dark" : "ghost"}
              disabled={!hasMore}
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
