import { Card, MenuItem, TextField, Typography } from "@mui/material";
import "../../assets/scss/components/ProfileSection/ProfileSection.scss";
import { toast } from "react-toastify";
import MyButton from "../ui/Button";
import type { UserProfileInfo } from "../../models/profileSection.model";
import { DepartmentList } from "../Participants/DepartmentList";
import { RoleDropdown } from "../Participants/RoleDropdown";

interface ProfileProps {
  profile: UserProfileInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => Promise<boolean>;
  onCancel: () => void;
  errors: Record<string, string>;

  handleDepartmentChange: (id: number) => void;
  handleRoleChange: (id: number) => void;
}

const ProfileSection = ({
  profile,
  onChange,
  onSave,
  errors,
  onCancel,
  handleDepartmentChange,
  handleRoleChange,
}: ProfileProps) => {
  const ErrorText = ({ error }: { error?: string }) =>
    error ? (
      <Typography className="profile-section__error">{error}</Typography>
    ) : null;

  const positions = [
    "Senior Engineer",
    "Tech Lead",
    "Senior",
    "HR",
    "DevOps Engineer",
    "Frontend Developer",
    "Product Manager",
    "UX Researcher",
  ];
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
              value={profile.firstname}
              onChange={onChange}
              error={!!errors.firstname}
            />
            <ErrorText error={errors.firstname} />
          </div>

          <div className="profile-section__field">
            <label className="profile-section__label">Last Name</label>
            <TextField
              name="lastname"
              value={profile.lastname}
              onChange={onChange}
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
              value={profile.email}
              onChange={onChange}
              error={!!errors.email}
            />
            <ErrorText error={errors.email} />
          </div>

          <div className="profile-section__field">
            <label className="profile-section__label">Phone Number</label>
            <TextField
              name="phoneNo"
              value={profile.phoneNo}
              onChange={onChange}
              error={!!errors.phoneNo}
            />
            <ErrorText error={errors.phoneNo} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="profile-section__row">
          <div className="profile-section__field">
            <DepartmentList
              value={profile.departmentId ?? 1}
              onChange={handleDepartmentChange}
            />
          </div>

          <div className="profile-section__field">
            <RoleDropdown
              value={profile.roleId ?? 1}
              onChange={handleRoleChange}
            />
          </div>
        </div>

        {/* Row 4 */}
        <div className="profile-section__row">
          <div className="profile-section__field">
            <label className="profile-section__label">Position</label>
            <TextField
              select
              name="position"
              value={profile.position}
              onChange={onChange}
            >
              {positions.map((p) => (
                <MenuItem
                  key={p}
                  value={p}
                >
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {/* empty space to keep alignment */}
          <div className="profile-section__field profile-section__field--empty" />
        </div>

        <div className="profile-section__actions">
          <MyButton
            text="Save Changes"
            variant="contained"
            customVariant="dark"
            onClick={async () => {
              console.log("CLICKED SAVE"); // 👈 ADD THIS
              const success = await onSave();
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
