import { useState } from "react";
import { BookRoom, getBookedDataById } from "../services/bookRoom.service";
import { useAppSelector } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBookingRoomFormData,
  updateBookingRoomFormData,
} from "../redux/bookRoomSlice";
import { clamp, snapToInterval } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";
import type {  GetBookedRoomDataResponse } from "../models/bookRoom.model";
import { getCalendarByDay } from "../services/calendar.service";
import type { CalendarByDay } from "../models/calendar.model";

type BookingTimeAndDatePeops = {
  startTime: string;
  endTime: string;
  date: string;
};
export const useBookingRoomViewModel = () => {
  const [bookedSlots, setBookedSlots]= useState<{start: string, end:string, color: string}[]>([]);
  const dispatch = useDispatch();
  const {roomId}= useAppSelector((state)=>state.bookingRoom);

  const [successState, setSuccessState] = useState<boolean>(false);
  const navigate = useNavigate();
  const bookingRoomFormData = useAppSelector((state) => state.bookingRoom);
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

  // const handleClearFormData = () => {
  //   dispatch(clearBookingRoomFormData());
  //   navigate("/meeting-rooms");
  // };
  // const submit = () =>{
  //     console.log(startTime);
  //   }
  //  const handleSubmit = () => {
  //     console.log(startTime);
  //     setBookingRoomData((prev) => ({
  //       ...prev,
  //       startTime:startTime,
  //       endTime : endTime,
  //       date : date,
  //     }));

  //   };
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

//   const handleGetBookedRoom= async () =>{
//     try {
//       const res :GetBookedRoomDataResponse = await getBookedDataById(roomId);
//       console.log(res);

//       const formatted =res.data.map((slot) =>({
//         start: slot.startTime,
//         end: slot.endTime
//       }))
// setBookedSlots(formatted)
//       return res;
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   }
const handleGetBookedRoomByDay = async(date: string, RoomId: number) =>{
  try {
    const res = await getCalendarByDay(date)
    const formattedByDate = res.filter((slot) => slot.roomId === RoomId);
    const formatted = formattedByDate.map((slot) =>({
      start: slot.startTime,
      end: slot.endTime,
      color: slot.meetingType.colorCode
    }))
    setBookedSlots(formatted)
  } catch (error) {

  }
}
  return {
    updateBookingTimeAndDate,
    handleChange,
    handleGetBookedRoomByDay,
    bookedSlots,
    handleBookRoom,
    successState,
  };
};
