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
import { Plus, X } from "lucide-react";
import "../../assets/scss/components/AddGroup-Form.scss";
import ParticipantsCard from "../BookingRooms/ParticipantsCard";
import { useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import MyButton from "../ui/Button";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel";
import {
  mappingGroupResponseToRequest,
  type groupCardRequest,
  type groupCardResponse,
} from "../../models/groupCard.model";
import { EditGroupCard } from "../../services/groupCard.services";

type props = {
  groupFormState: {
    open: boolean;
    mode: "add" | "edit";
    group: groupCardResponse | null;
  };
  handleGroupFormOpen: (
    mode: "add" | "edit",
    group?: groupCardResponse,
  ) => void;
  handleGroupFormClose: () => void;
};
export const AddGroupForm = ({
  handleGroupFormOpen,
  handleGroupFormClose,
  groupFormState,
}: props) => {
  const {
    groupFormData,
    handleChange,
    setGroupFormData,
    handleSubmitGroup,
    initialGroupFormData,
  } = useGroupCardViewModel();

  // const { selectedGroup, isEditOpen } = useAppSelector(
  //   (state) => state.participants,
  // );
  useEffect(() => {
    if (groupFormState.mode == "edit" && groupFormState.group) {
      setGroupFormData(mappingGroupResponseToRequest(groupFormState.group));
    } else {
      setGroupFormData(initialGroupFormData);
    }
  }, [groupFormState]);
  return (
    <>
      <MyButton
        text="Create New Group"
        // className="add-btn"
        customVariant="dark"
        startIcon={<Plus size={17} />}
        onClick={() => {
          // setOpenGroupForm(true);
          handleGroupFormOpen("add");
        }}
      />

      <Dialog open={groupFormState.open} onClose={() => handleGroupFormClose()}>
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
            placeholder="Add description"
          ></TextField>
          <ParticipantsCard
            participants={groupFormData.member}
            onChange={(updated) => {
              setGroupFormData((prev) => ({
                ...prev,
                member: updated,
              }));
            }}
            type="internal"
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            text="Cancel"
            onClick={() => {
              handleGroupFormClose();
            }}
            variant="outlined"
            customVariant="ghost"
            // className="cancel-btn"
          />
          <MyButton
            text={groupFormState.mode == "edit" ? "Edit" : "Add"}
            onClick={() => {
              handleSubmitGroup(groupFormState.mode, groupFormState.group?.id)
              handleGroupFormClose()
            }}
            variant="contained"
            // className="add-btn"
            customVariant="dark"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};
