import {
  Card,
  CardContent,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

import { useMeetingTableViewModel } from "../viewmodels/useMeetingReportViewModel";

import "../assets/scss/pages/Report.scss";

export default function MeetingTable() {
  const vm = useMeetingTableViewModel();

  return (
    <div>
      <div>
        <Typography variant="h6">Reports & Analytics</Typography>
        <Typography
          variant="body2"
          className="meeting-table__subtitle"
        >
          View and export reservation data
        </Typography>
      </div>
      <Card className="meeting-table">
        <CardContent className="meeting-table__header">
          <Typography variant="h6">Report Data</Typography>

          <Typography
            variant="body2"
            className="meeting-table__subtitle"
          >
            2026-01-01 to 2026-01-31 • {vm.rows.length} results
          </Typography>
        </CardContent>

        <Divider />

        <Paper className="meeting-table__paper">
          <TableContainer className="meeting-table__container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {vm.columns.map((column) => (
                    <TableCell
                      key={column.id}
                      className="meeting-table__head"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {vm.paginatedRows.map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                  >
                    {vm.columns.map((column) => {
                      const value = row[column.id];

                      if (column.id === "status") {
                        return (
                          <TableCell key={column.id}>
                            <Chip
                              label={value}
                              size="small"
                              className="meeting-table__status"
                            />
                          </TableCell>
                        );
                      }

                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={vm.rows.length}
            page={vm.page}
            rowsPerPage={vm.rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onPageChange={vm.handleChangePage}
            onRowsPerPageChange={vm.handleChangeRowsPerPage}
          />
        </Paper>
      </Card>
    </div>
  );
}
