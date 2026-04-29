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

export interface meeting_rooms{
  id: number;
  roomName: string;
  capacity: number;
  resources: string[];
}

export interface AddRoomModal{
  // id: string;
  roomName: string;
  capacity: number;
  resources :string[];
}

//upcoming-meeting
export interface MeetingType {
  id: number;
  name: string;
  colorCode: string;
  status: string;
}

export interface Participant {
  id: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string; // for external participants
  phoneNumber?: string;
}

export interface Room {
  id: number;
  roomName: string;
  capacity: number;
  status: string;
  resources: string[];
}

export interface RoomBooker {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface UpcomingMeetingApi {
  meetingTitle: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status: string;
  meetingStatus: string;
  recurrenceType: string;

  meetingType: MeetingType;

  internalParticipant?: Participant[];
  externalParticipant?: Participant[];

  room?: Room;
  roomBooker: RoomBooker;
}
