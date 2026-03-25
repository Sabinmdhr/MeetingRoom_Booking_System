import { Card, CardContent, Typography, Chip } from "@mui/material";
import "../../assets/scss/pages/Announcements.scss";

const AnnouncementCard = ({ item }: any) => {
  return (
    <Card
      className="announcement__card"
      variant="outlined"
    >
      <CardContent>
        <div className="announcement__card-header">
          <Typography
            variant="h4"
            className="announcement__card-title"
          >
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
          {item.date} • By {item.author}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
