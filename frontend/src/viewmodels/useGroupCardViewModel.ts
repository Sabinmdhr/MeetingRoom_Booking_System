import type {
  groupCardRequest,
  groupCardResponse,
} from "../models/groupCard.model";
import {
  addGroupCard,
  EditGroupCard,
  fetchGroupCards,
} from "../services/groupCard.services";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useGroupCardViewModel = () => {
  const [group, setGroup] = useState<groupCardResponse[]>([]);
  const numOfGroup = group.length;

  const [groupFormState, setGroupFormState] = useState({
    open: false,
    mode: "edit" as "edit" | "add",
    group: null as groupCardResponse | null,
  });
  const handleGroupFormOpen = (
    mode: "edit" | "add",
    group?: groupCardResponse,
  ) => {
    // if(mode === "edit" &7 group){
    //   setGroupFormData({groupName:group?.groupName,
    //     description: group?.description,
    //   member: group
    //   })
    // }
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


  const handleSubmitGroup = async (mode: "add" | "edit", id?: number) => {
    try {
      if (mode === "edit" && id) {
        await EditGroupCard(id, groupFormData);
        toast.success("Group updated successfully!");
      } else {
        await addGroupCard(groupFormData);
        await fetchData();
        setGroupFormData(initialGroupFormData);
        toast.success("Group created successfully!");
      }
        await fetchData();


      setGroupFormData(initialGroupFormData);
    } catch (error) {
      console.error(error);
      toast.error(
        mode === "edit" ? "Failed to update group" : "Failed to create group",
      );
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
    groupFormData,
    handleChange,
    setGroupFormData,
    handleSubmitGroup,
    groupFormState,
    initialGroupFormData,
    handleGroupFormClose,
    handleGroupFormOpen,
    fetchData,
    setGroup,
    numOfGroup,
  };
};
