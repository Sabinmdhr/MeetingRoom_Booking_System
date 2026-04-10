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
      <Button
        className="add-btn"
        onClick={() => {
          setOpenGroupForm(true);
        }}
      >
        <Plus size={18} /> Create New Group
      </Button>

      <Dialog open={openGroupForm} onClose={() =>closeGroupForm() }>
        <DialogTitle>ADD Group</DialogTitle>
        <DialogContent>
          <label className="label" htmlFor="group-name">
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
          <label htmlFor="description" className="label">
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
          <ParticipantsCard formData={groupFormData} setFormData={setGroupFormData} type="internal" />
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button onClick={handleSubmitGroup}>Create</Button>
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
