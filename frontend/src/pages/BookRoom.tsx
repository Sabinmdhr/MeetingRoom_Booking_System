import { useEffect, useState } from "react";
import "../assets/scss/pages/BookRoom.scss";
import {
  Card,
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { Meeting_room } from "../models/Meeting_room.model";
import {
  getMeetingRoomById,
  getMeetingRooms,
} from "../services/Meetinf_room.service";
import RoomDetailsCard from "../components/BookingRooms/RoomDetailsCard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ParticipantsCard from "../components/BookingRooms/ParticipantsCard";
import "../assets/scss/global.scss";

// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

const BookRoom = () => {
  const [meetingType, setMeetingType] = useState<string>("");
  const [participantType, setParticipantType] = useState<
    "internal" | "external" | null
  >(null);
  const menuItemOptions = [
    { value: "Internal", label: "Internal" },
    { value: "Client", label: "Client" },
    { value: "Executive", label: "Executive" },
  ];
  const [rooms, setRooms] = useState<Meeting_room[]>([]);
  const [roomId, setRoomId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Meeting_room | null>(null);

  const handleInternalClick = () => {
    setParticipantType((prev) => (prev === "internal" ? null : "internal"));
  };
  const handleExternalClick = () => {
    setParticipantType((prev) => (prev === "external" ? null : "external"));
  };

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getMeetingRooms();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  const handleRoomChange = async (id: string) => {
    setRoomId(id);

    const roomData = await getMeetingRoomById(id);
    setSelectedRoom(roomData);
  };

  return (
    <div className="bookroom">
      <form className="bookroom-form">
        <Card className="bookroom-card">
          <div className="bookroom-header">
            <Typography
              variant="h6"
              className="title"
            >
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
                <TextField
                  type="date"
                  fullWidth
                  size="small"
                />
              </div>
              <div className="time">
                <div className="field">
                  <p className="field-label">Start Time *</p>
                  <TextField
                    type="time"
                    fullWidth
                    size="small"
                  />

                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        slotProps={{
          textField: {
            placeholder: "HH:MM",
          },
        }}
      />
    </LocalizationProvider> */}
                </div>
                <div className="field">
                  <p className="field-label">End Time *</p>
                  <TextField
                    type="time"
                    fullWidth
                    size="small"
                  />
                </div>
              </div>

              <div className="field">
                <p className="field-label">Meeting Type *</p>
                <TextField
                  select
                  fullWidth
                  size="small"
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value as string)}
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
                  {menuItemOptions.map((item) => {
                    return <MenuItem value={item.value}>{item.label}</MenuItem>;
                  })}
                </TextField>
              </div>

              <div className="field">
                <p className="field-label">Participants</p>
                <Typography className="subtitle">
                  Add internal team members or external guests to the meeting
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<PeopleAltOutlinedIcon />}
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
                    startIcon={<PersonAddAltOutlinedIcon />}
                    onClick={handleExternalClick}
                  >
                    {participantType === "external"
                      ? "Hide External"
                      : "Add External"}
                  </Button>
                </Box>
                {participantType && <ParticipantsCard type={participantType} />}
              </div>

              <div className="field">
                <p className="field-label">Description</p>
                <TextField
                  placeholder="Enter meeting description (optional)"
                  fullWidth
                  size="small"
                  multiline
                />
              </div>
            </div>

            <div className="bookroom-right">
              <div className="field">
                <p className="field-label">Select Room *</p>
                <FormControl
                  fullWidth
                  size="small"
                >
                  <Select
                    className="select-room"
                    displayEmpty
                    value={roomId}
                    onChange={(e) => handleRoomChange(e.target.value)}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span>Choose a meeting room</span>;
                      }
                      const room = rooms.find((r) => r.id === selected);
                      return room?.title;
                    }}
                  >
                    {rooms.map((room) => (
                      <MenuItem
                        key={room.id}
                        value={room.id}
                      >
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
                startIcon={<CalendarTodayIcon />}
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
    </div>
  );
};

export default BookRoom;
