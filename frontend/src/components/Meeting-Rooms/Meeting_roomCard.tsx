import { Button, Card, CardActions, CardContent, Menu, MenuItem, Typography } from "@mui/material";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import "../../assets/scss/components/Meeting_roomCard.scss";
import "../../assets/scss/global.scss";
import { Projector, Presentation, TvMinimal, Wifi, Ellipsis, Pen, Trash2 } from "lucide-react";
import { Meeting_roomCardDetails } from "./Meeting_roomCard-Details";
import { useState } from "react";
interface MeetingCardProps {
  meetingId: string;
}

export const Meeting_roomCard = ({ meetingId }: MeetingCardProps) => {
  const [open , setOpen] = useState(false)
  const { meeting,  error } = useMeetingCardViewModel(meetingId);
  const [openDetails, setOpenDetails] = useState(false);
  // if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!meeting) return null;
  // object for icons of features
  const featureIcons: Record<string, any> = {
    Projector: <Projector size={12} />,
    Whiteboard: <Presentation size={12} />,
    "Video Conferencing": <TvMinimal size={12} />,
    "Wi-Fi": <Wifi size={12} />,
  };

  return (
    <div>
      <Card className="Meeting-Card">
        <CardContent className="Meeting-Card--content">
          <div>
            <div className="cardHeader">
              <Typography className="Meeting-title" variant="h6">
                {meeting.title}
              </Typography>
              <Typography
                className={`Meeting_room-Available ${meeting.available ? "Available" : "Unavailable"}`}
              >
                {meeting.available ? "Available" : "Booked"}
              </Typography>
            </div>
            <div className="TimeCapacity">
              {meeting.available && (
                <Typography className="Time">
                  Next Booking: {meeting.next_available_time || "Not Scheduled"}
                </Typography>
              )}
              {!meeting.available && (
                <Typography className="Time">
                  Next Open slot: {meeting.next_booking_time || "Not Scheduled"}
                </Typography>
              )}
              <Typography className="Capacity">
                Capacity: {meeting.capacity}
              </Typography>
            </div>
            <Typography variant="body2" className="Features-Tabs">
              {meeting.features.map((feature, index) => (
                <span className="Meeitng_room-Feature" key={index}>
                  <span className="Feature-icons">{featureIcons[feature]}</span>
                  <span className="Feature-title">{feature}</span>
                </span>
              ))}
            </Typography>
          </div>
        </CardContent>

        <CardActions className="Meeting-Card--Actions">
          <Button
            className={`Meeting_room-Book ${meeting.available ? "Available" : "Unavailable"}`}
            onClick={() => setOpenDetails(true)}
          >
            {meeting.available ? "Book Now" : "View Schedule"}
          </Button>
          <div className="Meeting-card-editbtns">
            <Button>

              <Pen size={18} />
            </Button>
            <Button>

              <Trash2 size={18} color="red" />
            </Button>
          </div>
        </CardActions>
      </Card>

      <Meeting_roomCardDetails
        meetingId={meetingId}
        open={openDetails}
        onClose={() => setOpenDetails(false)}
      />
    </div>
  );
};
