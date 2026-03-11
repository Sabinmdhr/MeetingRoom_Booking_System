import {  Dialog, DialogContent,  DialogTitle, Typography, } from "@mui/material";
import TimeSlotsCard from "../Meeting-Rooms/TimeSlotsCard"
import { Calendar, Users, X} from "lucide-react";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import "../../assets/scss/components/Meeting_roomCard-Details.scss";

 interface Meeting_roomCardDetailsProps {
  meetingId: string;
  open: boolean;
  onClose: () => void;
}

export const Meeting_roomCardDetails = ({ meetingId, open, onClose }: Meeting_roomCardDetailsProps) => {
    const { meeting } = useMeetingCardViewModel(meetingId);

    // if (loading) return <CircularProgress />;
    // if (error) return <div>Error: {error}</div>;
    if (!meeting) return ;

    return (
      <div>
        <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
          <DialogTitle className="meeting_room-title">
            <div className="title-left">
              <div className="title">
                <Calendar size={18} />
                {meeting.title}
              </div>
              <div className="desc">
                <p>Select an available time slot for your meeting.</p>
              </div>
            </div>
            <X onClick={onClose} />
          </DialogTitle>
          <DialogContent className="container">
            <div className="meeting_room-status">
              <div className="left">
                <Users size={18} />
                <p>
                  Capacity <br /> <b>{meeting.capacity} peoples</b>
                </p>
              </div>
              <div
                className={`right ${meeting.available ? "available" : "booked"}`}
              >
                <span>{meeting.available ? "Available Now" : "Booked"}</span>
              </div>
            </div>
            <div className="timeSlots">
              <Typography>TODAY'S SCHEDULE</Typography>
              <TimeSlotsCard/>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
}