import { useRoomScheduleViewModel } from "../../viewmodels/useRoomScheduleViewModel";
import TimeSlotGrid from "./TimeSlotGrid";
import TimeSlotCard from "./TimeSlotCard";
import BookingFooter from "./BookingFooter";
import { Dialog, DialogTitle, DialogContent, Box, Typography, IconButton } from "@mui/material";
import { Calendar, X } from 'lucide-react';
import "../../assets/scss/pages/RoomSchedule.scss";

interface Props {
  onClose: () => void;
}

const RoomSchedule = ({onClose}:Props) => {

  const vm = useRoomScheduleViewModel();

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box className="roomschedule-title">
          <Box>
            <Box className="roomschedule-heading">
            <Calendar size={18} />
            <Typography variant="h2">Mustang</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Drag across time slots to select your booking duration
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <X />
          </IconButton>
        </Box>
      </DialogTitle>

      <TimeSlotGrid
        slots={vm.slots}
        onSelect={vm.selectSlot}
      />

      <TimeSlotCard
        start={vm.selectedStart}
        end={vm.selectedEnd}
        duration={vm.duration}
      />

      <BookingFooter />
    </Dialog>
  )
}

export default RoomSchedule;
