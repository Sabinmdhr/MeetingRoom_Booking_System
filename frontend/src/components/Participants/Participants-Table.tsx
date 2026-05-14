import {
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import "../../assets/scss/components/Participants-Table.scss";
import "../../assets/scss/global.scss";
import {
  EllipsisVertical,
  Mail,
  Pen,
  Phone,
  Search,
  ShieldX,
  Trash2,
} from "lucide-react";
import type {
  ParticipantResponse,
  ParticipantsRequest,
} from "../../models/participants.model";

import { useEffect, useState } from "react";
import { permissions } from "../../utils/permissions";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "../ui/Spinner";
// import { openEditForm } from "../../redux/ParticipantsSlice";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
type props = {
  // users: ParticipantResponse[];
  // participantsFormState: {
  //   open: boolean;
  //   mode: "add" | "edit";
  //   participant: ParticipantResponse | null;
  // };
  handleParticipantFormOpen: (
    mode: "add" | "edit",
    participant?: ParticipantResponse,
  ) => void;
  handleParticipantsFormClose: () => void;
};
export const ParticipantsTable = ({
  // users,
  handleParticipantFormOpen,
}: props) => {
  // const { openAddParticipantForm } = useAddParticipantsViewModel();

  const {
    columns,
    loading,
    fetchUserReqData,
    setFetchUSerReqData,
    handleChangePage,
    fetchUsers,
    handleChangeRowsPerPage,
    totalElements,
    users,
    handleDeleteUser,
    setFilter,
    filter,
    search,
    setSearch,
    searchedUser,
    // filteredUsers,
  } = useparticipantsViewModel();
  const { role } = useAuth();
  const perms = permissions[role as keyof typeof permissions];

  const [menuState, setMenuState] = useState<{
    anchorEl: HTMLElement | null;
    participant: ParticipantResponse | null;
  }>({
    anchorEl: null,
    participant: null,
  });

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLElement>,
    participant: ParticipantResponse,
  ) => {
    setMenuState({
      anchorEl: e.currentTarget,
      participant: participant,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      anchorEl: null,
      participant: null,
    });
  };
const filteredUsers = !search ? users : searchedUser;
  // const filteredUsers = users.filter((u) =>{
  //   if(!search) return true;
  //   else
  // })
  // useEffect(() => {
  //   fetchUsers(fetchUserReqData);
  // }, [filter, fetchUserReqData]);

  // const {open,handleOpen} = useAddParticipantsViewModel()
  return (
    <div>
      <div className="participants-dropdown">
        <Typography variant="h6">{filter} Users</Typography>

        <TextField
          style={{ width: "50%" }}
          placeholder="Search by name or email..."
          value={search}
          className="customTextField"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={18} color="gray" />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" className="" sx={{ minWidth: 125 }}>
          {/* <InputLabel>Filter</InputLabel> */}

          <Select
            value={filter}
            // label="Filter"
            onChange={(e) => {
              const value = e.target.value;

              setFetchUSerReqData((prev) => ({
                ...prev,
                status:
                  value === "Active"
                    ? "ACTIVE"
                    : value === "Inactive"
                      ? "INACTIVE"
                      : undefined, // for "All"
                pageNo: 0,
              }));
            }}
            className="customTextField"
          >
            <MenuItem value="All">All</MenuItem>

            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper} className="TableContainer">
        <Table>
          <TableHead className="TableHead">
            <TableRow>
              <TableCell>S.N</TableCell>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {loading && <Spinner />}

          <TableBody>
            {filteredUsers.length === 0 && !loading ? (
              <TableRow
                style={{ textAlign: "center", padding: "8px !important" }}
              >
                No {filter} user
              </TableRow>
            ) : (
              filteredUsers.map(
                (participant: ParticipantResponse, index: number) => (
                  <TableRow key={participant.id} hover>
                    <TableCell width="5%">{index + 1}.</TableCell>

                    {columns.map((col) => {
                      switch (col.id) {
                        case "Name":
                          return (
                            <TableCell key={col.id}>
                              <div className="name-Col">
                                <Typography className="fullname">
                                  {participant.firstname} {participant.lastname}
                                </Typography>
                                <Typography className="role">
                                  {participant.position}
                                </Typography>
                              </div>
                            </TableCell>
                          );

                        case "department":
                          return (
                            <TableCell key={col.id}>
                              <Chip
                                className="department-chip"
                                label={participant.department}
                              />
                            </TableCell>
                          );

                        case "contact":
                          return (
                            <TableCell key={col.id}>
                              <div className="Contact">
                                <Typography className="email">
                                  <Mail size={12} /> {participant.email}
                                </Typography>
                                <Typography
                                  className="number"
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  <Phone size={12} /> {participant.phoneNo}
                                </Typography>
                              </div>
                            </TableCell>
                          );
                        case "status":
                          return (
                            <TableCell key={col.id}>
                              <Chip
                                className={`status-chip ${participant.status === "INACTIVE" ? "inactive" : ""}`}
                                label={
                                  <span
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                    }}
                                  >
                                    {participant.status === "ACTIVE" ? (
                                      <i
                                        className="cat-dot"
                                        style={{ background: "green" }}
                                      />
                                    ) : (
                                      <ShieldX size={16} />
                                    )}

                                    {participant.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      participant.status.slice(1).toLowerCase()}
                                  </span>
                                }
                              />
                            </TableCell>
                          );

                        case "actions":
                          return perms?.canManageUsers ? (
                            <TableCell key={col.id}>
                              <IconButton
                                onClick={(e) => {
                                  handleMenuOpen(e, participant);
                                }}
                              >
                                <EllipsisVertical size={16} />
                              </IconButton>
                              <Menu
                                anchorEl={menuState.anchorEl}
                                open={Boolean(menuState.anchorEl)}
                                onClose={handleMenuClose}
                                disableScrollLock
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                slotProps={{
                                  paper: {
                                    sx: {
                                      width: 180,
                                      // boxShadow: "none !important",
                                    },
                                  },
                                }}
                              >
                                <MenuItem
                                  className="menu-btn"
                                  onClick={() => {
                                    if (menuState.participant) {
                                      handleParticipantFormOpen(
                                        "edit",
                                        menuState.participant,
                                      );
                                    }
                                    handleMenuClose();
                                  }}
                                >
                                  <Pen size={18} /> Edit
                                </MenuItem>
                                <MenuItem
                                  className="menu-btn"
                                  onClick={() => {
                                    if (menuState.participant) {
                                      handleDeleteUser(
                                        menuState.participant.id,
                                      );
                                    }
                                    handleMenuClose();
                                  }}
                                >
                                  <Trash2 size={18} />
                                  <Typography color="red"> Delete</Typography>
                                </MenuItem>
                              </Menu>
                            </TableCell>
                          ) : null;

                        default:
                          return <TableCell key={col.id}>-</TableCell>;
                      }
                    })}
                  </TableRow>
                ),
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {users.length !== 0 && (
        <TablePagination
          component={Paper}
          count={totalElements}
          page={fetchUserReqData.pageNo}
          onPageChange={handleChangePage}
          rowsPerPage={fetchUserReqData.pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
        ></TablePagination>
      )}
    </div>
  );
};
