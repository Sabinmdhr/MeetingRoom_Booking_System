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
import "../../assets/scss/components/AddParticipants-Form.scss";
import { useEffect } from "react";
import type {
  ParticipantResponse,
  ParticipantsRequest,
} from "../../models/participants.model";
import { DepartmentList } from "./DepartmentList";
import { RoleDropdown } from "./RoleDropdown";
import { mapParticipantResponseToRequest } from "../../models/mapper/ParticipantMapper";
import MyButton from "../ui/Button";

type props = {
  participantsFormState: {
    open: boolean;
    mode: "add" | "edit";
    participant: ParticipantResponse | null;
  };
  handleParticipantFormOpen: (
    mode: "add" | "edit",
    participant?: ParticipantResponse,
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
    errors,
    resetForm,
    isSubmitted,
    departmentId,
    setDepartmentId,
    handleDepartmentChange,
    handleRoleChange,
    roleId,
  } = useAddParticipantsViewModel();
  // const dispatch = useDispatch();
  // const { isEditOpen, selectedParticipant } = useAppSelector(
  //   (state) => state.participants,
  // );

  // const departments = ["Engineering", "HR", "Product", "Finance", "Marketing"];
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
  useEffect(() => {
    if (
      participantsFormState.mode === "edit" &&
      participantsFormState.participant
    ) {
      setParticipantFormData(
        mapParticipantResponseToRequest(participantsFormState.participant),
      );
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
      <MyButton
        // className="add-btn"
        customVariant="dark"
        startIcon={<Plus size={17} />}
        variant="contained"
        onClick={() => handleParticipantFormOpen("add")}
        text="Add Participant"
      />

      <Dialog
        open={participantsFormState.open}
        onClose={() => {
          handleParticipantsFormClose();
          resetForm();
        }}
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
            error={!!errors.firstname}
            helperText={errors.firstname}
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
            error={!!errors.lastname}
            helperText={errors.lastname}
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
            onChange={handleDepartmentChange}
            value={participantFormData.departmentId}
          />
          <RoleDropdown
            onChange={handleRoleChange}
            value={participantFormData.roleId}
          />
          {/*
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
          </TextField> */}

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
            name="phoneNo"
            className="customTextField"
            required
            fullWidth
            error={!!errors.phoneNo}
            helperText={errors.phoneNo}
            placeholder="Phone Number"
            value={participantFormData.phoneNo}
            onChange={handleChange}
          ></TextField>
          <label htmlFor="Email">Email</label>
          <TextField
            id="Email"
            name="email"
            className="customTextField"
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            placeholder="Email Address "
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
                error={!!errors.password}
                helperText={errors.password}
                placeholder="Password"
                value={participantFormData.password}
                onChange={handleChange}
              ></TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <MyButton
            variant="outlined"
            // className="cancel-btn"
            customVariant="ghost"
            onClick={() => {
              handleParticipantsFormClose();
              resetForm();
            }}
            text="Close"
          />

          <MyButton
            variant="contained"
            // className="add-btn"
            customVariant="dark"
            onClick={async () => {
              const success = await handleSubmit();

              if (success) {
                handleParticipantsFormClose();
              }
            }}
            text="Add"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
