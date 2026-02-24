import { useState } from "react";
import "../assets/scss/pages/Sidebar.scss";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    "Lorem Ipsum",
    "+ Calendar",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
    "Lorem Ipsum",
  ];

  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${open ? "open" : "closed"}`}
      PaperProps={{
        className: open ? "sidebar-paper open" : "sidebar-paper closed",
      }}
    >
      {/* Toggle Header */}
      <div className="sidebar-header">
        <div
          className="toggle-button"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <ArrowBackIosNewTwoToneIcon className="icon" />
          ) : (
            <MenuIcon />
          )}
        </div>
      </div>

      <List>
        {menuItems.map((text, index) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton className="sidebar-item">
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={text}
                className={`sidebar-text ${open ? "show" : "hide"}`}
              />{" "}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
