export type EventCategory = "internal" | "client" | "executive" | "external";
 
export type CalendarEvent = {
  id: number;
  meetingTitle: string;
  category: EventCategory;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  participants: string[];
  description: string;
  department: string;
 
  meetingType: {
    id: number | string;
    name: string;
    colorCode: string;
    status: string;
  };
};
 
export interface CalenderMonth {
  date: string;
  endTime: string;
  meetingId: number;
  meetingTitle: string;
  meetingType: {
    id: number | string;
    name: string;
    colorCode: string;
    status: string;
  };
  roomId: number;
  roomName: string;
  startTime: string;
}
 
export interface CalenderDay {
  date: string;
  endTime: string;
  meetingId: number;
  meetingTitle: string;
  meetingType: {
    id: number | string;
    name: string;
    colorCode: string;
    status: string;
  };
  roomId: number;
  roomName: string;
  startTime: string;
}
export interface MeetingType {
  id: number | string;
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
 