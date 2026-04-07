import { Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import "../assets/scss/pages/UserProfile.scss";
import { useState } from "react";
import ProfileSection from "../components/Settings/ProfileSection";
import { useSettingsViewModel } from "../viewmodels/useSettingsViewModel";
const UserProfile = () => {
  const {
    settings,
    handleChange,
    loadSettings,
    saveSettings,
    errors,
    loading,
    resetErrors,
  } = useSettingsViewModel();

  const [isEditing, setIsEditing] = useState(false);

  if (loading || !settings) return <div>Loading...</div>;

  const handleSaveAndClose = async (): Promise<boolean> => {
    const success = await saveSettings();
    if (success) {
      setIsEditing(false);
    }
    return success;
  };

  const handleCancel = async () => {
    resetErrors();
    await loadSettings();
    setIsEditing(false);
  };
  return (
    <div className="profile">
      <Typography variant="h1">
        {isEditing ? "" : "User Information"}
      </Typography>
      {isEditing ? (
        ""
      ) : (
        <Card className="profile__card">
          <CardContent>
            <div className="profile__header">
              <div className="profile__avatar-wrapper">
                <Avatar className="profile__avatar">
                  {(settings.profile.firstName || "").charAt(0)}
                  {(settings.profile.lastName || "").charAt(0)}
                </Avatar>

                <div className="profile__field">
                  <Typography variant="h4">
                    {`${settings.profile.firstName ?? ""} ${settings.profile.lastName ?? ""}`.toUpperCase()}{" "}
                  </Typography>
                  <Typography variant="subtitle1">SUPER ADMIN</Typography>
                </div>
              </div>

              <div className="profile__row">
                <div className="profile__field">
                  <Typography className="profile__label">Email</Typography>
                  <Typography variant="h4">{settings.profile.email}</Typography>
                </div>

                <div className="profile__field">
                  <Typography className="profile__label">Phone</Typography>
                  <Typography variant="h4">{settings.profile.phone}</Typography>
                </div>
              </div>

              <div className="profile__row">
                <div className="profile__field">
                  <Typography className="profile__label">Role</Typography>
                  <Typography variant="h4">{settings.profile.role}</Typography>
                </div>

                <div className="profile__field">
                  <Typography className="profile__label">Department</Typography>
                  <Typography variant="h4">
                    {settings.profile.department}
                  </Typography>
                </div>
              </div>

              <Button
                className="profile__button"
                variant="contained"
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit Info
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      <div className="settings">
        {isEditing && (
          <ProfileSection
            profile={settings.profile}
            onChange={handleChange}
            onSave={handleSaveAndClose}
            onCancel={handleCancel}
            errors={errors}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
