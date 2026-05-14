import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";
import { Megaphone, X, Pin, Calendar } from "lucide-react";
import "../../assets/scss/components/Announcement/AnnouncementModal.scss";
import useAnnouncementViewModel from "../../viewmodels/useAnnouncementViewModel";
import MyButton from "../ui/Button";
import { usePermissions } from "../../hooks/usePermissions";
import type { Announcement } from "../../models/announcements.model";

interface AnnouncementModalProps {
  open: boolean;
  handleClose: () => void;
  refreshAnnouncements?: () => void;
  initialData?: Announcement & { id?: number };
  onUpdate?: (updated: Announcement & { id: number }) => void;
}

const AnnouncementModal = ({
  open,
  handleClose,
  refreshAnnouncements,
  initialData,
  onUpdate,
}: AnnouncementModalProps) => {
  const perms = usePermissions();

  const {
    handleSubmit,
    handleChange,
    formData,
    setFormData,
    closeForm,
    isEditing,
  } = useAnnouncementViewModel(
    handleClose,
    refreshAnnouncements,
    initialData,
    onUpdate,
    open,
  );

  // Don't render anything if the user doesn't have permission
  if (!perms.canMannageAnnouncements) return null;

  return (
    <Dialog
      open={open}
      onClose={closeForm}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: "announcement__modal__main" } }}
    >
      <div className="announcementModal">
        <DialogTitle className="announcementModal__header">
          <div className="announcementModal__header__main">
            <Megaphone size={20} />
            <span>
              {isEditing ? "Edit Announcement" : "Add New Announcement"}
            </span>
          </div>
          <X
            className="announcementModal__header__close"
            onClick={closeForm}
          />
        </DialogTitle>

        <DialogContent>
          {/* Title field */}
          <div className="announcementModal__inputGroup">
            <label
              htmlFor="title"
              className="announcementModal__label"
            >
              Announcement Title
            </label>
            <TextField
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              placeholder="Enter announcement title"
              inputProps={{ maxLength: 100 }}
            />
            <span className="announcementModal__counter">
              {formData.title.length}/100
            </span>
          </div>

          {/* Message field */}
          <div className="announcementModal__inputGroup">
            <label
              htmlFor="message"
              className="announcementModal__label"
            >
              Message
            </label>
            <TextField
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              placeholder="Enter announcement message"
              inputProps={{ maxLength: 500 }}
            />
            <span className="announcementModal__counter">
              {formData.message.length}/500
            </span>
          </div>

          {/* Date range */}
          <div className="announcementModal__row">
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">
                <Calendar size={15} /> Start Date
              </label>
              <TextField
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                fullWidth
                inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">
                <Calendar size={15} /> End Date
              </label>
              <TextField
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                fullWidth
                inputProps={{
                  min: formData.startDate || dayjs().format("YYYY-MM-DD"),
                }}
                onKeyDown={(e) => e.preventDefault()}
              />
            </div>
          </div>

          {/* Pin checkbox — in edit mode, pin changes go through a separate API call */}
          <div className="announcementModal__checkbox">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={formData.pinned}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pinned: e.target.checked,
                    }))
                  }
                />
              }
              label={
                <span className="announcementModal__checkbox-style">
                  <Pin
                    fill="#8646C3"
                    size={18}
                    color="#8646C3"
                  />
                  <Typography className="announcementModal__label">
                    Pin this announcement to the top
                  </Typography>
                </span>
              }
            />
          </div>
        </DialogContent>

        <Divider className="announcementModal__divider" />

        <DialogActions className="announcementModal__actions">
          <MyButton
            variant="outlined"
            customVariant="ghost"
            onClick={closeForm}
            text="Cancel"
          />
          <MyButton
            variant="contained"
            text={isEditing ? "Save" : "Publish"}
            onClick={handleSubmit}
            customVariant="dark"
          />
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AnnouncementModal;
