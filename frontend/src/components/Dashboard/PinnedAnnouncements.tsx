import { Card, CardContent, Divider, Typography } from "@mui/material";
import AnnouncementCard from "../Announcements/AnnouncementCard";
import { Pin } from "lucide-react";

const PinnedAnnouncements = ({ data }: { data: any[] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Card
        className="announcement"
        variant="outlined"
      >
        <CardContent>
          <div className="announcement__title">
            <Pin size={18} />
            <Typography variant="h3">Pinned Announcements</Typography>
          </div>
          <Divider
            className="announcement__divider"
            sx={{ my: 1 }}
          />
          <Typography className="announcement__empty">
            No pinned announcements.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className="announcement"
      variant="outlined"
    >
      <CardContent>
        <div className="announcement__title">
          <Pin size={18} />
          <Typography variant="h3">
            Pinned Announcements ({data.length})
          </Typography>
        </div>
        <Divider
          className="announcement__divider"
          sx={{ my: 1 }}
        />
        <div className="announcement__list">
          {data.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              onDelete={() => {}}
              onUpdate={() => {}}
              selectionMode={false}
              selected={false}
              onSelect={() => {}}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
