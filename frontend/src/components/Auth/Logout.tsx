import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "../../assets/scss/components/Logout.scss";
import MyButton from "../ui/Button";

type LogoutProps = {
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
};

const Logout = ({ open, handleConfirm, handleClose }: LogoutProps) => {
  return (
    <Dialog
      className="logout-dialog"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to logout?</DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={handleClose}>Cancel</Button> */}

        <MyButton
          text="Cancel"
          variant="outlined"
          onClick={handleClose}
          color="secondary"
        />

        {/* <Button
          onClick={handleConfirm}
          autoFocus
        >
          Confirm
        </Button> */}
        <MyButton
          variant="contained"
          color="success"
          text="Confirm"
          className="my-button-logout"
          onClick={handleConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default Logout;
