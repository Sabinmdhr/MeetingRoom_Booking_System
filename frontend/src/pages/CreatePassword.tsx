import { Box, Card, Typography, TextField, Button } from "@mui/material";
import "../assets/scss/pages/CreatePassword.scss";
import { getLocalStorage } from "../helper";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePassword = () => {
  const navigate = useNavigate();

  const referenceId = getLocalStorage("reference-id");
  useEffect(() => {
    if (!referenceId) {
      navigate("/forgot-password");
    }
  }, [referenceId]);

  // handleSubmit(()=>{
    
  // })

  return (
    <Box className="create-password">
      <Card className="create-card" elevation={3}>
        <div className="create-grid">
          <div className="create-left">
            <Typography className="create-title" variant="h6">
              Create New Password
            </Typography>
            <Typography className="create-subtitle" variant="body2">
              Your new password should be different from previous password.
            </Typography>
          </div>
          <form className="create-right">
            <Typography className="create-input" variant="body2">
              New Password
            </Typography>
            <TextField
              className="create-field"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Typography className="create-input" variant="body2">
              Confirm Password
            </Typography>
            <TextField
              className="create-field"
              variant="outlined"
              size="small"
              fullWidth
            />
            <Button
              className="confirm-btn"
              type="submit"
              variant="contained"
              fullWidth
            >
              Confirm
            </Button>
          </form>
        </div>
      </Card>
    </Box>
  )
}

export default CreatePassword
