import { CircularProgress } from "@mui/material";

export const Spinner = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: 24,
        }}
      >
        <CircularProgress size={24} />
      </div>
    </div>
  );
};
