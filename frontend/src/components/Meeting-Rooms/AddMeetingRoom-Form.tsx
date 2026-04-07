import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useAddRoomViewModel } from "../../viewmodels/useAddRoomViewModel";
import { Plus } from "lucide-react";
import "../../assets/scss/components/AddMeetingRoom-Form.scss";
import { useEffect } from "react";
import type {
  meeting_rooms,
} from "../../models/meeting_room.model";

type props = {
  roomFormState: {
    open: boolean;
    mode: "add" | "edit";
    room: meeting_rooms | null;
  };
  handleRoomFormOpen: (mode: "add" | "edit", room?: meeting_rooms) => void;
  handleRoomFormClose: () => void;
};
export const AddMeetingRoomForm = ({
  roomFormState,
  handleRoomFormOpen,
  handleRoomFormClose,
}: props) => {
  // const { handleClose } = useAddRoomViewModel();
  // const { isEditOpen } = useAppSelector((state) => state.meetingRoom);

  const {
    addRoomFormData,
    setAddRoomFormData,
    handleChange,
    handleCheckboxChange,
    submitAddRomForm,
  } = useAddRoomViewModel();
  // const {
  //   addMeetingFormData,
  //   setAddMeetingFormData,
  //   selectedRoom,
  //   setSelectedRoom,
  //   setRoomFormState,
  //   handleRoomFormOpen,
  // } = useMeetingCardViewModel();
  useEffect(() => {
    if (roomFormState.mode === "edit" && roomFormState.room) {
      setAddRoomFormData({
        // id: roomFormState.room.id,
        roomName: roomFormState.room.roomName,
        capacity: roomFormState.room.capacity,
        resources: roomFormState.room.resources,
      });
    } else {
      setAddRoomFormData({
        // id: "",
        roomName: "",
        capacity: 0,
        resources: [],
      });
    }
  }, [roomFormState.room]);

  return (
    <div className="add-Form">
      <Button
        className="add-btn"
        variant="outlined"
        onClick={() => handleRoomFormOpen("add")}
      >
        <Plus size={14} /> Add Room
      </Button>

      <Dialog
        open={roomFormState.open}
        maxWidth="sm"
        fullWidth
        onClose={() => handleRoomFormClose()}
        // onClose={() => setOpen((prev) => (prev = !prev))}
        slotProps={{ paper: { className: "Form__Container" } }}
      >
        <DialogTitle className="title">Create a New Room</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            {/* TextFields */}

            <label htmlFor="roomName">Room Name</label>
            <TextField
              fullWidth
              id="roomName"
              name="roomName"
              placeholder="Room Name"
              className="customTextField"
              value={addRoomFormData.roomName}
              onChange={handleChange}
            />

            <label htmlFor="capacity">Capacity</label>
            <TextField
              fullWidth
              id="capacity"
              name="capacity"
              // type="number"
              placeholder="Number of People"
              className="customTextField"
              value={addRoomFormData.capacity}
              onChange={handleChange}
            />

            {/* Checkboxes in 2 columns */}
            <FormGroup>
              <Grid container>
                <Grid size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="WIFI"
                        onChange={handleCheckboxChange}
                        checked={addRoomFormData.resources.includes("WIFI")}
                      />
                    }
                    label="WIFI"
                  />
                </Grid>
                <Grid size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="PROJECTOR"
                        onChange={handleCheckboxChange}
                        checked={addRoomFormData.resources.includes(
                          "PROJECTOR",
                        )}
                      />
                    }
                    label="Projector"
                  />
                </Grid>
                <Grid size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="WHITEBOARD"
                        onChange={handleCheckboxChange}
                        checked={addRoomFormData.resources.includes(
                          "WHITEBOARD",
                        )}
                      />
                    }
                    label="Whiteboard"
                  />
                </Grid>
                <Grid size={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="VIDEO CONFERENCE"
                        onChange={handleCheckboxChange}
                        checked={addRoomFormData.resources.includes(
                          "VIDEO CONFERENCE",
                        )}
                      />
                    }
                    label="Video Conference"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              submitAddRomForm();
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
