import { useEffect, useState } from "react";
import { BookRoom, getBookedDataByRoomId } from "../services/bookRoom.service";
import { useAppSelector } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBookingRoomFormData,
  updateBookingRoomFormData,
} from "../redux/bookRoomSlice";
import { clamp, snapToInterval } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";
import type {
  GetBookedRoomDataResponse,
  MeetingTypeInfo,
} from "../models/bookRoom.model";
import { getCalendarByDay } from "../services/calendar.service";
import type { CalendarByDay } from "../models/calendar.model";
import { useAuth } from "../hooks/useAuth";
import { getAllMeetingType } from "../services/report.service";

type BookingTimeAndDatePeops = {
  startTime: string;
  endTime: string;
  date: string;
};
export const useBookingRoomViewModel = () => {
  const [bookedSlots, setBookedSlots] = useState<
    { start: string; end: string; color: string }[]
  >([]);
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
  const [openCard, setOpenCard] = useState<"internal" | "external" | null>(null);
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

  const updateBookingTimeAndDate = ({
    startTime,
    endTime,
    date,
  }: BookingTimeAndDatePeops) => {
    dispatch(updateBookingRoomFormData({ startTime, endTime, date }));
    navigate("/book-room");
  };

  const handleBookRoom = async () => {
    try {
      // console.log("success", bookingRoomFormData);
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
    handleInternalCard,
  };
};
