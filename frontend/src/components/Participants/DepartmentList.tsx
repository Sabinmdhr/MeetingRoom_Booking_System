import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";
import { CommonDropdown } from "../ui/Dropdown/CommonDropdown";

type Props = {
  value: number | "";
  // onChange receives both the id and the display name so callers can
  // update the department name in local state without a separate lookup
  onChange: (id: number, name: string) => void;
};

export const DepartmentList = ({ value, onChange }: Props) => {
  const { departmentItems } = useDepartmentListViewModel();

  const handleChange = (id: number) => {
    const name = departmentItems.find((d) => d.id === id)?.label ?? "";
    onChange(id, name);
  };

  return (
    <CommonDropdown
      label="Department"
      value={value}
      items={departmentItems}
      onChange={handleChange}
    />
  );
};
