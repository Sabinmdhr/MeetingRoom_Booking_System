import { useState } from "react";

export const useAddGroupViewModel = () => {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const [openGroupForm, setOpenGroupForm] = useState(false);

  const handleAddGroup = () => {
    const newGroup = {
      groupName,
      createdAt,
      description,
      groupMembers,
    };
    console.log("new added group: ", newGroup);
  };

  return {
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
  };
};
