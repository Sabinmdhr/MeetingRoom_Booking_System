import {
  TextField,
  Button,
  MenuItem,
  Card,
  Typography,
  InputAdornment,
  Stack,
  Snackbar,
  Select,
  FormControl,
  Chip,
} from "@mui/material";
import { useBookingForm } from "../../viewmodels/useBookingForm";
import "../../assets/scss/pages/BookRoom.scss";
import {
  Calendar,
  Clock4,
  UserPlus,
  Users,
  CircleAlert,
  X,
} from "lucide-react";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import ParticipantsCard from "../BookingRooms/ParticipantsCard";
import { useTimeSlotsViewModel } from "../../viewmodels/useTimeSlotsViewModel";
import SelectTimeCard from "../BookingRooms/SelectTimeCard";
import { useRoomDetailsCard } from "../../viewmodels/useRoomDetailsCard";
import RoomDetailsCard from "../BookingRooms/RoomDetailsCard";
import { useAppSelector } from "../../redux/store";

const meetings = [
  { id: "1", name: "Internal" },
  { id: "2", name: "Client" },
  { id: "3", name: "Executive" },
];

export default function BookMeetingRoom() {
  const { values, errors, handleChange, handleSubmit } = useBookingForm();
  const { participantType, handleInternalClick, handleExternalClick } =
    useparticipantsViewModel();
  const {
    handleTimeClick,
    openWarning,
    setOpenWarning,
    timeType,
    openTime,
    setOpenTime,
  } = useTimeSlotsViewModel(values.roomId, values.date);
  const { handleRoomChange, rooms, roomId, selectedRoom } =
    useRoomDetailsCard();

  const { selectedParticipants } = useAppSelector(
    (state) => state.participants,
  );
  const participants = useAppSelector(
    (state) => state.participants.participants,
  );
  const selectedId = useAppSelector(
    (state) => state.participants.selectedParticipants,
  );
  const selectedNames = participants
    .filter((p) => selectedId.includes(p.id))
    .map((p) => p.fullName);
  return (
    <div className="bookroom">
      <form className="bookroom-form" onSubmit={handleSubmit}>
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
                <label className="field-label" htmlFor="meeting-title">
                  Meeting Title *
                </label>
                <TextField
                  placeholder="Enter meeting title"
                  id="meeting-title"
                  name="meetingTitle"
                  value={values.meetingTitle}
                  onChange={handleChange}
                  error={!!errors.meetingTitle} // !! converts a value into a boolean. We do this bcuz material UI textfield expects error: boolean. So we convert the error message to true/false. !!"Meeting title required" → true. !!undefined → false
                  // helperText={errors.meetingTitle}
                  fullWidth
                />
              </div>
              {errors.meetingTitle && (
                <span className="field-error">{errors.meetingTitle}</span>
              )}

              <div className="field">
                <label className="field-label">Date *</label>
                <TextField
                  type="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  fullWidth
                />
                {errors.date && (
                  <span className="field-error">{errors.date}</span>
                )}
              </div>

              <div className="time">
                <div className="field">
                  <label className="field-label">Start Time *</label>
                  <TextField
                    className="timefield"
                    name="startTime"
                    placeholder="Select start time"
                    value={values.startTime}
                    onChange={handleChange}
                    onClick={() => handleTimeClick("start")}
                    error={!!errors.startTime || !!errors.endTime}
                    slotProps={{
                      htmlInput: {
                        readOnly: true,
                      },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Clock4 size={18} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
                <div className="field">
                  <label className="field-label">End Time *</label>
                  <TextField
                    className="timefield"
                    name="endTime"
                    placeholder="Select end time"
                    value={values.endTime}
                    onChange={handleChange}
                    onClick={() => handleTimeClick("end")}
                    slotProps={{
                      htmlInput: {
                        readOnly: true,
                      },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <Clock4 size={18} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
              </div>
              {(errors.startTime || errors.endTime) && (
                <span className="field-error">
                  Please select both Start time and End time.
                </span>
              )}
              <SelectTimeCard
                open={openTime}
                onClose={() => setOpenTime(false)}
                type={timeType}
                // meetingId={values.roomId}
                meetingId={values.roomId}
              />

              <div className="field">
                <label className="field-label">Meeting Type *</label>
                <TextField
                  select
                  name="meetingType"
                  value={values.meetingType}
                  onChange={handleChange}
                  error={!!errors.meetingType}
                  fullWidth
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#9aa0a6", fontSize: "14px" }}>
                            Select meeting type
                          </span>
                        );
                      }
                      return selected as string;
                    },
                  }}
                >
                  {meetings.map((meeting) => (
                    <MenuItem key={meeting.id} value={meeting.name}>
                      {meeting.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {errors.meetingType && (
                <span className="field-error">{errors.meetingType}</span>
              )}

              <div className="field">
                <label className="field-label">Participants</label>
                <Typography className="subtitle">
                  Add internal team members or external guests to the meeting
                </Typography>
                {selectedParticipants.length != 0 && (
                  <div>
                    <Typography>
                      Internal Members {selectedParticipants.length}
                    </Typography>

                    {selectedNames.map((p) => (
                      <Chip label={p} icon={<X />}></Chip>
                    ))}
                  </div>
                )}

                <Stack className="stack-container">
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Users size={18} />}
                    onClick={handleInternalClick}
                  >
                    {participantType === "internal"
                      ? "Hide Internal"
                      : "Add Internal"}
                  </Button>
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<UserPlus size={18} />}
                    onClick={handleExternalClick}
                  >
                    {participantType === "external"
                      ? "Hide External"
                      : "Add External"}
                  </Button>
                </Stack>
                {participantType && (
                  <ParticipantsCard
                    displayOn="book-room"
                    type={participantType}
                  />
                )}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="desc">
                  Description
                </label>
                <TextField
                  id="desc"
                  placeholder="Enter meeting description (optional)"
                  fullWidth
                  size="small"
                  multiline
                />
              </div>
            </div>
            <div className="bookroom-right">
              <div className="field">
                <label className="field-label">Select Room *</label>
                <FormControl
                  fullWidth
                  size="small"
                  className="formcontrol-room"
                >
                  <Select
                    name="roomId"
                    value={roomId}
                    onChange={(e) => {
                      handleRoomChange(e.target.value);
                      handleChange(e);
                    }}
                    fullWidth
                    size="small"
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span className="select-room">
                            Choose a meeting room
                          </span>
                        );
                      }
                      const room = rooms.find((r) => r.id === selected);
                      return room?.title;
                    }}
                  >
                    {rooms.map((room) => (
                      <MenuItem key={room.id} value={room.id}>
                        {room.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <RoomDetailsCard room={selectedRoom} />
              </div>
              <Button
                className="book-btn"
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<Calendar size={16} />}
              >
                Book Meeting Room
              </Button>
              <p className="reqd-text">
                Please fill in all required fields (*)
              </p>
            </div>
          </div>
        </Card>
      </form>
      <Snackbar
        open={openWarning}
        autoHideDuration={3000}
        onClose={() => setOpenWarning(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <div className="warning">
          <CircleAlert className="warning-icon" size={18} />
          <span className="warning-span">
            Please select a room and date first
          </span>
        </div>
      </Snackbar>
    </div>
  );
}
