// export interface Time {
//   hour: number;
//   minute: number;
//   second: number;
//   nano: number;
// }

export interface ExternalParticipant {
  name: string;
  email: string;
}
export interface BookedExternalParticipant {
  id: number;
  name: string;
  email: string;
}
export interface BookedInternalParticipant {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
export interface Room {
  id: number;
  roomName: string;
  capacity: number;
  bookedStatus: string | null;
  status: "ACTIVE" | string;
  resources: string[]; // could be enum if fixed
}
export interface RoomBooker {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export type MeetingType = "INTERNAL" | "EXTERNAL";
export type RecurrenceType = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY" | "CUSTOM";
export type WeekDays =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY";

export interface BookingRoomData {
  meetingTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingType: MeetingType;
  description: string;
  externalParticipants: ExternalParticipant[];
  internalParticipantIds: number[];
  roomId: number;
  recurrenceEndDate: string;
  recurrenceType: RecurrenceType;
  weekDays: WeekDays[];
}

export interface GetBookedRoomData{
  id: number;
  meetingTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingType: string;
  description:string;
  externalParticipant: BookedExternalParticipant[];
  internalParticipant: BookedInternalParticipant[];
  room: Room;
  status: "ACTIVE" | string;
  meetingStatus: "UPCOMING" | string;
  roomBooker: RoomBooker;
}