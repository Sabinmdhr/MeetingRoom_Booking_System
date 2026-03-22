import { useState } from "react";

export const useAddParticipantsViewModel = () => {
  const initialFormData = {
    name: "",
    role: "Senior Engineer",
    phoneNum: "",
    email: "",
    department: "Engineering",
  };

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
    setOpen(false);
  };

  return {
    handleChange,
    submitForm,
    cancelForm,
    open,
    setOpen,
    participantFormData,
    setParticipantFormData,
  };
};
