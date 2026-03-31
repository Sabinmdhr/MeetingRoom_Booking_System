export interface participantsApi {
  id?: string;
  email: string;
  roleId: string;
  firstname: string;
  lastname: string;
  departmentId: string;
  phoneNo: string;
  status?: string;
  position: string;
  password? : string;
}
// export interface AddParticipantRequest {
//   password: string;
//   email: string;
//   roleId: string;
//   firstname: string;
//   lastname: string;
//   departmentId: string;
//   phoneNo: string;
//   status: string;
//   position: string;
// }
export interface Columns {
  id: string;
  label: string;
}
