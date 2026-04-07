import { Button, Card, TextField } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import type { ProfileSettings } from "../../models/settings.model";
import { toast } from "mui-sonner";

interface ProfileProps {
  profile: ProfileSettings;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
}
const ProfileSection = ({ profile, onChange, onSave }: ProfileProps) => {
  function handleSave() {
    toast.success("Changes saved Successfully");
  }
  return (

    <> 
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

        <div className="settings-buttons">
          <Button
            className="settings-btn"
            variant="contained"
            size="small"
            onClick={() => {
              onSave();
              handleSave();
            }}
          >
            Save Changes
          </Button>
          <Button
            className="settings-btn"
            variant="contained"
            size="small"
            onClick={() => {
              onSave();
            }}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </>
  )
}

export default ProfileSection;
