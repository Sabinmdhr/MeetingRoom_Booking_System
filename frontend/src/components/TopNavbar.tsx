import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";
import logo from "../assets/swift-logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, X, CircleCheckBig } from "lucide-react";

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
  Button,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Announcements from "../pages/Announcements";
import { useLogoutViewModel } from "../viewmodels/useLogoutViewModel";
import Logout from "./Auth/Logout";

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

  const handleProfile = () => {
    navigate("/profile");
    handleProfileMenuClose();
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

  const {logoutOpen,handleLogoutOpen,handleLogoutClose,handleLogoutConfirm} = useLogoutViewModel();

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
              <Bell size={25} />
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
            <div>
              <Typography variant="h3">Notifications</Typography>
              <Typography variant="subtitle1">
                {notifications.length} unread notifications.
              </Typography>
            </div>

            <div className="notification__close">
              <X
                size={18}
                onClick={handleClose}
              />
            </div>
          </div>

          <Divider />
          <div className="notification__container">
            <div className="notification__actions">
              <Button className="notification__actions-tags">
                <CircleCheckBig size={17} />
                <Typography variant="subtitle2">Mark all as read</Typography>
              </Button>
              <Button className="notification__actions-tags">
                <X size={17} />
                <Typography variant="subtitle2">Clear all</Typography>
              </Button>
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
          </div>
        </Menu>

        <IconButton
          onClick={handleProfileMenuOpen}
          className="notification__icon"
        >
          <Avatar
            sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}
            sizes=""
          >
            SB
          </Avatar>
        </IconButton>

        <Menu
          PaperProps={{
            className: "profile-menu",
          }}
          anchorEl={profileAnchorEl}
          open={Boolean(profileAnchorEl)}
          onClose={handleProfileMenuClose}
        >
          <MenuItem onClick={handleProfile}> Profile</MenuItem>
          <MenuItem onClick={handleLogoutOpen}>Logout</MenuItem>
        </Menu>
        <Logout 
        open={logoutOpen}
        handleConfirm={handleLogoutConfirm}
        handleClose={handleLogoutClose}
        />
      </Toolbar>
    </AppBar>
  );
}
