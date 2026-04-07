export interface Announcements {
  id?: number;
  title: string;
  message: string;
  priorityLevel: string;
  pinned: boolean;
  roleId?: number;
  groupId?: number;
  allUser: boolean;
}
