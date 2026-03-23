import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";
import logo from "../assets/swift-logo.svg";

import { Link } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "lucide-react";

import { Bell } from "lucide-react";
export default function TopNavbar() {
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Search size={16} />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Bell className="nav-bell" />
      </Toolbar>
    </AppBar>
  );
}
