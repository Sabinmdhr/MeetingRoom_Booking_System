// import { useState, useEffect } from "react";
// import type { Meeting_room } from "../models/Meeting_room.model";
// import {
//   getMeetingRoomById,
//   getMeetingRooms,
// } from "../services/Meetinf_room.service";

// export const useBookingRoom = () => {
//   const [meetingType, setMeetingType] = useState<string>("");
//   const [participantType, setParticipantType] = useState<
//     "internal" | "external" | null
//   >(null);
//   const menuItemOptions = [
//     { value: "Internal", label: "Internal" },
//     { value: "Client", label: "Client" },
//     { value: "Executive", label: "Executive" },
//   ];
//   const [rooms, setRooms] = useState<Meeting_room[]>([]);
//   const [roomId, setRoomId] = useState("");
//   const [selectedRoom, setSelectedRoom] = useState<Meeting_room | null>(null);
//   const [openTime, setOpenTime] = useState(false);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState<string | null>(null);
//   const [timeType, setTimeType] = useState<"start" | "end" | null>(null);

//   console.log("hello this is me,ihere");

//   const handleInternalClick = () => {
//     setParticipantType((prev) => (prev === "internal" ? null : "internal"));
//   };
//   const handleExternalClick = () => {
//     setParticipantType((prev) => (prev === "external" ? null : "external"));
//   };

//   const handleSelectTime = (time: string) => {
//     if (timeType === "start") {
//       setStartTime(time);
//       setEndTime("");
//     }

//     if (timeType === "end") {
//       setEndTime(time);
//     }
//     setOpenTime(false);
//   };

//   useEffect(() => {
//     const fetchRooms = async () => {
//       const data = await getMeetingRooms();
//       setRooms(data);
//     };

//     fetchRooms();
//   }, []);

//   const handleRoomChange = async (id: string) => {
//     setRoomId(id);

//     const roomData = await getMeetingRoomById(id);
//     setSelectedRoom(roomData);
//   };

//   return {
//     meetingType,
//     setMeetingType,
//     participantType,
//     rooms,
//     roomId,
//     selectedRoom,
//     openTime,
//     setOpenTime,
//     startTime,
//     endTime,
//     timeType,
//     setTimeType,
//     menuItemOptions,
//     handleInternalClick,
//     handleExternalClick,
//     handleSelectTime,
//     handleRoomChange,
//   };
// };
