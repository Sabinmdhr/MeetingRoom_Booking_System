import "../assets/scss/pages/BookRoom.scss";
import {
  Card,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

const BookRoom = () => {
  return (
    <div className="bookroom">
      <Card className="bookroom-card">
        <div className="bookroom-header">
          <Typography variant="h6" className="title">
            Book a Meeting Room
          </Typography>
          <Typography className="subtitle">
            Fill in the details to reserve a meeting room
          </Typography>
        </div>

        <div className="bookroom-body">
          <div className="bookroom-left">
            <div className="field">
              <p className="field-label">Meeting Title *</p>
              <TextField
                placeholder="Enter meeting title"
                fullWidth
                size="small"
              />
            </div>

            <div className="field">
              <p className="field-label">Date *</p>
              <TextField type="date" fullWidth size="small" />
            </div>

            <div className="time">
              <div className="field">
                <p className="field-label">Start Time *</p>
                <TextField type="time" fullWidth size="small" />
              </div>

              <div className="field">
                <p className="field-label">End Time *</p>
                <TextField type="time" fullWidth size="small" />
              </div>
            </div>

            <div className="field">
              <p className="field-label">Meeting Type *</p>
              <TextField select fullWidth size="small" defaultValue="">
                <MenuItem value="offline">Offline</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </TextField>
            </div>

            <div className="field">
              <p className="field-label">Participants</p>
              <TextField
                placeholder="Add Participants"
                fullWidth
                size="small"
              />
            </div>

            <div className="field">
              <p className="field-label">Description</p>
              <TextField
                placeholder="Enter meeting description (optional)"
                fullWidth
                multiline
                rows={2}
                size="small"
              />
            </div>
          </div>

          <div className="bookroom-right">
            <div className="field">
              <p className="field-label">Select Room *</p>
              <TextField select fullWidth size="small" defaultValue="">
                <MenuItem value="room1">Conference Room A</MenuItem>
                <MenuItem value="room2">Conference Room B</MenuItem>
              </TextField>
            </div>
            <div className="room-preview">
              <p>Select a room to view details</p>
            </div>
            <Button
              variant="contained"
              fullWidth
              className="book-btn">
              Book Meeting Room
            </Button>

            <p className="reqd-text">
              Please fill in all required fields (*)
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default BookRoom