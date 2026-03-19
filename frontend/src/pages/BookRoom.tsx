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
  InputAdornment,
  Chip,
} from "@mui/material";
import { Users, UserPlus, X } from 'lucide-react';
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import type { Meeting_room } from "../models/Meeting_room.model";
import {
  getMeetingRoomById,
  getMeetingRooms,
} from "../services/Meetinf_room.service";
import RoomDetailsCard from "../components/BookingRooms/RoomDetailsCard";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ParticipantsCard from "../components/BookingRooms/ParticipantsCard";
import SelectTimeCard from "../components/BookingRooms/SelectTimeCard";
import { useparticipantsViewModel } from "../viewmodels/useParticipantsViewModel";
import { useAppSelector } from "../redux/store";

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
  // const {selectedParticipants} = useparticipantsViewModel();
  const [rooms, setRooms] = useState<Meeting_room[]>([]);
  const [roomId, setRoomId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<Meeting_room | null>(null);
  const [openTime, setOpenTime] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState<string | null>(null);
  const [timeType, setTimeType] = useState<"start" | "end" | null>(null);

const {selectedParticipants} = useAppSelector((state)=> state.participants)
const participants  = useAppSelector((state)=> state.participants.participants)
const selectedId = useAppSelector((state) => state.participants.selectedParticipants)

const selectedNames = participants.filter((p) => selectedId.includes(p.id)).map((p)=> p.fullName)
// const plength = selectedParticipants.length
  const handleInternalClick = () => {
    setParticipantType((prev) => (prev === "internal" ? null : "internal"));
  };
  const handleExternalClick = () => {
    setParticipantType((prev) => (prev === "external" ? null : "external"));
  };

  const handleSelectTime = (time: string) => {
    if (timeType === "start") {
      setStartTime(time);
      setEndTime("");
    }

    if (timeType === "end") {
      setEndTime(time);
    }
    setOpenTime(false);
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
                    placeholder="Select start time"
                    fullWidth
                    size="small"
                    value={startTime}
                    onClick={() => {
                      setTimeType("start");
                      setOpenTime(true);
                    }}
                    slotProps={{
                      htmlInput: {
                        readOnly: true,
                      },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTimeIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
                <div className="field">
                  <p className="field-label">End Time *</p>
                  <TextField
                    placeholder="Select end time"
                    fullWidth
                    size="small"
                    value={endTime || ""}
                    onClick={() => {
                      setTimeType("end");
                      setOpenTime(true);
                    }}
                    slotProps={{
                      htmlInput: {
                        readOnly: true,
                      },
                      input: {
                        endAdornment: (
                          <InputAdornment position="end">
                            <AccessTimeIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </div>
              </div>

              <SelectTimeCard
                open={openTime}
                onClose={() => setOpenTime(false)}
                onSelectTime={handleSelectTime}
                startTime={startTime}
                type={timeType}
              />

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
{selectedParticipants.length != 0 &&
<div>
  <Typography>Internal Members {selectedParticipants.length}</Typography>

 <div>
  {selectedNames.map((p)=>
<Chip label={p} icon={<X/>}></Chip>
  )}
 </div>

  </div>

  }

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    className="participants-btn"
                    fullWidth
                    variant="outlined"
                    size="small"
                    startIcon={<Users size={18} />}
                    onClick={handleInternalClick}
                  >
                    {participantType === "internal"
                      ? `Hide Internal (${selectedParticipants.length})`
                      : `Add Internal  `}
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
                </Box>
                {participantType && (
                  <ParticipantsCard
                    type={participantType}
                    displayOn="book-room"
                  />
                )}
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
