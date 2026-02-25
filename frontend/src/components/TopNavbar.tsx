import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";

import logo from "../assets/swift-logo.svg";
import Dropdown from "./Navbar/Dropdown";

export default function TopNavbar() {
  return (
    <AppBar
      position="static"
      className="topbar"
      elevation={0}
    >
      <Toolbar className="topbar-toolbar">
        <div className="logo-wrapper">
          <img
            src={logo}
            alt="Logo"
          />
        </div>
        <Dropdown/>
      </Toolbar>
    </AppBar>
  );
}
