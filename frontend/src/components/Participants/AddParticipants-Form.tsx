import {
  Button,

  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import {closeEditForm, openForm} from "../../redux/ParticipantsSlice"
import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
import { FastForward, Plus } from "lucide-react";
import "../../assets/scss/global.scss";
import "../../assets/scss/components/AddParticipants-Form.scss";
import { useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const AddParticipantsForm = () => {
  const {
    handleChange,
closeAddParticipantForm,
    participantFormData,
    setParticipantFormData,
    initialFormData,
  } = useAddParticipantsViewModel();
const dispatch = useDispatch();
  const {isEditOpen , selectedParticipant} = useAppSelector((state) => state.participants)

  const departments = ["Engineering", "Product", "Finance", "Marketing"];
  const roles = [
    "Senior Engineer",
    "Tech Lead",
    "DevOps Engineer",
    "Frontend Developer",
    "Product Manager",
    "UX Researcher",
  ];
 useEffect(() => {
   if  (selectedParticipant) {
     setParticipantFormData({
       name: selectedParticipant.fullName,
       role: selectedParticipant.role,
       phoneNum: selectedParticipant.phoneNumber,
       email: selectedParticipant.email,
       department: selectedParticipant.department,
     });
    console.log(selectedParticipant);

   } else {
     setParticipantFormData(initialFormData);
   }
 }, [ selectedParticipant]);


  return (
    <>
      <Button
        className="add-btn"
        variant="outlined"
        onClick={() => dispatch(openForm())}
      >
        <Plus size={14} /> Add Participant
      </Button>

      <Dialog
        open={isEditOpen}
        onClose={()=> dispatch(closeEditForm())}
        slotProps={{ paper: { className: "Form__Container" } }}
      >
        <DialogTitle className="title"> Add Paraticipant</DialogTitle>
        <DialogContent>
          <label htmlFor="Name">Name </label>
          <TextField
            id="Name"
            name="name"
            className="customTextField"
            value={participantFormData.name}
            placeholder="Enter Name"
            onChange={handleChange}
            fullWidth
            required
          ></TextField>

          <label htmlFor="Department">Department</label>
          <TextField
            fullWidth
            name="department"
            placeholder="Department"
            id="Department"
            required
            className="customTextField"
            select
            SelectProps={{
              MenuProps: {
                disablePortal: true,
                PaperProps: {
                  className: "customTextField",
                },
              },
            }}
            value={participantFormData.department}
            onChange={handleChange}
          >
            {departments.map((d) => (
              <MenuItem value={d}>{d}</MenuItem>
            ))}
          </TextField>

          <label htmlFor="Role">Role</label>
          <TextField
            fullWidth
            name="role"
            placeholder="Role"
            id="Role"
            required
            className="customTextField"
            select
            SelectProps={{
              MenuProps: {
                disablePortal: true,
                PaperProps: {
                  className: "customTextField",
                },
              },
            }}
            value={participantFormData.role}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <MenuItem value={r}>{r}</MenuItem>
            ))}
          </TextField>

          <label htmlFor="Phone">Phone Number</label>
          <TextField
            id="Phone"
            name="phoneNum"
            className="customTextField"
            required
            fullWidth
            placeholder="Phone Number"
            value={participantFormData.phoneNum}
            onChange={handleChange}
            inputProps={{
              pattern: "^97\\d{8}$", // starts with 97 + 10 digits
              maxLength: 10, // prevent typing more than 10 digits
            }}
          ></TextField>

          <label htmlFor="Email">Email</label>
          <TextField
            id="Email"
            name="email"
            className="customTextField"
            required
            fullWidth
            placeholder="Email Adress "
            value={participantFormData.email}
            onChange={handleChange}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button  className="cancel-btn" onClick={()=>{closeAddParticipantForm()}}>
            Close
          </Button>
          <Button  className="add-btn">
            ADD
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};
