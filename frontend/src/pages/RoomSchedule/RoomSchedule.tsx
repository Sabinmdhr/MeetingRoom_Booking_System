// import { useRoomScheduleViewModel } from "../../viewmodels/useRoomScheduleViewModel";
// import TimeSlotGrid from "./TimeSlotGrid";
// import TimeSlotCard from "./TimeSlotCard";
import BookingFooter from "./BookingFooter";
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton } from "@mui/material";
import { Calendar, X } from 'lucide-react';
import "../../assets/scss/pages/RoomSchedule.scss";
import type { meeting_rooms } from "../../models/meeting_room.model";

interface Props {
  onClose: () => void;
  room: meeting_rooms | null;
}

const RoomSchedule = ({onClose, room}:Props) => {

  // const vm = useRoomScheduleViewModel();

  return (
      <Dialog open={!!room} onClose={onClose} maxWidth="lg" fullWidth>
  <DialogTitle className="roomschedule-title">
    <Box className="roomschedule-left">
      <Box className="roomschedule-heading">
        <Calendar size={20} />
        <Typography variant="h6">{room?.roomName}</Typography>
      </Box>

      <Typography variant="body2" className="roomschedule-subtext">
        Drag across time slots to select your booking duration
      </Typography>
    </Box>

    <IconButton onClick={onClose} className="roomschedule-close">
      <X size={18} />
    </IconButton>
  </DialogTitle>

      {/* <TimeSlotGrid
        slots={vm.slots}
        onSelect={vm.selectSlot}
      />

      <TimeSlotCard
        start={vm.selectedStart}
        end={vm.selectedEnd}
        duration={vm.duration}
      /> */}

      <BookingFooter />
    </Dialog>
  )
}

export default RoomSchedule;
