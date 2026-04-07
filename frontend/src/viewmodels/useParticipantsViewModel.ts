import { useEffect, useState } from "react";
import type {  Columns, ParticipantResponse, ParticipantsRequest} from "../models/participants.model";
import { DemoColumns, getAllUser } from "../services/participants.service";
import { useSelector, useDispatch } from "react-redux";
import {
  setParticipants,
  toggleParticipantsSelection,
} from "../redux/ParticipantsSlice";

export const useparticipantsViewModel = () => {
  const [users, setUsers] = useState<ParticipantResponse[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUser();
      setUsers(data);
      console.log(data);
    };
    fetchUsers();
  }, []);


  const [participantsFormState, setParticipantsFormState] = useState({
    open: false,
    mode: "edit" as "edit" | "add",
    participant: null as ParticipantResponse | null,
  });

  const handleParticipantFormOpen = (
    mode: "edit" | "add",
    participant?: ParticipantResponse,
  ) => {
    setParticipantsFormState({
      open: true,
      mode: mode,
      participant: participant || null,
    });
  };

  const handleParticipantsFormClose = () => {
    setParticipantsFormState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const [participantType, setParticipantType] = useState<
    "internal" | "external" | null
  >(null);
  const [tabValue, setTabValue] = useState("people");

  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],
  );

  // const [participants, setParticipants] = useState<Participants[]>(DemoParticipants());
  const [columns, setColumns] = useState<Columns[]>(DemoColumns());
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const data = DemoParticipants();
  //   dispatch(setParticipants(data));
  //   dispatch(clearSelectedParticipants());
  // }, [dispatch]);

  // const handleEdit = (participants: any) => {
  //   dispatch(openEditForm(participants));
  // };

  const handleToggle = (pId: number) => {
    dispatch(toggleParticipantsSelection(pId));
  };

  // const handleClose = () => {
  //   dispatch(closeEditForm());
  // };

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
    (p: ParticipantResponse) =>
      p.firstname.toLowerCase().includes(search.toLowerCase()) ||
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
    // handleClose,
    // handleEdit,
    columns,
    setColumns,
    handleToggle,
    setTabValue,

    users,
    setUsers,

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

    participantsFormState,
    setParticipantsFormState,
    handleParticipantFormOpen,
    handleParticipantsFormClose,
  };
};
