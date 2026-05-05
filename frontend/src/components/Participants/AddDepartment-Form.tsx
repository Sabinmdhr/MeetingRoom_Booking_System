import { Plus } from "lucide-react";
import MyButton from "../ui/Button";
import Dialog from "@mui/material/Dialog";
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";
import {
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import "../../assets/scss/components/Department/AddDepartment-Form.scss";

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
    <>
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
      </div>

      <Dialog
        open={departmentFormState.open}
        onClose={handleDepartmentFormClose}
        PaperProps={{ className: "department-modal" }}
      >
        <div className="department-modal__header">
          <Typography
            className="department-modal__header__title"
            variant="h3"
          >
            Add Department
          </Typography>
        </div>
        <DialogContent className="department-modal__details">
          <div className="department-modal__details__row">
            <Typography className="department-modal__details__row__title">
              Department Name
            </Typography>
            <TextField
              className="customTextField"
              id="departmentName"
              name="departmentName"
              placeholder="Enter department name"
              value={departmentFormData.departmentName}
              onChange={handleChange}
            />
          </div>
          <div className="department-modal__details__row">
            <Typography className="department-modal__details__row__title">
              Description
            </Typography>
            <TextField
              className="customTextField"
              id="description"
              name="description"
              placeholder="Enter department description"
              value={departmentFormData.description}
              onChange={handleChange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <MyButton
            text="Add"
            customVariant="dark"
            onClick={() => {
              submitDepartment(departmentFormData);
              handleDepartmentFormClose();
            }}
          ></MyButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
