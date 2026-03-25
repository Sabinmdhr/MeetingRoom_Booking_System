import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";
import logo from "../assets/swift-logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, X } from "lucide-react";

import { useState } from "react";
import {
  InputAdornment,
  TextField,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";

export default function TopNavbar() {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleProfileMenuOpen = (event: any) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    "Meeting booked in Room 2B",
    "New announcement posted",
    "Your reservation was approved",
    "Executive meeting scheduled",
    "New announcement posted, New announcement posted, New announcement posted, New announcement posted",
  ];

  return (
    <AppBar
      position="static"
      className="topbar"
      elevation={0}
    >
      <Toolbar className="topbar-toolbar">
        <div className="logo-wrapper">
          <Link to={"/dashboard"}>
            <img
              src={logo}
              alt="Logo"
            />
          </Link>
        </div>

        <div className="nav-items">
          <TextField
            placeholder="Search for people, participants..."
            variant="outlined"
            size="small"
            className="topbar-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div className="topbar-actions">
          <IconButton onClick={handleOpen}>
            <Badge
              badgeContent={notifications.length}
              color="error"
            >
              <Bell size={22} />
            </Badge>
          </IconButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            className: "notification-menu",
          }}
        >
          <div className="notification-header">
            <Typography variant="subtitle1">Notifications</Typography>

            <div>
              <span>
                <X
                  style={{ cursor: "pointer" }}
                  size={17}
                  onClick={handleClose}
                />
              </span>
            </div>
          </div>

          <Divider />

          {notifications.length === 0 ? (
            <MenuItem>No notifications</MenuItem>
          ) : (
            notifications.map((note, index) => (
              <MenuItem
                key={index}
                onClick={handleClose}
              >
                {note}
              </MenuItem>
            ))
          )}
        </Menu>
        <IconButton
          onClick={handleProfileMenuOpen}
          className="notification__icon"
        >
          <Avatar
            sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}
            sizes=""
          >
            OP
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfileMenuClose}> Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
