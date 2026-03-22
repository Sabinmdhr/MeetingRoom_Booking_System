import {
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Calendar, X } from "lucide-react";
import "../assets/scss/pages/ReportFilters.scss";
import { useState } from "react";
import "../assets/scss/global.scss";

const ReportFilters = ({ open, onClose }: any) => {
  const [department, setDepartment] = useState("All Department");
  const [room, setRoom] = useState("All Rooms");
  const [user, setUser] = useState("All Users");
  const [meetingType, setMeetingType] = useState("All Types");

  const handleClear = () => {
    setDepartment("All Department");
    setRoom("All Rooms");
    setUser("All Users");
    setMeetingType("All Types");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { className: "report-filter" } }}
    >
      <div className="report-filter__inner">
        {/* Header */}
        <div className="report-filter__header">
          <Typography variant="h6">Filters</Typography>
          <div className="report-filter__header__right">
            <IconButton
              onClick={onClose}
              size="small"
            >
              <X size={20} />
            </IconButton>
          </div>
        </div>

        <Divider />

        <div className="report-filter__content">
          {/* Row 1: Start Date + End Date */}
          <Grid
            container
            spacing={2}
          >
            <Grid size={6}>
              <label className="report-filter__label">
                <Calendar size={14} /> Start Date
              </label>
              <TextField
                type="date"
                fullWidth
                className="report-filter__input"
              />
            </Grid>
            <Grid size={6}>
              <label className="report-filter__label">
                <Calendar size={14} /> End Date
              </label>
              <TextField
                type="date"
                fullWidth
                className="report-filter__input"
              />
            </Grid>
          </Grid>

          {/* Row 2: Meeting Type + Department */}
          <Grid
            container
            spacing={2}
            className="report-filter__row"
          >
            <Grid size={6}>
              <label className="report-filter__label">Meeting Type</label>
              <TextField
                select
                fullWidth
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
                className="report-filter__select"
              >
                {["All Types", "Internal", "Client", "Executive"].map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={6}>
              <label className="report-filter__label">Department</label>
              <TextField
                select
                fullWidth
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="report-filter__select"
              >
                {[
                  "All Department",
                  "Engineering",
                  "Sales",
                  "Product",
                  "Finance",
                  "Marketing",
                ].map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Row 3: Room + User */}
          <Grid
            container
            spacing={2}
            className="report-filter__row"
          >
            <Grid size={6}>
              <label className="report-filter__label">Room</label>
              <TextField
                select
                fullWidth
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className="report-filter__select"
              >
                {[
                  "All Rooms",
                  "Executive Room 3A",
                  "Conference Room 2B",
                  "Meeting Room 1C",
                ].map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={6}>
              <label className="report-filter__label">User</label>
              <TextField
                select
                fullWidth
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="report-filter__select"
              >
                {[
                  "All Users",
                  "Sarah Johnson",
                  "Michael Chen",
                  "James Taylor",
                  "Jennifer Williams",
                  "Emily Rodriguez",
                ].map((opt) => (
                  <MenuItem
                    key={opt}
                    value={opt}
                  >
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className="report-filter__footer">
          <Button
            className="report-filter__footer__clear"
            onClick={handleClear}
          >
            Clear All
          </Button>
          <Button
            className="report-filter__footer__apply"
            variant="outlined"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ReportFilters;
