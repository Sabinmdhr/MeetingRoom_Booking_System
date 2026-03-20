
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
