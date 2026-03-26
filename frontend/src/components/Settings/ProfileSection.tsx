import { Button, Card, TextField, Typography } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import type { ProfileSettings } from "../../models/settings.model";

interface ProfileProps {
  profile: ProfileSettings;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}
const ProfileSection = ({ profile, onChange, onSave }: ProfileProps) => {
  return (
    <>
      <Typography
        variant="h1"
        className="settings-header"
      >
        Edit Profile Information
      </Typography>
      <Card className="settings-card">
        <div className="name">
          <div className="field">
            <label
              className="field-label"
              htmlFor="firstName"
            >
              First Name
            </label>
            <TextField
              id="firstName"
              fullWidth
              value={profile.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
            />
          </div>
          <div className="field">
            <label
              className="field-label"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <TextField
              id="lastName"
              fullWidth
              value={profile.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label
            className="field-label"
            htmlFor="email"
          >
            Email Address
          </label>
          <TextField
            id="email"
            fullWidth
            size="small"
            value={profile.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div className="field">
          <label
            className="field-label"
            htmlFor="phone-no"
          >
            Phone Number
          </label>
          <TextField
            id="phone-no"
            fullWidth
            value={profile.phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
        </div>
        <div className="field">
          <label
            className="field-label"
            htmlFor="desc"
          >
            Department
          </label>
          <TextField
            id="desc"
            fullWidth
            value={profile.department}
            onChange={(e) => onChange("department", e.target.value)}
          />
        </div>

        <div className="settings__buttons">
          <Button
            className="settings-btn"
            variant="contained"
            size="small"
            onClick={onSave}
          >
            Save Changes
          </Button>
          <Button
            className="settings-btn"
            variant="contained"
            size="small"
            onClick={onSave}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProfileSection;
