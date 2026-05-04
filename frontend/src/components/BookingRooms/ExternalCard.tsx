import { TextField, Typography } from "@mui/material";
import { UserPlus } from "lucide-react";
import MyButton from "../ui/Button";
import { useAppSelector } from "../../redux/store";
import { useBookingRoomViewModel } from "../../viewmodels/useBookingRoomViewModel";
import { useEffect } from "react";

type ExternalCardProps = {
  onClose: () => void;
};
export const ExternalCard = ({ onClose }: ExternalCardProps) => {
  const bookingRoomState = useAppSelector((state) => state.bookingRoom);

  const {
    externalParticipant,
    handleExternalParticipantsChange,
    handleExternalParticipantsAdd,
    handleExternalCard,
  } = useBookingRoomViewModel();

  // useEffect(() => {
  //   console.log("hey this is external participant", bookingRoomState.externalParticipants);
  // }, [externalParticipant]);
  return (
    <div className="external-members">
      <div className="external-header">
        <UserPlus size={18} />
        <Typography>Add External Member</Typography>
      </div>
      <label htmlFor="externalName">Name</label>
      <TextField
        fullWidth
        id="externalName"
        name="name"
        size="small"
        required
        placeholder="Enter external member name"
        value={externalParticipant.name}
        onChange={handleExternalParticipantsChange}
      />
      <label htmlFor="externalEmail">Email</label>
      <TextField
        fullWidth
        required
        id="externalEmail"
        size="small"
        name="email"
        // className="customTextField"
        placeholder="Enter external member email"
        value={externalParticipant.email}
        onChange={handleExternalParticipantsChange}
      />

      <div className="external-note">
        <Typography>
          <b>Note:</b> External members will be tracked separately in reports
          and won't affect internal dashboard statistics.
        </Typography>
      </div>

      <div className="external-buttons">
        <MyButton
          text="Cancel"
          customVariant="ghost"
          onClick={() => {
            onClose();
          }}
        ></MyButton>
        <MyButton
          text="Add External Member"
          customVariant="dark"
          onClick={() => {
            handleExternalParticipantsAdd();
            onClose();
          }}
          startIcon={<UserPlus size={18} />}
        ></MyButton>
      </div>
    </div>
  );
};
