import { useState } from "react";
import type { Participants,Columns } from "../models/participants.model";
import { DemoParticipants,DemoColumns } from "../services/participants.service";
export const useparticipantsViewModel =() =>{
  const [participants, setParticipants] = useState<Participants[]>(DemoParticipants());
  const[columns, setColumns] = useState<Columns[]>(DemoColumns())
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],
  );

  return{ participants, setParticipants, columns, setColumns, setSelectedParticipants, selectedParticipants}
} 