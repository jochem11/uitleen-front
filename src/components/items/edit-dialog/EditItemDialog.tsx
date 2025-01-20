import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import FormDialog from "../../common/dialogs/FormDialog";
import editItemRequestModel from "../../../types/requests/editItemRequest";

import * as yup from "yup";
import useForm from "../../../hooks/useForm";
import ItemFormFields from "../ItemFormFields";
import { ITEM_EDIT_DIALOG } from "../../../constants/dialogInstances";
import { toast } from "react-toastify";

export type EditItemDialogProps = {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  itemStatusId: number;
};

const schema: yup.Schema<editItemRequestModel> = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  categoryId: yup.number().required(),
  itemStatusId: yup.number().required(),
});

const EditItemDialog = ({ dialogMethods }: DialogContainer<EditItemDialogProps>) => {
  const formMethods = useForm<editItemRequestModel>({
    schema,
    defaultValues: {
      name: dialogMethods.meta.props?.name || "",
      description: dialogMethods.meta.props?.description || "",
      categoryId: dialogMethods.meta.props?.categoryId || 0,
      itemStatusId: dialogMethods.meta.props?.itemStatusId || 0,
    },
    onSubmit: async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}items/${dialogMethods.meta.props.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formMethods.getValues()),
        });

        dialogMethods.close();
        toast.success("Item gewijzigd");
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  return (
    <FormDialog {...dialogMethods} control={formMethods.control} title="Wijzig Item" onSubmit={formMethods.onSubmit}>
      <ItemFormFields control={formMethods.control} />
    </FormDialog>
  );
};

const WrappedEditItemDialog = () => {
  return <DialogWrapper instance={ITEM_EDIT_DIALOG} dialogComponent={EditItemDialog} />;
};

export default WrappedEditItemDialog;

