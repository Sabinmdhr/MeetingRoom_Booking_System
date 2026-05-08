import { permissions } from "../utils/permissions";
import { useAuth } from "./useAuth";

export const usePermissions = () => {
  const { role } = useAuth();
  return permissions[role as keyof typeof permissions];
};
