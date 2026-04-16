import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// import { useState } from "react";
import "../../assets/scss/components/Dashboard/DashboardCard.scss";

function DashboardCard({ cards }: any) {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <Typography variant="h1">Dashboard Overview</Typography>
        <Typography variant="subtitle1">
          Welcome back (username) ! Here's what's happening with your meeting
          rooms.
        </Typography>
      </div>

      <Box className="dashboard__grid">
        {cards.map((card: any, index: any) => (
          <Card
            key={card.id}
            className={`dashboard__card dashboard__card--${index}`}
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
                {card.number}
              </Typography>
              <Typography
                variant="subtitle1"
                className="dashboard__card-text"
              >
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
}

export default DashboardCard;
