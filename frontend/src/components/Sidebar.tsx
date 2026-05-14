// import { useState } from "react";
// import "../assets/scss/pages/Sidebar.scss";

// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
// import Typography from "@mui/material/Typography";

// import {
//   LayoutDashboard,
//   Calendar,
//   Building2,
//   ClipboardMinus,
//   Users,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   Bell,
// } from "lucide-react";

// import { useNavigate, useLocation } from "react-router-dom";

// import { useLogoutViewModel } from "../viewmodels/useLogoutViewModel";
// import Logout from "./Auth/Logout";
// import { useAuth } from "../hooks/useAuth";

// export default function Sidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { role } = useAuth();
//   const [open, setOpen] = useState(true);

//   const {
//     logoutOpen,
//     handleLogoutOpen,
//     handleLogoutClose,
//     handleLogoutConfirm,
//   } = useLogoutViewModel();

//   const menuItems = [
//     {
//       text: "Dashboard",
//       icon: <LayoutDashboard size={20} />,
//       path: "/dashboard",
//       roles: ["ADMIN", "STAFF", "MANAGER"],
//     },
//     {
//       text: "Calendar",
//       icon: <Calendar size={20} />,
//       path: "/calendar",
//       roles: ["ADMIN", "STAFF", "MANAGER"],
//     },
//     {
//       text: "Meeting Rooms",
//       icon: <Building2 size={20} />,
//       path: "/meeting-rooms",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       text: "Announcements",
//       icon: <Bell size={20} />,
//       path: "/announcements",
//       roles: ["ADMIN", "STAFF", "MANAGER"],
//     },
//     {
//       text: "Report",
//       icon: <ClipboardMinus size={20} />,
//       path: "/report",
//       roles: ["ADMIN"],
//     },
//     {
//       text: "Participants",
//       icon: <Users size={20} />,
//       path: "/participants",
//       roles: ["ADMIN", "MANAGER"],
//     },
//     {
//       text: "Settings",
//       icon: <Settings size={20} />,
//       path: "/settings",
//       roles: ["ADMIN", "STAFF", "MANAGER"],
//     },
//   ];

//   const filteredMenuItems = menuItems.filter((item) =>
//     item.roles.includes(role as string),
//   );

//   return (
//     <Drawer
//       variant="permanent"
//       PaperProps={{
//         className: open ? "sidebar-paper open" : "sidebar-paper closed",
//       }}
//     >
//       <div className="sidebar-content">
//         <List>
//           {filteredMenuItems.map((item) => (
//             <ListItem
//               key={item.text}
//               disablePadding
//             >
//               <ListItemButton
//                 disableRipple
//                 className={`sidebar-item ${
//                   location.pathname === item.path ? "active" : ""
//                 }`}
//                 onClick={() => navigate(item.path)}
//               >
//                 <ListItemIcon>{item.icon}</ListItemIcon>

//                 <Typography
//                   className={`sidebar-text ${open ? "show" : "hide"}`}
//                 >
//                   {item.text}
//                 </Typography>
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//         <Divider />

//         <div className="sidebar-bottom">
//           <div
//             className="sidebar-header"
//             onClick={() => setOpen((prev) => !prev)}
//           >
//             <div className="toggle-button">
//               {open ? <ChevronLeft size={23} /> : <ChevronRight size={23} />}
//             </div>
//           </div>

//           <List className="logout-section">
//             <ListItem disablePadding>
//               <ListItemButton
//                 className="sidebar-item logout"
//                 onClick={handleLogoutOpen}
//               >
//                 <ListItemIcon>
//                   <LogOut />
//                 </ListItemIcon>

//                 <ListItemText
//                   primary="Logout"
//                   className={`sidebar-text ${open ? "show" : "hide"}`}
//                 />
//               </ListItemButton>
//             </ListItem>
//           </List>
//         </div>

//         <Logout
//           open={logoutOpen}
//           handleConfirm={handleLogoutConfirm}
//           handleClose={handleLogoutClose}
//         />
//       </div>
//     </Drawer>
//   );
// }

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
import { Badge, Chip, Divider, Typography } from "@mui/material";
import { useLogoutViewModel } from "../viewmodels/useLogoutViewModel";
import Logout from "./Auth/Logout";
import { useAuth } from "../hooks/useAuth";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";

const logoutItem = {
  text: "Logout",
  icon: <LogOut />,
};

export default function Sidebar() {
  const location = useLocation();
  const { role } = useAuth();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const {
    logoutOpen,
    handleLogoutOpen,
    handleLogoutClose,
    handleLogoutConfirm,
  } = useLogoutViewModel();
  const { unreadData } = useAnnouncementCardViewModel();
  const menuItems = [
    {
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
      roles: ["ADMIN", "STAFF", "MANAGER"],
    },
    {
      text: "Calendar",
      icon: <Calendar size={20} />,
      path: "/calendar",
      roles: ["ADMIN", "STAFF", "MANAGER"],
    },

    {
      text: "Meeting Rooms",
      icon: <Building2 size={20} />,
      path: "/meeting-rooms",
      roles: ["ADMIN", "MANAGER"],
    },
    {
      text: "Announcements",
      icon: <Bell size={20} />,
      badge: unreadData?.length || 0,
      path: "/announcements",
      roles: ["ADMIN", "STAFF", "MANAGER"],
    },
    {
      text: "Report",
      icon: <ClipboardMinus size={20} />,
      path: "/report",
      roles: ["ADMIN"],
    },
    {
      text: "Participants",
      icon: <Users size={20} />,
      path: "/participants",
      roles: ["ADMIN", "MANAGER"],
    },
    {
      text: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      roles: ["ADMIN", "STAFF", "MANAGER"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role as string),
  );

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        className: open ? "sidebar-paper open" : "sidebar-paper closed",
      }}
    >
      <div className="sidebar-content">
        <List>
          {filteredMenuItems.map((item) => (
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
                <ListItemIcon>
                  {!open && item.badge ? (
                    <Badge
                      badgeContent={item.badge}
                      color="error"
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </ListItemIcon>

                <Typography
                  className={`sidebar-text ${open ? "show" : "hide"}`}
                >
                  {item.text}
                </Typography>

                {open && item.badge ? (
                  <Chip
                    label={item.badge}
                    color="error"
                    size="small"
                  />
                ) : null}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />

        <div className="sidebar-bottom">
          <div
            className="sidebar-header"
            onClick={() => setOpen(!open)}
          >
            <div className="toggle-button">
              {open ? <ChevronLeft size={23} /> : <ChevronRight size={23} />}
            </div>
          </div>

          <List className="logout-section">
            <ListItem disablePadding>
              <ListItemButton
                className="sidebar-item logout"
                onClick={handleLogoutOpen}
              >
                <ListItemIcon>{logoutItem.icon}</ListItemIcon>
                <ListItemText
                  primary={"Logout"}
                  className={`sidebar-text ${open ? "show" : "hide"}`}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </div>

        <Logout
          open={logoutOpen}
          handleConfirm={handleLogoutConfirm}
          handleClose={handleLogoutClose}
        />
      </div>
    </Drawer>
  );
}
