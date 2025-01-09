import { Button } from "@mui/material";
import Dialog, { DialogProps } from "./Dialog";

type Props = Omit<DialogProps, "dialogActionButtons"> & {
  onConfirm: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const ConfirmDialog = ({ title, isOpen, close, onConfirm, children, confirmButtonText, cancelButtonText }: Props) => {
  return (
    <Dialog
      title={title}
      isOpen={isOpen}
      close={close}
      dialogActionButtons={[
        <Button key="cancel" onClick={() => close("cancelButton")}>
          {cancelButtonText ? cancelButtonText : "Annuleren"}
        </Button>,
        <Button key="confirm" onClick={onConfirm}>
          {confirmButtonText ? confirmButtonText : "Opslaan"}
        </Button>,
      ]}
    >
      {children}
    </Dialog>
  );
};

export default ConfirmDialog;

