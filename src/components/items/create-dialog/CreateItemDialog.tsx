import useForm from "../../../hooks/useForm";
import createItemRequestModel from "../../../types/requests/createItemRequest";
import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import FormDialog from "../../common/dialogs/FormDialog";
import * as yup from "yup";
import ItemFormFields from "../ItemFormFields";
import { ITEM_CREATE_DIALOG } from "../../../constants/dialogInstances";
import { toast } from "react-toastify";

const schema: yup.Schema<createItemRequestModel> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  categoryId: yup.number().required(),
  itemStatusId: yup.number().required(),
});

const CreateItemDialog = ({ dialogMethods }: DialogContainer) => {

  const formMethods = useForm<createItemRequestModel>({
    schema,
    defaultValues: {
      name: "",
      description: "",
      categoryId: 0,
    },
    onSubmit: async (values) => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        dialogMethods.close();
        toast.success("Item aangemaakt");
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  return (
    <FormDialog {...dialogMethods} title="maak Item" onSubmit={formMethods.onSubmit} control={formMethods.control}>
      <ItemFormFields control={formMethods.control} />
    </FormDialog>
  );
};

const WrappedCreateItemDialog = () => {
  return <DialogWrapper instance={ITEM_CREATE_DIALOG} dialogComponent={CreateItemDialog} />;
}

export default WrappedCreateItemDialog;