import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "../assets/scss/pages/TopNavbar.scss";
import logo from "../assets/swift-logo.svg";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import { useLogoutViewModel } from "../viewmodels/useLogoutViewModel";
import Logout from "./Auth/Logout";
import { useUserProfileViewModel } from "../viewmodels/useUserProfileViewModel";

export default function TopNavbar() {
  const [profileAnchorEl, setProfileAnchorEl] =
    useState<null | HTMLElement>(null);

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

  const {
    logoutOpen,
    handleLogoutOpen,
    handleLogoutClose,
    handleLogoutConfirm,
  } = useLogoutViewModel();

  return (
    <AppBar position="static" className="topbar" elevation={0}>
      <Toolbar className="topbar-toolbar">
        <div className="logo-wrapper">
          <Link to="/dashboard">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        <div className="spacer" />

        <IconButton
          onClick={handleProfileMenuOpen}
          className="notification__icon"
        >
          <Avatar
            sx={{ bgcolor: deepPurple[500], width: 40, height: 40 }}
          >
            {profile?.firstname?.[0]}
            {profile?.lastname?.[0]}
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
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
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