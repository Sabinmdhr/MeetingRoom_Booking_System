import { useState } from "react";
import { BookRoom, getBookedDataById } from "../services/bookRoom.service";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { updateBookingRoomFormData } from "../redux/bookRoomSlice";
import { useNavigate } from "react-router-dom";

type BookingTimeAndDatePeops = {
  startTime: string;
  endTime: string;
  date: string;
};
export const useBookingRoomViewModel = () => {
  const [bookedSlots, setBookedSlots]= useState<{start: string, end:string}[]>([]);
  const dispatch = useDispatch();
  const {roomId}= useAppSelector((state)=>state.bookingRoom);
  
  const navigate = useNavigate()
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

  const handleBookRoom = async () => {
    try {
      // console.log("success", bookingRoomFormData);
      const response = await BookRoom(bookingRoomFormData);
      return response;

    } catch (error:any) {
      console.log("FULL ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("BACKEND MESSAGE:", error.response?.data);
    }
  };

  const handleGetBookedRoom= async () =>{
    try {
      const res= await getBookedDataById(roomId);
      setBookedSlots([{start:res.startTime, end: res.endTime}]);
      return res;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return {
    updateBookingTimeAndDate,
    handleChange,
    handleGetBookedRoom,
    bookedSlots,
    handleBookRoom,
  };
};
