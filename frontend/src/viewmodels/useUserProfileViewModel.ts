import { useEffect, useState } from "react";
import {
  fetchCurrentUser,
  updateProfile,
} from "../services/UserProfile.service";
import type { UserProfileInfo } from "../models/profileSection.model";
import { ProfileUpdateSchema } from "../models/scehma/profileUpdate.schema";

export const useUserProfileViewModel = () => {
  const [profile, setProfile] = useState<UserProfileInfo | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await fetchCurrentUser();
      console.log("RAW API RESPONSE:", data); //  check the shape
      console.log("PROFILE DATA:", data?.data); //  check if id exists here
      setProfile(data?.data);
    } catch (err) {
      console.error(err);
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

    const result = ProfileUpdateSchema.safeParse(updated);

    if (!result.success) {
      const fieldError = result.error.issues.find(
        (err) => err.path[0] === name,
      );

      setErrors((prev) => ({
        ...prev,
        [name]: fieldError ? fieldError.message : "",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    setProfile(updated);
  };

  const handleDepartmentChange = (id: number) => {
    if (!profile) return;

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            departmentId: id,
          }
        : prev,
    );
  };

  const handleRoleChange = (id: number) => {
    if (!profile) return;

    setProfile((prev) =>
      prev
        ? {
            ...prev,
            roleId: id,
          }
        : prev,
    );
  };

  const saveProfile = async (): Promise<boolean> => {
    if (!profile) return false;
    if (!profile.id) {
      console.error("Cannot save: profile.id is missing", profile);
      return false;
    }

    const result = ProfileUpdateSchema.safeParse({
      firstname: profile.firstname,
      lastname: profile.lastname,
      email: profile.email,
      position: profile.position,
      phoneNo: profile.phoneNo,
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
        // roleId: profile.roleId,
        departmentId: profile.departmentId,
      };
      console.log("PROFILE ID:", profile.id);
      const res = await updateProfile(payload);
      await loadUser();
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
