import {
  ButtonProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactElement, ReactNode } from "react";
import Close from "@mui/icons-material/Close";

export type DialogSize = "xs" | "sm" | "md" | "lg" | "xl" | undefined;

export type DialogProps = {
  title: string | undefined;
  isOpen: boolean;
  close: (reason: "cancelButton" | "closeButton" | "backdropClick" | "escapeKeyDown") => void;
  dialogActionButtons?: Array<ReactElement<ButtonProps> | null>;
  size?: DialogSize;
  children: ReactNode;
};

const Dialog = ({ title, isOpen, close, dialogActionButtons, size, children }: DialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <MuiDialog
      open={isOpen}
      onClose={(_, reason) => close(reason)}
      fullScreen={fullScreen}
      fullWidth
      maxWidth={size ?? "sm"}
    >
      <DialogTitle>{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => close("closeButton")}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>{children}</DialogContent>
      {dialogActionButtons && <DialogActions>{dialogActionButtons}</DialogActions>}
    </MuiDialog>
  );
};

export default Dialog;

