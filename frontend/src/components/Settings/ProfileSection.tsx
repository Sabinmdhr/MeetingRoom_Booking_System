import { Card, TextField, Typography } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import type { ProfileSettings } from "../../models/settings.model";
import { toast } from "react-toastify";
import MyButton from "../ui/Button";
// import { useSettingsViewModel } from "../../viewmodels/useSettingsViewModel";

interface ProfileProps {
  profile: ProfileSettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => Promise<boolean>;
  onCancel: () => void;
  errors: Record<string, string>;
}
const ProfileSection = ({
  profile,
  onChange,
  onSave,
  errors,
  onCancel,
}: ProfileProps) => {
  function handleSave() {
    toast.success("Changes saved Successfully");
  }

  const ErrorText = ({ error }: { error?: string }) =>
    error ? <Typography className="error-text">{error}</Typography> : null;
  return (
    <>
      <Typography variant="h2">Edit User Information</Typography>
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
              name={"firstName"}
              value={profile.firstName}
              required
              onChange={onChange}
              error={!!errors.firstName}
            />
            <ErrorText error={errors.firstName} />
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
              name="lastName"
              error={!!errors.lastName}
              required
              onChange={onChange}
            />

            <ErrorText error={errors.lastName} />
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
            error={!!errors.email}
            name="email"
            onChange={onChange}
          />

          <ErrorText error={errors.email} />
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
            required
            name="phone"
            value={profile.phone}
            error={!!errors.phone}
            onChange={onChange}
          />

          <ErrorText error={errors.phone} />
        </div>
        <div className="field">
          <label
            className="field-label"
            htmlFor="desc"
          >
            Role
          </label>
          <TextField
            id="desc"
            fullWidth
            name={"role"}
            value={profile.role}
            onChange={onChange}
          />
        </div>
        <div className="field">
          <label
            className="field-label"
            htmlFor="dep"
          >
            Department
          </label>
          <TextField
            id="dep"
            fullWidth
            name={"department"}
            value={profile.department}
            onChange={onChange}
          />
        </div>

        <div className="settings-buttons">
          <MyButton
            text="Save Changes"
            variant="contained"
            // className="profile__button"
            onClick={async () => {
              const success = await onSave();
              if (success) handleSave();
            }}
            customVariant="dark"
          />
          <MyButton
            text="Cancel"
            variant="contained"
            // className="profile__button"
            onClick={() => onCancel()}
            customVariant="ghost"
          />
        </div>
      </Card>
    </>
  );
};

export default ProfileSection;
