import "../assets/scss/pages/Settings.scss";
import { Card, TextField, Button, Typography } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Switch from "@mui/material/Switch";

const Settings = () => {
  return (
    <div className="settings">
      <Typography variant="h5" className="settings-title">
        Settings
      </Typography>
      <Typography className="settings-subtitle">
        Manage your account and application preferences
      </Typography>

      <Card className="settings-card">
        <div className="settings-header">Profile Information</div>
        <div className="name">
          <div className="field">
            <p className="field-label">First Name</p>
            <TextField fullWidth size="small" />
          </div>
          <div className="field">
            <p className="field-label">Last Name</p>
            <TextField fullWidth size="small" />
          </div>
        </div>
        <div className="field">
          <p className="field-label">Email Address</p>
          <TextField fullWidth size="small" />
        </div>
        <div className="field">
          <p className="field-label">Phone Number</p>
          <TextField fullWidth size="small" />
        </div>
        <div className="field">
          <p className="field-label">Department</p>
          <TextField fullWidth size="small" />
        </div>
        <Button className="settings-btn" variant="contained" size="small">
          Save Changes
        </Button>
      </Card>
      <Card className="second-card">
        <div className="second-header">
          <NotificationsOutlinedIcon /> Notification Preferences
        </div>
        <div className="settings-notification">
          <div className="notification-item">
            <MailOutlineIcon className="notification-icon" />
            <div className="email">
              <Typography className="title">Email Notifications</Typography>
              <Typography className="subtitle">
                Receive booking confirmations and reminders via email
              </Typography>
            </div>
            <Switch defaultChecked />
          </div>
          <hr />

          <div className="notification-item">
            <AccessTimeIcon className="notification-icon" />
            <div className="email">
              <Typography className="title">Meeting Reminders</Typography>
              <Typography className="subtitle">
                Get notified 15 minutes before meetings
              </Typography>
            </div>
          </div>
          <hr />

          <div className="notification-item">
            <CalendarTodayIcon className="notification-icon" />
            <div className="email">
              <Typography className="title">Booking Updates</Typography>
              <Typography className="subtitle">
                Notify when meeting details are changed or cancelled
              </Typography>
            </div>
          </div>
          <hr />

          <div className="notification-item">
            <NotificationsOutlinedIcon className="notification-icon" />
            <div className="email">
              <Typography className="title">Announcements</Typography>
              <Typography className="subtitle">
                Receive system announcements and updates
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
