import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
import { Plus } from "lucide-react";
import "../../assets/scss/global.scss";
import "../../assets/scss/components/AddParticipants-Form.scss";
import { useEffect } from "react";
import type { participantsApi } from "../../models/participants.model";
import { DepartmentList } from "./DepartmentList";

type props = {
  participantsFormState: {
    open: boolean;
    mode: "add" | "edit";
    participant: participantsApi | null;
  };
  handleParticipantFormOpen: (
    mode: "add" | "edit",
    participant?: participantsApi,
  ) => void;
  handleParticipantsFormClose: () => void;
};
export const AddParticipantsForm = ({
  handleParticipantsFormClose,
  handleParticipantFormOpen,
  participantsFormState,
}: props) => {
  const {
    handleChange,
    participantFormData,
    setParticipantFormData,
    initialFormData,
    handleSubmit,
  } = useAddParticipantsViewModel();
  // const dispatch = useDispatch();
  // const { isEditOpen, selectedParticipant } = useAppSelector(
  //   (state) => state.participants,
  // );

  const departments = ["Engineering", "HR", "Product", "Finance", "Marketing"];
  const positions = [
    "Senior Engineer",
    "Tech Lead",
    "Senior",
    "HR",
    "DevOps Engineer",
    "Frontend Developer",
    "Product Manager",
    "UX Researcher",
  ];
  const roles = ["ADMIN", "User", "Viewer"];
  useEffect(() => {
    if (
      participantsFormState.mode === "edit" &&
      participantsFormState.participant
    ) {
      setParticipantFormData({
        firstname: participantsFormState.participant.firstname,
        lastname: participantsFormState.participant.lastname,
        roleId: participantsFormState.participant.roleId,
        position: participantsFormState.participant.position,
        phoneNo: participantsFormState.participant.phoneNo,
        email: participantsFormState.participant.email,
        password: participantsFormState.participant.password,
        status: participantsFormState.participant.status,
        departmentId: participantsFormState.participant.departmentId,
      });
    } else {
      setParticipantFormData(initialFormData);
    }
  }, [participantsFormState]);

  // useEffect(() => {
  //   if (selectedParticipant) {
  //     setParticipantFormData({
  //       name: selectedParticipant.fullName,
  //       role: selectedParticipant.role,
  //       position: selectedParticipant.position,
  //       phoneNum: selectedParticipant.phoneNumber,
  //       email: selectedParticipant.email,
  //       department: selectedParticipant.department,
  //     });
  //     console.log(selectedParticipant);
  //   } else {
  //     setParticipantFormData(initialFormData);
  //   }
  // }, [selectedParticipant]);

  return (
    <>
      <Button
        className="add-btn"
        variant="outlined"
        onClick={() => handleParticipantFormOpen("add")}
      >
        <Plus size={14} /> Add Participant
      </Button>

      <Dialog
        open={participantsFormState.open}
        onClose={() => handleParticipantsFormClose()}
        slotProps={{ paper: { className: "Form__Container" } }}
      >
        <DialogTitle>
          <Typography variant="h3">Add Paraticipant</Typography>
        </DialogTitle>
        <DialogContent className="form-Content">
          <label htmlFor="First Name">First Name </label>
          <TextField
            id="First Name"
            name="firstname"
            className="customTextField"
            value={participantFormData.firstname}
            placeholder="Enter First Name"
            onChange={handleChange}
            fullWidth
            required
          ></TextField>
          <label htmlFor="Last Name">Last Name </label>
          <TextField
            id="Last Name"
            name="lastname"
            className="customTextField"
            value={participantFormData.lastname}
            placeholder="Enter Last Name"
            onChange={handleChange}
            fullWidth
            required
          ></TextField>
          {/* <label htmlFor="Department">Department</label>
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
          </TextField> */}

          <DepartmentList
            handleChange={handleChange}
            formData={participantFormData}
          />

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
            value={participantFormData.roleId}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <MenuItem value={r}>{r}</MenuItem>
            ))}
          </TextField>
          <label htmlFor="Position">Position</label>
          <TextField
            fullWidth
            name="position"
            placeholder="Position"
            id="Position"
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
            value={participantFormData.position}
            onChange={handleChange}
          >
            {positions.map((r) => (
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
            value={participantFormData.phoneNo}
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
          {participantsFormState.mode === "add" && (
            <>
              <label htmlFor="Password">Password</label>
              <TextField
                id="Password"
                name="password"
                className="customTextField"
                required
                fullWidth
                placeholder="Password"
                value={participantFormData.password}
                onChange={handleChange}
              ></TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            className="cancel-btn"
            onClick={() => {
              handleParticipantsFormClose();
            }}
          >
            Close
          </Button>
          <Button
            className="add-btn"
            onClick={() => {
              handleSubmit();
              handleParticipantsFormClose();
            }}
          >
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
