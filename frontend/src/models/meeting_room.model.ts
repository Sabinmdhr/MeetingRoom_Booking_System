type resources = {
  id: number;
  name: string;
  status: string;
}
export interface meeting_rooms{
  id: number;
  roomName: string;
  capacity: number;
  bookedStatus: string;
  status: string;
    resources: resources[];
}

export interface AddRoomModal{
  // id: string;
  roomName: string;
  capacity: number;
  resourcesIds :number[];
}

export interface Dates{
  meetingId: number;
  date: string;
}
export interface UpcomingMeetingResponse {
  recurrenceRoomBookings: recurrenceRoomBookings[];
  singleRoomBookings: singleRoomBookings[];
}

export interface recurrenceRoomBookings {
  recurrenceId: string;
  meetingTitle: string;
  startDate: string; // consider converting to Dayjs in ViewModel
  startTime: string;
  endTime: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  meetingStatus: "UPCOMING" | "ONGOING" | "COMPLETED";
  recurrenceType: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
  dates: Dates[];
  meetingType: MeetingType;
  internalParticipant: Participant[];
  room: Room;
  roomBooker: User;
}
export interface RoomBookings {
  recurrenceId: string;
  meetingTitle: string;
  startDate: string; // consider converting to Dayjs in ViewModel
  startTime: string;
  endTime: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  meetingStatus: "UPCOMING" | "ONGOING" | "COMPLETED";
  recurrenceType: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";
  date?: string;
  meetingType: MeetingType;
  internalParticipant: Participant[];
  room: Room;
  roomBooker: User;
  endDate?: string;
  id?: number;
}
export interface singleRoomBookings {
  id: number;
  recurrenceId: string;
  meetingTitle: string;
  startDate: string; // consider converting to Dayjs in ViewModel
  endDate: string;
  startTime: string;
  endTime: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  meetingStatus: "UPCOMING" | "ONGOING" | "COMPLETED";
  recurrenceType: "NONE" | "DAILY" | "WEEKLY" | "MONTHLY";

  meetingType: MeetingType;
  internalParticipant: Participant[];
  room: Room;
  roomBooker: User;
}

export interface MeetingType {
  id: number;
  name: string;
  colorCode: string; // "(111, 31, 31)" → convert later to rgba
  status: "ACTIVE" | "INACTIVE";
}

export interface Participant {
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
  status: "ACTIVE" | "INACTIVE";
  resources: Resource[];
}

export interface Resource {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE";
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

