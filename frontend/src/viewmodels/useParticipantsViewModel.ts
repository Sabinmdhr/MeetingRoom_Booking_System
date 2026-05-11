import { useEffect, useState } from "react";
import type {
  Columns,
  ParticipantResponse,
  ParticipantsRequest,
  fetchUsersType,
} from "../models/participants.model";
import { DemoColumns, getAllUser } from "../services/participants.service";
import { useSelector, useDispatch } from "react-redux";
import { setParticipants } from "../redux/ParticipantsSlice";

export const useparticipantsViewModel = () => {
  const [users, setUsers] = useState<ParticipantResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchUserReqData, setFetchUSerReqData] = useState<fetchUsersType>({
    pageNo: 0,
    pageSize: 10,
  });
  const [totalElements, setTotalElements] = useState<number>(0);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setFetchUSerReqData((prev) => ({ ...prev, pageNo: newPage }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFetchUSerReqData((prev) => ({
      ...prev,
      pageNo: 0,
      pageSize: parseInt(event.target.value, 10),
    }));
  };
  const fetchUsers = async (data: fetchUsersType) => {
    const res = await getAllUser(data);
    setUsers(res.content);
    setTotalElements(res.totalElements);
    setLoading(false);
  };
  useEffect(() => {
    console.log("Updated Req:", fetchUserReqData);
  }, [fetchUserReqData]);

  useEffect(() => {
    fetchUsers(fetchUserReqData);
  }, [fetchUserReqData.pageNo, fetchUserReqData.pageSize]);
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
    await fetchUsers(fetchUserReqData);
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
    handleChangePage,
    handleChangeRowsPerPage,
    totalElements,
    participantType,
    handleInternalClick,
    handleExternalClick,
    tabValue,
    participants,
    setParticipants,
    fetchUsers,
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

    fetchUserReqData,
    setFetchUSerReqData,
  };
};
