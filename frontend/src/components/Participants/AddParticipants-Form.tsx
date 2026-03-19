import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
import { Plus, Save, X } from "lucide-react";
import "../../assets/scss/global.scss";
import "../../assets/scss/components/AddParticipants-Form.scss";
import { useAppSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import { ClassNames } from "@emotion/react";
import type { LoginFormInputs } from "../../models/auth.model";
import { useForm } from "react-hook-form";
export const AddParticipantsForm = () => {
  const {
    handleChange,
    setOpen,
    open,
    submitForm,
    participantFormData,
    cancelForm,
  } = useAddParticipantsViewModel();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginFormInputs>();
  const departments = ["Engineering", "Product", "Finance", "Marketing"];
  const roles = [
    "Senior Engineer",
    "Tech Lead",
    "DevOps Engineer",
    "Frontend Developer",
    "Product Manager",
    "UX Researcher",
  ];
  return (
    <>
      <Button
        className="add-btn"
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        <Plus size={14} /> Add Participant
      </Button>

      <Dialog
        open={open}
        onClose={cancelForm}
        slotProps={{ paper: { className: "Form__Container" } }}
        className="Form__Container"
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
          <Button onClick={cancelForm} className="cancel-btn">
            Close
          </Button>
          <Button onClick={submitForm} className="add-btn">
            ADD
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};
