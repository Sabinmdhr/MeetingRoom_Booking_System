import { Card, Switch, Typography } from '@mui/material'
import "../../assets/scss/pages/Settings.scss";
import { Bell, Mail, Calendar, Clock4 } from 'lucide-react';

const NotificationSection = () => {
  return (
    <>
        <Card className="second-card">
        <div className="second-header">
          <Bell size={22}/> Notification Preferences
        </div>
        <div className="settings-notification">
          <div className="notification-item">
            <Mail className="notification-icon" />
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
            <Calendar className="notification-icon" />
            <div className="email">
              <Typography className="title">Meeting Reminders</Typography>
              <Typography className="subtitle">
                Get notified 15 minutes before meetings
              </Typography>
            </div>
            <Switch defaultChecked />
          </div>
          <hr />

          <div className="notification-item">
            <Clock4 className="notification-icon" />
            <div className="email">
              <Typography className="title">Booking Updates</Typography>
              <Typography className="subtitle">
                Notify when meeting details are changed or cancelled
              </Typography>
            </div>
            <Switch defaultChecked />
          </div>
          <hr />

          <div className="notification-item">
            <Bell className="notification-icon" />
            <div className="email">
              <Typography className="title">Announcements</Typography>
              <Typography className="subtitle">
                Receive system announcements and updates
              </Typography>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>
    </>
  )
}

export default NotificationSection
