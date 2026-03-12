import { useEffect, useState } from "react";
import { getRoomTimeSlots } from "../services/TimeSlots.service";
import type { TimeSlot } from "../models/TimeSlots";

export const useTimeSlotsViewModel = (roomId: string) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return; // prevent empty roomId
    const loadSlots = async () => {
      const data = await getRoomTimeSlots(roomId);
      setSlots(data);
    };
    loadSlots();
  }, [roomId]);

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