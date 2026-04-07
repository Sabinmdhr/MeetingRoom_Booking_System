export interface ParticipantsRequest {
  email: string;
  roleId: number;
  firstname: string;
  lastname: string;
  departmentId: number;
  phoneNo: string;
  position: string;
  password? : string;
}

export interface ParticipantResponse {
  email: string;
  id: number;
  role: string;
  firstname: string;
  lastname: string;
  department: string;
  departmentId:number;
  phoneNo: string;
  status: string;
  position: string;
}
export interface Columns {
  id: string;
  label: string;
}
