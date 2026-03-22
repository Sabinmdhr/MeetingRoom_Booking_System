import { useEffect, useState } from "react";
import type { Participants, Columns } from "../models/participants.model";
import {
  DemoParticipants,
  DemoColumns,
} from "../services/participants.service";
import { useSelector , useDispatch} from "react-redux";
import {
  setParticipants,
  closeEditForm,
  openEditForm,

  toggleParticipantsSelection,
  clearSelectedParticipants,
} from "../redux/ParticipantsSlice";

export const useparticipantsViewModel = () => {

   useEffect(() => {
    const data = DemoParticipants();
    dispatch(setParticipants(data));
    dispatch(clearSelectedParticipants());
    
  }, []);
  const [participantType, setParticipantType] = useState< "internal" | "external" | null >(null);
  const [tabValue, setTabValue] = useState("people");
  
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],)

  // const [participants, setParticipants] = useState<Participants[]>(DemoParticipants());
  const [columns, setColumns] = useState<Columns[]>(DemoColumns());
  const dispatch = useDispatch();



  
  const handleEdit = (participants: any) => {
    dispatch(openEditForm(participants));
  };

  const handleToggle = (pId: string) => {
    dispatch(toggleParticipantsSelection(pId));
  };

  const handleClose = () => {
    dispatch(closeEditForm());
  };

  const { participants, isEditOpen } = useSelector(
    (state: any) => state.participants,
  );
  const [search, setSearch] = useState("");
  const [externalName, setExternalName] = useState("");
  const [externalEmail, setExternalEmail] = useState("");

  const handleInternalClick = () => {
    setParticipantType((prev) => (prev === "internal" ? null : "internal"));
  };

  const handleExternalClick = () => {
    setParticipantType((prev) => (prev === "external" ? null : "external"));
  };

  const handleSelectParticipant = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const filteredParticipants = participants.filter(
    (p:Participants) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

 

  const handleAddExternal = () => {
    if (!externalName || !externalEmail) return;

    console.log({
      name: externalName,
      email: externalEmail,
    });

    setExternalName("");
    setExternalEmail("");
  };

  return {
    participantType,
    handleInternalClick,
    handleExternalClick,
    tabValue,
    participants,
    setParticipants,
    isEditOpen,
    handleClose,
    handleEdit,
    columns,
    setColumns,
    handleToggle,
    setTabValue,
   
    selectedParticipants,
    handleSelectParticipant,
    search,
    setSearch,
    filteredParticipants,
    externalName,
    setExternalName,
    externalEmail,
    setExternalEmail,
    handleAddExternal,
  };
};



