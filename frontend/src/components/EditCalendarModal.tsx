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

import "../assets/scss/pages/EditCalendarModal.scss";
import { Save } from "lucide-react";
const EditCalendarModal = ({ event, openEdit, setOpenEdit }: any) => {
  if (!event && !openEdit) return null;

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

  // Populate eventData when modal opens
  useEffect(() => {
    if (event) {
      setEventData({
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location,
        organizer: event.organizer,
        category: event.category,
        department: event.department,
        description: event.description,
      });
    }
  }, [event]);
  return (
    <div className="edit-modal">
      <Dialog
        className="edit-modal-main"
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className="edit-modal-title">Edit Meeting</DialogTitle>
        <DialogContent className="calendar-modal-content">
          {/* Title */}
          <div className="modal-section">
            <p className="section-title">Title</p>
            <TextField
              fullWidth
              variant="outlined"
              value={eventData?.title}
              onChange={(e) =>
                setEventData({ ...eventData, title: e.target.value })
              }
            />
          </div>

          <Divider />

          {/* Date & Time */}
          <div className="modal-section">
            <p className="section-title">Date & Time</p>
            <div className="datetime-grid">
              <div>
                <p className="section-title">Date</p>
                <TextField
                  type="date"
                  fullWidth
                  value={eventData.date}
                  onChange={(e) =>
                    setEventData({ ...eventData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="section-title">Start Time</p>
                <TextField
                  type="time"
                  fullWidth
                  value={eventData.startTime}
                  onChange={(e) =>
                    setEventData({ ...eventData, startTime: e.target.value })
                  }
                />
              </div>
              <div>
                <p className="section-title">End Time</p>
                <TextField
                  type="time"
                  fullWidth
                  value={eventData.endTime}
                  onChange={(e) =>
                    setEventData({ ...eventData, endTime: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <Divider />

          {/* Location */}
          <div className="modal-section">
            <p className="section-title">Location</p>
            <TextField
              fullWidth
              variant="outlined"
              value={eventData.location}
              onChange={(e) =>
                setEventData({ ...eventData, location: e.target.value })
              }
            />
          </div>

          <Divider />

          {/* Organizer */}
          <div className="modal-section">
            <p className="section-title">Organizer</p>
            <TextField
              fullWidth
              variant="outlined"
              value={eventData.organizer}
              onChange={(e) =>
                setEventData({ ...eventData, organizer: e.target.value })
              }
            />
          </div>

          <Divider />

          {/* Meeting Type & Department */}
          <div className="modal-section">
            <div className="datetime-grid">
              <div className="edit-calendar__dropdown-item">
                <p className="section-title">Meeting Type</p>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  value={eventData.category}
                  onChange={(e) =>
                    setEventData({ ...eventData, category: e.target.value })
                  }
                  SelectProps={{
                    MenuProps: {
                      container: document.body,
                      PaperProps: {
                        style: {
                          zIndex: 2000,
                        },
                      },
                    },
                  }}
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
                  variant="outlined"
                  value={eventData.department}
                  onChange={(e) =>
                    setEventData({ ...eventData, department: e.target.value })
                  }
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
              variant="outlined"
              value={eventData.description}
              onChange={(e) =>
                setEventData({ ...eventData, description: e.target.value })
              }
            />
          </div>
        </DialogContent>

        <DialogActions className="calendar-modal-actions">
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
              console.log("Saved event:", eventData);
              setOpenEdit(false);
            }}
          >
            <Save size={18} /> <span>Save Changes</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCalendarModal;
