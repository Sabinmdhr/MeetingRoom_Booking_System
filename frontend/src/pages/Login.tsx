import {
  Card,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";

import "../assets/scss/pages/login.scss";
import logo from "../assets/swift-logo.svg";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";
import type { LoginFormInputs } from "../models/auth.model";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(true);
  const { login, loading, error } = useLoginViewModel();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login(data);
  };

  return (
    <div className="loginContainer">
      <Card className="loginCard">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <Link to={{ pathname: "/" }} className="outlook">
            <span>Use your outlook account</span>
          </Link>
        </div>

        <div className="loginForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              className="field"
              variant="outlined"
              fullWidth
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message as string}
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
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message as string}
            />

            <div className="actions">
              <Link
                to="/forgot-password"
                className="forgetPassword"
              >
                Forgot Password
              </Link>
              <FormControlLabel
                className="rememberMe"
                control={<Checkbox />}
                label="Remember Me"
              />
            </div>

            <Button
              type="submit"
              className="loginButton"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </Card>
    </div>
  );
}
