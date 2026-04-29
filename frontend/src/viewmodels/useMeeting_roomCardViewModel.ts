import { useState, useEffect } from "react";
import type { AddRoomModal, meeting_rooms } from "../models/meeting_room.model";
import {
  addRoom,
  getMeetingRooms,
  deleteMeetingRoom,
  getMEttingRoomResources,
} from "../services/Meetinf_room.service";
import { toast } from "react-toastify";

export const useMeetingCardViewModel = () => {
  const [meeting, setMeeting] = useState<meeting_rooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<meeting_rooms | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const initialAddMeetingFormData = {
    roomName: "",
    capacity: 0,
    resources: [],
  };
  const [addMeetingFormData, setAddMeetingFormData] = useState({
    initialAddMeetingFormData,
  });
  const [roomResources, setRoomResources] = useState<
    { id: number; name: string }[]
  >([]);
  const [roomFormState, setRoomFormState] = useState({
    open: false,
    mode: "add" as "add" | "edit",
    room: null as meeting_rooms | null,
  });
  const [openAddRoomForm, setOpenAddRoomForm] = useState(false);
  const [addRoomFormData, setAddRoomFormData] = useState<AddRoomModal>({
    //  id: "",
    roomName: "",
    capacity: 0,
    resourcesIds: [],
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddRoomFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setAddRoomFormData((prev) => {
      let newResources = [...prev.resourcesIds];
      if (checked) {
        newResources.push(Number(value));
      } else {
        newResources = newResources.filter((f) => f !== Number(value));
      }
      console.log(addRoomFormData);

      return { ...prev, resourcesIds: newResources };
    });
  };
  const fetchMeeting = async () => {
    try {
      setLoading(true);
      // const data = await getMeetingRoomById(meetingId);
      const data = await getMeetingRooms();
      // console.log(data);
      setMeeting(data.data.content);
      const resources = await getMEttingRoomResources();
      setRoomResources(resources.data);
    } catch (err: any) {
      setError(err.message || "Failed to load meeting room");
    } finally {
      setLoading(false);
    }
  };

  const submitAddRomForm = async () => {
    try {
      const data = {
        ...addRoomFormData,
        capacity: Number(addRoomFormData.capacity),
      };

      const res = await addRoom(data);
      console.log(res);

      toast.success("Room Created Successfully");
      // setMeeting((prev) => [...prev, res]);
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMeeting();
  }, []);

  const handleRoomFormOpen = (mode: "edit" | "add", room?: meeting_rooms) => {
    setRoomFormState({ open: true, mode: mode, room: room || null });
  };

  const handleRoomFormClose = async () => {
    setRoomFormState((prev) => ({
      ...prev,
      open: false,
    }));
    await fetchMeeting();
  };

  return {
    meeting,
    fetchMeeting,
    loading,
    error,
    refresh,
    addMeetingFormData,
    setAddMeetingFormData,
    selectedRoom,
    setSelectedRoom,
    handleRoomFormOpen,
    roomFormState,
    setRoomFormState,
    handleRoomFormClose,
    openAddRoomForm,
    handleCheckboxChange,
    setOpenAddRoomForm,
    addRoomFormData,
    submitAddRomForm,
    handleChange,
    setAddRoomFormData,

    roomResources,
  };
};
