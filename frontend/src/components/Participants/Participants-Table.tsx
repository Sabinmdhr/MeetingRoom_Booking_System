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
import { EllipsisVertical, Mail, Pen, Phone, Trash, Trash2 } from "lucide-react";
import type { Participants } from "../../models/participants.model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { openEditForm } from "../../redux/ParticipantsSlice";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
export const ParticipantsTable = () => {

  const dispatch  = useDispatch()
  const { participants, columns, handleEdit } = useparticipantsViewModel();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
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
          {participants.map((participant: Participants) => (
            <TableRow key={participant.id} hover>
              {columns.map((col) => {
                switch (col.id) {
                  case "Name":
                    return (
                      <TableCell key={col.id}>
                        <div className="name-Col">
                          <Typography className="fullname">
                            {participant.fullName}
                          </Typography>
                          <Typography className="role">
                            {participant.role}
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
                            <Phone size={12} /> {participant.phoneNumber}
                          </Typography>
                        </div>
                      </TableCell>
                    );

                  case "numOfMeetings":
                    return (
                      <TableCell key={col.id}>
                        {participant.numOfMeetings}
                      </TableCell>
                    );



                  case "actions":
                  return (

                <TableCell>
                <IconButton onClick={handleMenuOpen}>
                  <EllipsisVertical size={16} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
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
                      // handleEdit(participant);
                      handleEdit(participant)
                      handleMenuClose();
                    }}
                  >
                    <Pen size={18}/> Edit
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
