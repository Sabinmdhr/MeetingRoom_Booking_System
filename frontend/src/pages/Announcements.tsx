import { Button, Card, CardContent, Typography, Chip } from "@mui/material";
import { CircleAlert, Megaphone } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/AnnouncementModal";
import "../assets/scss/global.scss";

const announcements = [
  {
    icon: (
      <CircleAlert
        size={22}
        color="red"
      />
    ),
    title: "System Maintenance Scheduled",
    description:
      "The meeting room booking system will undergo maintenance on Feb 15, 2026 from 2:00 AM to 4:00 AM. Please plan your bookings accordingly.",
    date: "Feb 7, 2026",
    priority: "High Priority",
    isNew: true,
  },
  {
    icon: (
      <Megaphone
        size={22}
        color="purple"
      />
    ),
    title: "New Conference Room Available",
    description:
      "Board Room 5A is now available for booking. It features state-of-the-art video conferencing equipment and can accommodate up to 20 people.",
    date: "Feb 6, 2026",
    isNew: true,
  },
  {
    icon: (
      <Megaphone
        size={22}
        color="purple"
      />
    ),
    title: "Updated Booking Policy",
    description:
      "Please review the updated meeting room booking policy. Maximum booking duration is now 4 hours per session.",
    date: "Feb 5, 2026",
  },
];

const Announcements = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="announcement__main">
      <Card className="announcement">
        {/* Main Card Header */}
        <CardContent className="announcement__header">
          <div className="announcement__title-wrapper">
            <div className="announcement__title">
              <Megaphone size={20} />
              <Typography variant="h5">Announcements</Typography>
            </div>
            <Typography
              variant="body2"
              className="announcement__subtitle"
            >
              Stay updated with company-wide communications and important
              notices
            </Typography>
          </div>

          <Button
            variant="contained"
            className="announcement__button"
            onClick={handleOpen}
          >
            + New Announcement
          </Button>
        </CardContent>

        {/* Announcement List */}
        <CardContent className="announcement__list">
          {announcements.map((item, index) => (
            <Card
              key={index}
              className="announcement__card"
              variant="outlined"
            >
              <CardContent>
                <div className="announcement__card-header">
                  <Typography
                    variant="subtitle1"
                    className="announcement__card-title"
                  >
                    {/* <CircleAlert
                      size={18}
                      className="announcement__card-title__icon"
                    /> */}
                    {item.icon}
                    {item.title}
                  </Typography>

                  <div className="announcement__tags">
                    {item.priority && (
                      <Chip
                        label={item.priority}
                        className="chip__one"
                        size="small"
                      />
                    )}
                    {item.isNew && (
                      <Chip
                        label="New"
                        className="chip__two"
                        size="small"
                      />
                    )}
                  </div>
                </div>

                <Typography
                  variant="body2"
                  className="announcement__description"
                >
                  {item.description}
                </Typography>

                <Typography
                  variant="caption"
                  className="announcement__date"
                >
                  {item.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <AnnouncementModal
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Announcements;
