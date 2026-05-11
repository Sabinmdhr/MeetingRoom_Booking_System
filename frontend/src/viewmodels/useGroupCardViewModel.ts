import type {
  groupCardRequest,
  groupCardResponse,
} from "../models/groupCard.model";
import { addGroupCard, fetchGroupCards } from "../services/groupCard.services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGroupCardViewModel = () => {
  const [group, setGroup] = useState<groupCardResponse[]>([]);
  const numOfGroup = group.length;

  const [openGroupForm, setOpenGroupForm] = useState(false);
  const [groupFormState, setGroupFormState] = useState({
    open: false,
    mode: "edit" as "edit" | "add",
    group: null as groupCardResponse | null,
  });
  const handleGroupFormOpen = (
    mode: "edit" | "add",
    group?: groupCardResponse,
  ) => {
    setGroupFormState({
      open: true,
      mode: mode,
      group: group || null,
    });
  };

  const handleGroupFormClose = async () => {
    setGroupFormState((prev) => ({
      ...prev,
      open: false,
    }));
  };


  const initialGroupFormData: groupCardRequest = {
    groupName: "",
    description: "",
    member: [],
  };

  const [groupFormData, setGroupFormData] =
    useState<groupCardRequest>(initialGroupFormData);

  const fetchData = async () => {
    try {
      const res = await fetchGroupCards();
      if (res) {
        setGroup(res);
      } else {
        console.warn("No group data found", res);
        setGroup([]); // fallback empty array
      }
    } catch (error) {
      console.error("Failed to fetch group cards:", error);
      setGroup([]); // fallback empty array
    }
  };
  const closeGroupForm = async () => {
    setOpenGroupForm(false);
    await fetchData(); // Reset form data when closing
    setGroupFormData(initialGroupFormData);
  };

  const handleSubmitGroup = async () => {
    try {
      await addGroupCard(groupFormData);
      setGroupFormData(initialGroupFormData);
      await fetchData();
      toast.success("Group created successfully!");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create group");
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setGroupFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    group,
    openGroupForm,
    groupFormData,
    handleChange,
    setGroupFormData,
    setOpenGroupForm,
    handleSubmitGroup,
    groupFormState,
initialGroupFormData,
    handleGroupFormClose,
    handleGroupFormOpen,
    closeGroupForm,
    setGroup,
    numOfGroup,
  };
};
