import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function Shimmer() {
  return (
    <Box sx={{ width: "100%", height: "50px" }}>
      <Skeleton />
      <Skeleton animation="wave" />
      {/* <Skeleton animation={false} /> */}
    </Box>
  );
}
