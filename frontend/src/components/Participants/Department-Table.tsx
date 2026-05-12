import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";

export const DepartmentTable = () => {
  const { departmentList } = useDepartmentListViewModel();
  return departmentList.length !== 0 ? (
    <TableContainer component={Paper} className="TableContainer">
      <Table>
        <TableHead className="TableHead">
          <TableRow>
            <TableCell width="10%">S.N</TableCell>
            <TableCell width="45%">Department Name</TableCell>
            <TableCell width="45%">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentList.map((department, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell>{department.departmentName}</TableCell>
              <TableCell>{department.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>No Departmet Available</div>
  );
};
