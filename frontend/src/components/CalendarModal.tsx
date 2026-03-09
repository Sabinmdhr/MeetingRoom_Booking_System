import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { CalendarEvent } from "../models/calendar.model";
import "../assets/scss/pages/CalendarModal.scss";

interface CalendarModalProps {
  open: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
}

const CalendarModal = ({ open, event, onClose }: CalendarModalProps) => {
  if (!event) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle className="calendar-modal-title">
        <h2 className="modal-title">{event.title}</h2>
        <span className="modal-category">{event.category}</span>
      </DialogTitle>

      <DialogContent className="calendar-modal-content">
        <div className="modal-section">
          <p className="section-title">Date & Time</p>

          <div className="datetime-grid">
            <div>
              <p className="section-title">Date</p>
              <p className="section-text">{event.date}</p>
            </div>

            <div>
              <p className="section-title">Time</p>
              <p className="section-text">
                {event.startTime} - {event.endTime}
              </p>
            </div>
          </div>
        </div>

        <Divider />

        <div className="modal-section">
          <p className="section-title">Location</p>
          <p className="section-text">{event.location}</p>
        </div>

        <Divider />

        <div className="modal-section">
          <p className="section-title">Organizer</p>
          <p className="section-text">{event.organizer}</p>
        </div>

        <Divider />

        <div className="modal-section">
          <div className="datetime-grid">
            <div>
              <p className="section-title">Meeting Type</p>
              <p className="section-text">{event.category}</p>
            </div>

            <div>
              <p className="section-title">Department</p>
              <p className="section-text">{event.department}</p>
            </div>
          </div>
        </div>

        <Divider />

        <div className="modal-section">
          <p className="section-title">Description</p>
          <p className="section-text">{event.description}</p>
        </div>
      </DialogContent>

      <DialogActions className="calendar-modal-actions">
        <Button
          className="close-button"
          onClick={onClose}
          variant="contained"
        >
          Close
        </Button>
        <Button
          className="delete-button"
          variant="contained"
          startIcon={<DeleteOutlineIcon />}
        >
          Delete Meeting
        </Button>
        <Button
          className="edit-button"
          variant="text"
        >
          Edit Meeting
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
