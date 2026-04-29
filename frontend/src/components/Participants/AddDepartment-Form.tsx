import { Plus } from "lucide-react";
import MyButton from "../ui/Button";
import Dialog from "@mui/material/Dialog";
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";
import { DialogActions, DialogContent, TextField } from "@mui/material";
import { useEffect } from "react";

export const AddDepartmentForm = () => {
  const {
    departmentFormState,
    handleDepartmentFormOpen,
    departmentFormData,
    setDepartmentFormData,
    handleChange,
    handleDepartmentFormClose,
    submitDepartment,
  } = useDepartmentListViewModel();

  useEffect(() => {
    if (departmentFormState.mode === "edit" && departmentFormState.department) {
      setDepartmentFormData({
        departmentName: departmentFormState.department.departmentName,
        description: departmentFormState.department.description,
      });
    } else {
      setDepartmentFormData({
        departmentName: "",
        description: "",
      });
    }
  }, []);
  return (
    <div>
      <MyButton
        // className="add-btn"
        customVariant="dark"
        startIcon={<Plus size={17} />}
        variant="contained"
        onClick={() => {
          handleDepartmentFormOpen("add");
        }}
        text="Add Department"
      />
      <Dialog
        open={departmentFormState.open}
        onClose={handleDepartmentFormClose}
      >
        <DialogContent>
          <label htmlFor="departmentName">Department Name</label>
          <TextField
            className="customTextField"
            id="departmentName"
            name="departmentName"
            placeholder="Enter department name"
            value={departmentFormData.departmentName}
            onChange={handleChange}
          />
          <label htmlFor="description">Description</label>
          <TextField
            className="customTextField"
            id="description"
            name="description"
            placeholder="Enter department description"
            value={departmentFormData.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <MyButton
            text="Add"
            className=""
            customVariant="ghost"
            onClick={() => {
              submitDepartment(departmentFormData);
              handleDepartmentFormClose();
            }}
          ></MyButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};
