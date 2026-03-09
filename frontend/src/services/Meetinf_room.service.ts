import type { Meeting_room } from "../models/Meeting_room.model";

const meetingRooms: Meeting_room[] = [
  {
    id: "1",
    title: "Conference Room A",
    participants: ["Sabin", "Suman"],
    capacity: 10,
    available: true,
    features: ["Projector", "Whiteboard"],
    next_available_time: "4:00 PM",
    next_booking_time: "",
  },
  {
    id: "2",
    title: "Conference Room B",
    participants: ["Sabin", "Sumanss"],
    capacity: 1,
    available: false,
    features: ["Projector", "Whiteboard", "Video Conferencing", "Wi-Fi"],
    next_available_time: null,
    next_booking_time: "5:00PM",
  },
  {
    id: "3",
    title: "Conference Room C",
    participants: ["Sabin", "Sumanss"],
    capacity: 1,
    available: false,
    features: ["Projector", "Whiteboard", "Video Conferencing"],
    next_available_time: null,
    next_booking_time: "5:00PM",
  },
];

export const getMeetingRoomById = async (id: string): Promise<Meeting_room> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
  const room = meetingRooms.find((room) => room.id === id);
  if (!room) {
    throw new Error("Meeting room not found");
  }
  return room;
}