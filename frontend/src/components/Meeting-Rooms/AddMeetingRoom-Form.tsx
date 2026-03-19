import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@mui/material";
import { useAddRoomViewModel } from "../../viewmodels/useAddRoomViewModel";
import { Plus, X } from "lucide-react";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";

export const AddMeetingRoomForm = () => {
  const { handleClose } = useAddRoomViewModel();
const {isEditOpen} = useAppSelector ((state) => state.meetingRoom)


  return (
    <>
      <Button className="add-btn" variant="outlined" onClick={handleClose}>
        <Plus size={14} /> Add Room
      </Button>

      {isEditOpen && (
        <Card className="Form__Container">
          <CardHeader
          className="title"
            title="Add Room"
            action={<X size={18} onClick={handleClose} />}
          ></CardHeader>
          <CardContent>
            <Grid container spacing={2} mt={2}>
              <Grid size={6}>
                <label htmlFor="RoomName ">Room-Name</label>
                <TextField
                  id="RoomName"
                  className="customTextField"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid size={6}>
                <label htmlFor="RoomName ">Room-Name</label>
                <TextField
                  id="RoomName"
                  className="customTextField"
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <label htmlFor="">Resource</label>
              <Grid size={6}>
                
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={handleClose} variant="outlined" className="cancel-btn">Cancel</Button>

          </CardActions>
        </Card>
      )}
    </>
  );
};
