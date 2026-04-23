import {
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import "../../assets/scss/components/Meeting_roomCard.scss";
import "../../assets/scss/global.scss";
import { deleteMeetingRoom } from "../../services/Meetinf_room.service";
import {
  Projector,
  Presentation,
  TvMinimal,
  Wifi,
  Ellipsis,
  Pen,
  Trash2,
} from "lucide-react";
// import { Meeting_roomCardDetails } from "./Meeting_roomCard-Details";
import type { meeting_rooms } from "../../models/meeting_room.model";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBookingRoomFormData } from "../../redux/bookRoomSlice";
// interface MeetingCardProps {
//   meetingId: string;
// }
import { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";
import MyButton from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { permissions } from "../../utils/permissions";

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
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  // const [open , setOpen] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meeting, error, selectedRoom, setSelectedRoom } =
    useMeetingCardViewModel();
  const { role } = useAuth();
  const perms = permissions[role as keyof typeof permissions];
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

  const handleDeleteClick = (id: number) => {
    setSelectedRoomId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedRoomId !== null) {
      await deleteMeetingRoom(selectedRoomId);
      setOpenConfirm(false);
      setSelectedRoomId(null);
    }
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
                  <Typography
                    className="Meeting-title"
                    variant="h6"
                  >
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

                <Typography
                  variant="body2"
                  className="Features-Tabs"
                >
                  {m.resources.map((feature, index) => (
                    <span
                      className="Meeitng_room-Feature"
                      key={index}
                    >
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
              <MyButton
                text="Book Now"
                className="Meeting_room-Book Available"
                variant="outlined"
                customVariant="dark"
                onClick={() => {
                  navigate("/room-timeslot", { state: { room: m } });
                  dispatch(updateBookingRoomFormData({ roomId: m.id }));
                }}
              />
              {perms?.canManageRooms && (
                <>
                  <MyButton
                    startIcon={<Pen size={18} style={{ marginLeft: "5px" }} />}
                    text=""
                    customVariant="ghost"
                    onClick={() => handleRoomFormOpen("edit", m)}
                  />
                  <MyButton
                    text=""
                    customVariant="ghost"
                    startIcon={
                      <Trash2
                        size={18}
                        color="red"
                        style={{ marginLeft: "5px" }}
                      />
                    }
                    onClick={() => handleDeleteClick(m.id)}
                  />
                </>
              )}
            </CardActions>
          </Card>
          // </Grid>
        );
      })}

      <ConfirmDialog
        open={openConfirm}
        title="Delete Meeting Room"
        content="Are you sure you want to delete this room?"
        text="Delete"
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setOpenConfirm(false);
          setSelectedRoomId(null);
        }}
      />
    </div>
  );
};
