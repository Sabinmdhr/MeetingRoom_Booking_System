import { useEffect, useEffectEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditForm,
  openEditForm,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";
import { addUser } from "../services/participants.service";
import type { departmentList } from "../models/departmentList.model";
import type { ParticipantResponse, ParticipantsRequest } from "../models/participants.model";
export const useAddParticipantsViewModel = () => {
  // const { selectedParticipant } = useAppSelector((state) => state.participants);
  const dispatch = useDispatch();

  const initialFormData = {
    password: "",
    email: "",
    roleId: 1,
    firstname: "",
    lastname: "",
    departmentId: 1,
    phoneNo: "",
    status: "",
    position: "Senior Engineer",
  };

  // const {isEditOpen , selectedParticipant} = useAppSelector((state) => state.participants)

  const [participantFormData, setParticipantFormData] =
    useState<ParticipantsRequest>(initialFormData);

  const [departmentId, setDepartmentId] = useState<number>(1);
  const [roleId, setRoleId] = useState<number>(1);

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

  const handleDepartmentChange = (id: number) => {
    setDepartmentId(id);
    setParticipantFormData((prev) => ({
      ...prev,
      departmentId: id? id: 1,
    }));
  };

  const handleRoleChange = (id: number) => {
    setRoleId(id);
    setParticipantFormData((prev) => ({
      ...prev,
      roleId: id ? id : 1,
    }));
  };

  const handleSubmit = async () => {
    try {
      // const response = await addUser(participantFormData);

      // return response;
      console.log("User added successfully:", participantFormData);
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
    departmentId,
    setDepartmentId,
    handleDepartmentChange,
    handleRoleChange,
    setRoleId,
    roleId,
  };
};
