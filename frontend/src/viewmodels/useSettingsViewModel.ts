import { useEffect, useState } from "react";
import type { Settings } from "../models/settings.model";
import { getSettings } from "../services/settings.service";
import { UserSchema } from "../models/scehma/user.schema";

export const useSettingsViewModel = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});


  const resetErrors = () => setErrors({});

  useEffect(() => {
    loadSettings();
  }, []);
  
  const loadSettings = async () => {
    try {
      const data = await getSettings();

      setSettings({
        ...data,
        profile: {
          firstName: data.profile?.firstName ?? "", 
          lastName: data.profile?.lastName ?? "", 
          email: data.profile?.email ?? "",
          phone: data.profile?.phone ?? "",
          department: data.profile?.department ?? "",
          role: data.profile?.role ?? "",
        },
      });
    } catch (error) {
      console.log("Failed to fetch settings");
    } finally {
      setLoading(false);
    }
  };

  // const updateProfileSection = (field: string, value: string) => {
  //   if (!settings) return;

  //   setSettings({
  //     ...settings,
  //     profile: {
  //       ...settings.profile,
  //       [field]: value,
  //     }, //update garxa single field inside profile.Uses spread operator (...) to keep other data unchanged. yesle update garxa only settings.profile.firstName="abcde"
  //   });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!settings) return;

    const updatedProfile = {
      ...settings.profile,
      [name]: value,
    };
    
    // Validate
    const result = UserSchema.safeParse(updatedProfile);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (err) => err.path[0] === name,
      );

      setErrors((prev) => ({
        ...prev,
        [name]: fieldError ? fieldError.message : "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setSettings({
      ...settings,
      profile: updatedProfile,
    });
  };

  const saveSettings = async (): Promise<boolean> => {
    if (!settings) return false;

    const result = UserSchema.safeParse(settings.profile);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        newErrors[field] = err.message;
      });

      setErrors(newErrors);
      return false;
    }

    console.log("Mock Save:", settings);
    return true;
  };

  return {
    settings,
    loading,
    // updateProfileSection,
    saveSettings,
    handleChange,
    errors,
    resetErrors,
    loadSettings,
  };
};
