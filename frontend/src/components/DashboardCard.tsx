import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Building2, Calendar } from "lucide-react";
import { useState } from "react";
import "../assets/scss/pages/DashboardCard.scss";

const cards = [
  {
    id: 1,
    title: "Total Rooms",
    description: "Total number of rooms available.",
    icon: <Building2 size={22} />,
  },
  {
    id: 2,
    title: "Today's Meetings",
    description: "Number of meetings scheduled for today.",
    icon: <Calendar size={22} />,
  },
];

function SelectActionCard() {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your meeting rooms.</p>
      </div>

      <Box className="dashboard__grid">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            className="dashboard__card"
          >
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              className={`dashboard__card-action ${
                selectedCard === index ? "active" : ""
              }`}
            >
              <CardContent className="dashboard__card-content">
                <Typography
                  variant="h6"
                  className="dashboard__card-title"
                >
                  <span className="icon">{card.icon}</span>
                  {card.title}
                </Typography>

                <Typography
                  variant="body2"
                  className="dashboard__card-description"
                >
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default SelectActionCard;
