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

/**
 * ViewModel for managing the group card operations and state.
 * Handles fetching, adding, editing groups, and managing form visibility.
 * @returns Object containing group state, form state, and related handlers.
 */
export const useGroupCardViewModel = () => {
  // State to hold the list of fetched groups
  const [group, setGroup] = useState<groupCardResponse[]>([]);
  const numOfGroup = group.length;

  // State to control the group form modal (open/close, mode, and selected group)
  const [groupFormState, setGroupFormState] = useState({
    open: false,
    mode: "edit" as "edit" | "add",
    group: null as groupCardResponse | null,
  });
  /**
   * Opens the group form in either 'add' or 'edit' mode.
   * @param mode - The mode of the form ("add" or "edit")
   * @param group - The group to edit (if in 'edit' mode)
   */
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

  /**
   * Closes the group form modal.
   */
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

  // State for holding the current data in the group form
  const [groupFormData, setGroupFormData] =
    useState<groupCardRequest>(initialGroupFormData);

  /**
   * Fetches the list of group cards from the API and updates state.
   */
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


  /**
   * Submits the group form to either add a new group or edit an existing one.
   * @param mode - Whether to add or edit the group
   * @param id - The ID of the group to edit (if applicable)
   */
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

  /**
   * Handles input changes in the group form.
   * @param e - The input change event
   */
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
