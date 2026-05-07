import {
  alpha,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
} from "@mui/material";
import "../../assets/scss/components/Dashboard/DashboardUpMeetings.scss";
import MyButton from "../ui/Button";
import { useMeetingCardViewModel } from "../../viewmodels/useMeeting_roomCardViewModel";
import { formatDisplayTime, timeStringToMinutes } from "../../utils/timeUtils";
import { useNavigate } from "react-router-dom";

const DashboardUpMeetings = () => {
  const navigate = useNavigate();

  const { upcomingMeeting } = useMeetingCardViewModel();
  return (
    <Card className="dashboard-upmeetings">
      <div className="dashboard-announcements__top">
        <Typography variant="h3">Upcoming Meetings</Typography>
        <MyButton
          text="View All"
          customVariant="ghost"
          size="small"
          onClick={() => navigate("/calendar")}
        />
      </div>

      {upcomingMeeting.map((m) => (
        <Card className="dashboard-upmeetings__card">
          <CardHeader
            className="dashboard-upmeetings__cardheader"
            title={
              <Typography className="dashboard-upmeetings__cardheader__meetingtitle">
                {m.meetingTitle}
              </Typography>
            }
            action={
              <Chip
                style={{
                  background: alpha(`rgba${m.meetingType.colorCode}`, 0.8),
                  color: "#fff",
                }}
                label={m.meetingType.name}
                className="dashboard-upmeetings__chip"
              />
            }
          ></CardHeader>
          <CardContent className="dashboard-upmeetings__subheading">
            <div>
              <Typography className="dashboard-upmeetings__title">
                {m.startDate},{" "}
                {formatDisplayTime(timeStringToMinutes(m.startTime))} -{" "}
                {formatDisplayTime(timeStringToMinutes(m.endTime))}
              </Typography>
              <Typography className="dashboard-upmeetings__subtitle">
                By: {m.roomBooker.firstName} {m.roomBooker.lastName}
              </Typography>
              {/* <Typography className="dashboard-upmeetings__participants"><Users size={14} />
                {(m.internalParticipant?.length || 0) + (m.externalParticipant?.length || 0)} Participants
              </Typography> */}
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
    </Card>
  );
};

export default DashboardUpMeetings;
