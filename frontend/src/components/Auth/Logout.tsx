import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import "../../assets/scss/components/Logout.scss";

type LogoutProps={
    open: boolean;
    handleConfirm: () => void;
    handleClose: () => void;
} 

const Logout = ({open, handleConfirm, handleClose}: LogoutProps) => {

  return (
    <Dialog className='logout-dialog'
        open={open}
        onClose={handleClose}>
        <DialogTitle>
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default Logout
