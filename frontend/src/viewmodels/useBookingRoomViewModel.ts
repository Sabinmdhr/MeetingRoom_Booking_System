import { useRef, useState } from "react";
import { validateBookingForm } from "../utils/bookingValidation";
import type { SelectChangeEvent } from "@mui/material";
import type { BookingRoomData } from "../models/bookRoom.model";
import { BookRoom } from "../services/bookRoom.service";
import { useAppSelector } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBookingRoomFormData,
  updateBookingRoomFormData,
} from "../redux/bookRoomSlice";
import { clamp, snapToInterval } from "../utils/timeUtils";
import { useNavigate } from "react-router-dom";

type BookingTimeAndDatePeops = {
  startTime: string;
  endTime: string;
  date: string;
};
export const useBookingRoomViewModel = () => {
  // const [bookingRoomData, setBookingRoomData] =
  //   useState<BookingRoomData>(initialBookingData);
  // const {startTime, endTime , date} = useAppSelector((state)=> state.bookingRoom)
  const dispatch = useDispatch();
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
  return {
    // bookingRoomData,
    // setBookingRoomData,
    // bookRoom,
    // handleSubmit,
    updateBookingTimeAndDate,
    handleChange,
    handleBookRoom,
    successState,
  };
};
