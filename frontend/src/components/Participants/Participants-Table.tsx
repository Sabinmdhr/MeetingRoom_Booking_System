import {
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
  Trash2,
} from "lucide-react";
import type { ParticipantResponse, ParticipantsRequest } from "../../models/participants.model";
import { useState } from "react";
// import { openEditForm } from "../../redux/ParticipantsSlice";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
type props = {
  users: ParticipantResponse[];
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
  users,
  handleParticipantFormOpen,
}: props) => {
  // const { openAddParticipantForm } = useAddParticipantsViewModel();
  const {  columns } = useparticipantsViewModel();

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
  // const {open,handleOpen} = useAddParticipantsViewModel()
  return (
    <TableContainer component={Paper} className="TableContainer">
      <Table>
        <TableHead className="TableHead">
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {users.map((participant: ParticipantResponse) => (
            <TableRow key={participant.id} hover>
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



                  case "actions":
                    return (
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
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
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
                              // handleDelete(participant);
                              handleMenuClose();
                            }}
                          >
                            <Trash2 size={18} />
                            <Typography color="red"> Delete</Typography>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    );

                  default:
                    return <TableCell key={col.id}>-</TableCell>;
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
