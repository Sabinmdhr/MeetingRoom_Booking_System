import { Card, CardContent, CardHeader, Chip, Typography } from "@mui/material";
import "../../assets/scss/components/Dashboard/DashboardUpMeetings.scss";
import MyButton from "../ui/Button";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import { formatDisplayTime, timeStringToMinutes } from "../../utils/timeUtils";
import { Users } from "lucide-react";

const DashboardUpMeetings = () => {
  const { upcomingMeeting } = useMeetingCardViewModel();
  return (
    <Card className="dashboard-upmeetings">
      <Typography className="dashboard-upmeetings__heading">
        Upcoming Meetings
      </Typography>
      {upcomingMeeting.map((m) => (
        <Card className="dashboard-upmeetings__card">
          <CardHeader
            className="dashboard-upmeetings__cardheader"
            title={
              <Typography className="dashboard-upmeetings__cardheader__meetingtitle">
                {m}
              </Typography>
            }
            action={
              <Chip
                style={{ color: `rgb(${m.meetingType.colorCode})` }}
                label={m.meetingType.name}
                className="dashboard-upmeetings__chip"
              />
            }
          ></CardHeader>
          <CardContent className="dashboard-upmeetings__subheading">
            <div>
              <Typography className="dashboard-upmeetings__title">
                {m.date},{formatDisplayTime(timeStringToMinutes(m.startTime))} -{" "}
                {formatDisplayTime(timeStringToMinutes(m.endTime))}
              </Typography>
              <Typography className="dashboard-upmeetings__subtitle">
                By: {m.roomBooker.firstName} {m.roomBooker.lastName}
              </Typography>
              <Typography className="dashboard-upmeetings__participants"><Users size={14} />
                {(m.internalParticipant?.length || 0) + (m.externalParticipant?.length || 0)} Participants
              </Typography>
            </div>
            <div>
              <Typography className="dashboard-upmeetings__title">
                Room:
              </Typography>
              <Typography className="dashboard-upmeetings__subtitle">
                {m.room?.roomName}
              </Typography>
              
            </div>
          </CardContent>
        </Card>
      ))}

      {/* <MyButton
        variant="outlined"
        fullWidth
        text="View Details"
        customVariant="ghost"
        onClick={() => {}}
      /> */}
    </Card>
  );
};

export default DashboardUpMeetings;
