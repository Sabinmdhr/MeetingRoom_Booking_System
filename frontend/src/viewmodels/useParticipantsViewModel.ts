import { useEffect, useState } from "react";
import type { Participants, Columns } from "../models/participants.model";
import {
  DemoParticipants,
  DemoColumns,
} from "../services/participants.service";

export const useparticipantsViewModel = () => {
  const [participantType, setParticipantType] = useState< "internal" | "external" | null >(null);
  const [tabValue, setTabValue] = useState("people");
  const [participants, setParticipants] =
    useState<Participants[]>(DemoParticipants());
  const [columns, setColumns] = useState<Columns[]>(DemoColumns());
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],
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
    (p) =>
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const data = DemoParticipants();
    setParticipants(data);
  }, []);

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
    setTabValue,
    participants,
    columns,
    setColumns,
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



// import { useState } from "react";
// import type { Participants,Columns } from "../models/participants.model";
// import { DemoParticipants,DemoColumns } from "../services/participants.service";
// export const useparticipantsViewModel =() =>{
//   const [participants, setParticipants] = useState<Participants[]>(DemoParticipants());
//   const[columns, setColumns] = useState<Columns[]>(DemoColumns())
//   const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
//     [],
//   );

//   return{ participants, setParticipants, columns, setColumns, setSelectedParticipants, selectedParticipants}
// } 
