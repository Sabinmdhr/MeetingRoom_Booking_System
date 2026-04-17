import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
} from "@mui/material";
import { X, Megaphone, Pin, SquarePen, Trash2 } from "lucide-react";
import MyButton from "../ui/Button";
import "../../assets/scss/components/Announcement/AnnouncementDetailModal.scss";
import ConfirmDialog from "../ui/ConfirmDialog";
import { useState } from "react";

const audienceMap: Record<number, string> = {
  1: "Admins Only",
  2: "Authorized Personnel",
  3: "View-Only Staff",
  4: "Engineering Leadership",
  5: "Product Team",
  6: "Finance Department",
};

const AnnouncementDetailModal = ({
  open,
  onClose,
  item,
  onEdit,
  onDelete,
  //   onPin,
}: any) => {
  if (!item) return null;

  const [openConfirm, setOpenConfirm] = useState(false);

  const audienceLabel = item.allUser
    ? "All Users"
    : (audienceMap[item.roleId] ?? "All Users");
  const handleConfirmDelete = () => {
    onDelete(item.id);
    setOpenConfirm(false);
    onClose(); // close detail modal after delete
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: "announcement__modal__main" } }}
    >
      <div className="announcementModal">
        <DialogTitle className="announcementModal__header">
          <div className="announcementModal__header__main">
            <Megaphone size={20} />
            <span>Announcement Details</span>
          </div>
          <X
            className="announcementModal__header__close"
            onClick={onClose}
          />
        </DialogTitle>

        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingTop: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {item.pinned && (
              <Pin
                size={16}
                color="#9333ea"
              />
            )}

            <Typography
              variant="h4"
              className="announcement__card-title"
            >
              {item.title}
            </Typography>
          </div>

          <Typography variant="body2">{item.message}</Typography>

          <Divider />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", gap: "50px" }}>
              <Typography variant="subtitle2">
                <Typography variant="h4">Posted by:</Typography>
                <p style={{ color: "#3d3c3c" }}>{"Sushant"}</p>
              </Typography>
              <Typography variant="subtitle2">
                <Typography variant="h4">Date:</Typography>{" "}
                <p style={{ color: "#3d3c3c" }}>{item.modifiedAt}</p>
              </Typography>
            </div>

            <Typography
              variant="subtitle2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Typography variant="h4">Audience:</Typography>
              <p style={{ color: "#3d3c3c" }}>{audienceLabel}</p>
            </Typography>
          </div>
        </DialogContent>

        {/* ACTIONS */}
        <DialogActions className="announcementModal__actions">
          <MyButton
            variant="outlined"
            color="error"
            startIcon={<Trash2 size={16} />}
            onClick={() => {
              setOpenConfirm(true);
            }}
            text="Delete"
          />

          <MyButton
            variant="contained"
            startIcon={<SquarePen size={16} />}
            // className="announcement__button__publish"
            onClick={onEdit}
            text="Edit"
          />
        </DialogActions>
      </div>
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
