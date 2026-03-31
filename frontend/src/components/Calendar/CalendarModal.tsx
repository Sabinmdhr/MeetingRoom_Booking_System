import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import type { CalendarEvent } from "../../models/calendar.model";
import "../../assets/scss/pages/CalendarModal.scss";
import "../../assets/scss/global.scss";
import ParticipantsCard from "../BookingRooms/ParticipantsCard";
import { toast } from "mui-sonner";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";

interface CalendarModalProps {
  open: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onEdit: () => void;
}

const CalendarModal = ({
  open,
  event,
  onClose,
  onEdit,
}: CalendarModalProps) => {
  const { users } = useparticipantsViewModel();

  const handleDelete = () => {
    toast.error("Meeting Deleted Successfully!", {
      closeButton: true,
    });
  };
  return (
    <div>
      {/* View Modal */}
      <Dialog
        className="calendar-modal-main"
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="calendar-modal-title">
          <h2 className="modal-title">{event?.title}</h2>
          <span
            className={`modal-category ${
              event?.category === "client"
                ? "client"
                : event?.category === "internal"
                  ? "internal"
                  : "executive"
            }`}
          >
            {event?.category}
          </span>
        </DialogTitle>
        <Divider />

        <DialogContent className="calendar-modal-content">
          <div className="modal-section">
            <p className="section-title">Date & Time</p>
            <div className="datetime-grid">
              <div>
                <p className="section-title">Date</p>
                <p className="section-text">{event?.date}</p>
              </div>
              <div>
                <p className="section-title">Time</p>
                <p className="section-text">
                  {event?.startTime} - {event?.endTime}
                </p>
              </div>
            </div>
          </div>

          <Divider />

          <div className="modal-section">
            <p className="section-title">Location</p>
            <p className="section-text">{event?.location}</p>
          </div>

          <Divider />

          <div className="modal-section">
            <p className="section-title">Organizer</p>
            <p className="section-text">{event?.organizer}</p>
          </div>

          <Divider />

          <div className="modal-section">
            {/* <div className="modal-participants"> */}
            <ParticipantsCard
              type=""
              displayOn="calendar"
              users={users}
            />
          </div>
          {/* </div> */}

          <Divider />

          <div className="modal-section">
            <div className="datetime-grid">
              <div>
                <p className="section-title">Meeting Type</p>
                <p className="section-text">{event?.category}</p>
              </div>
              <div>
                <p className="section-title">Department</p>
                <p className="section-text">{event?.department}</p>
              </div>
            </div>
          </div>

          <Divider />

          <div className="modal-section">
            <p className="section-title">Description</p>
            <p className="section-text">{event?.description}</p>
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
            onClick={handleDelete}
          >
            Delete Meeting
          </Button>
          <Button
            className="edit-button"
            variant="text"
            onClick={onEdit}
          >
            Edit Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarModal;
