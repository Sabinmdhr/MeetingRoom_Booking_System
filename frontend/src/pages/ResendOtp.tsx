import { Typography } from "@mui/material"
import { useOtpTimer } from "../viewmodels/useOtpTimer"
import { useDispatch, useSelector } from "react-redux";
import { resendOtp } from "../redux/resendOtpSlice";
import type { AppDispatch, RootState } from "../redux/store";

const ResendOtp = ({email}: {email: string}) => {
    const{timer, startTimer, isActive} = useOtpTimer();
    const dispatch= useDispatch<AppDispatch>();

    const {loading}= useSelector((state: RootState)=> state.resendOtp)

    const handleClick = async()=>{
        if(isActive || loading) return;

        const res= await dispatch<any>(
          resendOtp({
            email,
            otpPurpose: "FORGOT_PASSWORD",
          })
        )

        if (res?.payload?.success){
          startTimer();
        }
    }

  return (
    <>
    <Typography variant="body2">
        Didn't receive code?
    </Typography>
    <Typography
    onClick={handleClick}
    style={{
        marginTop: "12px",
        cursor: isActive ? "not-allowed" : "pointer",
        color: isActive ? "gray" : "#756de7",
      }}>
        {loading? "Sending.." : isActive ? `Resend OTP in ${timer}s` : "Resend OTP"}  
    </Typography>
    </>
  )
}

export default ResendOtp
