import {Box, Card, Typography, TextField, Button} from "@mui/material"
import "../assets/scss/pages/ForgotPassword.scss"
import AuthTopBar from '../components/AuthTopBar';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/forgotSlice";
import type{ RootState, AppDispatch } from "../redux/store";



const ForgotPassword = () => {
  const [email, setEmail]= useState<string>("")

const dispatch= useDispatch<AppDispatch>();
const {loading,error}= useSelector((state: RootState) => state.forgot);
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  dispatch(forgotPassword(email));
};
console.log("error",error)
  return (
    <Box className="forgot-password">
       <AuthTopBar />
      <Card className="forgot-card" elevation={3}>
          <form className="forgot-form" onSubmit={handleSubmit}>
            <Typography variant='h6' className='forgot-title'>
              Verification
            </Typography>
            <Typography variant='body2' className="forgot-subtitle">
              Please enter the valid email to find your account
            </Typography>
            <TextField className='forgot-field'
              variant='outlined'
              placeholder='Email'
              size='small'
              fullWidth />
              <Button className='submit-btn'
                type='submit'
                variant='contained'
                fullWidth
                loading={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}>
                Confirm
              </Button>
          </form>
      </Card>
    </Box>
  )
}

export default ForgotPassword
