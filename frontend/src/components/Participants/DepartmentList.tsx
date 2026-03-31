import { MenuItem, TextField } from "@mui/material";
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";
import type { departmentList } from "../../models/departmentList.model";
import type { participantsApi } from "../../models/participants.model";


type props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: participantsApi;
};
export const DepartmentList = ({ handleChange, formData }: props) => {
  const { departmentList } = useDepartmentListViewModel();
  return (
    <>
      <label htmlFor="Department">Department</label>
      <TextField
        fullWidth
        name="department"
        placeholder="Department"
        id="Department"
        required
        className="customTextField"
        select
        SelectProps={{
          MenuProps: {
            disablePortal: true,
            PaperProps: {
              className: "customTextField",
            },
          },
        }}
        value={formData.departmentId}
        onChange={handleChange}
      >
        {departmentList.map((d: departmentList) => (
          <MenuItem value={d.id}>{d.departmentName}</MenuItem>
        ))}
      </TextField>
    </>
  );
};