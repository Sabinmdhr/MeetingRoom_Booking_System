export const permissions = {
  ADMIN: {
    canBookRoom: true,
    canManageRooms: true,
    canManageUsers: true,
    canAddUsers: true,
  },
  MANAGER: {
    canBookRoom: true,
    canManageRooms: false,
    canManageUsers: false,
    canAddUsers: false,
  },
  STAFF: {
    canBookRoom: false,
    canManageRooms: false,
    canManageUsers: false,
    canAddUsers: false,
  },
};
