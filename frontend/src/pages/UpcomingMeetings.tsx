import {
  Card,
  FormControl,
  MenuItem,
  Select,
  Typography,
  CardContent,
  CardHeader,
  Chip,
  alpha,
} from "@mui/material";
import "../assets/scss/pages/UpcomingMeetings.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { permissions } from "../utils/permissions";
import { useMeetingCardViewModel } from "../viewmodels/useMeeting_roomCardViewModel";
import { formatDisplayTime, timeStringToMinutes } from "../utils/timeUtils";
import dayjs from "dayjs";

const UpcomingMeeting = () => {
  const { allUpcomingMeeting, historyMode, setHistoryMode } =
    useMeetingCardViewModel();
  const { role } = useAuth();
  const perms = permissions[role as keyof typeof permissions];

  // const [filterClick, setFilterClick] = useState(false);

  return (
    <div className="upmeetings__main">
      <div className="upmeetings__title-wrapper">
        <div className="upmeetings__title">
          <Typography variant="h1">Upcoming Meetings</Typography>
          <Typography variant="subtitle1" className="upmeetings__subtitle">
            View your upcoming meetings and stay on schedule.
          </Typography>
        </div>
      </div>
      <Card className="upmeetings">
        {perms.canMannageAnnouncements && (
          <div className="upmeetings__dropdown">
            <Typography variant="h6">
              {historyMode ? "Self Meetings" : "All Upcoming Meetings"}
            </Typography>

            <FormControl size="small" sx={{ minWidth: 125 }}>
              <Select
                className="customTextField"
                value={historyMode ? "Self" : "All"}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "Self") {
                    setHistoryMode(true);
                    //   fetchScheduledAnnouncement();
                  } else {
                    setHistoryMode(false);
                  }
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Self">Self</MenuItem>
              </Select>
            </FormControl>
          </div>
        )}
        <div className="upcoming-meetings">
          {allUpcomingMeeting.map((m) => (
            <Card className="upcoming-meetings__card">
              <CardHeader
                className="upcoming-meetings__cardheader"
                title={
                  <Typography className="upcoming-meetings__meetingtitle">
                    {m.meetingTitle}
                  </Typography>
                }
                action={
                  <Chip
                    className="upcoming-meetings__chip"
                    style={{
                      background: `rgba(${m.meetingType.colorCode.match(/\((.*?)\)/)?.[1]}, 0.8)`,
                      color: "#fff",
                    }}
                    label={m.meetingType.name}
                  />
                }
              ></CardHeader>
              <CardContent className="upcoming-meetings__subheading">
                <div>
                  <Typography className="upcoming-meetings__title">
                    {m.startDate ? dayjs(m.startDate).format("D MMM YYYY") : ""}
                    , {formatDisplayTime(timeStringToMinutes(m.startTime))} -{" "}
                    {formatDisplayTime(timeStringToMinutes(m.endTime))}
                  </Typography>
                  <Typography
                    className="upcoming-meetings__subtitle"
                    variant="body2"
                  >
                    By: {m.roomBooker.firstName} {m.roomBooker.lastName}
                  </Typography>
                </div>
                <div>
                  <Typography
                    className="upcoming-meetings__title"
                    variant="body2"
                  >
                    Room:
                  </Typography>
                  <Typography
                    className="upcoming-meetings__subtitle"
                    variant="body2"
                  >
                    {m.room?.roomName}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UpcomingMeeting;
