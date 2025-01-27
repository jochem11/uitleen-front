import * as yup from "yup";
import editLendRequestModel from "../../../types/requests/editLendRequestModel";
import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import useForm from "../../../hooks/useForm";
import { toast } from "react-toastify";
import FormDialog from "../../common/dialogs/FormDialog";
import EditLendFormFields from "./EditLendFormFields";
import { LEND_EDIT_DIALOG } from "../../../constants/dialogInstances";

export type EditLendDialogProps = {
  id: number;
  accountId: number;
  itemId: number;
  lendDate: Date;
  returnDate: Date;
};

const schema: yup.Schema<editLendRequestModel> = yup.object({
  accountId: yup.number().required(),
  itemId: yup.number().required(),
  lendDate: yup.date().required(),
  returnDate: yup.date().nullable(),
});

const EditLendDialog = ({ dialogMethods }: DialogContainer<EditLendDialogProps>) => {
  const formMethods = useForm<editLendRequestModel>({
    schema,
    defaultValues: {
      accountId: dialogMethods.meta.props?.accountId || 0,
      itemId: dialogMethods.meta.props?.itemId || 0,
      lendDate: dialogMethods.meta.props?.lendDate || new Date(),
      returnDate: dialogMethods.meta.props?.returnDate || null,
    },
    onSubmit: async (values) => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}lends/${dialogMethods.meta.props?.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        dialogMethods.close();
        toast.success("Uitgifte gewijzigd");
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  return (
    <FormDialog
      {...dialogMethods}
      title="Wijzig uitgifte"
      onSubmit={formMethods.onSubmit}
      control={formMethods.control}
    >
      <EditLendFormFields control={formMethods.control} />
    </FormDialog>
  );
};

const WrappedEditLendDialog = () => {
  return <DialogWrapper instance={LEND_EDIT_DIALOG} dialogComponent={EditLendDialog} />;
}

export default WrappedEditLendDialog;