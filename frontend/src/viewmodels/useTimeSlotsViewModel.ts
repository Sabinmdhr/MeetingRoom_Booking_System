import { DemoTimeSlots } from "../services/TimeSlots.service";
import { useState } from "react";
import type { TimeSlot } from "../models/TimeSlots";

export const useTimeSlotsViewModel = () => {
  const [slots, setSlots] = useState<TimeSlot[]>(DemoTimeSlots());

  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const selectSlot = (id: string) => {
    setSelectedSlot(id);
  };

  const confirmBooking = () => {
    if (!selectedSlot) return;

    const updatedSlots = slots.map((slot) =>
      slot.id === selectedSlot ? { ...slot, available: false } : slot
    );
    setSlots(updatedSlots);
    setSelectedSlot(null);
  };
  return { slots, selectedSlot, selectSlot, confirmBooking };
};
