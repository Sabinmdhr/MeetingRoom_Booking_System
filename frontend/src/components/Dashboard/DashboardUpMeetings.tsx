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
      <Typography className="dashboard-upmeetings__heading" variant="h3">
        Upcoming Meetings
      </Typography>
      <div className="dashboard-upmeetings__list">
      {upcomingMeeting.map((m) => (
        <Card className="dashboard-upmeetings__card">
          <CardHeader
            className="dashboard-upmeetings__cardheader"
            title={
              <Typography variant="h4">
                {m.meetingTitle}
              </Typography>
            }
            action={
              <Chip
                style={{ color: `rgb${m.meetingType.colorCode}` }}
                label={m.meetingType.name}
                className="dashboard-upmeetings__chip"
              />
            }
          ></CardHeader>
          <CardContent className="dashboard-upmeetings__subheading">
            <div>
              <Typography className="dashboard-upmeetings__title" variant="body2">
                {m.startDate}, {formatDisplayTime(timeStringToMinutes(m.startTime))} - {" "}
                {formatDisplayTime(timeStringToMinutes(m.endTime))}
              </Typography>
              <Typography className="dashboard-upmeetings__subtitle" variant="body2">
                By: {m.roomBooker.firstName} {m.roomBooker.lastName}
              </Typography>
              {/* <Typography className="dashboard-upmeetings__participants"><Users size={14} />
                {(m.internalParticipant?.length || 0) + (m.externalParticipant?.length || 0)} Participants
              </Typography> */}
            </div>
            <div>
              <Typography className="dashboard-upmeetings__title" variant="body2">
                Room:
              </Typography>
              <Typography className="dashboard-upmeetings__subtitle" variant="body2">
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
      </div>
    </Card>
  );
};

export default DashboardUpMeetings;
