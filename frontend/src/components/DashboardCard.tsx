import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Building2 } from "lucide-react";
import { Calendar } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "Total Rooms",
    description: "Total number of rooms available.",
    icon: <Building2 />,
  },
  {
    id: 2,
    title: "Today's Meetings",
    description: "Number of meetings scheduled for today.",
    icon: <Calendar />,
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography
                variant="h5"
                component="div"
              >
                {card.icon} {card.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;
