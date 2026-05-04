import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";
import logo from "../assets/swift-logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { Bell, X, CircleCheckBig, Dot } from "lucide-react";

import { useState } from "react";
import {
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
// import Announcements from "../pages/Announcements";
import { useLogoutViewModel } from "../viewmodels/useLogoutViewModel";
import Logout from "./Auth/Logout";
import { useUserProfileViewModel } from "../viewmodels/useUserProfileViewModel";

export default function TopNavbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "Meeting booked in Room 2B",
      description:
        "Your meeting has been successfully scheduled. Please arrive on time and check the room details.",
      read: false,
    },
    {
      id: 2,
      text: "New announcement posted",
      description:
        "A new announcement has been published. Check it out to stay updated with the latest information.",
      read: false,
    },
    {
      id: 3,
      text: "Your reservation was approved",
      description:
        "Good news! Your reservation request has been approved. You can now proceed as planned.",
      read: false,
    },
  ]);

  const navigate = useNavigate();

  const { profile } = useUserProfileViewModel();
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  // const date = new Date().toDateString();

  const {
    logoutOpen,
    handleLogoutOpen,
    handleLogoutClose,
    handleLogoutConfirm,
  } = useLogoutViewModel();

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

        <div className="spacer" />

        <div className="topbar-actions">
          <IconButton onClick={handleOpen}>
            <Badge
              badgeContent={unreadCount}
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
                {unreadCount === 0
                  ? "You're all caught up....... "
                  : `${unreadCount} unread notification`}
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
              <Button
                onClick={markAllAsRead}
                className="notification__actions-tags"
              >
                <CircleCheckBig size={17} />
                <Typography variant="subtitle2">Mark all as read</Typography>
              </Button>
              <Button
                onClick={clearAll}
                className="notification__actions-tags"
              >
                <X size={17} />
                <Typography variant="subtitle2">Clear all</Typography>
              </Button>
            </div>

            <Divider />

            {notifications.length === 0 ? (
              <MenuItem>No notifications</MenuItem>
            ) : (
              notifications.map((note) => (
                <MenuItem
                  key={note.id}
                  onClick={() => handleNotificationClick(note.id)}
                  className={note.read ? "read" : "unread"}
                >
                  <div>
                    <Typography
                      variant="h4"
                      className="notification__title"
                    >
                      {note.text}{" "}
                      <Dot
                        size={30}
                        color="#673AB7"
                        style={{
                          visibility: note.read ? "hidden" : "visible",
                          minWidth: "10px",
                        }}
                      />
                    </Typography>
                    <Typography variant="subtitle2">
                      {note.description}{" "}
                    </Typography>
                    <br />
                  </div>
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
            {profile?.firstname?.[0]}
            {profile?.lastname?.[0]}
          </Avatar>

          {/* <Avatar className="profile__avatar">
            {(currentUser?.firstname || "").charAt(0)}
            {(currentUser?.lastname || "").charAt(0)}
          </Avatar> */}
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
