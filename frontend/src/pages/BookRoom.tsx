import { useState } from "react";
import "../assets/scss/pages/BookRoom.scss";
import {
  Card,
  TextField,
  MenuItem,
  Button,
  Typography,
  Tab,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { TabContext, TabList, TabPanel } from "@mui/lab";
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

const BookRoom = () => {
  const [meetingType, setMeetingType] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [showParticipants, setShowParticipants] = useState(false);
  const [tabValue, setTabValue] = useState("");
  const menuItemOptions = [
    { value: "internal", label: "Internal" },
    { value: "External", label: "External" },
  ];

  const handleSubmit = () =>{

  }

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
                <TextField type="time" fullWidth size="small" />
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
              <Button
                className="participants-btn"
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<GroupIcon />}
                onClick={() => setShowParticipants(!showParticipants)}
              >
                Add Participants
              </Button>
              {/* {showParticipants && (
                <div className="participants-box">
                  <p className="participant">Group by</p>
                  <div className="participants-sub">
                    <div className="participants-subbox">All</div>
                    <div className="participants-subbox">Teams</div>
                    <div className="participants-subbox">People</div>
                  </div>
                  <div className="participant-item">Lorem Ipsum</div>
                  <div className="participant-item">Lorem Ipsum</div>
                  <div className="participant-item">Lorem Ipsum</div>
                  <div className="participant-item">Lorem Ipsum</div>
                  <div className="participant-item">Lorem Ipsum</div>
                </div>
              )} */}

              {showParticipants && (
                <div>
                  <TabContext value={tabValue}>
                  <TabList onChange={(e, value) => {
                      debugger;
                      setTabValue(value);
                    }}
                    aria-label="disabled tabs example"
                  >
                    <Tab label="All" value="all" />
                    <Tab label="Teams" value="teams" />
                    <Tab label="People" value="people" />
                  </TabList>
                  <TabPanel value="all">Selected all</TabPanel>
                  <TabPanel value="teams">Selected teams</TabPanel>
                  <TabPanel value="people">Selected people</TabPanel>
                  </TabContext>
                </div>
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
              <TextField
                select
                fullWidth
                size="small"
                value={room}
                onChange={(e) => setRoom(e.target.value as string)}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) {
                      return (
                        <span style={{ color: "#9aa0a6", fontSize: "14px" }}>
                          Choose a meeting room
                        </span>
                      );
                    }
                    return selected as string;
                  },
                }}
              >
                <MenuItem value="Manang">Manang</MenuItem>
                <MenuItem value="Mustang">Mustang</MenuItem>
                <MenuItem value="Ghandruk">Ghandruk</MenuItem>
              </TextField>
            </div>
            <div className="room-preview">
              <LocationOnIcon className="location-icon" />
              <p>Select a room to view details</p>
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
            <p className="reqd-text">Please fill in all required fields (*)</p>
          </div>
        </div>
      </Card>
      </form>
    </div>
  )
}

export default BookRoom
