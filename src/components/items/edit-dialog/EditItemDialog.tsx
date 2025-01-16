import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import FormDialog from "../../common/dialogs/FormDialog";
import editItemRequestModel from "../../../types/requests/editItemRequest";

import * as yup from "yup";
import useForm from "../../../hooks/useForm";
import ItemFormFields from "../ItemFormFields";
import { ITEM_EDIT_DIALOG } from "../../../constants/dialogInstances";

export type EditDialogProps = {
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

const EditDialog = ({ dialogMethods }: DialogContainer<EditDialogProps>) => {
  const formMethods = useForm<editItemRequestModel>({
    schema,
    defaultValues: {
      name: dialogMethods.meta.props?.name || "",
      description: dialogMethods.meta.props?.description || "",
      categoryId: dialogMethods.meta.props?.categoryId || 0,
      itemStatusId: dialogMethods.meta.props?.itemStatusId || 0,
    },
    onSubmit: () => {
      console.log("");
    },
  });

  return (
    <FormDialog {...dialogMethods} control={formMethods.control} title="Wijzig Item" onSubmit={formMethods.onSubmit}>
      <ItemFormFields control={formMethods.control} />
    </FormDialog>
  );
};

const WrappedEditDialog = () => {
  return <DialogWrapper instance={ITEM_EDIT_DIALOG} dialogComponent={EditDialog} />;
};

export default WrappedEditDialog;
