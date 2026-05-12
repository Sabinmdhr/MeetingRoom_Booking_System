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

const AnnouncementModal = ({
  open,
  handleClose,
  refreshAnnouncements,
  initialData,
  onUpdate,
}: any) => {
  const perms = usePermissions();

  const {
    handleSubmit,
    handleChange,
    announcementFormData,
    setAnnouncementFormData,
    closeAnnouncementForm,
    isEditing,
  } = useAnnouncementViewModel(
    handleClose,
    refreshAnnouncements,
    initialData,
    onUpdate,
  );

  // Restrict to string-only fields so `.length` is always valid.
  // "pinned" (boolean) is intentionally excluded — it has its own checkbox below.
  type StringFields = "title" | "message" | "startDate" | "endDate";

  const fields: {
    label: string;
    name: StringFields;
    placeholder: string;
    type: string;
    rows?: number;
    maxLength: number;
  }[] = [
    {
      label: "Announcement Title",
      name: "title",
      placeholder: "Enter announcement title",
      type: "text",
      maxLength: 100,
    },
    {
      label: "Message",
      name: "message",
      placeholder: "Enter announcement message",
      type: "multiline",
      rows: 4,
      maxLength: 500,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { className: "announcement__modal__main" } }}
    >
      {perms.canMannageAnnouncements && (
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
              onClick={closeAnnouncementForm}
            />
          </DialogTitle>

          <DialogContent>
            {fields.map((field) => (
              <div
                className="announcementModal__inputGroup"
                key={field.name}
              >
                <label
                  htmlFor={field.name}
                  className="announcementModal__label"
                >
                  {field.label}
                </label>
                <TextField
                  id={field.name}
                  name={field.name}
                  value={announcementFormData[field.name]}
                  onChange={handleChange}
                  fullWidth
                  multiline={field.type === "multiline"}
                  rows={field.rows ?? 1}
                  placeholder={field.placeholder}
                  inputProps={{ maxLength: field.maxLength }}
                />
                {/* .length is safe because field.name is always a string key */}
                <span className="announcementModal__counter">
                  {announcementFormData[field.name].length}/{field.maxLength}
                </span>
              </div>
            ))}

            <div className="announcementModal__row">
              <div className="announcementModal__inputGroup">
                <label className="announcementModal__label">
                  <Calendar size={15} /> Start Date
                </label>
                <TextField
                  type="date"
                  name="startDate"
                  value={announcementFormData.startDate}
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
                  value={announcementFormData.endDate}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{
                    min:
                      announcementFormData.startDate ||
                      dayjs().format("YYYY-MM-DD"),
                  }}
                  onKeyDown={(e) => e.preventDefault()}
                />
              </div>
            </div>

            {/* Pin checkbox — only shown when adding, not editing.
              Pin status on existing announcements is managed via the
              pin icon / menu, not the edit form. */}
            {!isEditing && (
              <div className="announcementModal__checkbox">
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      checked={announcementFormData.pinned}
                      onChange={(e) =>
                        setAnnouncementFormData((prev) => ({
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
            )}
          </DialogContent>

          <Divider className="announcementModal__divider" />

          <DialogActions className="announcementModal__actions">
            <MyButton
              variant="outlined"
              customVariant="ghost"
              onClick={closeAnnouncementForm}
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
      )}
    </Dialog>
  );
};

export default AnnouncementModal;
