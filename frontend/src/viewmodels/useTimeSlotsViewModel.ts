import { useEffect, useState } from "react";
import { getRoomTimeSlots } from "../services/TimeSlots.service";
import type { TimeSlot } from "../models/TimeSlots";

export const useTimeSlotsViewModel = (roomId: string, date: string) => {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [openWarning, setOpenWarning] = useState(false);
  const [timeType, setTimeType] = useState<"start" | "end" | null>(null);
  const [openTime, setOpenTime] = useState(false);

  const handleTimeClick = (type: "start" | "end") => {
    if (!roomId || !date) {
      setOpenWarning(true);
      return;
    }
    setTimeType(type);
    setOpenTime(true);
  };

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
      slot.id === selectedSlot ? { ...slot, available: false } : slot,
    );

    setSlots(updatedSlots);
    setSelectedSlot(null);
  };

  return {
    slots,
    selectedSlot,
    selectSlot,
    confirmBooking,
    handleTimeClick,
    openWarning, setOpenWarning,
    timeType, openTime, setOpenTime
  };
};
