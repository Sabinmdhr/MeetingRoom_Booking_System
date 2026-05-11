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
import dayjs from "dayjs";

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
          onClick={() => navigate("/upcoming-meetings")}
        />
      </div>

    <div className="dashboard-upmeetings__list">
      {upcomingMeeting.map((m) => (
        <Card className="dashboard-upmeetings__card">
          <CardHeader
            className="dashboard-upmeetings__cardheader"
            title={
              <Typography className="dashboard-upmeetings__meetingtitle">
                {m.meetingTitle}
              </Typography>
            }
            action={
              <Chip
                className="dashboard-upmeetings__chip"
                style={{
                  background: alpha(`rgba${m.meetingType.colorCode}`, 0.8),
                  color: "#fff",
                }}
                label={m.meetingType.name}
              />
            }
          ></CardHeader>
          <CardContent className="dashboard-upmeetings__subheading">
            <div>
              <Typography className="dashboard-upmeetings__title">
                {m.startDate? dayjs(m.startDate).format("D MMM YYYY") : ""},{" "}
                {formatDisplayTime(timeStringToMinutes(m.startTime))} -{" "}
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
      </div>
    </Card>
  );
};

export default DashboardUpMeetings;
