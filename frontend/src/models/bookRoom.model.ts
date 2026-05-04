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
  meetingTypeId: number;
  description: string;
  externalParticipants: ExternalParticipant[];
  internalParticipantIds: number[];
  roomId: number;
  recurrenceEndDate: string;
  recurrenceType: RecurrenceType;
  weekDays: WeekDays[];
}
export interface GetBookedRoomData {
  roomId: number;
  roomBookingId: number;
  startTime: string;
  endTime: string;
}
export interface GetBookedRoomDataResponse {
  data: GetBookedRoomData[];
  success: boolean;
  message: string;
}

export type MeetingTypeInfo = {
  id: number;
  name: string;
  colorCode: string;
  status: string;
};

export type Status = "ACTIVE" | "INACTIVE";
export type MeetingStatus = "COMPLETED" | "ONGOING" | "UPCOMING";

export interface BookedRoomDataResponse {
  meetingTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status?: Status;
  meetingStatus?: MeetingStatus;
  recurrenceType: RecurrenceType;

  meetingType: MeetingTypeInfo[];
  externalParticipant?: BookedExternalParticipant[];
  internalParticipant?: BookedInternalParticipant[];
  room: Room;
  roomBooker: RoomBooker;
}
