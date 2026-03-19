import { useMemo } from "react";
import { Box } from "@mui/material";

/* ================= TYPES ================= */

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  available: boolean;
}

export interface Booking {
  id: string;
  start: string;
  end: string;
}

/* ================= UTILS ================= */

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const isSlotBooked = (slot: TimeSlot, bookings: Booking[]) => {
  const slotStart = toMinutes(slot.start);
  const slotEnd = toMinutes(slot.end);

  return bookings.some((b) => {
    const bookingStart = toMinutes(b.start);
    const bookingEnd = toMinutes(b.end);

    return slotStart < bookingEnd && slotEnd > bookingStart;
  });
};

const generateSlots = (
  startHour: number,
  endHour: number,
  bookings: Booking[],
): TimeSlot[] => {
  const slots: TimeSlot[] = [];

  const format = (h: number, m: number) =>
    `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;

  for (let h = startHour; h < endHour; h++) {
    for (let i = 0; i < 6; i++) {
      const startMin = i * 10;
      const endMin = startMin + 10;

      const start = format(h, startMin);
      const end = format(endMin === 60 ? h + 1 : h, endMin === 60 ? 0 : endMin);

      const slot: TimeSlot = {
        id: `${h}-${i}`,
        start,
        end,
        available: true,
      };

      slot.available = !isSlotBooked(slot, bookings);

      slots.push(slot);
    }
  }

  return slots;
};

/* ================= COMPONENT ================= */

interface Props {
  bookings: Booking[];
  startHour?: number;
  endHour?: number;
  onSelect?: (slot: TimeSlot) => void;
}

export const TimeSlotGrid = ({
  bookings,
  startHour = 9,
  endHour = 17,
  onSelect,
}: Props) => {
  const slots = useMemo(() => {
    return generateSlots(startHour, endHour, bookings);
  }, [bookings, startHour, endHour]);

  return (
    <Box display="flex" flexDirection="column" width="220px">
      {slots.map((slot) => (
        <Box
          key={slot.id}
          onClick={() => {
            if (!slot.available) return;
            onSelect?.(slot);
          }}
          sx={{
            p: 1,
            border: "1px solid #ccc",
            backgroundColor: slot.available ? "#e6f7ff" : "#ffcccc",
            cursor: slot.available ? "pointer" : "not-allowed",
            opacity: slot.available ? 1 : 0.6,
            textDecoration: slot.available ? "none" : "line-through",
            mb: 0.5,
          }}
        >
          {slot.start} - {slot.end}
        </Box>
      ))}
    </Box>
  );
};
