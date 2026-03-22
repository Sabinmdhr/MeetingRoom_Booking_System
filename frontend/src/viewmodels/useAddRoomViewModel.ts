import { useState } from "react";
import type { addRooms } from "../models/addRoom.model";
import { useDispatch } from "react-redux";
import { closeEditForm, openEditForm } from "../redux/MeetingRoomSlice";

export const useAddRoomViewModel = () => {
  const dispatch = useDispatch();

  const [room, setRoom] = useState<addRooms[]>([]);

  const [roomName, setRoomName] = useState("");
  const [capacity, SetCapacity] = useState("");
  const [features, SetFeatures] = useState([]);

  const handleEdit = (meetingRoom: any) => {
    dispatch(openEditForm(meetingRoom));
  };

  const handleClose = () => {
    dispatch(closeEditForm());
  };
  return {
    SetCapacity,
    SetFeatures,
    capacity,
    handleClose,
    handleEdit,
    features,
    roomName,
    setRoomName,
  };
};
