import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { CircleCheckBig, CircleX, Plus, Trash, Trash2 } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";
import {
  deleteAnnouncement,
  deleteBulk,
  markAsRead,
  updatePinStatus,
} from "../services/announcements.service";
import { toast } from "react-toastify";
import MyButton from "../components/ui/Button";
import type { Announcements } from "../models/announcements.model";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { Spinner } from "../components/ui/Spinner";
import { useAuth } from "../hooks/useAuth";
import { permissions } from "../utils/permissions";

const Announcement = () => {
  const { role } = useAuth();
  const perms = permissions[role as keyof typeof permissions];

  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [filterClick, setFilterClick] = useState(false);

  const {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    hasMore,
    fetchUnpinnedAnnouncements, // always a "reset" refresh
    loadMoreUnpinned, // Show More — appends next page
    loading,
    fetchScheduledAnnouncement,
    scheduledAnnouncements,
    fetchAllAnnouncementList,
  } = useAnnouncementCardViewModel();

  //  Mark read (optimistic in both lists)
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

  //  Delete single
  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);
      toast.success("Announcement deleted successfully");
      // Optimistic remove first so UI feels instant
      setPinnedData((prev) => prev.filter((x) => x.id !== id));
      setUnpinnedData((prev) => prev.filter((x) => x.id !== id));
      fetchUnpinnedAnnouncements();
      fetchScheduledAnnouncement();
      setClick(false);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete announcement");
    }
  };

  //  Bulk delete
  const handleBulkDelete = async (ids: number[]) => {
    try {
      await deleteBulk(ids);
      setSelectedIds([]);
      setClick(false);
      toast.success("Announcements deleted successfully");
      fetchUnpinnedAnnouncements();
      setClick(false);
    } catch (error) {
      console.error("Bulk delete failed", error);
      toast.error("Failed to delete announcements");
    }
  };

  const handleUpdate = (updatedItem: any) => {
    const merge = (list: Announcements[]) =>
      list.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
      );
    setPinnedData(merge);
    setUnpinnedData(merge);
    fetchUnpinnedAnnouncements();
  };

  //  Pin toggle (optimistic)
  // Called from AnnouncementCard BEFORE the API call succeeds.
  // If the API fails, handlePinChange rolls back by re-fetching.
  const handleTogglePin = (updatedItem: Announcements) => {
    if (updatedItem.pinned) {
      // unpinned → pinned: move to top of pinned, cap at 5
      setPinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev].slice(0, 5);
      });
      setUnpinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    } else {
      // pinned → unpinned: move to top of unpinned
      setUnpinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev];
      });
      setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    }
  };

  //  Pin API call (with rollback on failure)
  const handlePinChange = async (id: number) => {
    try {
      await updatePinStatus(id);
      toast.success("Pin status updated");
      fetchUnpinnedAnnouncements();
      fetchScheduledAnnouncement();
    } catch (error) {
      console.error("Failed to update pin status", error);
      toast.error("Failed to update pin status");
      // Rollback: re-fetch both lists to restore correct server state
    }
  };

  //  Bulk confirm
  const handleConfirmAction = () => {
    if (confirmAction === "deleteBulk") handleBulkDelete(selectedIds);
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  const refreshAllAnnouncements = async () => {
    await fetchUnpinnedAnnouncements();
    await fetchScheduledAnnouncement();
    await fetchAllAnnouncementList();
  };

  const sharedCardProps = {
    selectedIds,
    setSelectedIds,
    onDelete: handleDelete,
    onUpdate: handleUpdate,
    onTogglePin: handleTogglePin,
    onMarkRead: handleMarkRead,
    onPinChange: handlePinChange,
    click,
    setClick,
  };

  const hasAny = pinnedData.length > 0 || unpinnedData.length > 0;
  // const hasAny = pinnedData.length + unpinnedData.length;

  return (
    <div className="announcement__main">
      <div className="announcement__title-wrapper">
        <div className="announcement__title">
          {/* <Megaphone size={23} /> */}
          <Typography variant="h1">Announcements</Typography>
          <Typography
            variant="subtitle1"
            className="announcement__subtitle"
          >
            Stay updated with important notifications and updates
          </Typography>
        </div>

        {perms.canMannageAnnouncements && (
          <div className="announcement__header-actions">
            {click && (
              <MyButton
                disabled={selectedIds.length === 0}
                onClick={() => {
                  setConfirmAction("deleteBulk");
                  setOpenConfirm(true);
                }}
                startIcon={<Trash2 size={19} />}
                text={`Delete${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`}
                variant="outlined"
                customVariant="danger"
                color="error"
              />
            )}
            {hasAny && (
              <MyButton
                text={click ? "Cancel" : "Select"}
                startIcon={
                  click ? <CircleX size={19} /> : <CircleCheckBig size={19} />
                }
                customVariant="ghost"
                onClick={() => {
                  setClick((prev) => !prev);
                  if (click) setSelectedIds([]);
                }}
              />
            )}

            <MyButton
              variant="contained"
              text="New Announcement"
              startIcon={<Plus size={19} />}
              customVariant="dark"
              onClick={() => setOpen(true)}
            />
          </div>
        )}
      </div>
      <Card className="announcement">
        {perms.canMannageAnnouncements && (
          <div className="announcement__dropdown">
            <Typography variant="h6">
              {filterClick ? "Scheduled Announcements" : "All Announcements"}
            </Typography>

            <FormControl
              size="small"
              sx={{ minWidth: 125 }}
            >
              {/* <InputLabel>Filter</InputLabel> */}

              <Select
                value={filterClick ? "scheduled" : "all"}
                // label="Filter"
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "scheduled") {
                    setFilterClick(true);
                    fetchScheduledAnnouncement();
                  } else {
                    setFilterClick(false);
                  }
                }}
                className="customTextField"
              >
                <MenuItem value="all">All</MenuItem>

                <MenuItem value="scheduled">Scheduled</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

        {/*
        CONTENT
   */}

        {loading ? (
          <div className="announcement__empty">
            <Spinner />
          </div>
        ) : !hasAny ? (
          <div className="announcement__empty">
            <Typography
              variant="h5"
              style={{
                textAlign: "center",
              }}
            >
              No announcements available
            </Typography>
          </div>
        ) : (
          <div className="announcement__content">
            {!filterClick ? (
              <>
                {/* PINNED */}

                {pinnedData.length > 0 && (
                  <div className="announcement__section">
                    <CardContent className="announcement__list">
                      {pinnedData.map((item) => (
                        <AnnouncementCard
                          key={item.id}
                          item={item}
                          {...sharedCardProps}
                        />
                      ))}
                    </CardContent>
                  </div>
                )}

                {/* UNPINNED */}

                {unpinnedData.length > 0 && (
                  <div className="announcement__section">
                    <CardContent className="announcement__list">
                      {unpinnedData.map((item) => (
                        <AnnouncementCard
                          key={item.id}
                          item={item}
                          {...sharedCardProps}
                        />
                      ))}
                    </CardContent>
                  </div>
                )}
              </>
            ) : (
              <div className="announcement__section">
                <CardContent className="announcement__list">
                  {scheduledAnnouncements.map((item) => (
                    <AnnouncementCard
                      key={item.id}
                      item={item}
                      {...sharedCardProps}
                    />
                  ))}
                </CardContent>
              </div>
            )}

            {/* SHOW MORE */}

            {hasMore && !filterClick && (
              <div className="announcement__bottom">
                <MyButton
                  variant="outlined"
                  onClick={loadMoreUnpinned}
                  text="Show More"
                  customVariant="dark"
                />
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Add modal — refresh resets both lists so new item appears at top */}
      {perms.canMannageAnnouncements && (
        <AnnouncementModal
          open={open}
          handleClose={handleClose}
          refreshAnnouncements={refreshAllAnnouncements}
        />
      )}

      {/* Bulk delete confirm */}
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

export default Announcement;
