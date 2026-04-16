import { Divider, Box, Typography } from '@mui/material';
import { Calendar} from 'lucide-react';
import "../../assets/scss/pages/RoomTimeslot.scss";
import { useRoomTimeslotViewModel } from '../../viewmodels/useRoomTimeslotViewModel';
import { TimeSlotSelector } from '../../components/Meeting-Rooms/TimeSlotSelector';

const RoomTimeslot = () => {
  const {room}= useRoomTimeslotViewModel ();

  return (
    <Box className="room-timeslot">
      <Box>
        <Box className="timeslot-heading">
          <Calendar size={20} />
          <Typography variant="h1">{room?.roomName}</Typography>
          {/* <Typography variant="h1">{room?.capacity}</Typography> */}
        </Box>
        <Typography variant="subtitle1" color="text.secondary">
          Tap then drag across time slots to select your booking duration
        </Typography>
      </Box>
      <Divider />

      <TimeSlotSelector />
    </Box>
  );
}

export default RoomTimeslot
