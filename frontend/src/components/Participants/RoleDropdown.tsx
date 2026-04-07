import { CommonDropdown } from "../CommonDropdown"

type props = {
  value: number ;
  onChange: (id: number ) => void;
};
export const RoleDropdown = ({ value, onChange }: props) => {

  const roles = [
    { id: 1, label: "ADMIN" },
    { id: 2, label: "MANAGER" },
    { id: 3, label: "STAFF" },
  ];

  return (
    <CommonDropdown
      items={roles}
      label="Role"
      value={value}
      onChange={onChange}
    />
  );
}