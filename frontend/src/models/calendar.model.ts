export type EventCategory = "internal" | "client" | "executive" | "external";

// Shape used internally by the calendar grid and modal
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
  meetingType: MeetingType;
};

// Shared meeting type shape returned by all calendar API endpoints
export interface MeetingType {
  id: number | string;
  name: string;
  colorCode: string;
  status: string;
}

// Shape returned by both /calender/month and /calender/day endpoints
export interface CalendarItem {
  date: string;
  startTime: string;
  endTime: string;
  meetingId: number;
  meetingTitle: string;
  meetingType: MeetingType;
  roomId: number;
  roomName: string;
}

// Kept for backward compatibility with CalendarPreview which uses CalenderDay
export type CalenderDay = CalendarItem;
export type CalenderMonth = CalendarItem;
export type CalendarByDay = CalendarItem;
