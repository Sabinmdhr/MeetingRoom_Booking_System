import { Typography } from "@mui/material";
import { Calendar } from "lucide-react";
import "../../assets/scss/pages/RoomTimeslot.scss";
import { useRoomTimeslotViewModel } from "../../viewmodels/useRoomTimeslotViewModel";
import { TimeSlotSelector } from "../../components/Meeting-Rooms/TimeSlotSelector";
import MyButton from "../../components/ui/Button";
import { useBookingRoomViewModel } from "../../viewmodels/useBookingRoomViewModel";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RoomTimeslot = () => {
  const { room } = useRoomTimeslotViewModel();
  const { updateBookingTimeAndDate, setSlot, slot, PastimeColor, bookedColor } = useBookingRoomViewModel();

  const navigate = useNavigate();
  return (
    <div className="room-timeslot">
      <div>
        <div className="timeslot-heading">
          <Calendar size={20} />
          <Typography variant="h1">{room?.roomName}</Typography>
          {/* <Typography variant="h1">{room?.capacity}</Typography> */}
        </div>
        <Typography variant="subtitle1" color="text.secondary">
          Tap then drag across time slots to select your booking duration
        </Typography>
      </div>
      <div className="bookRoomActions">
        <MyButton
          variant="contained"
          text="Cancel"
          customVariant="ghost"
          onClick={() => {
            navigate("/meeting-rooms");
          }}
        />
        <MyButton
          variant="contained"
          text="Proceed to Booking"
          customVariant="dark"
          onClick={() => {
            if (slot.startTime === "00:00") {
              toast.error("Select a Time Range ");
              return;
            }
            updateBookingTimeAndDate({
              startTime: slot.startTime,
              endTime: slot.endTime,
              startDate: slot.startDate,
            });
          }}
        />
      </div>
      <div className="cat-legend">
        <i className="cat-dot " style={{ background: PastimeColor }} />
        <span>Past Time</span>
        <i className="cat-dot " style={{ background: bookedColor }} />
        <span>Booked</span>
      </div>

      <TimeSlotSelector onSave={setSlot} calendarView={false} />
    </div>
  );
};

export default RoomTimeslot;
