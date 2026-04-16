import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAddGroupViewModel } from "../../viewmodels/useAddGroupViewModel";
import { Plus, X } from "lucide-react";
import "../../assets/scss/components/AddGroup-Form.scss";
import ParticipantsCard from "../BookingRooms/ParticipantsCard";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import MyButton from "../ui/Button";
export const AddGroupForm = () => {
  const {
    openGroupForm,
    groupFormData,
    setOpenGroupForm,
    handleChange,
    setGroupFormData,
    handleSubmitGroup,
    closeGroupForm,
  } = useAddGroupViewModel();

  // const { selectedGroup, isEditOpen } = useAppSelector(
  //   (state) => state.participants,
  // );

  return (
    <>
      <MyButton
        text="Create New Group"
        // className="add-btn"
        customVariant="dark"
        startIcon={<Plus size={17} />}
        onClick={() => {
          setOpenGroupForm(true);
        }}
      />

      <Dialog
        open={openGroupForm}
        onClose={() => closeGroupForm()}
      >
        <DialogTitle>Add Group</DialogTitle>
        <DialogContent>
          <label
            className="label"
            htmlFor="group-name"
          >
            Group Name
          </label>
          <TextField
            className="customTextField"
            fullWidth
            name="groupName"
            id="group-name"
            value={groupFormData.groupName}
            onChange={handleChange}
            placeholder="Write group name"
          ></TextField>
          <label
            htmlFor="description"
            className="label"
          >
            Description
          </label>
          <TextField
            className="customTextField"
            fullWidth
            name="description"
            id="description"
            value={groupFormData.description}
            onChange={handleChange}
            placeholder="Write group name"
          ></TextField>
          <ParticipantsCard
            formData={groupFormData}
            setFormData={setGroupFormData}
            type="internal"
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            text="Cancel"
            onClick={() => {
              closeGroupForm();
            }}
            variant="outlined"
            customVariant="ghost"
            // className="cancel-btn"
          />
          <MyButton
            text="Create"
            onClick={handleSubmitGroup}
            variant="contained"
            // className="add-btn"
            customVariant="dark"
          />
        </DialogActions>
      </Dialog>

      {/* {openGroupForm ||
        (isEditOpen && (
          <Card className="addGroup-Form__Container">
            <CardHeader
              title="Create New Group"
              action={<X onClick={() => setOpenGroupForm(false)} />}
            ></CardHeader>
            <CardContent>
              <label className="label" htmlFor="group-name">
                Group Name
              </label>
              <TextField
                className="customTextField"
                fullWidth
                id="group-name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Write group name"
              ></TextField>
              <label htmlFor="description">Description</label>
              <TextField
                className="customTextField"
                fullWidth
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write group name"
              ></TextField>
              <ParticipantsCard displayOn="participant" type="" />
            </CardContent>
          </Card>
        ))} */}
    </>
  );
};
