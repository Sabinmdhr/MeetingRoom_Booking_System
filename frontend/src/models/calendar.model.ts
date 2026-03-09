// types.ts

// Participant represents a participant in a calendar event.
export type Participant = {
  name: string;
  email: string;
};

// CalendarEvent represents a calendar event with details.
export type CalendarEvent = {
  id: number;
  title: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  organizer: string;
  participants: Participant[];
  description: string;
  department: string;
};
