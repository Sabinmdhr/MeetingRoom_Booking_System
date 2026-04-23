import { Card, CardContent, Typography } from "@mui/material";
import { Megaphone, Plus, Trash } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";

import {
  deleteAnnouncement,
  deleteBulk,
  markAsRead,
} from "../services/announcements.service";
import { toast } from "react-toastify";
import MyButton from "../components/ui/Button";
import type { Announcements } from "../models/announcements.model";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const Announcements = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [click, setClick] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcements[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    unpinnedData,
    fetchPinnedAnnouncements,
    fetchUnpinnedAnnouncements,
    hasMore,
  } = useAnnouncementCardViewModel();

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);

      toast.success("Announcement deleted successfully");
      fetchPinnedAnnouncements();
      fetchUnpinnedAnnouncements();
      setClick(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await deleteBulk(ids);
      setSelectedIds([]);
      toast.success("Announcements deleted successfully");
      fetchPinnedAnnouncements();
      fetchUnpinnedAnnouncements();
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

  const handleConfirmAction = () => {
    if (confirmAction === "deleteBulk") {
      handleBulkDelete(selectedIds);
      setClick(false);
    }

    setOpenConfirm(false);
    setConfirmAction(null);
  };

  const handleMarkRead = async (id: number) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    );

    await markAsRead(id);
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
            {pinnedData.length === 0 && unpinnedData.length === 0 ? (
              ""
            ) : (
              <MyButton
                text={click ? "Cancel" : "Select"}
                customVariant="ghost"
                onClick={() => {
                  setClick(!click);
                  if (click) setSelectedIds([]);
                }}
              />
            )}

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
        {pinnedData.length === 0 && unpinnedData.length === 0 ? (
          <div className="announcement__empty">
            <Typography variant="h4">No announcements available</Typography>
          </div>
        ) : (
          <div className="announcement__content">
            {pinnedData.length > 0 && (
              <div className="announcement__section">
                <CardContent className="announcement__list">
                  {pinnedData.map((item) => (
                    <div
                      key={item.id}
                      className="checkbox__card"
                    >
                      <AnnouncementCard
                        item={item}
                        key={item.id}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                        onTogglePin={handleTogglePin}
                        pinnedCount={pinnedData.length}
                        click={click}
                        setClick={setClick}
                        onMarkRead={handleMarkRead}
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
                      selectedIds={selectedIds}
                      setSelectedIds={setSelectedIds}
                      onDelete={handleDelete}
                      onUpdate={handleUpdate}
                      onTogglePin={handleTogglePin}
                      pinnedCount={pinnedData.length}
                      click={click}
                      setClick={setClick}
                      onMarkRead={handleMarkRead}
                    />
                  </div>
                ))}
              </CardContent>
            </div>
            <div className="announcement__bottom">
              {click && (
                <MyButton
                  disabled={selectedIds.length === 0}
                  onClick={() => {
                    if (selectedIds.length === 0) {
                      toast.warning("Please select at least one announcement");
                      return;
                    }
                    setConfirmAction("deleteBulk");
                    setOpenConfirm(true);
                  }}
                  text="Delete"
                  variant="outlined"
                  customVariant="danger"
                  color="error"
                />
              )}
              <MyButton
                variant="outlined"
                onClick={() => fetchPinnedAnnouncements()}
                text="Show More"
                customVariant={hasMore ? "dark" : "ghost"}
                disabled={!hasMore}
              />
            </div>
          </div>
        )}
      </Card>

      <AnnouncementModal
        open={open}
        handleClose={handleClose}
        refreshAnnouncements={() => {
          fetchPinnedAnnouncements();
          fetchUnpinnedAnnouncements();
        }}
      />

      <ConfirmDialog
        open={openConfirm}
        title="Confirm Delete"
        text={`Delete (${selectedIds.length})`}
        startIcon={<Trash size={17} />}
        content={`Are you sure you want to delete ${selectedIds.length} announcement${selectedIds.length > 1 ? "s" : ""}?`}
        onConfirm={handleConfirmAction}
        onClose={() => {
          setOpenConfirm(false);
          setConfirmAction(null);
        }}
      />
    </div>
  );
};

export default Announcements;
