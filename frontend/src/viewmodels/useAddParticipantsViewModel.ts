import { useEffect, useEffectEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditForm,
  openEditForm,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";
import { addUser } from "../services/participants.service";
import type { departmentList } from "../models/departmentList.model";
import type { participantsApi } from "../models/participants.model";
export const useAddParticipantsViewModel = () => {
  // const { selectedParticipant } = useAppSelector((state) => state.participants);
  const dispatch = useDispatch();

  const initialFormData = {
    password: "",
    email: "",
    roleId: "1",
    firstname: "",
    lastname: "",
    departmentId: "1",
    phoneNo: "",
    status: "",
    position: "",
  };

  // const {isEditOpen , selectedParticipant} = useAppSelector((state) => state.participants)

  const [participantFormData, setParticipantFormData] =
    useState<participantsApi>(initialFormData);





  // const openAddParticipantForm = (participant: Participants) => {
  //   dispatch(openEditForm(participant));
  //   console.log(selectedParticipant);
  // };

  const closeAddParticipantForm = () => {
    dispatch(closeEditForm());
    setParticipantFormData(initialFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setParticipantFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async () => {
    try {
      const response = await addUser(participantFormData);
      console.log("User added successfully:", response);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return {
    handleChange,
    handleSubmit,

    // openAddParticipantForm,
    initialFormData,
    participantFormData,
    closeAddParticipantForm,
    setParticipantFormData,
  };
};
