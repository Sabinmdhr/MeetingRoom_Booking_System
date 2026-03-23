import { Typography } from '@mui/material'
import "../assets/scss/pages/Settings.scss";
import ProfileSection from '../components/Settings/ProfileSection';
import NotificationSection from '../components/Settings/NotificationSection';
import ColorSection from '../components/Settings/ColorSection';
import BookingSection from '../components/Settings/BookingSection';
import SecuritySection from '../components/Settings/SecuritySection';
import { useSettingsViewModel } from '../viewmodels/useSettingsViewModel';

const Settings = () => {
  const { settings, loading, updateProfileSection, saveSettings }= useSettingsViewModel();

  if (loading) return <div>Loading...</div>
  if (!settings) return <div>No settings found</div>

  return (
    <div className="settings">
      <div className="titleDesc">
        <Typography variant="h1">
          Settings
        </Typography>
        <Typography variant="subtitle1">
          Manage your account and application preferences
        </Typography>
      </div>
      <ProfileSection
        profile={settings.profile}
        onChange={updateProfileSection}
        onSave={saveSettings}
      />

      <NotificationSection />
      <ColorSection />
      <BookingSection />
      <SecuritySection />
    </div>
  );
}

export default Settings
