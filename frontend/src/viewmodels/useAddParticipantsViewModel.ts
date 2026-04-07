import { useEffect, useEffectEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditForm,
  openEditForm,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";
import { addUser } from "../services/participants.service";

// import type { departmentList } from "../models/departmentList.model";
import type { participantsApi } from "../models/participants.model";
import { ParticipantSchema, UserSchema } from "../models/scehma/user.schema";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [participantFormData, setParticipantFormData] =
    useState<participantsApi>(initialFormData);

  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const validate = () => {
    const result = ParticipantSchema.safeParse(participantFormData);

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

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const isValid = validate();

    if (!isValid) return false;

    try {
      const response = await addUser(participantFormData);
      console.log("User added successfully:", response);
      return true;
    } catch (error) {
      console.error("Error adding user:", error);
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
  };
};
