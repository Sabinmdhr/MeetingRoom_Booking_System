import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimeSlotSelector from "../Meeting-Rooms/TimeSlotsCard"

type SelectTimeCardProps = {
  open: boolean;
  onClose: () => void;
  type: "start" | "end" | null;
  meetingId: string;
};

const SelectTimeCard = ({
  open,
  onClose,
  type,
  meetingId
}: SelectTimeCardProps) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <AccessTimeIcon />

      <DialogTitle>
        {type === "start" ? "Select Start Time" : "Select End Time"}
      </DialogTitle>

      <DialogContent>
        <TimeSlotSelector roomId={meetingId} />
      </DialogContent>

      <Button onClick={onClose}>Cancel</Button>
      <Button>Confirm Selection</Button>
    </Dialog>
  )
}

export default SelectTimeCard;
