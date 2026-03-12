import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
import { Plus, X } from "lucide-react";
import "../../assets/scss/global.scss";
import "../../assets/scss/components/AddParticipants-Form.scss";
export const AddParticipantsForm = () => {
  const {
    department,
    email,
    handleAddParticipant,
    phoneNum,
    name,
    role,
    setDepartment,
    setName,
    setEmail,
    setRole,
    setPhoneNum,
    handleClose,
    open,
    handleOpen,
  } = useAddParticipantsViewModel();

  return (
    <>
      <Button className="add-btn" variant="outlined" onClick={handleOpen}>
       <Plus size={14}/> Add Participant
      </Button>

      {open && (
        <Card className="addParticipants-Form__Container">
          <CardHeader
            className="title"
            title="Add New Participant"
            action={<X onClick={handleClose} />}
          ></CardHeader>

          <CardContent>
            <Grid container spacing={2} mt={2}>
              <Grid size={6}>
                <label htmlFor="Name">Name </label>
                <TextField
                  id="Name"
                  className="customTextField"
                  value={name}
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid size={6}>
                <label htmlFor="Department">Department</label>
                <TextField
                  fullWidth
                  className="customTextField"
                  placeholder="Department"
                  id="Department"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                ></TextField>
              </Grid>{" "}
              <Grid size={6}>
                <label htmlFor="Role">Role</label>
                <TextField
                  id="Role"
                  className="customTextField"
                  required
                  fullWidth
                  placeholder="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                ></TextField>
              </Grid>
              <Grid size={6}>
                <label htmlFor="Phone">Phone Number</label>
                <TextField
                  id="Phone"
                  className="customTextField"
                  required
                  fullWidth
                  placeholder="Phone Number"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                ></TextField>
              </Grid>
              <Grid size={12}>
                <label htmlFor="Email">Email</label>
                <TextField
                  id="Email"
                  className="customTextField"
                  required
                  fullWidth
                  placeholder="Email Adress "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleAddParticipant}>Add</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};
