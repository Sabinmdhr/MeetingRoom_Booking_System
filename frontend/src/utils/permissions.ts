import { useAuth } from "../hooks/useAuth";

export const permissions = {
  ADMIN: {
    canBookRoom: true,
    canManageRooms: true,
    canManageUsers: true,
    canAddUsers: true,
    canMannageAnnouncements: true,
    canManageMeetingType: true,
  },
  MANAGER: {
    canBookRoom: true,
    canManageRooms: false,
    canManageUsers: false,
    canAddUsers: false,
    canMannageAnnouncements: true,
    canManageMeetingType: true,
  },
  STAFF: {
    canMannageAnnouncements: false,
    canBookRoom: false,
    canManageRooms: false,
    canManageUsers: false,
    canManageMeetingType: false,

    canAddUsers: false,
  },
};
