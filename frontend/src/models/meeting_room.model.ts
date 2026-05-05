// export interface Meeting_room {
//   id: string;
//   title: string;
//   participants: string[];
//   capacity: number;
//   available: boolean;
//   features: string[];
//   next_available_time: string | null;
//   next_booking_time: string | null;
// }
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

//upcoming-meeting
// export interface MeetingType {
//   id: number;
//   name: string;
//   colorCode: string;
//   status: string;
// }

// export interface Participant {
//   id: number;
//   email?: string;
//   firstName?: string;
//   lastName?: string;
//   name?: string; // for external participants
//   phoneNumber?: string;
// }

// export interface Room {
//   id: number;
//   roomName: string;
//   capacity: number;
//   status: string;
//   resources: string[];
// }

// export interface RoomBooker {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// }

// export interface UpcomingMeetingApi {
//   meetingTitle: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   description: string;
//   status: string;
//   meetingStatus: string;
//   recurrenceType: string;

//   meetingType: MeetingType;

//   internalParticipant?: Participant[];
//   externalParticipant?: Participant[];

//   room?: Room;
//   roomBooker: RoomBooker;
// }


//upcoming-meeting
export interface UpcomingMeetingResponse {
  recurrenceRoomBookings: RoomBooking[];
  singleRoomBookings: RoomBooking[];
}

export interface RoomBooking {
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

