import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MyButton from "../Button/index";
import type { ReactElement } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  text?: string;
  title?: string;
  content?: string;
  startIcon?: ReactElement;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmDialog = ({
  open,
  text,
  title = "Confirm",
  content = "Are you sure you want to continue?",
  startIcon,
  onConfirm,
  onClose,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
     
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <MyButton
          text="Cancel"
          variant="text"
          customVariant="ghost"
          onClick={onClose}
        />
        <MyButton
          startIcon={startIcon}
          text={text ? `${text}` : "Confirm"}
          variant="contained"
          customVariant="dark"
          onClick={onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
