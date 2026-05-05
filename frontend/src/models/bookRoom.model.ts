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
  bookedStatus?: string | null;
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
export type dates = {
  meetingId: number;
};

export interface BookedRoomDataResponse {
  id?: number;
  meetingTitle: string;

  startDate: string;
  endDate?: string;

  startTime: string;
  endTime: string;

  description: string;

  status?: Status;
  meetingStatus?: MeetingStatus;

  recurrenceId: string;
  recurrenceType: RecurrenceType;
  meetingType: MeetingTypeInfo[];

  externalParticipant?: BookedExternalParticipant[];
  internalParticipant?: BookedInternalParticipant[];
  room: Room;

  dates?: dates[];
  roomBooker: RoomBooker;
}



export interface BookingRoomData {
  meetingTitle: string;
  startDate: string;
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