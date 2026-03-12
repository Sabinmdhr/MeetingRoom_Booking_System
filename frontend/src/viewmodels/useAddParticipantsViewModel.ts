import { useState } from "react";

export const useAddParticipantsViewModel = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [open, setOpen] = useState(false);
  const [closeBtn, setCloseBtn] = useState(true);

  const handleOpen = () => {
    setOpen(true);
    setCloseBtn(false);
  };
  const handleClose = () => setOpen(false);

  const handleAddParticipant = () => {
    // e.preventDefault();

    const newParticipant = {
      name,
      role,
      department,
      email,
      phoneNum,
    };

    console.log("new participant: ", newParticipant);
  };

  return {
    department,
    email,
    handleAddParticipant,
    phoneNum,
    role,
    name,
    setDepartment,
    setName,
    setEmail,
    setRole,
    open,
    setPhoneNum,
    handleClose,
    handleOpen,
    closeBtn,
  };
};
