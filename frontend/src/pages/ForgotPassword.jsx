import React from 'react'
import {Box, Card, Typography, TextField, Button} from "@mui/material"
import "../assets/scss/pages/ForgotPassword.scss"
import logo from "../assets/swift-logo.svg";

const ForgotPassword = () => {
  return (
    <Box className="forgot-password">
       <div className="forgot-topbar">
        <div className="logo-image">
          <img src={logo} alt="" />
          </div>
        <div className="topbar-right">
          <TextField className="topbar-field"
            placeholder="Email"
            size="small"
            variant="outlined"
          />
          <TextField className="topbar-field"
            placeholder="Password"
            size="small"
            type="password"
            variant="outlined"
          />
          <Button className="topbar-btn" variant="contained">Login</Button>
        </div>
      </div>

      <Card className="forgot-card" elevation={3}>
          <form className="forgot-form">
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
                fullWidth>
                Confirm
              </Button>
          </form>
      </Card>
    </Box>
  )
}

export default ForgotPassword
