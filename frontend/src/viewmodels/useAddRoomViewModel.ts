import { useState } from "react";
import type { AddRoomModal } from "../models/Meeting_room.model";
import { useDispatch } from "react-redux";
import { closeEditForm, openEditForm } from "../redux/MeetingRoomSlice";
import { addRoom } from "../services/Meetinf_room.service";

export const useAddRoomViewModel = () => {
   const [openAddRoomForm, setOpenAddRoomForm] = useState(false);
   const [addRoomFormData, setAddRoomFormData] = useState<AddRoomModal>({
     id: "",
     roomName: "",
     capacity: 0,
     resources: [],
   });

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, value } = e.target;

     setAddRoomFormData((prev) => ({
       ...prev,
       [name]: value,
     }));
   };

   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { value, checked } = e.target;
     setAddRoomFormData((prev) => {
       let newResources = [...prev.resources];
       if (checked) {
         newResources.push(value);
       } else {
         newResources = newResources.filter((f) => f !== value);
       }
       return { ...prev, resources: newResources };
     });
   };

   const submitAddRomForm = async () => {
     try {
       await addRoom(addRoomFormData);
       console.log("succes");
     } catch (error) {
       console.log(error);
     }
   };
  return {
    openAddRoomForm,
    handleCheckboxChange,
    setOpenAddRoomForm,
    addRoomFormData,
    submitAddRomForm,
    handleChange,
  };
};
