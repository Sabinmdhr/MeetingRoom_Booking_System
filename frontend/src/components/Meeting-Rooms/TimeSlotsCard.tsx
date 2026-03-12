import { Card, CardContent, Typography, Button } from "@mui/material";
import { useTimeSlotsViewModel } from "../../viewmodels/useTimeSlotsViewModel";
import { Clock } from "lucide-react";
import "../../assets/scss/components/TimeSlotsCard.scss"
import "../../assets/scss/global.scss"

const TimeSlotSelector = ({roomId}: {roomId:string}) => {
  const { slots, selectedSlot, selectSlot, confirmBooking } =
    useTimeSlotsViewModel(roomId);

  return (
    <>
      <div className="Slot-Container">
        {slots.map((slot) => (
          <Card
            key={slot.id}
            onClick={() =>  selectSlot(slot.id)}
            className={`Time-Card
            ${selectedSlot === slot.id ? `Selected`: ``}
             ${slot.available ? `Available` : `Booked`}`}
          >
            <CardContent sx={{ p: 1 }} className="Card-Container">
              <Typography variant="body2" className="Time">
                <Clock size={16} />
                <span>{slot.time}</span>
              </Typography>
              {slot.available && <Typography variant="body2">Open</Typography>}

              {!slot.available && (
                <Typography variant="body2">Booked</Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        disabled={!selectedSlot}
        onClick={confirmBooking}
      >
        Confirm Booking
      </Button>
    </>
  );
};

export default TimeSlotSelector;
