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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import {
  Megaphone,
  X,
  CircleCheckBig,
  CircleAlert,
  Users,
  Pin,
  FolderPlus,
} from "lucide-react";

import "../../assets/scss/global.scss";
import "../../assets/scss/pages/AnnouncementModal.scss";

import useAnnouncementViewModel from "../../viewmodels/useAnnouncementViewModel";
const AnnouncementModal = ({
  open,
  handleClose,
  refreshAnnouncements,
}: any) => {
  
  const {
    handleSubmit,
    handleChange,
    announcementFormData,
    setAnnouncementFormData,
    closeAnnouncementForm,
  } = useAnnouncementViewModel(handleClose, refreshAnnouncements);

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
            <span>Add New Announcement</span>
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
              <label className="announcementModal__label">{field.label}</label>

              <TextField
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
              <label className="announcementModal__label">Priority Level</label>

              <TextField
                select
                name="priorityLevel"
                value={announcementFormData.priorityLevel || ""}
                onChange={handleChange}
                fullWidth
                SelectProps={{ MenuProps: { disablePortal: true } }}
              >
                <MenuItem value="NORMAL">
                  <div className="announcementModal__dropdownItem">
                    <CircleCheckBig
                      size={18}
                      className="announcementModal__icon--blue"
                    />
                    <span>Normal</span>
                  </div>
                </MenuItem>

                <MenuItem value="HIGH">
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

            {/* AUDIENCE/roles */}
            <div className="announcementModal__inputGroup">
              <label className="announcementModal__label">Audience</label>

              <TextField
                select
                name="audience"
                value={
                  announcementFormData.allUser
                    ? "allUsers"
                    : String(announcementFormData.roleId)
                }
                onChange={(e) => {
                  const selected = e.target.value;

                  if (selected === "allUsers") {
                    setAnnouncementFormData((prev) => ({
                      ...prev,
                      allUser: true,
                      roleId: undefined,
                    }));
                  } else {
                    setAnnouncementFormData((prev) => ({
                      ...prev,
                      allUser: false,
                      roleId: Number(selected),
                    }));
                  }
                }}
                fullWidth
                SelectProps={{ MenuProps: { disablePortal: true } }}
              >
                <MenuItem value="allUsers">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      size={18}
                      className="announcementModal__icon--purple"
                    />
                    <span>All Users</span>
                  </div>
                </MenuItem>

                <MenuItem value="1">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      size={18}
                      className="announcementModal__icon--red"
                    />
                    <span>Admins Only</span>
                  </div>
                </MenuItem>

                <MenuItem value="2">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      size={18}
                      className="announcementModal__icon--blue"
                    />
                    <span>Authorized Personnel</span>
                  </div>
                </MenuItem>

                <MenuItem value="3">
                  <div className="announcementModal__dropdownItem">
                    <Users
                      size={18}
                      className="announcementModal__icon--grey"
                    />
                    <span>View-Only Staff</span>
                  </div>
                </MenuItem>

                <MenuItem value="4">
                  <div className="announcementModal__dropdownItem">
                    <FolderPlus
                      size={18}
                      className="announcementModal__icon--grey"
                    />
                    <span>Engineering Leadership</span>
                  </div>
                </MenuItem>

                <MenuItem value="5">
                  <div className="announcementModal__dropdownItem">
                    <FolderPlus
                      size={18}
                      className="announcementModal__icon--grey"
                    />
                    <span>Product Team</span>
                  </div>
                </MenuItem>

                <MenuItem value="6">
                  <div className="announcementModal__dropdownItem">
                    <FolderPlus
                      size={18}
                      className="announcementModal__icon--grey"
                    />
                    <span>Finance Department</span>
                  </div>
                </MenuItem>
              </TextField>
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
                  <Pin size={16} />
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
          <Button
            variant="outlined"
            className="announcement__button__cancel"
            onClick={closeAnnouncementForm}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            className="announcement__button__publish"
            onClick={handleSubmit}
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
