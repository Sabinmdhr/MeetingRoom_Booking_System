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
  Megaphone,
  FileText,
  Users,
  Settings,
  Menu,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    icon: <Megaphone size={20} />,
    path: "/announcements",
  },
  { text: "Report", icon: <FileText size={20} />, path: "/report" },
  { text: "Participants", icon: <Users size={20} />, path: "/participants" },
  { text: "Settings", icon: <Settings size={20} />, path: "/settings" },
];

const logoutItem = {
  text: "Logout",
  icon: <LogOut size={20} />,
};

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${open ? "open" : "closed"}`}
      PaperProps={{
        className: open ? "sidebar-paper open" : "sidebar-paper closed",
      }}
    >
      {/* Header */}
      <div className="sidebar-header">
        <div
          className="toggle-button"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </div>
      </div>

      {/* Menu Content Wrapper */}
      <div className="sidebar-content">
        {/* Top Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.text}
              disablePadding
            >
              <ListItemButton
                className="sidebar-item"
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  className={`sidebar-text ${open ? "show" : "hide"}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Logout Bottom */}
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
