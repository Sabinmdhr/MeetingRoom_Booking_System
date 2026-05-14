import { useEffect, useEffectEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closeEditForm,
  openEditForm,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";
import { addUser, editUser } from "../services/participants.service";
import { toast } from "react-toastify";

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
/**
 * ViewModel for managing the add/edit participant form state and logic.
 * Handles form validation, submission, and state updates.
 * @returns Object containing form state, handlers, and validation errors.
 */
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
    position: "",
  };

  // const {isEditOpen , selectedParticipant} = useAppSelector((state) => state.participants)
  // State to hold validation errors for each form field
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State to hold the current form data for a participant
  const [participantFormData, setParticipantFormData] =
    useState<ParticipantsRequest>(initialFormData);

  // State to track if the form has been submitted
  const [isSubmitted, setIsSubmitted] = useState(false);
  // const openAddParticipantForm = (participant: Participants) => {
  //   dispatch(openEditForm(participant));
  //   console.log(selectedParticipant);
  // };
    // useState<ParticipantsRequest>(initialFormData);

  // State for the selected department ID
  const [departmentId, setDepartmentId] = useState<number>(1);

  // State for the selected role ID
  const [roleId, setRoleId] = useState<number>(1);

  /**
   * Closes the add/edit participant form and resets the form data.
   */
  const closeAddParticipantForm = () => {
    dispatch(closeEditForm());
    setParticipantFormData(initialFormData);
  };

  /**
   * Handles input changes in the participant form and validates individual fields.
   * @param e - The input change event
   */
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

  /**
   * Validates the entire form based on the current mode (add or edit).
   * @param mode - The mode of the form ("add" or "edit")
   * @returns A boolean indicating whether the form is valid
   */
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

  /**
   * Handles changes to the selected department.
   * @param id - The ID of the selected department
   */
  const handleDepartmentChange = (id: number) => {
    setDepartmentId(id);
    setParticipantFormData((prev) => ({
      ...prev,
      departmentId: id ? id : 1,
    }));
  };

  /**
   * Handles changes to the selected role.
   * @param id - The ID of the selected role
   */
  const handleRoleChange = (id: number) => {
    setRoleId(id);
    setParticipantFormData((prev) => ({
      ...prev,
      roleId: id ? id : 1,
    }));
  };

  /**
   * Handles form submission, validating data and calling the appropriate API.
   * @param mode - Whether to add or edit a user
   * @param id - The ID of the user (if editing)
   * @returns A boolean indicating whether submission was successful
   */
  const handleSubmit = async (mode: "add" | "edit", id?: number) => {
    setIsSubmitted(true);

    const isValid = validate(mode);
    console.log("IS VALID:", isValid);

    if (!isValid) {
      console.log("ERRORS:", errors);
      return false;
    }

    try {
      if (mode === "edit" && id) {
        console.log("EDITING USER");
        await editUser(id, participantFormData);
        toast.success("Participant updated successfully");
      } else {
        console.log("ADDING USER");
        await addUser(participantFormData);
        toast.success("Participant added successfully");
      }

      return true;
    } catch (error) {
      console.error("Error:", error);
      toast.error(`${error}`);
      return false;
    }
  };

  /**
   * Resets the form data to its initial state, clears errors, and resets submission status.
   */
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
