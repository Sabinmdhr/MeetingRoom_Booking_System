import { useState, useEffect } from "react";
import type {
  AddRoomModal,
  meeting_rooms,
  recurrenceRoomBookings,
  RoomBookings,
  singleRoomBookings,
  UpcomingMeetingResponse,
} from "../models/meeting_room.model";
import {
  addRoom,
  getMeetingRooms,
  deleteMeetingRoom,
  getMeetingRoomResources,
  selfBookedRoom,
} from "../services/Meetinf_room.service";
import { toast } from "react-toastify";
import { getUpcomingMeeting } from "../services/Meetinf_room.service";
import dayjs from "dayjs";
import { useAuth } from "../hooks/useAuth";

export const useMeetingCardViewModel = () => {
  const { role } = useAuth();
  const [meeting, setMeeting] = useState<meeting_rooms[]>([]);
  const [loading, setLoading] = useState(false);
  const [historyMode, setHistoryMode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [addResourceMode, setAddResourceMode] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<meeting_rooms | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [upcomingMeeting, setUpcomingMeeting] = useState<RoomBookings[]>([]);
  const [allUpcomingMeeting, setAllUpcomingMeeting] = useState<RoomBookings[]>([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore]= useState(true);

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
    if (role === "STAFF") return;
    try {
      setLoading(true);
      // const data = await getMeetingRoomById(meetingId);
      const data = await getMeetingRooms();
      // console.log(data);
      setMeeting(data.data.content);

    } catch (err: any) {
      setError(err.message || "Failed to load meeting room");
    } finally {
      setLoading(false);
    }
  };
const fetchMeetingRoomResources = async() =>{
  try {
const resources = await getMeetingRoomResources();
setRoomResources(resources.data);
  } catch (error) {
    toast.error(`${error}`)
  }
}
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
      toast.error("Failed to create room");
    }
  };

  const normalizeBookings = (data: UpcomingMeetingResponse): RoomBookings[] => {
    const single = (data?.singleRoomBookings || []).map(
      (item: singleRoomBookings) => ({
        id: item.id,
        recurrenceId: item.recurrenceId,
        meetingTitle: item.meetingTitle,
        startDate: item.startDate,
        endDate: item.endDate,
        startTime: item.startTime,
        endTime: item.endTime,
        description: item.description,
        status: item.status,
        meetingStatus: item.meetingStatus,
        recurrenceType: item.recurrenceType,

        meetingType: item.meetingType,
        internalParticipant: item.internalParticipant,
        room: item.room,
        roomBooker: item.roomBooker,
      }),
    );

    const recurring = (data?.recurrenceRoomBookings || []).map((item) => {
      const nextDate = item.dates?.sort(
        (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
      )[0];

      return {
        recurrenceId: item.recurrenceId,
        meetingTitle: item.meetingTitle,
        startDate: nextDate?.date || item.startDate,
        startTime: item.startTime,
        endTime: item.endTime,
        description: item.description,
        status: item.status,
        meetingStatus: item.meetingStatus,
        recurrenceType: item.recurrenceType,
        meetingType: item.meetingType,
        internalParticipant: item.internalParticipant,
        room: item.room,
        roomBooker: item.roomBooker,
      };
    });

    return [...single, ...recurring];
  };

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

  // const fetchAllUpcomingMeetings = async (page=1, reset= false) => {
  //   try {
  //     setLoadingUpcoming(true);

  //     const res = await (historyMode ? selfBookedRoom(page, 3) : getUpcomingMeeting(page, 3));
  //     console.log("PAGE:", page);
  //   console.log("API DATA:", res.data);
  //     const normalized = normalizeBookings(res.data);
  //     setAllUpcomingMeeting((prev)=>
  //     reset ? normalized : [...prev, ...normalized]);
  //     setHasMore(!res.last);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoadingUpcoming(false);
  //   }
  // };

  const fetchAllUpcomingMeetings = async () => {
    try {
      setLoadingUpcoming(true);

      const res = await (historyMode ? selfBookedRoom() : getUpcomingMeeting());
      const normalized = normalizeBookings(res.data);
      setAllUpcomingMeeting(normalized);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchUpcomingMeetings = async () => {
    try {
      setLoadingUpcoming(true);
      const res = await getUpcomingMeeting();
      const normalized = normalizeBookings(res.data);
      const sorted = normalized.sort(
        (a, b) =>
          dayjs(`${a.startDate} ${a.startTime}`).valueOf() -
          dayjs(`${b.startDate} ${b.startTime}`).valueOf(),
      );
      const filtered = sorted.slice(0, 5);

      setUpcomingMeeting(filtered);
      console.log(upcomingMeeting);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingUpcoming(false);
    }
  };

  useEffect(() => {
    fetchMeeting();
    fetchUpcomingMeetings();
    fetchMeetingRoomResources()
  }, []);

  useEffect(()=>{
    setCurrentPage(1);
    setAllUpcomingMeeting([]);
    fetchAllUpcomingMeetings();
  },[historyMode])

  // const handleShowMore= async()=>{
  //   const nextPage= currentPage + 1;
  //   setCurrentPage(nextPage);
  //   await fetchAllUpcomingMeetings(nextPage);
  // }
//   const handleShowMore = async () => {
//   const nextPage = currentPage + 1;
//   setCurrentPage(nextPage);
//   await fetchAllUpcomingMeetings(nextPage);
// };
  return {
    meeting,
    fetchMeeting,
    fetchMeetingRoomResources,
    loading,
    error,
    historyMode,
    setHistoryMode,
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
    fetchAllUpcomingMeetings,
    allUpcomingMeeting,
    fetchUpcomingMeetings,
    upcomingMeeting,
    roomResources,
    addResourceMode,
    setAddResourceMode,
    currentPage,
    setCurrentPage,
    // handleShowMore,
    hasMore,
    loadingUpcoming,
  };
};
