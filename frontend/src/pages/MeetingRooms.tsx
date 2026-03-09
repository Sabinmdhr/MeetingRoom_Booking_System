import { Meeting_roomCard } from "../components/Meeting-Rooms/Meeting_roomCard";
import "../assets/scss/pages/MeetingRooms.scss";
import { Card, CardContent, CardHeader, CircularProgress } from "@mui/material";
import { useMeetingCardViewModel } from "../viewmodels/useMeeting_roomCardViewModel";

const MeetingRooms = () => {
  const { loading } = useMeetingCardViewModel("1");
  if (loading) return <CircularProgress />;
  return (
    <div>
      <Card>
        <CardHeader title="Meeting Rooms" />
        <CardContent className="MeetingRooms">
          <Meeting_roomCard meetingId="1" />
          <Meeting_roomCard meetingId="2" />
          <Meeting_roomCard meetingId="3" />
          <Meeting_roomCard meetingId="3" />
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingRooms;
