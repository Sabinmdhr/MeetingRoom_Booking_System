import { Card, CardContent, Typography, Avatar } from "@mui/material";
import "../assets/scss/pages/UserProfile.scss";
import { useEffect, useState } from "react";
import ProfileSection from "../components/Settings/ProfileSection";
import MyButton from "../components/ui/Button";
import { useUserProfileViewModel } from "../viewmodels/useUserProfileViewModel";
import { Spinner } from "../components/ui/Spinner";

const UserProfile = () => {
  const {
    profile,
    loading,
    // handleChange,
    // saveProfile,
    // errors,
    // handleDepartmentChange,
    // handleRoleChange,
  } = useUserProfileViewModel();

  const [isEditing, setIsEditing] = useState(false);

  if (loading || !profile)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div className="profile">
      <Typography variant="h1">
        {isEditing ? "" : "User Information"}
      </Typography>

      {!isEditing ? (
        <Card className="profile__card">
          <CardContent>
            <div className="profile__header">
              <div className="profile__avatar-wrapper">
                <Avatar className="profile__avatar">
                  {profile.firstname?.[0]}
                  {profile.lastname?.[0]}
                </Avatar>

                <div className="profile__field">
                  <Typography variant="h4">
                    {`${profile.firstname} ${profile.lastname}`.toUpperCase()}
                  </Typography>
                  <Typography variant="subtitle1">{profile.role}</Typography>
                </div>
              </div>

              <div className="profile__row">
                <div className="profile__field">
                  <Typography className="profile__label">Email</Typography>
                  <Typography variant="h4">{profile.email}</Typography>
                </div>

                <div className="profile__field">
                  <Typography className="profile__label">Phone</Typography>
                  <Typography variant="h4">{profile.phoneNo}</Typography>
                </div>
              </div>

              <div className="profile__row">
                <div className="profile__field">
                  <Typography className="profile__label">Position</Typography>
                  <Typography variant="h4">{profile.position}</Typography>
                </div>

                <div className="profile__field">
                  <Typography className="profile__label">Department</Typography>
                  <Typography variant="h4">{profile.department}</Typography>
                </div>
              </div>

              <MyButton
                text="Edit Info"
                className="profile__user-button"
                variant="contained"
                customVariant="dark"
                onClick={() => setIsEditing(true)}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <ProfileSection
          // profile={profile}
          // onChange={handleChange}
          // onSave={saveProfile}
          onCancel={() => setIsEditing(false)}
          // errors={errors}
          // handleDepartmentChange={handleDepartmentChange}
          // handleRoleChange={handleRoleChange}
        />
      )}
    </div>
  );
};

export default UserProfile;
