import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeEditForm } from "../redux/ParticipantsSlice";

export const useAddParticipantsViewModel = () => {
const {selectedParticipant} = useAppSelector((state) => state.participants)
const dispatch = useDispatch();

  const initialFormData = {
    name: "",
    role: "Senior Engineer",
    phoneNum: "",
    email: "",
    department: "Engineering",
  };

  // const {isEditOpen , selectedParticipant} = useAppSelector((state) => state.participants)

  const [participantFormData, setParticipantFormData] =
    useState(initialFormData);

  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setParticipantFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = () => {
    console.log(participantFormData);
    setParticipantFormData(initialFormData);
    setOpen(false);

  };

  const cancelForm = () => {
    setParticipantFormData(initialFormData);
    // dispatch(closeEditForm());
  };


  return {
    handleChange,
    submitForm,
    cancelForm,
    open,
    initialFormData,
    setOpen,
    participantFormData,
    setParticipantFormData,
  };
};
