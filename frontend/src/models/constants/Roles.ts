export const Roles = {
  ADMIN: {id: 1, label: "ADMIN"},
  MANAGER: {id: 2, label: "MANAGER"},
  STAFF: {id: 3, label: "STAFF"},
} as const;

export type Roles = keyof typeof Roles;