import { useEffect, useState } from "react"
import { getMeetingRoomById, getMeetingRooms } from "../services/Meetinf_room.service";
import type { Meeting_room } from "../models/Meeting_room.model";

export const useRoomDetailsCard = ()=>{
    const [rooms, setRooms] = useState<Meeting_room[]>([]);
    const [roomId, setRoomId] = useState("");
    const [selectedRoom, setSelectedRoom] = useState<Meeting_room | null>(null);

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