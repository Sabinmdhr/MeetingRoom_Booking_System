import { useEffect, useState } from "react";
import type { Columns } from "../models/participants.model";
import {
  DemoParticipants,
  DemoColumns,
} from "../services/participants.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setParticipants,
  closeEditForm,
  openEditForm,
  toggleParticipantsSelection,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";
export const useparticipantsViewModel = () => {
  // const [participants, setParticipants] = useState<Participants[]>(DemoParticipants());
  const [columns, setColumns] = useState<Columns[]>(DemoColumns());
  const dispatch = useDispatch();

  const { participants, isEditOpen } = useSelector(
    (state: any) => state.participants,
  );

  useEffect(() => {
    const data = DemoParticipants();
    dispatch(setParticipants(data));
    dispatch(clearSelectedParticipants())
  }, [dispatch]);

  const handleEdit = (participa: any) => {
    dispatch(openEditForm(participa));
  };

  const handleToggle = (pId: string) => {
    dispatch(toggleParticipantsSelection(pId));
  };

  const handleClose = () => {
    dispatch(closeEditForm());
  };

  return {
    participants,
    setParticipants,
    isEditOpen,
    handleClose,
    handleEdit,
    columns,
    setColumns,
    handleToggle,
  };
};
