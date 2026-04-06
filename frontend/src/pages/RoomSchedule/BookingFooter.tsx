import { Button, Stack } from "@mui/material";

const BookingFooter = () => {
  return (
    <Stack direction="row" spacing={2}>
        <Button className="cancel-btn">Cancel</Button>
        <Button className="proceed-btn">Proceed to booking</Button>
    </Stack>
  )
}

export default BookingFooter
