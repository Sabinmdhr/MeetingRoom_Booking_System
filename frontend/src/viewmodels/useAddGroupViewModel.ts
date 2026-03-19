import { useEffect, useState, type ReactEventHandler } from "react";
import type { groupCard } from "../models/groupCard.model";
import { useDispatch } from "react-redux";
import { setSelectedGroup, closeEditForm } from "../redux/ParticipantsSlice";
export const useAddGroupViewModel = () => {
  const [openGroupForm, setOpenGroupForm] = useState(false);

  const initialGroupFormData = {
    groupName: "",
    description: "",
    createdAt: "",
    groupMembers: [],
  };

  const [groupFormData, setGroupFormData] = useState(initialGroupFormData);
  const dispatch = useDispatch();

  const handleAddGroup = () => {
    const newGroup = {
      groupFormData,
    };
    console.log("new added group: ", newGroup);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name , value} = e.target;

    setGroupFormData((prev)=> ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditGroup = (group: any) => {
    dispatch(setSelectedGroup(group));
    // setOpenGroupForm(true)
  };

  const handleClose = () => {
    dispatch(closeEditForm());
  };

  return {
    handleAddGroup,
    openGroupForm,
    groupFormData,
    handleChange,
    setGroupFormData,
    setOpenGroupForm,
    handleEditGroup,
    handleClose,
  };
};
