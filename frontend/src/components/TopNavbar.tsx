import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";
import logo from "../assets/swift-logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, X, CircleCheckBig, Dot } from "lucide-react";

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
    // {
    //   id: 4,
    //   text: "Your password was changed successfully",
    //   description:
    //     "Your account password has been updated. If this wasn't you, please contact support immediately.",
    //   read: false,
    // },
    // {
    //   id: 5,
    //   text: "New comment on your post",
    //   description:
    //     "Someone has commented on your post. Open it to view and respond if needed.",
    //   read: false,
    // },
    // {
    //   id: 6,
    //   text: "System maintenance scheduled for tonight",
    //   description:
    //     "Scheduled maintenance will occur tonight. Some services may be temporarily unavailable.",
    //   read: false,
    // },
    // {
    //   id: 7,
    //   text: "You have a new friend request",
    //   description:
    //     "You’ve received a new friend request. Review their profile and accept or decline.",
    //   read: true,
    // },
    // {
    //   id: 8,
    //   text: "Your profile was viewed 10 times today",
    //   description:
    //     "Your profile is getting attention! Check insights to see who’s engaging with you.",
    //   read: false,
    // },
    // {
    //   id: 9,
    //   text: "Reminder: Submit your report by 5 PM",
    //   description:
    //     "This is a reminder to submit your report before the deadline to avoid any delays.",
    //   read: false,
    // },
    // {
    //   id: 10,
    //   text: "New message from support team",
    //   description:
    //     "You’ve received a response from the support team. Open your inbox to read the message.",
    //   read: false,
    // },
    // {
    //   id: 11,
    //   text: "Your subscription is about to expire",
    //   description:
    //     "Your subscription will expire soon. Renew now to continue enjoying uninterrupted services.",
    //   read: false,
    // },
    // {
    //   id: 12,
    //   text: "Update available for your application",
    //   description:
    //     "A new version of the application is available. Update now to access the latest features and fixes.",
    //   read: false,
    // },
    // {
    //   id: 13,
    //   text: "You were tagged in a post",
    //   description:
    //     "Someone mentioned you in a post. Click to view and join the conversation.",
    //   read: false,
    // },
  ]);

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
