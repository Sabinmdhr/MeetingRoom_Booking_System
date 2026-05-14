import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Calendar, X } from "lucide-react";
import { useState } from "react";
import MyButton from "../ui/Button";
import type {
  DropdownItem,
  ReportFilters as Filters,
  ReportPayload,
} from "../../models/meetingReport.model";
import "../../assets/scss/components/Report/ReportFilters.scss";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import dayjs from "dayjs";

const DEFAULT_FILTERS: Filters = {
  room: "",
  user: "",
  meetingType: "",
  startDate: "",
  endDate: "",
};

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (payload: ReportPayload) => void;
  rooms: string[];
  meetingTypes: DropdownItem[];
}

const ReportFilters = ({
  open,
  onClose,
  onApply,
  rooms,
  meetingTypes,
}: Props) => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const { users } = useparticipantsViewModel();

  const roomItems = rooms.map((r, i) => ({ id: i, label: r }));
  const userItems = users
    .filter((u) => u.role === "ADMIN" || u.role === "MANAGER")
    .map((u) => ({ id: u.id, label: `${u.firstname} ${u.lastname}` }));

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleApply = () => {
    const payload: ReportPayload = {
      pageNo: 0,
      pageSize: 10,
      sortBy: "startDate",
      sortDir: "desc",
    };

    if (filters.startDate) payload.startDate = filters.startDate;
    if (filters.endDate) payload.endDate = filters.endDate;
    if (filters.meetingType !== "")
      payload.meetingTypeId = filters.meetingType as number;
    if (filters.room !== "") {
      const room = roomItems.find((r) => r.id === filters.room);
      if (room) payload.roomName = room.label;
    }
    if (filters.user !== "") {
      const user = userItems.find((u) => u.id === filters.user);
      if (user) payload.createdBy = user.label;
    }

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
          {/* Date Range */}
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
                onChange={(e) => setFilter("startDate", e.target.value)}
                fullWidth
                className="report-filter__input"
                inputProps={{
                  max: filters.startDate || dayjs().format("YYYY-MM-DD"),
                }}
              />
            </Grid>
            <Grid size={6}>
              <label className="report-filter__label">
                <Calendar size={14} /> End Date
              </label>
              <TextField
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilter("endDate", e.target.value)}
                inputProps={{
                  min: filters.startDate || dayjs().format("YYYY-MM-DD"),
                }}
                fullWidth
                className="report-filter__input"
              />
            </Grid>
          </Grid>

          {/* Meeting Type & Room */}
          <Grid
            container
            spacing={2}
            className="report-filter__row"
          >
            <Grid size={6}>
              <label className="label">Meeting Type</label>
              <TextField
                select
                fullWidth
                value={filters.meetingType}
                className="customTextField"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected) return "All Meeting Types";
                    return (
                      meetingTypes.find((i) => i.id === selected)?.label ?? ""
                    );
                  },
                }}
                onChange={(e) =>
                  setFilter(
                    "meetingType",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              >
                <MenuItem value="">All</MenuItem>
                {meetingTypes.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={6}>
              <label className="label">Room</label>
              <TextField
                select
                fullWidth
                value={filters.room}
                className="customTextField"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected && selected !== 0) return "All Rooms";
                    return (
                      roomItems.find((i) => i.id === selected)?.label ?? ""
                    );
                  },
                }}
                onChange={(e) =>
                  setFilter(
                    "room",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              >
                <MenuItem value="">All Rooms</MenuItem>
                {roomItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* User */}
          <Grid
            container
            spacing={2}
            className="report-filter__row"
          >
            <Grid size={6}>
              <label className="label">User</label>
              <TextField
                select
                fullWidth
                value={filters.user}
                className="customTextField"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (selected) => {
                    if (!selected && selected !== 0) return "All Users";
                    const u = users.find((i) => i.id === selected);
                    return u ? `${u.firstname} ${u.lastname}` : "";
                  },
                }}
                onChange={(e) =>
                  setFilter(
                    "user",
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              >
                <MenuItem value="">All Users</MenuItem>
                {userItems.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>

        <Divider />

        <div className="report-filter__footer">
          <MyButton
            text="Clear All"
            variant="outlined"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            type="reset"
            color="error"
            className="report-filter__footer__clear"
          />
          <MyButton
            text="Apply Filter"
            variant="contained"
            onClick={handleApply}
            customVariant="dark"
            className="report-filter__footer__apply"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ReportFilters;