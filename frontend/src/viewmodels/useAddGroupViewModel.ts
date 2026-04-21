// import { useEffect, useState, type ReactEventHandler } from "react";
// import { useDispatch } from "react-redux";
// import type { groupCardRequest } from "../models/groupCard.model";
// import { addGroupCard } from "../services/groupCard.services";
// import { set } from "zod";

// export const useAddGroupViewModel = () => {
//   const [openGroupForm, setOpenGroupForm] = useState(false);

//   const initialGroupFormData: groupCardRequest = {
//     groupName: "",
//     description: "",
//     member: [],
//   };

//   const [groupFormData, setGroupFormData] =
//     useState<groupCardRequest>(initialGroupFormData);
//   const closeGroupForm = () => {
//     setOpenGroupForm(false);
//     setGroupFormData(initialGroupFormData); // Reset form data when closing
//   };

//   const handleSubmitGroup = async () => {
//     await addGroupCard(groupFormData);
//     setGroupFormData(initialGroupFormData); // Reset form after submission
//     console.log(groupFormData);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setGroupFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return {
//     // handleAddGroup,
//     openGroupForm,
//     groupFormData,
//     handleChange,
//     setGroupFormData,
//     setOpenGroupForm,
//     handleSubmitGroup,

//     closeGroupForm,
//   };
// };
