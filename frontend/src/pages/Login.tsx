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
import "../assets/scss/pages/login.scss";
import logo from "../assets/swift-logo.svg";
import { Link } from "react-router-dom";
import { axiosInstance } from "../api/api";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(true);

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LoginFormInputs>();

type LoginFormInputs = {
  email: string;
  password: string;
};


   const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
     try {
       const response = await axiosInstance.post("api/v1/login", data);

       console.log("Login Success:", response.data);
       // you can store token
       localStorage.setItem("token", response.data.token);
     } catch (error: any) {

       console.error("Login Failed:", error.response?.data);
       alert("Invalid email or password");
     }
   };
  // const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  // const handleMouseDownPassword = (event) => event.preventDefault();
  return (
    <div className="loginContainer">
      <Card className="loginCard">
        <div className="logo">
          <img src={logo} alt="" />
        <Link to={{pathname:"/"}} className="outlook"><span>Use your outlook acoount</span></Link>
        </div>
        <div className="loginForm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              className="field"
              variant="outlined"
              fullWidth
              {...register("email", {
                required: "Email is required",
                // pattern: {
                //   value: /\S+@\S+\.\S+/,
                //   message: "Invalid Email",
                // },
              })}
              error={!!errors.email}
              helperText={errors.email?.message as String}
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
              {...register("password", {
                required: "Password is required",
                // minLength: {
                //   value: 6,
                //   message: "Min 6 characters",
                // },
              })}
              error={!!errors.password}
              helperText={errors.password?.message as String}
            />
            <div className="actions">
              <Link to="/forgot-password" className="forgetPassword">
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
