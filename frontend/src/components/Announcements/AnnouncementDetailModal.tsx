import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import {
  X,
  Megaphone,
  Pin,
  PinOff,
  SquarePen,
  Trash2,
  Users,
} from "lucide-react";

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

  const audienceLabel = item.allUser
    ? "All Users"
    : (audienceMap[item.roleId] ?? "All Users");

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
            {item.priorityLevel === "HIGH" && (
              <Chip
                label="HIGH"
                className="chip__one"
                size="small"
              />
            )}{" "}
            <Typography
              variant="h3"
              className="announcement__card-title"
            >
              {item.title}
            </Typography>
          </div>

          <Typography
            variant="body2"
            style={{ color: "#555" }}
          >
            {item.message}
          </Typography>

          <Divider />

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Typography
              variant="subtitle2"
              style={{ color: "#888" }}
            >
              <Typography variant="subtitle1">Posted by:</Typography>
              {/* {item.createdBy ?? "Sushant"} */}
              {"Sushant"}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ color: "#888" }}
            >
              <p>Date:</p> {item.modifiedAt}
            </Typography>
            <Typography
              variant="subtitle2"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "#888",
              }}
            >
              <Users size={14} />
              <p>Audience:</p>
              {audienceLabel}
            </Typography>
          </div>
        </DialogContent>

        <Divider className="announcementModal__divider" />

        {/* ACTIONS */}
        <DialogActions className="announcementModal__actions">
          <Button
            variant="outlined"
            color="error"
            startIcon={<Trash2 size={16} />}
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            startIcon={<SquarePen size={16} />}
            className="announcement__button__publish"
            onClick={onEdit}
          >
            Edit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AnnouncementDetailModal;
