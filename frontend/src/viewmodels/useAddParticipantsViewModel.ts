import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeEditForm , openEditForm, clearSelectedParticipants} from "../redux/ParticipantsSlice";
import type { Participants } from "../models/participants.model";
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


const openAddParticipantForm =(participant: Participants)=>{
    dispatch(openEditForm(participant));
    console.log(selectedParticipant);

}

const closeAddParticipantForm = ()=>{
  dispatch(closeEditForm())
  setParticipantFormData(initialFormData);
}

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setParticipantFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  return {
    handleChange,
openAddParticipantForm,
    initialFormData,
    participantFormData,
    closeAddParticipantForm,
    setParticipantFormData,
  };
};
