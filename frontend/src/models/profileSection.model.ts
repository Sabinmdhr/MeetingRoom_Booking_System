export type Status = "ACTIVE" | "INACTIVE";

export interface UserProfileInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNo: string;

  department: string;
  departmentId: number;

  role: string;
  roleId?: number;

  position: string;
  status: Status;
}
