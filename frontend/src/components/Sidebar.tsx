import { useState } from "react";
import "../assets/scss/pages/Sidebar.scss";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  LayoutDashboard,
  Calendar,
  DoorOpen,
  Building2,
  ClipboardMinus,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Divider, Typography } from "@mui/material";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";

const menuItems = [
  {
    text: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  { text: "Calendar", icon: <Calendar size={20} />, path: "/calendar" },
  { text: "Book Room", icon: <DoorOpen size={20} />, path: "/book-room" },
  {
    text: "Meeting Rooms",
    icon: <Building2 size={20} />,
    path: "/meeting-rooms",
  },
  {
    text: "Announcements",
    icon: <Bell size={20} />,
    path: "/announcements",
  },
  { text: "Report", icon: <ClipboardMinus size={20} />, path: "/report" },
  { text: "Participants", icon: <Users size={20} />, path: "/participants" },
  { text: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

const logoutItem = {
  text: "Logout",
  icon: <LogOut size={20} />,
};

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useLoginViewModel();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: open ? "sidebar-paper open" : "sidebar-paper closed",
      }}
    >
      <div className="sidebar-content">
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
            >
              <ListItemButton
                disableRipple
                className={`sidebar-item ${
                  location.pathname === item.path ? "active" : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography
                  className={`sidebar-text ${open ? "show" : "hide"}`}
                >
                  {item.text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <div
          className="sidebar-header"
          onClick={() => setOpen(!open)}
        >
          <div className="toggle-button">
            {open ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </div>
        </div>

        <List className="logout-section">
          <ListItem disablePadding>
            <ListItemButton
              className="sidebar-item logout"
              onClick={handleLogout}
            >
              <ListItemIcon>{logoutItem.icon}</ListItemIcon>
              <ListItemText
                primary={logoutItem.text}
                className={`sidebar-text ${open ? "show" : "hide"}`}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
