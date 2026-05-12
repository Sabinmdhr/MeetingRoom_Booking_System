import {
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
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";
import { useState } from "react";
import type { departmentList } from "../../models/departmentList.model";
import { EllipsisVertical, Pen, Trash2 } from "lucide-react";

export const DepartmentTable = () => {
  const { departmentList } = useDepartmentListViewModel();

  const [menuState, setMenuState] = useState<{
    anchorEl: HTMLElement | null;
    department: departmentList | null;
  }>({
    anchorEl: null,
    department: null,
  });

  const handleMenuOpen = (
    e: React.MouseEvent<HTMLElement>,
    department: departmentList,
  ) => {
    setMenuState({
      anchorEl: e.currentTarget,
      department: department,
    });
  };

  const handleMenuClose = () => {
    setMenuState({
      anchorEl: null,
      department: null,
    });
  };
  return departmentList.length !== 0 ? (
    <TableContainer component={Paper} className="TableContainer">
      <Table>
        <TableHead className="TableHead">
          <TableRow>
            <TableCell width="10%">S.N</TableCell>
            <TableCell width="45%">Department Name</TableCell>
            <TableCell width="45%">Description</TableCell>
            <TableCell width="45%">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentList.map((department, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell>{department.departmentName}</TableCell>
              <TableCell>{department.description}</TableCell>
              <TableCell>
                {" "}
                <IconButton
                  onClick={(e) => {
                    handleMenuOpen(e, department);
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
                    onClick={() => {}}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>No Departmet Available</div>
  );
};
