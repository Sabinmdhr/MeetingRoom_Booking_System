import {
  TextField,
  Button,
  MenuItem,
  Card,
  Typography,
  InputAdornment,
  Stack,
  capitalize,
} from "@mui/material";
import { useBookingRoomViewModel } from "../viewmodels/useBookingRoomViewModel";
import "../assets/scss/pages/BookRoom.scss";
import { Calendar, Clock4, UserPlus, Users } from "lucide-react";
import { useparticipantsViewModel } from "../viewmodels/useParticipantsViewModel";

import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import ParticipantsCard from "../components/BookingRooms/ParticipantsCard";
import { useDispatch } from "react-redux";
import { updateBookingRoomFormData } from "../redux/bookRoomSlice";

const meetings = [
  { id: "1", name: "INTERNAL" },
  { id: "2", name: "CLIENT" },
  { id: "3", name: "EXECUTIVE" },
];

const BookRoom = () => {
  const { handleChange, handleBookRoom } =
    useBookingRoomViewModel();
  const { participantType, handleInternalClick, handleExternalClick } =
    useparticipantsViewModel();
  const bookinRoomFormData = useAppSelector((state) => state.bookingRoom);

  const dispatch = useDispatch();
  // const { startTime, endTime, date } = useAppSelector(
  //   (state) => state.bookingRoom,
  // );
  // const {
  //   handleTimeClick,
  //   openWarning,
  //   setOpenWarning,
  //   timeType,
  //   openTime,
  //   setOpenTime,
  // } = useTimeSlotsViewModel(values.roomId, values.date);

  const [openParticipantCard, setOpenParticipantCard] = useState(false);
  // const { handleRoomChange, rooms, roomId, selectedRoom } =
  //   useRoomDetailsCard();

  // const { selectedParticipants } = useAppSelector(
  //   (state) => state.participants,
  // );
  // const participants = useAppSelector(
  //   (state) => state.participants.participants,
  // );
  // const selectedId = useAppSelector(
  //   (state) => state.participants.selectedParticipants,
  // );
  // // const selectedNames = participants
  //   .filter((p) => selectedId.includes(p.id))
  //   .map((p) => p.fullName);

  useEffect(() => {
    console.log(bookinRoomFormData);
  }, [bookinRoomFormData.internalParticipantIds]);
  return (
    <div className="bookroom">
      <form className="bookroom-form">
        <Card className="bookroom-card">
          <div className="bookroom-header">
            <Typography variant="h1">Book a Meeting Room</Typography>
            <Typography variant="subtitle1">
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
                  value={bookinRoomFormData.meetingTitle}
                  onChange={handleChange}
                  // error={!!errors.meetingTitle} // !! converts a value into a boolean. We do this bcuz material UI textfield expects error: boolean. So we convert the error message to true/false. !!"Meeting title required" → true. !!undefined → false
                  // helperText={errors.meetingTitle}
                  fullWidth
                />
              </div>
              {/* {errors.meetingTitle && (
                <span className="field-error">{errors.meetingTitle}</span>
              )} */}

              <div className="field">
                <label className="field-label">Date *</label>
                <TextField
                  name="date"
                  value={bookinRoomFormData.date}
                  onChange={handleChange}
                  // error={!!errors.date}
                  fullWidth
                />
                {/* {errors.date && (
                  <span className="field-error">{errors.date}</span>
                )} */}
              </div>

              <div className="time">
                <div className="field">
                  <label className="field-label">Start Time *</label>
                  <TextField
                    className="timefield"
                    name="startTime"
                    placeholder="Select start time"
                    value={bookinRoomFormData.startTime}
                    onChange={handleChange}
                    // onClick={() => handleTimeClick("start")}
                    // error={!!errors.startTime || !!errors.endTime}
                    slotProps={{
                      htmlInput: {
                        // readOnly: true,
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
                    value={bookinRoomFormData.endTime}
                    onChange={handleChange}
                    // onClick={() => handleTimeClick("end")}
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
              {/* {(errors.startTime || errors.endTime) && (
                <span className="field-error">
                  Please select both Start time and End time.
                </span>
              )} */}
              {/* <SelectTimeCard
                open={openTime}
                onClose={() => setOpenTime(false)}
                type={timeType}
                // meetingId={values.roomId}
                meetingId={values.roomId}
              /> */}

              <div className="field">
                <label className="field-label">Meeting Type *</label>
                <TextField
                  select
                  name="meetingTypeId"
                  value={bookinRoomFormData.meetingTypeId}
                  onChange={handleChange}
                  // error={!!errors.meetingType}
                  fullWidth
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ color: "#245789", fontSize: "14px" }}>
                            Select meeting type
                          </span>
                        );
                      }
                      return selected as string;
                    },
                  }}
                >
                  {meetings.map((meeting) => (
                    <MenuItem key={meeting.id} value={meeting.id}>
                      {meeting.id}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {/* {errors.meetingType && (
                <span className="field-error">{errors.meetingType}</span>
              )} */}

              <div className="field">
                <label className="field-label">Participants</label>
                <Typography className="subtitle">
                  Add internal team members or external guests to the meeting
                </Typography>
                {/* {selectedParticipants.length != 0 && (
                  <div>
                    <Typography>
                      Internal Members {selectedParticipants.length}
                    </Typography>

                    {selectedNames.map((p) => (
                      <Chip label={p} icon={<X />}></Chip>
                    ))}
                  </div>
                )} */}

                <Stack className="stack-container">
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Users size={18} />}
                    onClick={() => {
                      setOpenParticipantCard(!openParticipantCard);
                    }}
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
                {openParticipantCard && (
                  <ParticipantsCard
                    type="internal"
                    participants={bookinRoomFormData.internalParticipantIds}
                    onChange={(updated) => {
                      dispatch(
                        updateBookingRoomFormData({
                          internalParticipantIds: updated,
                        }),
                      );
                    }}
                  />
                )}

                {/* {participantType && (
                  <ParticipantsCard
                    displayOn="book-room"
                    type={participantType}

                  />
                )} */}
              </div>

              <div className="field">
                <label className="field-label">Recurring Meeting</label>
                <TextField
                  select
                  name="recurrenceType"
                  onChange={handleChange}
                  fullWidth
                  size="small"
                  value={bookinRoomFormData.recurrenceType}
                >
                  {[
                    "NONE",
                    "Every weekday (Mon - Fri)",
                    "DAILY",
                    "WEEKLY",
                    "MONTHLY",
                    "YEARLY",
                    "CUSTOM",
                  ].map((option) => (
                    <MenuItem key={option} value={capitalize(option)}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                {bookinRoomFormData.recurrenceType !== "NONE" && (
                  <div className="field">
                    <label className="field-label" htmlFor="recurrenceEndDate">
                      Enter Recurrence End Date
                    </label>
                    <TextField
                      type="date"
                      id="recurrenceEndDate"
                      name="recurrenceEndDate"
                      value={bookinRoomFormData.recurrenceEndDate}
                      onChange={handleChange}
                    ></TextField>
                  </div>
                )}
              </div>

              <div className="field">
                <label className="field-label" htmlFor="desc">
                  Description
                </label>
                <TextField
                  id="desc"
                  name="description"
                  value={bookinRoomFormData.description}
                  placeholder="Enter meeting description (optional)"
                  fullWidth
                  onChange={handleChange}
                  size="small"
                  multiline
                />
              </div>
              <Button
                variant="contained"
                onClick={() => {
                  handleBookRoom();
                }}
              >
                Book Room
              </Button>
            </div>
          </div>
        </Card>
      </form>
      {/* <Snackbar
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
      </Snackbar> */}
    </div>
  );
};

export default BookRoom;
