import { Box, Card, Typography, TextField, Button } from "@mui/material";
import "../assets/scss/pages/ForgotPassword.scss";
import AuthTopBar from "../components/AuthTopBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from "../helper";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.forgot);
  const forgotEmail = getLocalStorage("forgot-email")

  useEffect(() =>{

    if(forgotEmail){
      navigate("/verify-password")
    }
  },[forgotEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("comment",e)
    e.preventDefault();
    const res = await dispatch<any>(forgotPassword(email));
    if (res?.payload?.success) { // If API returns a payload (success)

      setLocalStorage("forgot-email",email)
      navigate("/verify-password", {
        state: {
          email,
        },
      });
    }
  };
  console.log("error", error);

  return (
    <Box className="forgot-password">
      <AuthTopBar />
      <Card className="forgot-card" elevation={3}>
        <form className="forgot-form" onSubmit={handleSubmit}>
          <Typography variant="h6" className="forgot-title">
            Verification
          </Typography>
          <Typography variant="body2" className="forgot-subtitle">
            Please enter the valid email to find your account
          </Typography>
          <TextField
            className="forgot-field"
            variant="outlined"
            placeholder="Email"
            size="small"
            value={email}
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="submit-btn"
            type="submit"
            variant="contained"
            fullWidth
            loading={loading}>
            Confirm
          </Button>
        </form>
      </Card>
    </Box>
  )
}

export default ForgotPassword
