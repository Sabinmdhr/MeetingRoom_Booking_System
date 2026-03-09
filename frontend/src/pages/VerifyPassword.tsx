import { useEffect, useRef, useState } from "react";
import { Box, Card, Typography, TextField, Button } from "@mui/material";
import "../assets/scss/pages/VerifyPassword.scss";
import AuthTopBar from "../components/AuthTopBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { verifyOtp } from "../redux/verifyOtpSlice";
import { fixedValues, getLocalStorage, setLocalStorage } from "../helper";

const VerifyPassword = () => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.verifyOtp);
  const forgotEmail = getLocalStorage(fixedValues.forgotEmail);

  // Safe access to email (won't crash if page refreshed)
  const email = location.state?.email || forgotEmail;

  const refId = getLocalStorage(fixedValues.refId);

   useEffect(() => {
    if (refId) {
      navigate("/create-password");
    }
  }, [refId]);

  useEffect(() => {
    if (!forgotEmail) {
      navigate("/forgot-password");
    }
  }, [forgotEmail]);
  

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");
    if (code.length !== 6) return;

    const res = await dispatch<any>(
      verifyOtp({
        email,
        otp: code,
      }),
    );

    if (res?.payload?.success) {
      const newReferenceId = res.payload.data.referenceId;
      setLocalStorage(fixedValues.refId, newReferenceId);
      navigate("/create-password");
    }
  }

  return (
    <Box className="verify-password">
      <AuthTopBar />
      <Card className="verify-card" elevation={3}>
        <form className="verify-form" onSubmit={handleSubmit}>
          <Typography className="verify-title" variant="h6">
            Verification
          </Typography>
          <Typography className="verify-subtitle" variant="body2">
            Please enter the code sent to
          </Typography>
          <Typography className="verify-email" variant="body2">
            {email}
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
                slotProps={{
                  htmlInput: {
                    maxLength: 1,
                    inputMode: "numeric",
                    className: "otp-input",
                  },
                }}
              />
            ))}
          </div>

          <Button
            className="verify-btn"
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            loading={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default VerifyPassword;
