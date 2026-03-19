import type { TimeSlot } from "../models/TimeSlots";

const DemoTimeSlots: Record<string, TimeSlot[]> = {
  
}

export const getRoomTimeSlots = async (roomId: string): Promise<TimeSlot[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return DemoTimeSlots[roomId] || [];
}