import { Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import "../assets/scss/pages/UserProfile.scss";
import { useState } from "react";
import ProfileSection from "../components/Settings/ProfileSection";

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: "Sushant",
    lastName: "Basnet",
    role: "Frontend Intern",
    email: "sushantbasnet@gmail.com",
    phone: "+977 9800000000",
    department: "Computer Science",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field: any, value: any) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", user);
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
          {/* <CardContent>
            <div className="profile__header">
              <div className="profile__avatar-wrapper">
                <Avatar className="profile__avatar">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>

                <div className="profile__field">
                  <Typography className="profile__label">Name</Typography>
                  <Typography variant="h4">
                    {user.firstName} {user.lastName}
                  </Typography>
                </div>
              </div>

              <div className="profile__main">
                <div className="profile__row">
                  <div className="profile__field">
                    <Typography className="profile__label">Email</Typography>
                    <Typography variant="h4">{user.email}</Typography>
                  </div>

                  <div className="profile__field">
                    <Typography className="profile__label">Phone</Typography>
                    <Typography variant="h4">{user.phone}</Typography>
                  </div>
                </div>

                <div className="profile__row">
                  <div className="profile__field">
                    <Typography className="profile__label">Role</Typography>
                    <Typography variant="h4">{user.role}</Typography>
                  </div>

                  <div className="profile__field">
                    <Typography className="profile__label">
                      Department
                    </Typography>
                    <Typography variant="h4">{user.department}</Typography>
                  </div>
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
          </CardContent> */}
          <CardContent>
            <div className="profile__header">
              <div className="profile__avatar-wrapper">
                <Avatar className="profile__avatar">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </Avatar>

                <div className="profile__field">
                  <Typography variant="h4">
                    {user.firstName.toLocaleUpperCase()}{" "}
                    {user.lastName.toLocaleUpperCase()}
                  </Typography>
                  <Typography variant="subtitle1">SUPER ADMIN</Typography>
                </div>
              </div>

              <div className="profile__row">
                <div className="profile__field">
                  <Typography className="profile__label">Email</Typography>
                  <Typography variant="h4">{user.email}</Typography>
                </div>

                <div className="profile__field">
                  <Typography className="profile__label">Phone</Typography>
                  <Typography variant="h4">{user.phone}</Typography>
                </div>
              </div>

              <div className="profile__row">
                <div className="profile__field">
                  <Typography className="profile__label">Role</Typography>
                  <Typography variant="h4">{user.role}</Typography>
                </div>

                <div className="profile__field">
                  <Typography className="profile__label">Department</Typography>
                  <Typography variant="h4">{user.department}</Typography>
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
            profile={user}
            onChange={handleChange}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
