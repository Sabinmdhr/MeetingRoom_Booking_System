import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import { X, Pin, SquarePen, Trash2, Calendar } from "lucide-react";
import MyButton from "../ui/Button";
import "../../assets/scss/components/Announcement/AnnouncementDetailModal.scss";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useState } from "react";
import { usePermissions } from "../../hooks/usePermissions";

const AnnouncementDetailModal = ({
  open,
  onClose,
  item,
  onEdit,
  onDelete,
}: any) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const perms = usePermissions();

  if (!item) return null;

  const handleConfirmDelete = () => {
    onDelete(item.id);
    setOpenConfirm(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: "announcementDetailModal" } }}
    >
      {/* HEADER */}
      <DialogTitle className="announcementDetailModal__header">
        <div className="left">
          {/* <div className="titleRow"> */}
          {item.pinned && (
            <Chip
              icon={
                <Pin
                  size={14}
                  color="#8646c3"
                  fill="#8646c3"
                />
              }
              label="Pinned"
              className="pinnedChip"
            />
          )}
          <Typography variant="h4">{item.title}</Typography>
          {/* </div> */}
        </div>

        <X
          onClick={onClose}
          className="closeIcon"
        />
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent className="announcementDetailModal__content">
        {/* MESSAGE */}
        <Typography className="message">{item.message}</Typography>

        <Divider />

        {/*  INFO */}
        <div className="metaGrid">
          <div className="metaItem">
            <Typography className="label">Posted by</Typography>
            <Typography className="value">{item.authorName}</Typography>
          </div>

          <div className="metaItem">
            <Typography className="label">
              <Calendar size={15} /> Start Date
            </Typography>
            <Typography className="value">{item.startDate}</Typography>
          </div>

          <div className="metaItem">
            <Typography className="label">
              <Calendar size={15} /> End Date
            </Typography>
            <Typography className="value">{item.endDate}</Typography>
          </div>
        </div>
      </DialogContent>

      {/* ACTIONS */}
      {perms.canMannageAnnouncements && (
        <DialogActions className="announcementDetailModal__actions">
          <MyButton
            variant="outlined"
            customVariant="ghost"
            startIcon={<Trash2 size={16} />}
            onClick={() => setOpenConfirm(true)}
            text="Delete"
          />

          <MyButton
            variant="contained"
            customVariant="dark"
            startIcon={<SquarePen size={16} />}
            onClick={onEdit}
            text="Edit"
          />
        </DialogActions>
      )}

      <ConfirmDialog
        open={openConfirm}
        title="Delete Announcement"
        content={`Are you sure you want to delete "${item.title}"?`}
        text="Delete"
        onConfirm={handleConfirmDelete}
        onClose={() => setOpenConfirm(false)}
      />
    </Dialog>
  );
};

export default AnnouncementDetailModal;
