import type {
  BookedRoomDataResponse,
  BookingRoomData,
} from "../bookRoom.model";
const formatTo12Hour = (time?: string) => {
  if (!time) return "";

  const [hour, minute] = time.split(":");

  return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
};
export const mapEventToBookingFormData = (
  eventData: BookedRoomDataResponse,
): BookingRoomData => {
  return {
    meetingTitle: eventData.meetingTitle,
    startDate: eventData.startDate,
    startTime: formatTo12Hour(eventData.startTime),
    endTime: formatTo12Hour(eventData.endTime),
    description: eventData.description,
    meetingTypeId: eventData.meetingType.id,
    recurrenceEndDate: eventData.dates?.at(-1)?.date ?? "",
    recurrenceType: eventData.recurrenceType,
    externalParticipants:
      eventData.externalParticipant?.map((p) => ({
        name: p.name,
        email: p.email,
      })) ?? [],
    internalParticipantIds:
      eventData.internalParticipant?.map((p) => p.id) ?? [],
    roomId: eventData.room.id,
    weekDays: [],
  };
};
