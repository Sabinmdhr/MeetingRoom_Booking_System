import { useState, useEffect } from "react";
import type { meeting_rooms } from "../models/meeting_room.model";
import { getMeetingRooms} from "../services/Meetinf_room.service";

export const useMeetingCardViewModel = () => {
  const [meeting, setMeeting] = useState<meeting_rooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<meeting_rooms | null>(null);

  const initialAddMeetingFormData = {
    roomName: "",
    capacity: 0,
    resources: [],
  }
const [addMeetingFormData, setAddMeetingFormData]= useState({initialAddMeetingFormData});

const [roomFormState, setRoomFormState] = useState({
  open: false,
  mode: "add" as "add" | "edit",
  room: null as meeting_rooms | null,
})
const handleRoomFormOpen = (mode: "edit" | "add", room?: meeting_rooms ) => {
setRoomFormState(
 { open: true,
  mode: mode,
  room: room || null,
  }
)
}

const handleRoomFormClose = ()=>{
  setRoomFormState((prev)=>({
...prev,
open: false,
  }))
}

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);
        // const data = await getMeetingRoomById(meetingId);
        const data = await getMeetingRooms()
        // console.log(data);
        setMeeting(data.data.content);
      } catch (err: any) {
        setError(err.message || "Failed to load meeting room");
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, []);

  return {
    meeting,
    loading,
    error,
    addMeetingFormData,
    setAddMeetingFormData,
    selectedRoom,
    setSelectedRoom,
    handleRoomFormOpen,
    roomFormState,
    setRoomFormState,
    handleRoomFormClose,
  };
};
