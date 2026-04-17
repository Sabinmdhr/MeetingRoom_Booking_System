import "../../assets/scss/components/Logout.scss";
import ConfirmDialog from "../ui/ConfirmDialog";

type LogoutProps = {
  open: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
};

const Logout = ({ open, handleConfirm, handleClose }: LogoutProps) => {
  return (
    <ConfirmDialog
      open={open}
      title="Confirm Logout"
      content="Are you sure you want to logout?"
      onConfirm={handleConfirm}
      onClose={handleClose}
    />
  );
};

export default Logout;
