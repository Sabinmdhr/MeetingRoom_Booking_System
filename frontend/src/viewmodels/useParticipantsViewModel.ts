import { useEffect, useState } from "react";
import type {
  Columns,
  ParticipantResponse,
  ParticipantsRequest,
} from "../models/participants.model";
import { DemoColumns, getAllUser } from "../services/participants.service";
import { useSelector, useDispatch } from "react-redux";
import {
  setParticipants,
  toggleParticipantsSelection,
} from "../redux/ParticipantsSlice";

export const useparticipantsViewModel = () => {
  const [users, setUsers] = useState<ParticipantResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const data = await getAllUser();
    setUsers(data);
    console.log(data);
    setLoading(false);
  };
  useEffect(() => {
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

  const handleParticipantsFormClose = async () => {
    setParticipantsFormState((prev) => ({
      ...prev,
      open: false,
    }));
    await fetchUsers();
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

    loading,
  };
};
