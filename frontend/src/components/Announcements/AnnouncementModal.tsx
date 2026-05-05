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
  type AnnouncementForm = {
    title: string;
    message: string;
    startDate: string;
    endDate: string;
    pinned: boolean;
  };

  const fields: {
    label: string;
    name: keyof AnnouncementForm;
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

          {/* DATE PICKERS */}
          <div className="announcementModal__row">
            {/* START DATE */}
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">
                <Calendar size={15} /> Start Date
              </label>
              <TextField
                type="date"
                name="startDate"
                value={announcementFormData.startDate || ""}
                onChange={handleChange}
                fullWidth
                inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
              />
            </div>

            {/* END DATE */}
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">
                <Calendar size={15} /> End Date
              </label>
              <TextField
                type="date"
                name="endDate"
                value={announcementFormData.endDate || ""}
                onChange={handleChange}
                fullWidth
                inputProps={{
                  min:
                    announcementFormData.startDate ||
                    dayjs().format("YYYY-MM-DD"),
                }}
              />
            </div>
          </div>

          {/* CHECKBOX */}
          <div className="announcementModal__checkbox">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={announcementFormData.pinned}
                  onChange={(e) =>
                    setAnnouncementFormData((prev: any) => ({
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

        {/* ACTIONS */}
        <DialogActions className="announcementModal__actions">
          <MyButton
            variant="outlined"
            customVariant="ghost"
            onClick={closeAnnouncementForm}
            text="Cancel"
          />

          <MyButton
            variant="contained"
            text={isEditing ? "Save Changes" : "Publish Announcement"}
            startIcon={<Megaphone size={20} />}
            onClick={handleSubmit}
            customVariant="dark"
          />
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default AnnouncementModal;
