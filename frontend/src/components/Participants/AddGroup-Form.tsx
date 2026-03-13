import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useAddGroupViewModel } from "../../viewmodels/useAddGroupViewModel";
import { Plus, X } from "lucide-react";
import "../../assets/scss/components/AddGroup-Form.scss"
import ParticipantsCard from "../BookingRooms/ParticipantsCard";
export const AddGroupForm = () => {
  const {
    createdAt,
    description,
    groupMembers,
    groupName,
    handleAddGroup,
    openGroupForm,
    setCreatedAt,
    setDescription,
    setGroupMembers,
    setGroupName,
    setOpenGroupForm,
  } = useAddGroupViewModel();

  return (
    <>
      <Button
      className="add-btn"
      onClick={() => setOpenGroupForm(true)}>
        <Plus size={18} /> Create New Group
      </Button>
      {openGroupForm && (
        <Card className="addGroup-Form__Container">
          <CardHeader
            title="Create New Group"
            action={<X onClick={() => setOpenGroupForm(false)} />}
          ></CardHeader>
          <CardContent>
            <label className="label" htmlFor="group-name">Group Name</label>
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
           <ParticipantsCard displayOn="participant" type=""/>
          </CardContent>
        </Card>
      )}
    </>
  );
};
