import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
  TextField,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import "../assets/scss/pages/EditCalendarModal.scss";
import ParticipantsCard from "./BookingRooms/ParticipantsCard";

interface Props {
  event: any;
  openEdit: boolean;
  setOpenEdit: (value: boolean) => void;
}

const menuProps = {
  disablePortal: true,
  PaperProps: {
    className: "edit-modal-menu",
    style: { maxHeight: 200 },
  },
};

const EditCalendarModal = ({ event, openEdit, setOpenEdit }: Props) => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    organizer: "",
    category: "internal",
    department: "",
    description: "",
  });

  useEffect(() => {
    if (event) {
      const convertTime = (time: string) => {
        if (!time) return "";
        const [t, modifier] = time.split(" ");
        let [hours, minutes] = t.split(":");
        if (modifier === "PM" && hours !== "12") {
          hours = String(parseInt(hours, 10) + 12);
        }
        if (modifier === "AM" && hours === "12") {
          hours = "00";
        }
        return `${hours.padStart(2, "0")}:${minutes}`;
      };

      setEventData({
        ...event,
        startTime: convertTime(event.startTime),
        endTime: convertTime(event.endTime),
      });
    }
  }, [event]);

  const handleChange = (field: string, value: string) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog
      className="edit-modal-main"
      open={openEdit}
      onClose={() => setOpenEdit(false)}
      fullWidth
      maxWidth="sm"
      scroll="body"
      disableScrollLock
    >
      {/* HEADER */}
      <DialogTitle className="edit-modal-header">
        <p> Edit Meeting</p>
        <span className={`modal-category ${eventData.category}`}>
          {eventData.category}
        </span>
      </DialogTitle>

      {/* CONTENT */}
      <DialogContent className="edit-modal-content">
        {/* Title */}
        <div className="modal-section">
          <p className="section-title">Title</p>
          <TextField
            fullWidth
            value={eventData.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <Divider />

        {/* Date & Time */}
        <div className="modal-section">
          <p className="section-title">Date & Time</p>
          <div className="datetime-grid">
            <TextField
              type="date"
              fullWidth
              value={eventData.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
            <TextField
              type="time"
              fullWidth
              value={eventData.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
            />
            <TextField
              type="time"
              fullWidth
              value={eventData.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
            />
          </div>
        </div>

        <Divider />

        {/* Location */}
        <div className="modal-section">
          <p className="section-title">Location</p>
          <TextField
            select
            fullWidth
            value={eventData.location || ""}
            onChange={(e) => handleChange("location", e.target.value)}
            SelectProps={{ MenuProps: menuProps }}
          >
            {eventData.location &&
              ![
                "All Rooms",
                "Executive Room 3A",
                "Conference Room 2B",
                "Meeting Room 1C",
                "Board Room 5A",
              ].includes(eventData.location) && (
                <MenuItem value={eventData.location}>
                  {eventData.location}
                </MenuItem>
              )}
            <MenuItem value="All Rooms">All Rooms</MenuItem>
            <MenuItem value="Executive Room 3A">Executive Room 3A</MenuItem>
            <MenuItem value="Conference Room 2B">Conference Room 2B</MenuItem>
            <MenuItem value="Meeting Room 1C">Meeting Room 1C</MenuItem>
            <MenuItem value="Board Room 5A">Board Room 5A</MenuItem>
          </TextField>
        </div>

        <Divider />

        {/* Organizer */}
        <div className="modal-section">
          <p className="section-title">Organizer</p>
          <TextField
            fullWidth
            value={eventData.organizer}
            onChange={(e) => handleChange("organizer", e.target.value)}
          />
        </div>

        <Divider />

        {/* Participants */}
        <div className="modal-section">
          <ParticipantsCard
            type=""
            displayOn="calendar"
          />
        </div>

        <Divider />

        {/* Meeting Type + Department */}
        <div className="modal-section">
          <div className="datetime-grid">
            <div>
              <p className="section-title">Meeting Type</p>
              <TextField
                select
                fullWidth
                value={eventData.category}
                onChange={(e) => handleChange("category", e.target.value)}
                SelectProps={{ MenuProps: menuProps }}
              >
                <MenuItem value="internal">Internal</MenuItem>
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="executive">Executive</MenuItem>
              </TextField>
            </div>
            <div>
              <p className="section-title">Department</p>
              <TextField
                fullWidth
                value={eventData.department}
                onChange={(e) => handleChange("department", e.target.value)}
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* Description */}
        <div className="modal-section">
          <p className="section-title">Description</p>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={eventData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions className="edit-modal-actions">
        <Button
          className="cancel-button"
          onClick={() => setOpenEdit(false)}
        >
          Cancel
        </Button>
        <Button
          className="save-button"
          variant="contained"
          onClick={() => {
            console.log(eventData);
            setOpenEdit(false);
          }}
        >
          <Save size={18} />
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCalendarModal;
