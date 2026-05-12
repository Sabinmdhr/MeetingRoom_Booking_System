import { Card, TextField, Typography } from "@mui/material";
import "../../assets/scss/components/ProfileSection/ProfileSection.scss";
import { toast } from "react-toastify";
import MyButton from "../ui/Button";
import { DepartmentList } from "../Participants/DepartmentList";
import { RoleDropdown } from "../Participants/RoleDropdown";
import type { UserProfileInfo } from "../../models/profileSection.model";
interface ProfileProps {
  profile: UserProfileInfo;
  errors: Record<string, string>;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveProfile: () => Promise<boolean>;

  handleDepartmentChange: (id: number) => void;
  handleRoleChange: (id: number) => void;

  onCancel: () => void;
}

const ProfileSection = ({
  profile,
  errors,
  handleChange,
  saveProfile,
  handleDepartmentChange,
  handleRoleChange,
  onCancel,
}: ProfileProps) => {
  const ErrorText = ({ error }: { error?: string }) =>
    error ? (
      <Typography className="profile-section__error">{error}</Typography>
    ) : null;

  return (
    <div className="profile-section">
      <Typography
        variant="h2"
        className="profile-section__title"
      >
        Edit User Information
      </Typography>

      <Card className="profile-section__card">
        {/* Row 1 */}
        <div className="profile-section__row">
          <div className="profile-section__field">
            <label className="profile-section__label">First Name</label>
            <TextField
              name="firstname"
              value={profile?.firstname}
              onChange={handleChange}
              error={!!errors.firstname}
            />
            <ErrorText error={errors.firstname} />
          </div>

          <div className="profile-section__field">
            <label className="profile-section__label">Last Name</label>
            <TextField
              name="lastname"
              value={profile?.lastname}
              onChange={handleChange}
              error={!!errors.lastname}
            />
            <ErrorText error={errors.lastname} />
          </div>
        </div>

        {/* Row 2 */}
        <div className="profile-section__row">
          <div className="profile-section__field">
            <label className="profile-section__label">Email</label>
            <TextField
              name="email"
              value={profile?.email}
              onChange={handleChange}
              error={!!errors.email}
              disabled
              inputProps={{ readOnly: true }}
            />
            <ErrorText error={errors.email} />
          </div>

          <div className="profile-section__field">
            <label className="profile-section__label">Phone Number</label>
            <TextField
              name="phoneNo"
              value={profile?.phoneNo}
              onChange={handleChange}
              error={!!errors.phoneNo}
            />
            <ErrorText error={errors.phoneNo} />
          </div>
        </div>

        {
          <div className="profile-section__row">
            <div className="profile-section__field">
              <DepartmentList
                value={profile?.departmentId ?? 1}
                onChange={handleDepartmentChange}
              />
            </div>

            <div className="profile-section__field">
              <RoleDropdown
                disabled
                value={profile?.roleId ?? 1}
                onChange={handleRoleChange}
              />
            </div>
          </div>
        }

        {
          <div className="profile-section__row">
            <div className="profile-section__field">
              <label className="profile-section__label">Position</label>
              <TextField
                name="position"
                value={profile?.position}
                onChange={handleChange}
              />
            </div>

            {/* empty space to keep alignment */}
            <div className="profile-section__field profile-section__field--empty" />
          </div>
        }

        <div className="profile-section__actions">
          <MyButton
            text="Save Changes"
            variant="contained"
            customVariant="dark"
            onClick={async () => {
              console.log("CLICKED SAVE");
              const success = await saveProfile();
              if (success) {
                onCancel();
              }
              console.log("RESULT:", success);

              if (success) toast.success("Changes saved successfully");
            }}
          />

          <MyButton
            text="Cancel"
            variant="contained"
            customVariant="ghost"
            onClick={onCancel}
          />
        </div>
      </Card>
    </div>
  );
};

export default ProfileSection;
