import { useRef, useState } from 'react'
import { Box, Card, Typography, TextField, Button} from "@mui/material"
import "../assets/scss/pages/VerifyPassword.scss"
import AuthTopBar from '../components/AuthTopBar'

const VerifyPassword = () => {
    const[otp,setOtp] = useState(new Array(6).fill(""))
    const inputRefs = useRef<any>([])

    const handleChange = (value:any, index:any) => {
        if (!/^\d?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if(value && index < 5){
            inputRefs.current[index + 1].focus()
        }
    }

    const handleKeyDown = (e:any, index:any) =>{
        if(e.key === "Backspace" && !otp[index] && index > 0){
            inputRefs.current[index - 1].focus()
        }
    }

    const handleSubmit = () =>{
        const code = otp.join("")
        console.log("otp:",code)
    }

  return (
    <Box className="verify-password">
       <AuthTopBar />
            <Card className='verify-card' elevation={3}>
                <div className="verify-form">
                    <Typography className="verify-title" variant='h6'>
                        Verification
                    </Typography>
                    <Typography className="verify-subtitle" variant='body2'>
                        Please enter the code sent to
                    </Typography>
                    <Typography className="verify-email" variant="body2">
                        CensoredEmail*****thatistoolong123456@outlook.com
                    </Typography>
                    <div className="otp-container">
                      {otp.map((digit, i) => (
                        <TextField
                          key={i}
                          value={digit}
                          inputRef={(el) => (inputRefs.current[i] = el)}
                          onChange={(e) => handleChange(e.target.value, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          className="verify-field otp-box"
                          variant="outlined"
                          size="small"
                          inputProps={{
                            maxLength: 1,
                            inputMode: "numeric",
                            className: "otp-input"
                          }}/>
                      ))}
                    </div>
                    <Button className="verify-btn"
                      variant="contained"
                      onClick={handleSubmit}
                      fullWidth>
                      Login
                    </Button>
                </div>
            </Card>
    </Box>
  )
}

export default VerifyPassword
