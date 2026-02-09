import React from "react";
import {
  Card,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import "../assets/scss/pages/login.scss";
import logo from "../assets/swift-logo.svg";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="loginContainer">
      <Card className="loginCard">
        <div className="image">
          <img src={logo} alt="" />
        </div>
        <div className="loginForm">
          <form action="">
            <TextField
              label="Email"
              className="field"
              variant="outlined"
              fullWidth
            />
            <TextField
              className="field"
              label="Password"
              type={showPassword ? "password" : "text"}
              variant="outlined"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <div className="actions">
              <Link href="/forgot-password" className="forgetPassword">
                Forgot Password
              </Link>
              <FormControlLabel
                className="rememberMe"
                control={<Checkbox />}
                label="Remember Me"
              />
            </div>
            <Button type="submit" className="loginButton" variant="contained">
              Login
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
