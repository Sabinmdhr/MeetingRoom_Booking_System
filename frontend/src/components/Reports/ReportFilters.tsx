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
import "../../assets/scss/pages/ReportFilters.scss";
import { useState } from "react";
// import { CommonDropdown } from "../CommonDropdown";

const defaultState = {
  department: "All Department",
  startDate: "",
  endDate: "",
  room: "All Rooms",
  user: "",
  meetingType: "",
};

const ReportFilters = ({
  open,
  onClose,
  onApply,
  users,
  rooms,
  departments,
}: any) => {
  const [filters, setFilters] = useState(defaultState);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  const handleClear = () => setFilters(defaultState);

  const handleApply = () => {
    const payload: any = {
      pageNo: 0,
      pageSize: 10,
      sortBy: "date",
      sortDir: "desc",
    };

    if (filters.startDate) payload.startDate = filters.startDate;
    if (filters.endDate) payload.endDate = filters.endDate;
    if (filters.meetingType)
      payload.meetingType = filters.meetingType.toUpperCase();
    if (filters.room) payload.roomName = filters.room;
    if (filters.user) payload.createdBy = filters.user;
    if (filters.department) payload.department = filters.department;

    onApply(payload);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { className: "report-filter" } }}
    >
      <div className="report-filter__inner">
        <div className="report-filter__header">
          <Typography variant="h6">Filters</Typography>
          <IconButton
            onClick={onClose}
            size="small"
          >
            <X size={20} />
          </IconButton>
        </div>

        <Divider />

        <div className="report-filter__content">
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
                value={filters.startDate}
                onChange={set("startDate")}
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
                value={filters.endDate}
                onChange={set("endDate")}
                fullWidth
                className="report-filter__input"
              />
            </Grid>
          </Grid>

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
                value={filters.meetingType}
                onChange={set("meetingType")}
                className="report-filter__select"
              >
                <MenuItem value="All Types">
                  <p>All Types</p>
                </MenuItem>
                {["Internal", "Client", "Executive"].map((opt) => (
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
                value={filters.department}
                onChange={set("department")}
                className="report-filter__select"
              >
                <MenuItem value="All Department">
                  <p>All Departments</p>
                </MenuItem>
                {departments.map((d: string) => (
                  <MenuItem
                    key={d}
                    value={d}
                  >
                    {d}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

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
                // defaultValue={"All Rooms"}
                value={filters.room}
                onChange={set("room")}
                className="report-filter__select"
              >
                <MenuItem value="All Rooms">
                  <p>All Rooms</p>
                </MenuItem>
                {rooms.map((r: string) => (
                  <MenuItem
                    key={r}
                    value={r}
                  >
                    {r}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={6}>
              <label className="report-filter__label">User</label>
              <TextField
                select
                fullWidth
                value={filters.user}
                onChange={set("user")}
                className="report-filter__select"
              >
                <MenuItem value="">
                  <p>All Users</p>
                </MenuItem>
                {users.map((u: string) => (
                  <MenuItem
                    key={u}
                    value={u}
                  >
                    {u}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className="report-filter__footer">
          <Button
            color="error"
            onClick={handleClear}
            className="report-filter__footer__clear"
          >
            Clear All
          </Button>
          <Button
            variant="outlined"
            onClick={handleApply}
            className="report-filter__footer__apply"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default ReportFilters;
