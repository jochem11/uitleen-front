import { toast } from "react-toastify";
import useForm from "../../../hooks/useForm";
import editUserRequestModel from "../../../types/requests/editUserRequestModel";
import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import * as yup from "yup";
import FormDialog from "../../common/dialogs/FormDialog";
import UserFormFields from "../UserFormFields";
import { USER_EDIT_DIALOG } from "../../../constants/dialogInstances";

export type EditUserDialogProps = {
    id: number;
    firstname: string;
    insertion: string;
    lastname: string;
    email: string;
    cardNumber: number;
    groupId: number;
    courseId: number;
}

const schema: yup.Schema<editUserRequestModel> = yup.object({
    firstname: yup.string().required(),
    insertion: yup.string(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    cardNumber: yup.number().required(),
    groupId: yup.number().required(),
    courseId: yup.number().required(),
})

const DeleteUserDialog = ({ dialogMethods }:DialogContainer<EditUserDialogProps>) => {
  const formMethods = useForm<editUserRequestModel>({
    schema,
    defaultValues: {
        firstname: dialogMethods.meta.props?.firstname || "",
        insertion: dialogMethods.meta.props?.insertion || "",
        lastname: dialogMethods.meta.props?.lastname || "",
        email: dialogMethods.meta.props?.email || "",
        cardNumber: dialogMethods.meta.props?.cardNumber || 0,
        groupId: dialogMethods.meta.props?.groupId || 0,
        courseId: dialogMethods.meta.props?.courseId || 0,
    },
    onSubmit: async () => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}accounts/${dialogMethods.meta.props.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formMethods.getValues()),
            });

            dialogMethods.close();
            toast.success("Gebruiker gewijzigd");
        } catch (ex) {
            console.error(ex);
        }
    },
  })

    return (
        <FormDialog {...dialogMethods} control={formMethods.control} title="Wijzig gebruiker" onSubmit={formMethods.onSubmit}>
        <UserFormFields control={formMethods.control} />
        </FormDialog>
    );
}

const WrappedEditUserDialog = () => {
    return <DialogWrapper instance={USER_EDIT_DIALOG} dialogComponent={DeleteUserDialog} />;
}

export default WrappedEditUserDialog