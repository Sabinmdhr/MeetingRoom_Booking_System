import {
  TextField,
  Button,
  MenuItem,
  Card,
  Typography,
  InputAdornment,
  Stack,
  capitalize,
  Chip,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useBookingRoomViewModel } from "../viewmodels/useBookingRoomViewModel";
import "../assets/scss/pages/BookRoom.scss";
import { Clock4, UserPlus, Users, X } from "lucide-react";
import { useparticipantsViewModel } from "../viewmodels/useParticipantsViewModel";

import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import ParticipantsCard from "../components/BookingRooms/ParticipantsCard";
import { useDispatch } from "react-redux";
import {
  clearBookingRoomFormData,
  toggleExternalParticipantsSelection,
  toggleParticipantsSelection,
  updateBookingRoomFormData,
} from "../redux/bookRoomSlice";
import { ExternalCard } from "../components/BookingRooms/ExternalCard";
import { TimeSlotSelector } from "../components/Meeting-Rooms/TimeSlotSelector";
import { useLocation } from "react-router-dom";
import type { WeekDays } from "../models/bookRoom.model";
import MyButton from "../components/ui/Button";

const BookRoom = () => {
  const location = useLocation();
  const { submitMode, bookingId } = location.state || {};
  const [openTimeSelector, setOpenTimeSelector] = useState<boolean>(false);
  const {
    handleChange,
    handleBookRoom,
    meetingTypes,
    handleExternalCard,
    openCard,
    handleEditBookRoomById,
    handleEditBookRoomByRecurrenceId,
    handleInternalCard,
    handleWeekDays,
  } = useBookingRoomViewModel();
  // const { participantType, handleInternalClick, handleExternalClick } =
  //   useparticipantsViewModel();
  const bookinRoomFormData = useAppSelector((state) => state.bookingRoom);
  const { users } = useparticipantsViewModel();
  const dispatch = useDispatch();
  type customDay = {
    name: string;
    value: WeekDays;
  };
  const recurrenceOptions = [
    { value: "NONE", label: "None" },
    { value: "DAILY", label: "Daily" },
    { value: "WEEKLY", label: "Weekly" },
    { value: "MONTHLY", label: "Monthly" },
    { value: "YEARLY", label: "Yearly" },
    { value: "CUSTOM", label: "Custom" },
    { value: "WEEKDAY", label: "Every weekday (Mon - Fri)" },
  ];
  const customDays: customDay[] = [
    { name: "Sun", value: "SUNDAY" },
    { name: "Mon", value: "MONDAY" },
    { name: "Tues", value: "TUESDAY" },
    { name: "WED", value: "WEDNESDAY" },
    { name: "Thur", value: "THURSDAY" },
    { name: "Fri", value: "FRIDAY" },
    { name: "Sa", value: "SATURDAY" },
  ];
  useEffect(() => {
    return () => {
      dispatch(clearBookingRoomFormData());
    };
  }, []);
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
                  value={bookinRoomFormData.startDate}
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
                    placeholder="Select Starttime"
                    value={bookinRoomFormData.startTime}
                    onChange={handleChange}
                    onClick={() => {
                      setOpenTimeSelector(true);
                    }}
                    // error={!!errors.startTime || !!errors.endTime}
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
                <Dialog
                  maxWidth="md"
                  fullWidth
                  open={openTimeSelector}
                  onClose={() => {
                    setOpenTimeSelector(false);
                  }}
                >
                  <DialogContent>
                    <TimeSlotSelector
                      calendarView={openTimeSelector}
                      setCalendarView={setOpenTimeSelector}
                      DialogView={true}
                      editingId={bookingId}
                    />
                  </DialogContent>
                </Dialog>

                <div className="field">
                  <label className="field-label">End Time *</label>
                  <TextField
                    className="timefield"
                    name="endTime"
                    placeholder="Select end time"
                    value={bookinRoomFormData.endTime}
                    onChange={handleChange}
                    onClick={() => setOpenTimeSelector(true)}
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
                  placeholder="Select Meeting Type"
                  // value={bookinRoomFormData.meetingTypeId}
                  value={
                    meetingTypes.find(
                      (m) => m.id === bookinRoomFormData.meetingTypeId,
                    )?.name || ""
                  }
                  onChange={handleChange}
                  // error={!!errors.meetingType}
                  fullWidth
                  size="small"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (selected) => {
                      if (!selected) {
                        return (
                          <span style={{ fontSize: "14px" }}>
                            Select meeting type
                          </span>
                        );
                      }
                      return selected as string;
                    },
                  }}
                >
                  {meetingTypes.map((meetingType) => (
                    <MenuItem key={meetingType.id} value={meetingType.id}>
                      {meetingType.name}
                    </MenuItem>
                  ))}
                </TextField>
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
                  {recurrenceOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {bookinRoomFormData.recurrenceType === "CUSTOM" && (
                  <div className="customDays">
                    {customDays.map((option) => {
                      const isSelected = bookinRoomFormData.weekDays.includes(
                        option.value,
                      );
                      return (
                        <Chip
                          label={option.name}
                          key={option.name}
                          onClick={() => {
                            handleWeekDays(option.value);
                            console.log(bookinRoomFormData.weekDays);
                          }}
                          sx={{
                            backgroundColor: isSelected
                              ? "#2e7d32 !important"
                              : "#f5f5f5 !important",
                            color: isSelected ? "#fff !important" : "#000",
                            fontWeight: isSelected ? 600 : 400,

                            "&.MuiChip-clickable:hover": {
                              backgroundColor: isSelected
                                ? "#1b5e20"
                                : "#e0e0e0",
                            },
                          }}
                        />
                      );
                    })}
                  </div>
                )}
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
              <MyButton
                variant="contained"
                customVariant="dark"
                onClick={() => {
                  if (submitMode === "editOnce") {
                    // Handle edit logic here
                    handleEditBookRoomById(bookingId);
                  } else if (submitMode === "editAll") {
                    handleEditBookRoomByRecurrenceId(bookingId);
                  } else {
                    handleBookRoom();
                  }
                }}
                text={
                  submitMode === "editOnce"
                    ? "Edit This Meeting"
                    : submitMode === "editAll"
                      ? "Edit All Meeting"
                      : "Book Now"
                }
              />
            </div>
            <div>
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
                {bookinRoomFormData.internalParticipantIds.length > 0 &&
                  openCard != "internal" && (
                    <div>
                        <Typography variant="subtitle2">
                          Internal Participants:
                        </Typography>
                      <div className="selected-participants">
                        {bookinRoomFormData.internalParticipantIds.map((id) => {
                          const participant = users.find((p) => p.id === id);
                          return participant ? (
                            <Chip
                              label={`${participant.firstname} ${participant.lastname}`}
                              key={id}
                              icon={
                                <X
                                  size={18}
                                  onClick={() => {
                                    dispatch(toggleParticipantsSelection(id));
                                  }}
                                />
                              }
                              className="selected-participant"
                            />
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                {bookinRoomFormData.externalParticipants.length > 0 && (
                  <>
                    <div className="selected-participants">
                      <Typography variant="subtitle2">
                        External Participants:
                      </Typography>
                      <div className="selected-chips">
                        {bookinRoomFormData.externalParticipants.map(
                          (participant) => (
                            <Chip
                              label={`${participant.name} `}
                              key={participant.email}
                              icon={
                                <X
                                  size={18}
                                  onClick={() => {
                                    dispatch(
                                      toggleExternalParticipantsSelection(
                                        participant,
                                      ),
                                    );
                                  }}
                                />
                              }
                              className="selected-participant"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  </>
                )}

                <Stack className="stack-container">
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Users size={18} />}
                    onClick={() => {
                      handleInternalCard();
                    }}
                  >
                    {openCard === "internal" ? "Hide Internal" : "Add Internal"}
                    {bookinRoomFormData.internalParticipantIds.length > 0 && (
                      <Chip
                        size="small"
                        style={{ marginLeft: "4px" }}
                        label={bookinRoomFormData.internalParticipantIds.length}
                      />
                    )}
                  </Button>
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<UserPlus size={18} />}
                    onClick={handleExternalCard}
                  >
                    {openCard === "external" ? "Hide External" : "Add External"}
                    {bookinRoomFormData.externalParticipants.length > 0 && (
                      <Chip
                        size="small"
                        style={{ marginLeft: "4px" }}
                        label={bookinRoomFormData.externalParticipants.length}
                      />
                    )}
                  </Button>
                </Stack>
                {openCard === "internal" && (
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

                {openCard === "external" && (
                  <ExternalCard onClose={handleExternalCard} />
                )}
              </div>
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
