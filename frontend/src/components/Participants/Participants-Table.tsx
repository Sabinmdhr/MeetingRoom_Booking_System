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
export const ParticipantsTable = () => {
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
                          <Typography className="fullname">{participant.fullName}</Typography>
                          <Typography className="role">
                            {participant.role}
                          </Typography>
                        </div>
                      </TableCell>
                    );

                  case "department":
                    return (
                      <TableCell key={col.id}>
                        <Chip className="department-chip" label={participant.department} />
                      </TableCell>
                    );

                  case "contact":
                    return (
                      <TableCell key={col.id}>
                        <div

                        >
                          <Typography>{participant.email}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {participant.phoneNumber}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
