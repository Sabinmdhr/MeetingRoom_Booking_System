export interface Participants{
  id: string;
  fullName: string;
  role: string;
  department: string;
  email: string;
  phoneNumber: string;
  numOfMeetings: number;
}
export interface participantsApi{
  id:string;
  email: string;
  role: string;
}
export interface Columns{
  id: string;
  label: string;
}