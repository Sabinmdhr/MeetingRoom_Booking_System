import { Button, Card, TextField } from '@mui/material'
import "../../assets/scss/pages/Settings.scss";
import type { ProfileSettings } from '../../models/settings.model';

interface ProfileProps{
  profile: ProfileSettings;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}
const ProfileSection = ({ profile, onChange, onSave }: ProfileProps) => {
  return (
    <>
    <Card className="settings-card">
        <div className="settings-header">Profile Information</div>
        <div className="name">
          <div className="field">
            <label className="field-label" htmlFor="firstName">First Name</label>
            <TextField
              id="firstName"
              fullWidth
              size="small"
              value={profile.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="lastName">Last Name</label>
            <TextField
              id="lastName"
              fullWidth
              size="small"
              value={profile.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="email">Email Address</label>
          <TextField
            id="email"
            fullWidth
            size="small"
            value={profile.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="phone-no">Phone Number</label>
          <TextField
            id="phone-no"
            fullWidth
            size="small"
            value={profile.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="desc">Department</label>
          <TextField
            id="desc"
            fullWidth
            size="small"
            value={profile.department}
            onChange={(e) => onChange("department", e.target.value)}
          />
        </div>
        <Button
          className="settings-btn"
          variant="contained"
          size="small"
          onClick={onSave}>
          Save Changes
        </Button>
      </Card>
    </>
  )
}

export default ProfileSection
