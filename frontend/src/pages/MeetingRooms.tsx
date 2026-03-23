import { Meeting_roomCard } from "../components/Meeting-Rooms/Meeting_roomCard";
import "../assets/scss/pages/MeetingRooms.scss";
import { Button, Card, CardContent, CardHeader, CircularProgress, Typography } from "@mui/material";
import { useMeetingCardViewModel } from "../viewmodels/useMeeting_roomCardViewModel";
import {  useState } from "react";
import { SquarePen } from "lucide-react";
import { AddMeetingRoomForm } from "../components/Meeting-Rooms/AddMeetingRoom-Form";
import { useAddRoomViewModel } from "../viewmodels/useAddRoomViewModel";
import { useAppSelector } from "../redux/store";
// import { EventCalendar } from "@mui/x-scheduler/event-calendar";

const MeetingRooms = () => {
  const { loading } = useMeetingCardViewModel("1");
  // const [editMode, setEditMode] = useState(false)
  if (loading) return <CircularProgress />;
//   const {handleClose} = useAddRoomViewModel();
// const {isEditOpen} = useAppSelector((state) => state.meetingRoom)
  return (
    <div>
      <div className="titleDesc">
        <Typography variant="h1">Meeting Rooms</Typography>
        <Typography variant="subtitle1">Book available rooms</Typography>
      </div>
      <div>
        <AddMeetingRoomForm />
      </div>


        <CardContent className="MeetingRooms">
          <Meeting_roomCard meetingId="1" />
          <Meeting_roomCard meetingId="2" />
          <Meeting_roomCard meetingId="3" />
          <Meeting_roomCard meetingId="3" />
        </CardContent>
    </div>
  );
};



export default MeetingRooms
