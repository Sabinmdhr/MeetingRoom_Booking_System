import { useEffect, useState } from "react";
import { fetchCurrentUser, updateProfile } from "../services/UserProfile.service";
import type { UserProfileInfo } from "../models/profileSection.model";
import { ProfileUpdateSchema } from "../models/scehma/profileUpdate.schema";

export const useUserProfileViewModel = () => {
  const [profile, setProfile] = useState<UserProfileInfo | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await fetchCurrentUser();
      setProfile(data?.data);
    } catch (err) {
      console.error("Failed to load user profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;

    const { name, value } = e.target;
    const updated = { ...profile, [name]: value };

    // Validate the changed field on every keystroke so errors show in real time
    const result = ProfileUpdateSchema.safeParse(updated);
    const fieldError = result.success
      ? ""
      : (result.error.issues.find((err) => err.path[0] === name)?.message ?? "");

    setErrors((prev) => ({ ...prev, [name]: fieldError }));
    setProfile(updated);
  };

  // Receives both the id and the display name so the read-only view
  // updates immediately without waiting for a page reload
  const handleDepartmentChange = (id: number, name: string) => {
    if (!profile) return;
    setProfile((prev) =>
      prev ? { ...prev, departmentId: id, department: name } : prev,
    );
  };

  const handleRoleChange = (id: number) => {
    if (!profile) return;
    setProfile((prev) => (prev ? { ...prev, roleId: id } : prev));
  };

  const saveProfile = async (): Promise<boolean> => {
    if (!profile) return false;

    const result = ProfileUpdateSchema.safeParse({
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      position: profile.position,
      phoneNo: profile.phoneNo,
      departmentId: profile.departmentId,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    try {
      const payload = {
        id: profile.id,
        firstname: profile.firstname,
        lastname: profile.lastname,
        email: profile.email,
        position: profile.position,
        phoneNo: profile.phoneNo,
        departmentId: profile.departmentId,
      };

      await updateProfile(payload);

      // Merge the saved payload back so the read-only view reflects the changes.
      // department name is already in state from handleDepartmentChange.
      setProfile((prev) => (prev ? { ...prev, ...payload } : prev));
      return true;
    } catch (err) {
      console.error("Update failed", err);
      return false;
    }
  };

  return {
    profile,
    loading,
    errors,
    loadUser,
    handleChange,
    saveProfile,
    handleDepartmentChange,
    handleRoleChange,
  };
};
