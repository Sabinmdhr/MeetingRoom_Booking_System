import { Card, Switch, TextField, Typography } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import { Calendar } from "lucide-react";

const BookingSection = () => {
  return (
    <>
      <Card className="fourth-card">
        <div className="fourth-header">
          <Calendar size={22} />
          Booking Preferences
        </div>
        <div className="field">
          <label className="field-label" htmlFor="hours">
            Default Meeting Duration (hours)
          </label>
          <TextField id="hours" fullWidth size="small" />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="minutes">
            Buffer Time Between Meetings (minutes)
          </label>
          <TextField id="minutes" fullWidth size="small" />
        </div>

        <div className="booking-item">
          <div className="booking">
            <Typography className="title">Auto-decline Conflicting Bookings</Typography>
            <Typography className="subtitle">Automatically prevent double bookings</Typography>
          </div>
          <Switch defaultChecked />
        </div>
      </Card>
    </>
  )
}

export default BookingSection
