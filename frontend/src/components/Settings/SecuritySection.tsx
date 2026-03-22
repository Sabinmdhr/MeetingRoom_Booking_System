import { Button, Card, Typography } from "@mui/material"
import { Shield } from "lucide-react"

const SecuritySection = () => {
  return (
    <>
      <Card className="fifth-card">
        <div className="fifth-header">
          <Shield size={22} />
          Security & Privacy
        </div>
        <div className="settings-security">
          <div className="security-item">
            <div className="security">
              <Button className="reset-btn" variant="contained" size="small">
              Change Password
              </Button>
            </div>
          </div>
          <hr />

          <div className="security-item">
            <div className="security">
              <Typography className="title">Two-Factor Authentication</Typography>
              <Typography className="subtitle">Add an extra layer of security to your account</Typography>
            </div>
            <Button className="reset-btn" variant="contained" size="small">
              Enable
            </Button>
          </div>
          <hr />

          <div className="security-item">
            <div className="security">
              <Typography className="title">Active Sessions</Typography>
              <Typography className="subtitle">Manage your logged-in devices</Typography>
            </div>
            <Button className="reset-btn" variant="contained" size="small">
              View Sessions
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default SecuritySection
