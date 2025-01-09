import { Control, FieldValues, useFormState } from "react-hook-form";
import Dialog, { DialogProps, DialogSize } from "./Dialog";
import { MouseEventHandler, useState } from "react";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

type Props<TFormControl extends FieldValues> = Omit<DialogProps, "dialogActionButtons"> & {
  onSubmit: MouseEventHandler<HTMLButtonElement> | undefined;
  control: Control<TFormControl>;
  isFetching?: boolean;
  isSubmitting?: boolean;
  size?: DialogSize;
};

const FormDialog = <TFormControl extends FieldValues>({
  onSubmit,
  control,
  title,
  isFetching = false,
  isSubmitting = false,
  isOpen,
  close,
  children,
  size = "sm",
}: Props<TFormControl>) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(0);
  const formState = useFormState({ control });

  return (
    <form noValidate>
      <Dialog
        title={title}
        isOpen={isOpen}
        close={(reason) => {
          if (formState.isDirty && reason !== "cancelButton") {
            setHasUnsavedChanges(hasUnsavedChanges + 1);
            return;
          }
          close(reason);
        }}
        size={size}
        dialogActionButtons={[
          hasUnsavedChanges ? <Typography key="warning-text">You have unsaved changes!</Typography> : null,
          <Button key="cancel-button" onClick={() => close("cancelButton")}>
            Annuleren
          </Button>,
          <LoadingButton
            key="save-button"
            loadingPosition="start"
            loading={isSubmitting}
            startIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            Opslaan
          </LoadingButton>,
        ]}
      >
        {isFetching ? (
          <Stack alignItems="center">
            <CircularProgress size={20} />
          </Stack>
        ) : (
          children
        )}
      </Dialog>
    </form>
  );
};

export default FormDialog;