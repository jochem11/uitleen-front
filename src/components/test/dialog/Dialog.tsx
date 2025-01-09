import DialogWrapper, { DialogContainer } from "../../common/dialogs/DialogWrapper";
import ConfirmDialog from "../../common/dialogs/ConfirmDialog";
import { TEST_DIALOG } from "../../../constants/dialogInstances";

const TestDialog = ({ dialogMethods }: DialogContainer) => {
  return (
    <ConfirmDialog {...dialogMethods} title="test" onConfirm={() => dialogMethods.close()}>
      jb
    </ConfirmDialog>
  );
};

const WrappedTestDialog = () => {
  return <DialogWrapper instance={TEST_DIALOG} dialogComponent={TestDialog} />;
};

export default WrappedTestDialog;
