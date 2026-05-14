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
import MyButton from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { Spinner } from "../components/ui/Spinner";
import { usePermissions } from "../hooks/usePermissions";

const AnnouncementsPage = () => {
  const perms = usePermissions();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);

  const {
    pinnedData,
    unpinnedData,
    scheduledAnnouncements,
    hasMore,
    hasMoreScheduled,
    loading,
    handleMarkRead,
    handleDelete,
    handleBulkDelete,
    handleUpdate,
    handleTogglePin,
    handlePinChange,
    loadMoreUnpinned,
    loadMoreScheduled,
    resetScheduled,
    refreshAll,
  } = useAnnouncementCardViewModel();

  const handleTabChange = (value: string) => {
    const isScheduled = value === "scheduled";
    setShowScheduled(isScheduled);
    setSelectMode(false);
    setSelectedIds([]);
    if (isScheduled) resetScheduled();
  };

  const handleBulkDeleteConfirm = async () => {
    try {
      await handleBulkDelete(selectedIds);
    } finally {
      setSelectedIds([]);
      setSelectMode(false);
      setBulkDeleteOpen(false);
    }
  };

  // commmon props haru
  const sharedCardProps = {
    selectedIds,
    setSelectedIds,
    onDelete: handleDelete,
    onUpdate: handleUpdate,
    onTogglePin: handleTogglePin,
    onMarkRead: handleMarkRead,
    // Pass the current tab so the viewmodel knows which lists to refresh
    onPinChange: (id: number) => handlePinChange(id, showScheduled),
    click: selectMode,
  };

  const hasAny = showScheduled
    ? scheduledAnnouncements.length > 0
    : pinnedData.length > 0 || unpinnedData.length > 0;

  return (
    <div className="announcement__main">
      {/* Page header */}
      <div className="announcement__title-wrapper">
        <div className="announcement__title">
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
            {/* Delete button, it is shown only when in select mode */}
            {selectMode && (
              <MyButton
                disabled={selectedIds.length === 0}
                onClick={() => setBulkDeleteOpen(true)}
                startIcon={<Trash2 size={19} />}
                text={`Delete${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`}
                variant="outlined"
                customVariant="danger"
                color="error"
              />
            )}

            {hasAny && (
              <MyButton
                text={selectMode ? "Cancel" : "Select"}
                startIcon={
                  selectMode ? (
                    <CircleX size={19} />
                  ) : (
                    <CircleCheckBig size={19} />
                  )
                }
                customVariant="ghost"
                onClick={() => {
                  setSelectMode((prev) => !prev);
                  setSelectedIds([]);
                }}
              />
            )}

            <MyButton
              variant="contained"
              text="New Announcement"
              startIcon={<Plus size={19} />}
              customVariant="dark"
              onClick={() => setAddModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Main content card */}
      <Card className="announcement">
        {perms.canMannageAnnouncements && (
          <div className="announcement__dropdown">
            <Typography variant="h6">
              {showScheduled ? "Scheduled Announcements" : "All Announcements"}
            </Typography>
            <FormControl
              size="small"
              sx={{ minWidth: 125 }}
            >
              <Select
                value={showScheduled ? "scheduled" : "all"}
                onChange={(e) => handleTabChange(e.target.value)}
                className="customTextField"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="scheduled">Scheduled</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}

        {loading ? (
          <div className="announcement__empty">
            <Spinner />
          </div>
        ) : !hasAny ? (
          <div className="announcement__empty">
            <Typography
              variant="h5"
              style={{ textAlign: "center" }}
            >
              {showScheduled
                ? "No scheduled announcements available"
                : "No announcements available"}
            </Typography>
          </div>
        ) : (
          <div className="announcement__content">
            {!showScheduled ? (
              /* All Announcements tab */
              <>
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

                <div className="announcement__bottom">
                  <MyButton
                    variant="outlined"
                    onClick={loadMoreUnpinned}
                    text="Show More"
                    customVariant="dark"
                    disabled={!hasMore}
                  />
                </div>
              </>
            ) : (
              /* Scheduled tab */
              <>
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

                <div className="announcement__bottom">
                  <MyButton
                    variant="outlined"
                    onClick={loadMoreScheduled}
                    text="Show More"
                    customVariant="dark"
                    disabled={!hasMoreScheduled}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </Card>

      {/* Add announcement modal — only for admins/managers */}
      {perms.canMannageAnnouncements && (
        <AnnouncementModal
          open={addModalOpen}
          handleClose={() => setAddModalOpen(false)}
          refreshAnnouncements={refreshAll}
        />
      )}

      {/* Bulk delete confirmation dialog */}
      <ConfirmDialog
        open={bulkDeleteOpen}
        title="Confirm Delete"
        text={`Delete (${selectedIds.length})`}
        startIcon={<Trash size={17} />}
        content={`Are you sure you want to delete ${selectedIds.length} announcement${selectedIds.length > 1 ? "s" : ""}?`}
        onConfirm={handleBulkDeleteConfirm}
        onClose={() => setBulkDeleteOpen(false)}
      />
    </div>
  );
};

export default AnnouncementsPage;
