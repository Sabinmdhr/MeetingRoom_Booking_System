export interface Meeting_room {
  id: string;
  title: string;
  participants: string[];
  capacity: number;
  available: boolean;
  features: string[];
  next_available_time: string | null;
  next_booking_time: string | null;
}
