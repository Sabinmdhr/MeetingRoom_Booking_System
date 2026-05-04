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

