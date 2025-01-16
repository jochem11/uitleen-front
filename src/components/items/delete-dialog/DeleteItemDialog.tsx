import { Typography } from "@mui/material";
import { BasicEntityDialogType } from "../../../types/dialogs/BasicDialogTypes";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import { ITEM_DELETE_DIALOG } from "../../../constants/dialogInstances";
import { toast } from "react-toastify";

const DeleteItemDialog = ({ dialogMethods }: DialogContainer<BasicEntityDialogType>) => {
  const id = dialogMethods.meta.props.id;


  const onConfirm = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}items/${id}`, {
        method: "DELETE",
      });

      dialogMethods.close();
      toast.success("Item verwijderd");
    } catch(ex) {}
  };

  return (
    <ConfirmDialog {...dialogMethods} title="Verwijder item" onConfirm={onConfirm}>
      <Typography>Weet je zeker dat je dit item wilt verwijderen?</Typography>
    </ConfirmDialog>
  );
};

const WrappedDeleteItemDialog = () => {
  return <DialogWrapper instance={ITEM_DELETE_DIALOG} dialogComponent={DeleteItemDialog} />;
};

export default WrappedDeleteItemDialog;

