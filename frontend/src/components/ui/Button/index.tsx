import { Button } from "@mui/material";
import type { ReactElement } from "react";
import "./Button.scss";
export interface ButtonProps {
  variant?: "contained" | "outlined" | "text";
  customVariant?: "primary" | "dark" | "danger" | "ghost";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  text: string | ReactElement;
  onClick: () => void;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const MyButton = (props: ButtonProps) => {
  // const { customVariant = "primary", className = "" } = props;

  return (
    <Button
      variant={props.variant}
      size={props.size || "medium"}
      color={props.color || "primary"}
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      className={`my-button my-button--${props.customVariant} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      type={props.type || "button"}
    >
      {props.text}
    </Button>
  );
};

export default MyButton;
