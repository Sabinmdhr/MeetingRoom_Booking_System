import { Meeting_roomCard } from "../components/Meeting-Rooms/Meeting_roomCard";
import "../assets/scss/pages/MeetingRooms.scss";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useMeetingCardViewModel } from "../viewmodels/useMeeting_roomCardViewModel";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { AddMeetingRoomForm } from "../components/Meeting-Rooms/AddMeetingRoom-Form";
import { useAppSelector } from "../redux/store";
import { useAuth } from "../hooks/useAuth";
import { permissions } from "../utils/permissions";
// import { EventCalendar } from "@mui/x-scheduler/event-calendar";

const MeetingRooms = () => {
  const { role } = useAuth();
  const perms = permissions[role as keyof typeof permissions];
  const { loading, handleRoomFormOpen, roomFormState, handleRoomFormClose } =
    useMeetingCardViewModel();
  // const open = roomFormState.open
  // const {
  //   openAddRoomForm,
  //   addRoomFormData,
  //   handleChange,
  //   handleCheckboxChange,
  //   setOpenAddRoomForm,
  //   submitAddRomForm,
  // } = useAddRoomViewModel();
  // const [editMode, setEditMode] = useState(false)
  if (loading) return <CircularProgress />;
  //   const {handleClose} = useAddRoomViewModel();
  // const {isEditOpen} = useAppSelector((state) => state.meetingRoom)
  // return (
  //   <>
  //     <div className="meeting-table__main">
  //       <div className="titleDesc">
  //         <Typography variant="h1">Meeting Rooms</Typography>
  //         <Typography variant="subtitle1">Book available rooms</Typography>
  //       </div>
  //       {perms?.canBookRoom && (
  //         <AddMeetingRoomForm
  //           roomFormState={roomFormState}
  //           handleRoomFormOpen={handleRoomFormOpen}
  //           handleRoomFormClose={handleRoomFormClose}
  //         />
  //       )}
  //     </div>
  //     <CardContent className="MeetingRooms">
  //       {/* <Grid container> */}
  //       <Meeting_roomCard
  //         roomFormState={roomFormState}
  //         handleRoomFormOpen={handleRoomFormOpen}
  //       />
  //       {/* </Grid> */}
  //     </CardContent>
  //   </>
  // );
  return (
    <div className="meeting-table">
      <div className="meeting-table__title-wrapper">
        <div className="meeting-table__title">
          <Typography variant="h1">Meeting Rooms</Typography>
          <Typography variant="subtitle1">Book available rooms</Typography>
        </div>
        <div>
          {perms?.canBookRoom && (
            <AddMeetingRoomForm
              roomFormState={roomFormState}
              handleRoomFormOpen={handleRoomFormOpen}
              handleRoomFormClose={handleRoomFormClose}
            />
          )}
        </div>
      </div>

      <div className="meeting-table__content__card">
        {/* <Grid container> */}
        <Meeting_roomCard
          roomFormState={roomFormState}
          handleRoomFormOpen={handleRoomFormOpen}
        />
        {/* </Grid> */}
      </div>
    </div>
  );
};

export default MeetingRooms;
