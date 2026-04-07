import { MenuItem, TextField } from "@mui/material";

export type DropdownItems ={
  id: number;
  label: string
}

type props = {
  label: string;
  value: number | string;
  items: DropdownItems[];
  onChange: (id: number) => void;
}

export const CommonDropdown = ({ label, value, items, onChange }: props) => {


  return (
    <>
      <label htmlFor={label}>{label}</label>
      <TextField
        select
        SelectProps={{
          MenuProps: {
            disablePortal: true,
            PaperProps: {
              className: "customTextField",
            },
          },
        }}
        fullWidth
        name={label}
        placeholder={label}
        id={label}
        className="customTextField"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}