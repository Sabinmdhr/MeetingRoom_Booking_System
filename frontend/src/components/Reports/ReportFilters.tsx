import {
  Divider,
  Drawer,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Calendar, X } from "lucide-react";
import { useState } from "react";
import MyButton from "../ui/Button";
import { CommonDropdown } from "../ui/Dropdown/CommonDropdown";
import type {
  DropdownItem,
  ReportFilters as Filters,
  ReportPayload,
} from "../../models/meetingReport.model";
import "../../assets/scss/components/Report/ReportFilters.scss";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import { DepartmentList } from "../Participants/DepartmentList";

const DEFAULT_FILTERS: Filters = {
  department: 1,
  startDate: "",
  endDate: "",
  room: 0,
  user: 1,
  meetingType: 1,
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
  // users,
  rooms,
  meetingTypes,
}: Props) => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

  const { users } = useparticipantsViewModel();
  const roomItems = rooms.map((r, index) => ({
    id: index,
    label: r,
  }));

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
      const selected = roomItems.find((r) => r.id === filters.room);
      if (selected) payload.roomName = selected.label;
    }
    if (filters.user !== "") {
      const selected = userItems.find((u) => u.id === filters.user);
      if (selected) {
        payload.createdBy = selected.label;
      }
    }
    if (filters.department !== "") {
      payload.department = filters.department;
    }

    onApply(payload);
    onClose();
  };

  const userItems = users.map((u) => ({
    id: u.id,
    label: `${u.firstname} ${u.lastname}`,
  }));

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
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
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
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
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
              <CommonDropdown
                label="Meeting Type"
                value={filters.meetingType}
                items={meetingTypes}
                onChange={(id: number | "") =>
                  setFilters((prev) => ({
                    ...prev,
                    meetingType: id,
                  }))
                }
              />
            </Grid>
            <Grid size={6}>
              <DepartmentList
                value={filters.department}
                onChange={(id: number | "") =>
                  setFilters((prev) => ({
                    ...prev,
                    department: id,
                  }))
                }
              />
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            className="report-filter__row"
          >
            <Grid size={6}>
              <CommonDropdown
                label="Room"
                value={filters.room}
                items={roomItems}
                onChange={(id: number | "") =>
                  setFilters((prev) => ({
                    ...prev,
                    room: id,
                  }))
                }
              />
            </Grid>
            <Grid size={6}>
              <CommonDropdown
                label="User"
                value={filters.user}
                items={userItems}
                onChange={(id: number | "") =>
                  setFilters((prev) => ({
                    ...prev,
                    user: id,
                  }))
                }
              />
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
            className="report-filter__footer__apply"
          />
        </div>
      </div>
    </Drawer>
  );
};

export default ReportFilters;
