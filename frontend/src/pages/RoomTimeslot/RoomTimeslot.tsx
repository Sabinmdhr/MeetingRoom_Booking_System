import { Divider, Box, Typography } from '@mui/material';
import { Calendar} from 'lucide-react';
import "../../assets/scss/pages/RoomTimeslot.scss";
import { useRoomTimeslotViewModel } from '../../viewmodels/useRoomTimeslotViewModel';
import { TimeSlotSelector } from '../../components/Meeting-Rooms/TimeSlotSelector';

const RoomTimeslot = () => {
  const {room}= useRoomTimeslotViewModel ();

  return (
    <Box className='room-timeslot'>
    <Box>
      <Box className="timeslot-heading">
      <Calendar size={20} />
      <Typography variant='h1'>{room?.roomName}</Typography>
      </Box>
      <Typography variant="subtitle1" color="text.secondary">Tap then drag across time slots to select your booking duration</Typography>
    </Box>
    <Divider />

    {/* <Box className="timeslot-nav">
        <Button 
        className='timeslot-btn'
        size="small"
        onClick={() => changeDate(-1)}
        variant="outlined"><ChevronLeft size={18}/>Previous</Button>
        <Box className="date">
        <Typography className="timeslot-date">{formattedDate}</Typography>
        <Typography className="jump-today" onClick={jumpToToday}>
          Jump to Today
        </Typography>
        </Box>
        <Button 
        className='timeslot-btn'
        size="small"
        onClick={() => changeDate(1)}
        variant="outlined">Next<ChevronRight size={18}/></Button>
    </Box>
    <Divider /> */}
    <TimeSlotSelector/>

    </Box>
  )
}

export default RoomTimeslot
