import "../assets/scss/pages/AuthTopBar.scss";
import { TextField, Button } from "@mui/material";
import logo from "../assets/swift-logo.svg";

const AuthTopBar = () => {
  return (
    <div className="forgot-topbar">
      <div className="logo-image">
        <img
          src={logo}
          alt="logo"
        />
      </div>
      <div className="topbar-right">
        <TextField
          className="topbar-field"
          placeholder="Email"
          size="small"
          variant="outlined"
        />
        <TextField
          className="topbar-field"
          placeholder="Password"
          size="small"
          type="password"
          variant="outlined"
        />
        <Button
          className="topbar-btn"
          variant="contained"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default AuthTopBar;
