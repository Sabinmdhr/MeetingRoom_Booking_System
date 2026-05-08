import { Button, Card, TextField, Typography } from "@mui/material";
import "../../assets/scss/pages/Settings.scss";
import { Shield } from "lucide-react";
import { useState } from "react";
import MyButton from "../ui/Button";
import type { changePassDataType } from "../../models/settings.model";
import { useSettingsViewModel } from "../../viewmodels/useSettingsViewModel";

const SecuritySection = () => {
  const {
    handleChangePassData,
    changePassData,
    openChangePass,
    setOpenChangePass,
    handleChangePassword,
  } = useSettingsViewModel();
  return (
    <>
      <Card className="fifth-card">
        <div className="fifth-header">
          <Shield size={22} />
          Security & Privacy
        </div>
        <div className="settings-security">
          <div className="security-item"></div>
          {openChangePass && (
            <>
              <Typography variant="h3">Change Your Password</Typography>
              <hr />
              <div className="field">
                <label className="field-label" htmlFor="hours">
                  Old Password
                </label>
                <TextField
                  name="oldPassword"
                  id="hours"
                  fullWidth
                  size="small"
                  value={changePassData?.oldPassword}
                  onChange={handleChangePassData}
                />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="minutes">
                  New Password{" "}
                </label>
                <TextField
                  name="newPassword"
                  id="minutes"
                  fullWidth
                  size="small"
                  value={changePassData?.newPassword}
                  onChange={handleChangePassData}
                />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="minutes">
                  Confirm Password{" "}
                </label>
                <TextField
                  name="confirmNewPassword"
                  id="minutes"
                  fullWidth
                  size="small"
                  value={changePassData?.confirmNewPassword}
                  onChange={handleChangePassData}
                />
              </div>
              <div
                style={{ justifyContent: "right", gap: "8px", display: "flex" }}
              >
                <MyButton
                  text="Cancel"
                  onClick={() => setOpenChangePass(false)}
                  customVariant="ghost"
                />
                <MyButton
                  text="Change Password"
                  onClick={() => {
                    handleChangePassword(changePassData);
                  }}
                  customVariant="dark"
                />
              </div>
            </>
          )}
          {!openChangePass && (
            <div className="security-item">
              <div className="security">
                <Typography className="title">Change Your Password</Typography>
                <Typography className="subtitle">
                  Change your password with your old password
                </Typography>
              </div>
              <MyButton
                className="reset-btn"
                customVariant="ghost"
                size="small"
                text={"Change Password"}
                onClick={() => setOpenChangePass(true)}
             />

            </div>
          )}
          <div className="security-item">
            <div className="security">
              <Typography className="title">
                Two-Factor Authentication
              </Typography>
              <Typography className="subtitle">
                Add an extra layer of security to your account
              </Typography>
            </div>
            <Button className="reset-btn" variant="contained" size="small">
              Enable
            </Button>
          </div>
          <hr />

          <div className="security-item">
            <div className="security">
              <Typography className="title">Active Sessions</Typography>
              <Typography className="subtitle">
                Manage your logged-in devices
              </Typography>
            </div>
            <Button className="reset-btn" variant="contained" size="small">
              View Sessions
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SecuritySection;
