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
import { Plus, Vault, X } from "lucide-react";
import "../../assets/scss/components/AddMeetingRoom-Form.scss"
export const AddMeetingRoomForm = () => {
  // const { handleClose } = useAddRoomViewModel();
  // const { isEditOpen } = useAppSelector((state) => state.meetingRoom);

  const {
    openAddRoomForm,
    addRoomFormData,
    handleChange,
    handleCheckboxChange,
    setOpenAddRoomForm,
    submitAddRomForm
  } = useAddRoomViewModel();

  return (
    <div className="add-Form">
      <Button
        className="add-btn"
        variant="outlined"
        onClick={() => setOpenAddRoomForm((prev) => (prev = !prev))}
      >
        <Plus size={14} /> Add Room
      </Button>

      <Dialog
        open={openAddRoomForm}
        maxWidth="sm"
        fullWidth
        onClose={() => setOpenAddRoomForm((prev) => (prev = !prev))}
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
          <Button variant="contained" onClick={submitAddRomForm}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
