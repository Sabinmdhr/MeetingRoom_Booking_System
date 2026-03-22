import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";

import { Megaphone, X, CircleCheckBig, CircleAlert, Users } from "lucide-react";
import { useState } from "react";
import "../assets/scss/global.scss";

import "../assets/scss/pages/AnnouncementModal.scss";
import { toast } from "mui-sonner";

// inside the component, add the publish handler:

const AnnouncementModal = ({ open, handleClose }: any) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [audience, setAudience] = useState("All Users");
  // const [openBar, setOpenBar] = useState(false);

  const today = new Date().toLocaleDateString();
  // console.log(priority);

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Please enter an announcement title.");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    toast.success("Announcement published!", {
      description: `"${title}" sent to ${audience}`,
    });

    handleModalClose();
  };

  const handleModalClose = () => {
    setTitle("");
    setMessage("");
    setPriority("Normal");
    setAudience("All Users");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: "announcement__modal__main" } }}
    >
      <div className="announcementModal">
        <DialogTitle className="announcementModal__header">
          <div className="announcementModal__header__main">
            <Megaphone size={20} />
            <span>Add New Announcement</span>
          </div>

          <X
            className="announcementModal__header__close"
            onClick={handleModalClose}
          />
        </DialogTitle>

        <DialogContent>
          <div className="announcementModal__inputGroup">
            <label
              htmlFor="announcement_title"
              className="announcementModal__label"
            >
              Announcement Title
            </label>

            <TextField
              id="announcement_title"
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 100))}
              fullWidth
              placeholder="Enter announcement title"
            />

            <span className="announcementModal__counter">
              {title.length}/100 characters
            </span>
          </div>

          <div className="announcementModal__inputGroup">
            <label
              htmlFor="announcement_message"
              className="announcementModal__label"
            >
              Message
            </label>

            <TextField
              id="announcement_message"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 500))}
              fullWidth
              placeholder="Enter announcement message"
            />

            <span className="announcementModal__counter">
              {message.length}/500 characters
            </span>
          </div>

          <div className="announcementModal__row">
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label__priority">
                Priority Level
              </label>

              <TextField
                select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                fullWidth
                SelectProps={{ MenuProps: { disablePortal: true } }}
              >
                <MenuItem value="Normal">
                  <div className="announcementModal__dropdownItem">
                    <CircleCheckBig
                      size={18}
                      className="announcementModal__icon--blue"
                    />
                    <span>Normal</span>
                  </div>
                </MenuItem>

                <MenuItem value="High Priority">
                  <div className="announcementModal__dropdownItem">
                    <CircleAlert
                      size={18}
                      className="announcementModal__icon--red"
                    />
                    <span>High Priority</span>
                  </div>
                </MenuItem>
              </TextField>
            </div>

            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">Audience</label>

              <TextField
                select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                fullWidth
                SelectProps={{ MenuProps: { disablePortal: true } }}
              >
                <MenuItem value="All Users">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      className="announcementModal__icon--purple"
                      size={18}
                    />
                    <span>All Users</span>
                  </div>
                </MenuItem>

                <MenuItem value="Admins Only">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      className="announcementModal__icon--red"
                      size={18}
                    />
                    <span>Admins Only</span>
                  </div>
                </MenuItem>

                <MenuItem value="Authorized Personnel">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      size={18}
                      className="announcementModal__icon--blue"
                    />
                    <span>Authorized Personnel </span>
                  </div>
                </MenuItem>

                <MenuItem value="View-Only Staff">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      size={18}
                      className="announcementModal__icon--grey"
                    />
                    <span>View-Only Staff </span>
                  </div>
                </MenuItem>
              </TextField>
            </div>
          </div>

          <div className={`announcementModal__preview `}>
            <Typography className="announcementModal__previewTitle">
              <Megaphone size={12} />
              Preview
            </Typography>

            <div
              className={`announcementModal__main ${priority === "High Priority" ? "high-priority" : ""} `}
            >
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
            variant="outlined"
            className="announcement__button__cancel"
            onClick={handleModalClose}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            className="announcement__button__publish"
            onClick={handlePublish}
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
