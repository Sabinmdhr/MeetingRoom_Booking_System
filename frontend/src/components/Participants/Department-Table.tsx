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
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";
import { useState } from "react";
import type { departmentList } from "../../models/departmentList.model";
import { EllipsisVertical, Pen, ShieldX, Trash2 } from "lucide-react";
type props = {
  departmentFormState: {
    open: boolean;
    mode: "add" | "edit";
    department: departmentList | null;
  };
  handleDepartmentFormOpen: (
    mode: "add" | "edit",
    department?: departmentList,
  ) => void;
  handleDepartmentFormClose: () => void;
};
export const DepartmentTable = ({
  handleDepartmentFormOpen,
  handleDepartmentFormClose,
  departmentFormState,
}: props) => {
  const { departmentList, handleDelete } = useDepartmentListViewModel();

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
            <TableCell>S.N</TableCell>
            <TableCell>Department Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departmentList.map((department, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell>{department.departmentName}</TableCell>
              <TableCell>{department.description}</TableCell>
              <TableCell>
                <Chip
                  className={`status-chip ${department.status === "INACTIVE" ? "inactive" : ""}`}
                  label={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {department.status === "ACTIVE" ? (
                        <i
                          className="cat-dot"
                          style={{ background: "green" }}
                        />
                      ) : (
                        <ShieldX size={16} />
                      )}

                      {department.status.charAt(0).toUpperCase() +
                        department.status.slice(1).toLowerCase()}
                    </span>
                  }
                />
              </TableCell>
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
                    onClick={() => {
                      if (menuState.department) {
                        handleDepartmentFormOpen("edit", menuState.department);
                      }
                      handleMenuClose();
                    }}
                  >
                    <Pen size={18} /> Edit
                  </MenuItem>
                  <MenuItem
                    className="menu-btn"
                    onClick={() => {
                      if (menuState.department) {
                        handleDelete(menuState.department.id);
                      }
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
