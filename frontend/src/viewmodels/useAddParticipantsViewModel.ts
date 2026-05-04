import { useEffect, useEffectEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditForm,
  openEditForm,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";
import { addUser, editUser } from "../services/participants.service";

// import type { departmentList } from "../models/departmentList.model";
import {
  EditParticipantSchema,
  ParticipantSchema,
  UserSchema,
} from "../models/scehma/user.schema";

import type { departmentList } from "../models/departmentList.model";
import type {
  ParticipantResponse,
  ParticipantsRequest,
} from "../models/participants.model";
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [participantFormData, setParticipantFormData] =
    useState<ParticipantsRequest>(initialFormData);

  const [isSubmitted, setIsSubmitted] = useState(false);
  // const openAddParticipantForm = (participant: Participants) => {
  //   dispatch(openEditForm(participant));
  //   console.log(selectedParticipant);
  // };
  useState<ParticipantsRequest>(initialFormData);

  const [departmentId, setDepartmentId] = useState<number>(1);
  const [roleId, setRoleId] = useState<number>(1);

  const closeAddParticipantForm = () => {
    dispatch(closeEditForm());
    setParticipantFormData(initialFormData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setParticipantFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      const result = ParticipantSchema.safeParse(updated);

      if (!result.success) {
        const fieldError = result.error.issues.find(
          (err) => err.path[0] === name,
        );

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: fieldError ? fieldError.message : "",
        }));
      } else {
        //  Entire form valid clear this field error
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }

      return updated;
    });
  };

  const validate = (mode: "add" | "edit") => {
    const schema = mode === "edit" ? EditParticipantSchema : ParticipantSchema;

    const result = schema.safeParse(participantFormData);

    if (!result.success) {
      const formatted: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const key = err.path[0] as string;
        formatted[key] = err.message;
      });

      setErrors(formatted);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleDepartmentChange = (id: number) => {
    setDepartmentId(id);
    setParticipantFormData((prev) => ({
      ...prev,
      departmentId: id ? id : 1,
    }));
  };

  const handleRoleChange = (id: number) => {
    setRoleId(id);
    setParticipantFormData((prev) => ({
      ...prev,
      roleId: id ? id : 1,
    }));
  };

  const handleSubmit = async (mode: "add" | "edit", id?: number) => {
    setIsSubmitted(true);

    const isValid = validate(mode);
    console.log("IS VALID:", isValid); // 👈 ADD THIS

    if (!isValid) {
      console.log("ERRORS:", errors); // 👈 ADD THIS
      return false;
    }

    try {
      if (mode === "edit" && id) {
        console.log("EDITING USER"); // 👈 ADD
        await editUser(id, participantFormData);
      } else {
        console.log("ADDING USER"); // 👈 ADD
        await addUser(participantFormData);
      }

      return true;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  const resetForm = () => {
    setParticipantFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
  };

  return {
    handleChange,
    handleSubmit,

    // openAddParticipantForm,
    initialFormData,
    participantFormData,
    closeAddParticipantForm,
    setParticipantFormData,
    errors,
    isSubmitted,
    resetForm,
    departmentId,
    setDepartmentId,
    handleDepartmentChange,
    handleRoleChange,
    setRoleId,
    roleId,
  };
};
