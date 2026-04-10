import { Button, Card,Grid, CardActions, CardContent, Menu, MenuItem, Typography } from "@mui/material";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import "../../assets/scss/components/Meeting_roomCard.scss";
import "../../assets/scss/global.scss";
import { deleteMeetingRoom } from "../../services/Meetinf_room.service";
import { Projector, Presentation, TvMinimal, Wifi, Ellipsis, Pen, Trash2 } from "lucide-react";
// import { Meeting_roomCardDetails } from "./Meeting_roomCard-Details";
import { useState } from "react";
import { useAddRoomViewModel } from "../../viewmodels/useAddRoomViewModel";
import type { meeting_rooms } from "../../models/Meeting_room.model";
// interface MeetingCardProps {
//   meetingId: string;
// }
type props = {
  roomFormState: {
    open: boolean;
    mode: "add" | "edit";
    room: meeting_rooms | null;
  };
  handleRoomFormOpen: (mode: "add" | "edit", room?: meeting_rooms) => void;
};
export const Meeting_roomCard = ({
  roomFormState,
  handleRoomFormOpen,
}: props) => {
  // const [open , setOpen] = useState(false)
  const { meeting, error, selectedRoom, setSelectedRoom } =
    useMeetingCardViewModel();
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
    <div className="room-Card--Container">
      {meeting.map((m) => {
        return (
          // <Grid size={6} key={m.id}>
          <Card className="Meeting-Card">
            <CardContent className="Meeting-Card--content">
              <div>
                <div className="cardHeader">
                  <Typography className="Meeting-title" variant="h6">
                    {m.roomName}
                  </Typography>

                  <Typography className="Meeting_room-Available Available">
                    Available
                  </Typography>
                </div>

                <div className="TimeCapacity">
                  <Typography className="Time">
                    {" "}
                    Next Open slot: 4:00 PM
                  </Typography>

                  <Typography className="Capacity">
                    Capacity: {m.capacity}
                  </Typography>
                </div>

                <Typography variant="body2" className="Features-Tabs">
                  {m.resources.map((feature, index) => (
                    <span className="Meeitng_room-Feature" key={index}>
                      <span className="Feature-icons">
                        {featureIcons[feature]}
                      </span>
                      <span className="Feature-title">{feature}</span>
                    </span>
                  ))}
                </Typography>
              </div>
            </CardContent>

            <CardActions className="Meeting-Card--Actions">
              <Button
                className="Meeting_room-Book Available"
                onClick={() => setOpenDetails(true)}
              >
                Book Now
              </Button>
              <Button onClick={() => handleRoomFormOpen("edit", m)}>
                <Pen size={18} />
              </Button>

              <Button>
                <Trash2 size={18} color="red" onClick={()=> deleteMeetingRoom(m.id)}/>
              </Button>
            </CardActions>
          </Card>
          // </Grid>
        );
      })}
    </div>
  );
};
