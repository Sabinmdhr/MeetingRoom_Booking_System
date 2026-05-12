import { useEffect, useState } from "react";
import {
  BookRoom,
  EditBookedRoomById,
  EditBookedRoomByRecurrenceId,
  getBookedDataByRoomId,
} from "../services/bookRoom.service";
import { useAppSelector } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBookingRoomFormData,
  toggleWeekDay,
  updateBookingRoomFormData,
} from "../redux/bookRoomSlice";
import { clamp, snapToInterval } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";
import type {
  GetBookedRoomDataResponse,
  MeetingTypeInfo,
  WeekDays,
} from "../models/bookRoom.model";
import { getCalendarByDay } from "../services/calendar.service";
import type { CalendarByDay } from "../models/calendar.model";
import { useAuth } from "../hooks/useAuth";
import { getAllMeetingType } from "../services/report.service";

type BookingTimeAndDatePeops = {
  startTime: string;
  endTime: string;
  startDate: string;
}

export const useBookingRoomViewModel = () => {
  const [bookedSlots, setBookedSlots] = useState<
    { start: string; end: string; color: string; title:string ,id:number }[]
  >([]);
   const [slot, setSlot] = useState({
     startTime: "00:00",
     endTime: "00:00",
     startDate: "",
   });
   const PastimeColor = "#fff3cd";
   const bookedColor = "rgba(196, 38, 38, 0.72)";
   const selectedColor = " rgba(36, 9, 135, 0.37)"
  const [externalParticipant, setExternalParticipant] = useState<{
    name: string;
    email: string;
  }>({ name: "", email: "" });
  const dispatch = useDispatch();
  const { roomId } = useAppSelector((state) => state.bookingRoom);
  const { role } = useAuth();
  const [successState, setSuccessState] = useState<boolean>(false);
  const navigate = useNavigate();
  const [meetingTypes, setMeetingTypes] = useState<MeetingTypeInfo[]>([]);
  const bookingRoomFormData = useAppSelector((state) => state.bookingRoom);
  const [openCard, setOpenCard] = useState<"internal" | "external" | null>(
    null,
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(
      updateBookingRoomFormData({
        [name]: value,
      }),
    );
  };
  const handleWeekDays = (day: WeekDays) => {
    dispatch(toggleWeekDay(day));
  };

  const updateBookingTimeAndDate = ({
    startTime,
    endTime,
    startDate,
  }: BookingTimeAndDatePeops) => {
    dispatch(updateBookingRoomFormData({ startTime, endTime, startDate }));
  };

  const handleBookRoom = async () => {
    try {
      console.log("success", bookingRoomFormData);
      const response = await BookRoom(bookingRoomFormData);
      dispatch(clearBookingRoomFormData());
      navigate("/meeting-rooms");
      return response;
    } catch (error: any) {
      console.log("FULL ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("BACKEND MESSAGE:", error.response?.data);
    }
  };
  const handleEditBookRoomById = async (bookingId: number) => {
    try {
      const res = await EditBookedRoomById(bookingRoomFormData, bookingId);
      dispatch(clearBookingRoomFormData());
      navigate("/meeting-rooms");
      return res;
    } catch (error) {
      console.error("Error editing booked room:", error);
      throw error;
    }
  };

  const handleEditBookRoomByRecurrenceId = async (recurrenceId: number) => {
    try {
      const res = await EditBookedRoomByRecurrenceId(
        bookingRoomFormData,
        recurrenceId,
      );
      dispatch(clearBookingRoomFormData());
      navigate("/meeting-rooms");
      return res;
    } catch (error) {
      console.error("Error editing booked room:", error);
      throw error;
    }
  };

  const handleExternalParticipantsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setExternalParticipant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExternalParticipantsAdd = () => {
    dispatch(
      updateBookingRoomFormData({
        externalParticipants: [
          ...bookingRoomFormData.externalParticipants,
          externalParticipant,
        ],
      }),
    );
    console.log(bookingRoomFormData);

    setExternalParticipant({ name: "", email: "" });
  };

  const handleExternalCard = () => {
    setOpenCard((prev) => (prev === "external" ? null : "external"));
  };
  const handleInternalCard = () => {
    setOpenCard((prev) => (prev === "internal" ? null : "internal"));
  };
  const handleGetBookedRoomByDay = async (date: string, RoomId: number) => {
    try {
      const res = await getCalendarByDay(date, role);
      const formattedByDate = res.filter((slot) => slot.roomId === RoomId);
      const formatted = formattedByDate.map((slot) => ({
        start: slot.startTime,
        end: slot.endTime,
        color: slot.meetingType.colorCode,
        title: slot.meetingTitle,
        id: slot.meetingId,
      }));
      setBookedSlots(formatted);
    } catch (error) {}
  };
  const fetchMeetingTypes = async () => {
    try {
      const res = await getAllMeetingType();
      setMeetingTypes(res.data);
    } catch (error) {
      console.log("Error fetching meeting types:", error);
    }
  };
  useEffect(() => {
    fetchMeetingTypes();
  }, []);
  return {
    bookedColor,
    selectedColor,
    PastimeColor,
    updateBookingTimeAndDate,
    handleChange,
    handleGetBookedRoomByDay,
    bookedSlots,
    handleBookRoom,
    successState,
    meetingTypes,
    handleExternalParticipantsChange,
    externalParticipant,
    setExternalParticipant,
    handleExternalParticipantsAdd,
    handleExternalCard,
    openCard,
    handleEditBookRoomById,
    handleEditBookRoomByRecurrenceId,
    handleInternalCard,
    handleWeekDays,
    slot,
    setSlot,
  };
};
