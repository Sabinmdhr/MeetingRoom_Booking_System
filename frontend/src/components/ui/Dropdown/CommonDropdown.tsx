import { MenuItem, TextField } from "@mui/material";
import "./CommonDropdown.scss";
export type DropdownItems = {
  id: number;
  label: string;
};

type props = {
  label: string;
  placeholder?: string;
  value: number | string;
  items: DropdownItems[];
  onChange: (id: number | "") => void;
};

export const CommonDropdown = ({
  label,
  value,
  items,
  onChange,
  placeholder,
}: props) => {
  return (
    <>
      <label
        htmlFor={label}
        className="label"
      >
        {" "}
        {label}
      </label>

      <TextField
        select
        fullWidth
        id={label}
        value={value}
        className="customTextField"
        SelectProps={{
          displayEmpty: true,
          renderValue: (selected) => {
            if (selected === "" || selected === undefined) {
              return placeholder || `All ${label}`;
            }

            const item = items.find((i) => i.id === selected);
            return item ? item.label : "";
          },
        }}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
      >
        <MenuItem value="">{placeholder || `All ${label}`}</MenuItem>

        {items.map((item) => (
          <MenuItem
            key={item.id}
            value={item.id}
          >
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};
