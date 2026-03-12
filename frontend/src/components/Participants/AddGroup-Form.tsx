import { Button, Card, CardContent, CardHeader, TextField } from "@mui/material";
import { useAddGroupViewModel } from "../../viewmodels/useAddGroupViewModel";
import { Plus, X } from "lucide-react";

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
      <Button onClick={() => setOpenGroupForm(true)}>
        <Plus size={18} /> Create New Group
      </Button>
      {openGroupForm && (
        <Card>
          <CardHeader
            title="Create New Group"
            action={<X onClick={() => setOpenGroupForm(false)} />}
          ></CardHeader>
          <CardContent>
            <label htmlFor="group-name">Group Name</label>
            <TextField
              fullWidth
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Write group name"
            ></TextField>
            <label htmlFor="description">Group Name</label>
            <TextField
              fullWidth
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write group name"
            ></TextField>
            <label htmlFor="group-name">Group Name</label>
            <TextField
              fullWidth
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Write group name"
            ></TextField>
          </CardContent>
        </Card>
      )}
    </>
  );
};
