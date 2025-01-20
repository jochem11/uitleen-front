import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import * as yup from "yup";
import createUserRequestModel from "../../../types/requests/createUserRequestModel";
import { toast } from "react-toastify";
import useForm from "../../../hooks/useForm";
import FormDialog from "../../common/dialogs/FormDialog";
import UserFormFields from "../UserFormFields";
import { USER_CREATE_DIALOG } from "../../../constants/dialogInstances";

const schema: yup.Schema<createUserRequestModel> = yup.object({
  firstname: yup.string().required(),
  insertion: yup.string(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  cardNumber: yup.number().required(),
  groupId: yup.number().required(),
  courseId: yup.number().required(),
});

const CreateUserDialog = ({ dialogMethods }: DialogContainer) => {
  const formMethods = useForm<createUserRequestModel>({
    schema,
    defaultValues: {
      firstname: "",
      insertion: "",
      lastname: "",
      email: "",
      cardNumber: 0,
      groupId: 0,
      courseId: 0,
    },
    onSubmit: async (values) => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}accounts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        dialogMethods.close();
        toast.success("User created");
      } catch (ex) {
        console.error(ex);
      }
    },
  });

  return (
    <FormDialog {...dialogMethods} title="Maak gebruiker" onSubmit={formMethods.onSubmit} control={formMethods.control}>
      <UserFormFields control={formMethods.control} />
    </FormDialog>
  );
};

const WrappedCreateUserDialog = () => {
    return <DialogWrapper instance={USER_CREATE_DIALOG} dialogComponent={CreateUserDialog} />;
}

export default WrappedCreateUserDialog;