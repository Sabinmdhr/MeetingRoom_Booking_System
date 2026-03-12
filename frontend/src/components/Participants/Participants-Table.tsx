import {
  Chip,
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
import "../../assets/scss/components/Participants-Table.scss"
import "../../assets/scss/global.scss"
import { Mail, Pen, Phone, Trash2 } from "lucide-react";
// import { useAddParticipantsViewModel } from "../../viewmodels/useAddParticipantsViewModel";
export const ParticipantsTable = ({editMode} : {editMode: boolean}) => {
  const { participants, columns } =
    useparticipantsViewModel();

  return (
    <TableContainer component={Paper} className="TableContainer">
      <Table>
        <TableHead className="TableHead">
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id}>{col.label}</TableCell>
            ))}
            {editMode && <TableCell> Actions</TableCell>}
          </TableRow>
        </TableHead>

        <TableBody>
          {participants.map((participant) => (
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

                  default:
                    return <TableCell key={col.id}>-</TableCell>;
                }
              })}
              {editMode && (
                <TableCell>
                  {" "}
                  <Pen size={16} /> <Trash2 size={16} />{" "}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
