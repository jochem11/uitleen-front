import { Typography } from "@mui/material";
import { BasicEntityDialogType } from "../../../types/dialogs/BasicDialogTypes";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import { USER_DELETE_DIALOG } from "../../../constants/dialogInstances";
import { toast } from "react-toastify";

const DeleteUserDialog = ({dialogMethods}: DialogContainer<BasicEntityDialogType>) => {
    const id = dialogMethods.meta.props.id;

    const onConfirm = async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}accounts/${id}`, {
                method: "DELETE"
            });

            dialogMethods.close();
            toast.success("Gebruiker verwijderd");
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <ConfirmDialog {...dialogMethods} title="Delete user" onConfirm={onConfirm}>
            <Typography>Weet je zeker dat je deze gebruiker wilt verwijderen?</Typography>
        </ConfirmDialog>
    );
}

const WrappedDeleteUserDialog = () => {
    return <DialogWrapper instance={USER_DELETE_DIALOG} dialogComponent={DeleteUserDialog} />;
}

export default WrappedDeleteUserDialog;