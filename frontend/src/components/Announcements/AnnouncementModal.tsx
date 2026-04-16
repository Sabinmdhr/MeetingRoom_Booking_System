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

import { Megaphone, X, Pin, Calendar } from "lucide-react";

import "../../assets/scss/components/Announcement/AnnouncementModal.scss";

import useAnnouncementViewModel from "../../viewmodels/useAnnouncementViewModel";
import MyButton from "../ui/Button";
const AnnouncementModal = ({
  open,
  handleClose,
  refreshAnnouncements,
  initialData,
  onUpdate,
}: any) => {
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

  const fields: {
    label: string;
    name: "title" | "message";
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
      <div className="announcementModal">
        {/* HEADER */}
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

        {/* CONTENT */}
        <DialogContent>
          {/* TEXT FIELDS */}
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
                value={announcementFormData[field.name] || ""}
                onChange={handleChange}
                fullWidth
                multiline={field.type === "multiline"}
                rows={field.rows || 1}
                placeholder={field.placeholder}
                inputProps={{ maxLength: field.maxLength }}
              />

              <span className="announcementModal__counter">
                {announcementFormData[field.name]?.length || 0}/
                {field.maxLength}
              </span>
            </div>
          ))}

          {/* PRIORITY & AUDIENCE ROW */}
          <div className="announcementModal__row">
            {/* PRIORITY */}
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">
                {" "}
                <Calendar size={14} /> Start Date
              </label>

              <TextField
                type="date"
                name="priorityLevel"
                value={announcementFormData.priorityLevel || ""}
                onChange={handleChange}
                fullWidth
                SelectProps={{ MenuProps: { disablePortal: true } }}
              ></TextField>
            </div>

            {/* AUDIENCE/roles */}
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">
                <Calendar size={14} /> End Date
              </label>

              <TextField
                type="date"
                name="audience"
                value={announcementFormData.priorityLevel || ""}
                onChange={handleChange}
                fullWidth
                SelectProps={{ MenuProps: { disablePortal: true } }}
              ></TextField>
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="announcementModal__checkbox">
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
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
                  <Typography variant="h4">
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
            // className="announcement__button__cancel"
            customVariant="ghost"
            onClick={closeAnnouncementForm}
            text="Cancel"
          />

          <MyButton
            variant="contained"
            text={isEditing ? "Save Changes" : " Publish Announcement"}
            startIcon={<Megaphone size={20} />}
            onClick={handleSubmit}
            customVariant="dark"
            // className="announcement__button__publish"
          ></MyButton>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AnnouncementModal;
