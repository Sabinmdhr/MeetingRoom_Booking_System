import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ width: 256 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose your meeitng room</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={"Meeting Room 1"}>Meeting Room 1</MenuItem>
          <MenuItem value={"Meeting Room 2"}>Meeting Room 2</MenuItem>
          <MenuItem value={"Meeting Room 3"}>Meeting Room 3</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
