import { Card, Typography, Chip, Stack, Box } from "@mui/material";
import type { Meeting_room } from "../../models/Meeting_room.model";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import "../../assets/scss/pages/RoomDetailsCard.scss";
import { Presentation, Projector, TvMinimal, Wifi } from "lucide-react";

interface RoomDetailsCardProps {
  room: Meeting_room | null;
}

const featureIcons: Record<string, any> ={
  "Projector": <Projector size={12} />,
    "Whiteboard": <Presentation size={12} />,
    "Video Conferencing": <TvMinimal size={12} />,
    "Wi-Fi": <Wifi size={12} />,
}

const RoomDetailsCard = ({ room }: RoomDetailsCardProps) => {
  if (!room) return null;

  return (
    <Card
      sx={{
        mt: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: "none",
        border: "3px solid",
        borderColor: "divider",
        bgcolor: "#F3F3F5",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <LocationOnOutlinedIcon sx={{mb: 2 }}/>
        <Typography variant="h6" sx={{mb: 2 , fontSize: 17, fontWeight: 600 }}>
          Room Details
        </Typography>
      </Box>
      <Box className="room-box">
      <Typography variant="body2" sx={{color:'grey'}}>Room Name</Typography>
      <Typography variant="body2" fontWeight="bold">
        {room.title}
      </Typography>
      </Box>
      <Box className="room-box" sx={{mt:1}}>
      <Typography variant="body2" sx={{color:'grey'}}>
        Capacity 
      </Typography>
      <Typography variant="body2" fontWeight="bold" sx={{display:"flex", justifyContent:"center",}}>
        <PeopleAltOutlinedIcon  />
        <div style={{ marginTop:"4px"}}> {room.capacity} people</div>
       
      </Typography>
      </Box>
      <hr />
      <Typography variant="body2" sx={{ mt:1, mb:1, fontSize: 14, fontWeight: 600, color:'grey'}}>
        AVAILABLE RESOURCES
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {room.features.map((feature) => (
          <Chip key={feature} label={feature} icon={featureIcons[feature]} size="small" />
        ))}
      </Stack>
    </Card>
  )
}

export default RoomDetailsCard;
