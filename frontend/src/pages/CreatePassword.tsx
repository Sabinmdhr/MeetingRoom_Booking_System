import { Box, Card, Typography, TextField, Button } from "@mui/material";
import "../assets/scss/pages/CreatePassword.scss";
import { fixedValues, getLocalStorage } from "../helper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { createPassword } from "../redux/createPasswordSlice";

const CreatePassword = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch<AppDispatch>();
  const { loading }= useSelector((state:RootState) => state.createPassword);

  const referenceId = getLocalStorage(fixedValues.refId);
  const [newPassword, setNewPassword ]= useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  useEffect(() => {
    if (!referenceId) {
      navigate("/forgot-password");
    }
  }, [referenceId]);
  const handleSubmit = async(e: React.FormEvent) =>{
    e.preventDefault();
    if(!referenceId){
      navigate("/forgot-password");
      return;
    }
    if(!newPassword || !confirmNewPassword){
      alert("All fields are required.");
      return;
    }
    if(newPassword !== confirmNewPassword){
      alert("Password do not match.");
      return;
    }
    const res= await dispatch<any>(createPassword({
      referenceId,
      newPassword,
      confirmNewPassword,
    }));
    console.log("response", res);

    if(res?.payload?.success){
      localStorage.removeItem(fixedValues.forgotEmail);
      localStorage.removeItem(fixedValues.refId);
      navigate("/")
    }
  }

  return (
    <Box className="create-password">
      <Card className="create-card" elevation={3} >
        <form className="create-form" onSubmit={handleSubmit}>
          <Typography className="create-title" variant="h6">
              Create New Password
            </Typography>
            <Typography className="create-subtitle" variant="body2">
              Your new password should be different from previous password.
            </Typography>
            <Typography className="create-input" variant="body2">
              New Password
            </Typography>
            <TextField
              className="create-field"
              variant="outlined"
              size="small"
              type="password"
              value={newPassword}
              fullWidth
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Typography className="create-input" variant="body2">
              Confirm Password
            </Typography>
            <TextField
              className="create-field"
              variant="outlined"
              size="small"
              type="password"
              value={confirmNewPassword}
              fullWidth
              onChange={(e) => setconfirmNewPassword(e.target.value)}
            />
            <Button
              className="confirm-btn"
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

export default CreatePassword
