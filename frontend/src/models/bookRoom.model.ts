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
