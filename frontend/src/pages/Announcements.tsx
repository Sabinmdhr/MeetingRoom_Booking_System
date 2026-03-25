import {
  Button,
  Card,
  CardContent,
  Typography,
  // Chip,
  Divider,
} from "@mui/material";
import { CircleAlert, Megaphone, Pin } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import "../assets/scss/global.scss";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";

const Announcements = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const date = new Date().toDateString();

  const [announcements] = useState([
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
      date,
      priority: "High Priority",
      isNew: true,
      isPinned: true,
      author: "Shristi Yakami (Frontend Intern)",
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
      date,
      isNew: true,
      isPinned: false,
      author: "Sabin Manandhar (Frontend Intern)",
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
      date,
      isNew: false,
      isPinned: false,
      author: "Sushant Basnet (Frontend Intern)",
    },
  ]);

  const pinned = announcements.filter((a) => a.isPinned);
  const others = announcements.filter((a) => !a.isPinned);

  return (
    <div className="announcement__main">
      <Card className="announcement">
        {/* Header */}
        <CardContent className="announcement__header">
          <div className="announcement__title-wrapper">
            <div className="announcement__title">
              <Megaphone size={20} />
              <Typography variant="h1"> Announcements</Typography>
            </div>
            <Typography
              variant="subtitle1"
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

        {/* Content */}
        <div className="announcement__content">
          <div className="announcement__section">
            <Typography
              className="announcement__content-title"
              variant="h3"
            >
              <span className="announcement__title-flex">
                <Pin size={18} />
                Pinned Announcements ({pinned.length})
              </span>
            </Typography>

            <Divider className="announcement__divider" />

            <CardContent className="announcement__list">
              {pinned.map((item, index) => (
                <AnnouncementCard
                  key={index}
                  item={item}
                />
              ))}
            </CardContent>
          </div>

          <div className="announcement__section">
            <Typography
              className="announcement__content-title"
              variant="h3"
            >
              <span className="announcement__title-flex">
                <Megaphone size={18} />
                All Announcements ({others.length})
              </span>{" "}
            </Typography>

            <Divider className="announcement__divider" />

            <CardContent className="announcement__list">
              {others.map((item, index) => (
                <AnnouncementCard
                  key={index}
                  item={item}
                />
              ))}
            </CardContent>
          </div>
        </div>
      </Card>

      <AnnouncementModal
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Announcements;
