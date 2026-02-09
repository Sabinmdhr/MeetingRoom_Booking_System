import React from 'react'
import { Box, Card, Typography, TextField, Button} from "@mui/material"
import "../assets/scss/pages/VerifyPassword.scss"

const VerifyPassword = () => {
  return (
    <Box className="verify-password">
            <Card className='verify-card' elevation={3}>
                <div className="verify-form">
                        <Typography className="verify-title" variant='h6'>
                            Verification
                        </Typography>
                        <Typography className="verify-subtitle" variant='body-2'>
                            Please enter the code sent to
                        </Typography>
                        <Typography variant="body2" className="verify-email">
                            CensoredEmail*****thatistoolong123456@outlook.com
                        </Typography>

                        <Button className="verify-btn"
                        type='submit'
                        variant='contained'
                        FullWidth>
                            Login
                        </Button>
                </div>
            </Card>
        </Box>
  )
}

export default VerifyPassword
