import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";

import { CommonDropdown } from "../ui/Dropdown/CommonDropdown";

type props = {
  value: number;
  onChange: (id: number) => void;
};
export const DepartmentList = ({ value, onChange }: props) => {
  const { departmentItems } = useDepartmentListViewModel();

  return (
    <CommonDropdown
      label="Department"
      value={value}
      items={departmentItems}
      onChange={onChange}
    />
  );
};
