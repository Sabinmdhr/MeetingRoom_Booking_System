export type EventCategory = "internal" | "client" | "executive";

export type CalendarEvent = {
  id: number;
  title: string;
  category: EventCategory;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  participants: string[];
  description: string;
  department: string;
};
export interface MeetingType {
  id: string;
  name: string;
  colorCode: string;
  status: string;
}

export interface CalendarByDay {
  date: string;
  startTime: string;
  endTime: string;
  meetingId: number;
  meetingTitle: string;
  meetingType: MeetingType;
  roomId: number;
  roomName: string;
}