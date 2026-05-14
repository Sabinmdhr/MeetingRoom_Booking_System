import { useEffect, useState } from "react";
import type {
  Columns,
  ParticipantResponse,
  ParticipantsRequest,
  fetchUsersType,
} from "../models/participants.model";
import {
  deleteUser,
  DemoColumns,
  getActiveUser,
  getPaginatedUser,
  getSearchUser,
} from "../services/participants.service";
import { useSelector, useDispatch } from "react-redux";
import { setParticipants } from "../redux/ParticipantsSlice";
import { toast } from "react-toastify";

export const useparticipantsViewModel = () => {
  const [users, setUsers] = useState<ParticipantResponse[]>([]);
  const [searchedUser, setSearchUser] = useState<ParticipantResponse[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [allActiveUser, setAllActiveUser] = useState<ParticipantResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  // const filteredUsers = users.filter((user) => {
  //   if (filter === "Active") {
  //     return user.status === "ACTIVE";
  //   } else if (filter === "Inactive") {
  //     return user.status === "INACTIVE";
  //   }
  //   return true;
  // });
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
  const fetchActiveUsers = async () => {
    try {
      const res = await getActiveUser(fetchUserReqData);
      setAllActiveUser(res.content ?? []);
    } catch (error) {}
  };
  useEffect(() => {
    fetchActiveUsers();
  }, []);
  const fetchSearchedUser = async (searchText: string | null) => {
    setLoading(true);
    try {
      const res = await getSearchUser(searchText);
      setSearchUser(res.content ?? []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSearchedUser(search);
  }, [search]);
  const fetchUsers = async (data: fetchUsersType) => {
    setLoading(true);

    try {
      let res;
      if (!search) {
        res = await getPaginatedUser(data);
      } else {
        res = await getSearchUser(search);
      }
      setUsers(res.content ?? []);
      setTotalElements(res.totalElements);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers(fetchUserReqData);
  }, [fetchUserReqData, search]);

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

  const handleAddExternal = () => {
    if (!externalName || !externalEmail) return;

    console.log({
      name: externalName,
      email: externalEmail,
    });

    setExternalName("");
    setExternalEmail("");
  };
  const handleDeleteUser = async (id: number) => {
    try {
      const res = await deleteUser(id);
      toast.success("Participant Successfully Deleted");
      fetchUsers(fetchUserReqData);
    } catch (error) {
      toast.error(`${error}`);
    }
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
    handleDeleteUser,
    allActiveUser,
    searchedUser,
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
    externalName,
    setExternalName,
    externalEmail,
    setExternalEmail,
    handleAddExternal,

    participantsFormState,
    setParticipantsFormState,
    handleParticipantFormOpen,
    handleParticipantsFormClose,
    setFilter,
    filter,
    // filteredUsers,
    loading,

    fetchUserReqData,
    setFetchUSerReqData,
  };
};
