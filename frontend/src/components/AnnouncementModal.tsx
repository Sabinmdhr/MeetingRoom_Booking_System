import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
  Divider,
} from "@mui/material";
import { Megaphone } from "lucide-react";
import { useState } from "react";

import "../assets/scss/pages/AnnouncementModal.scss";

const AnnouncementModal = ({ open, handleClose }: any) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [audience, setAudience] = useState("All Users");

  const today = new Date().toLocaleDateString();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <div className="announcementModal">
        {/* Header */}
        <div className="announcementModal__header">
          <Megaphone size={20} />
          <div>
            <DialogTitle>Add New Announcement</DialogTitle>
          </div>
        </div>

        <DialogContent>
          {/* Title */}
          <div className="announcementModal__inputGroup">
            <label className="announcementModal__label">Title</label>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              fullWidth
            />
            <span className="announcementModal__counter">
              {title.length}/100 characters
            </span>
          </div>

          {/* Message */}
          <div className="announcementModal__inputGroup">
            <label className="announcementModal__label">Message</label>
            <TextField
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              fullWidth
            />
            <span className="announcementModal__counter">
              {message.length}/500 characters
            </span>
          </div>

          {/* Priority + Audience */}
          <div className="announcementModal__row">
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">Priority Level</label>

              <TextField
                select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                fullWidth
                className="announcementModal__select"
                SelectProps={{
                  MenuProps: { disablePortal: true },
                }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
            </div>

            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">Audience</label>

              <TextField
                select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                fullWidth
                className="announcementModal__select"
                SelectProps={{
                  MenuProps: { disablePortal: true },
                }}
              >
                <MenuItem value="All Users">All Users</MenuItem>
                <MenuItem value="Admins">Admins</MenuItem>
                <MenuItem value="Managers">Managers</MenuItem>
              </TextField>
            </div>
          </div>

          {/* Preview */}

          <div className="announcementModal__preview">
            <Typography className="announcementModal__previewTitle">
              Preview
            </Typography>

            <div className="">
              <h3>{title || "Announcement Title"}</h3>

              <p>{message || "Announcement message will appear here..."}</p>

              <span className="announcementModal__meta">
                {today} • {audience}
              </span>
            </div>
          </div>
        </DialogContent>
        <Divider className="announcementModal__divider" />

        <DialogActions className="announcementModal__actions">
          <Button
            className="announcement__button__cancel"
            variant="outlined"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            className="announcement__button__publish"
          >
            <Megaphone size={20} />
            Publish Announcement
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AnnouncementModal;
