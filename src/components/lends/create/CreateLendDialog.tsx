import * as yup from "yup";
import createLendRequestModel from "../../../types/requests/createLendRequestModel";
import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import useForm from "../../../hooks/useForm";
import { toast } from "react-toastify";
import FormDialog from "../../common/dialogs/FormDialog";
import CreateLendFormFields from "./CreateLendFormFields";
import { LEND_CREATE_DIALOG } from "../../../constants/dialogInstances";

const schema: yup.Schema<createLendRequestModel> = yup.object({
  accountId: yup.number().required(),
  itemId: yup.number().required(),
});

const CreateLendDialog = ({ dialogMethods }: DialogContainer) => {
  const formMethods = useForm<createLendRequestModel>({
    schema,
    defaultValues: {
      accountId: 0,
      itemId: 0,
    },
    onSubmit: async (values) => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}lends`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        dialogMethods.close();
        toast.success("uitgifte aangemaakt");
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  return (
    <FormDialog {...dialogMethods} title="maak uitgifte" onSubmit={formMethods.onSubmit} control={formMethods.control}>
      <CreateLendFormFields control={formMethods.control} />
    </FormDialog>
  );
};

const WrappedCreateLendDialog = () => {
  return <DialogWrapper instance={LEND_CREATE_DIALOG} dialogComponent={CreateLendDialog} />;
};

export default WrappedCreateLendDialog;

