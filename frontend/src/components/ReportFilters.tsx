import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Calendar, X } from "lucide-react";
import "../assets/scss/pages/ReportFilters.scss";
// import { useState } from "react";

import "../assets/scss/global.scss";
import { useState } from "react";

const ReportFilters = ({ setFilter }: any) => {
  const [department, setDepartment] = useState("All Department");
  const [room, setRoom] = useState("All Rooms");
  const [user, setUser] = useState("All Users");
  const [selectedFilter, setSelectedFilter] = useState("All Types");
  return (
    <Card className="report-filter__main">
      <CardContent>
        <div className="report-filter__header">
          <Typography variant="h6">Filters</Typography>

          <div className="report-filter__header__right">
            <Button
              className="report-filter__header__right__button"
              variant="outlined"
              onClick={() => {
                setDepartment("All Department");
                setRoom("All Rooms");
                setUser("All Users");
                setSelectedFilter("All Types");
              }}
            >
              Clear All
            </Button>

            <X
              onClick={() => {
                setFilter(false);
              }}
              size={25}
            />
          </div>
        </div>

        <Grid
          spacing={2}
          container
          className="report-filter__calendar"
        >
          <Grid
            size={6}
            className="report-filter__calendar__start"
          >
            <label className="report-filter__calendar__start__label">
              <Calendar size={17} /> Start Date
            </label>
            <TextField
              type="date"
              fullWidth
            />
          </Grid>
          <Grid
            size={6}
            className="report-filter__calendar__end"
          >
            <label className="report-filter__calendar__end__label">
              <Calendar size={17} /> End Date
            </label>
            <TextField
              type="date"
              fullWidth
            />
          </Grid>
        </Grid>

        <div className="report-filter__buttons">
          <Button
            className={`report-filter_button ${selectedFilter === "All Types" && "active"}`}
            onClick={() => {
              setSelectedFilter("All Types");
            }}
            fullWidth
            variant="contained"
          >
            All Types
          </Button>
          <Button
            className={`report-filter_button ${selectedFilter === "Internal" && "active"}`}
            onClick={() => {
              setSelectedFilter("Internal");
            }}
            fullWidth
            variant="contained"
          >
            Internal
          </Button>
          <Button
            className={`report-filter_button ${selectedFilter === "Client" && "active"}`}
            onClick={() => {
              setSelectedFilter("Client");
            }}
            fullWidth
            variant="contained"
          >
            Client
          </Button>
          <Button
            className={`report-filter_button ${selectedFilter === "Executive" && "active"}`}
            onClick={() => {
              setSelectedFilter("Executive");
            }}
            fullWidth
            variant="contained"
          >
            Executive
          </Button>
        </div>
        <div className="report-filter__dropdown">
          <div className="report-filter__dropdown-item">
            <label className="report-filter__label">Department</label>
            <TextField
              select
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="report-filter__select"
            >
              <MenuItem value="All Department">All Department</MenuItem>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Product">Product</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
              <MenuItem value="Marketing">Marketing</MenuItem>
            </TextField>
          </div>

          <div className="report-filter__dropdown-item">
            <label className="report-filter__label">Room</label>
            <TextField
              select
              fullWidth
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="report-filter__select"
            >
              <MenuItem value="All Rooms">All Rooms</MenuItem>
              <MenuItem value="Executive Room 3A">Executive Room 3A</MenuItem>
              <MenuItem value="Conference Room 2B">Conference Room 2B</MenuItem>
              <MenuItem value="Meeting Room 1C">Meeting Room 1C</MenuItem>
            </TextField>
          </div>

          <div className="report-filter__dropdown-item">
            <label className="report-filter__label">User</label>
            <TextField
              select
              fullWidth
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="report-filter__select"
            >
              <MenuItem value="All Users">All Users</MenuItem>
              <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
              <MenuItem value="Michael Chen">Michael Chen</MenuItem>
              <MenuItem value="James Taylor">James Taylor</MenuItem>
              <MenuItem value="Jennifer Williams">Jennifer Williams</MenuItem>
              <MenuItem value="Emily Rodriguez">Emily Rodriguez</MenuItem>
            </TextField>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;
