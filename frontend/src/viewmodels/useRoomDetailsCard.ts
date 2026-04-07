import { useEffect, useState } from "react"
import {  getMeetingRooms } from "../services/Meetinf_room.service";
import type { meeting_rooms } from "../models/meeting_room.model";

export const useRoomDetailsCard = ()=>{
    const [rooms, setRooms] = useState<meeting_rooms[]>([]);
    const [roomId, setRoomId] = useState("");
    const [selectedRoom, setSelectedRoom] = useState<meeting_rooms | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
          const data = await getMeetingRooms();
          setRooms(data);
        };

        fetchRooms();
      }, []);

    const handleRoomChange = async(id:string) =>{
        setRoomId(id);

        const roomData=await getMeetingRoomById(id);
        setSelectedRoom(roomData);
    }

    return{
        handleRoomChange,
        rooms, roomId, selectedRoom
    }
}