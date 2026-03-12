import { Box, Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type SeclectTimeCardProps = {
  open: boolean;
  onClose: () => void;
  onSelectTime: (time: string) => void;
  type: "start" | "end" | null;
  startTime?: string;
};

const times = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
];

const SelectTimeCard = ({
  open,
  onClose,
  onSelectTime,
  type,
  startTime,
}: SeclectTimeCardProps) => {
  const handleClick = (time: string) => {
    onSelectTime(time);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <AccessTimeIcon />
      <DialogTitle>Select Start Time - Room Availability</DialogTitle>
      <DialogContent>
        <Box
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          gap={2}
          mt={2}
        >
          {times.map((time) => (
            <Button
              key={time}
              variant="outlined"
              onClick={() => handleClick(time)}
            >
              {time}
            </Button>
          ))}
        </Box>
      </DialogContent>
      <Button onClick={onClose}>Cancel</Button>
      <Button>Confirm Selection</Button>
    </Dialog>
  );
};

export default SelectTimeCard;
