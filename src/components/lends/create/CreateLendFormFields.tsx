import { Control } from "react-hook-form";
import createLendRequestModel from "../../../types/requests/createLendRequestModel";
import { Grid2 } from "@mui/material";
import TextField from "../../common/forms/TextField";

type EditLendFormFieldProps = {
  control: Control<createLendRequestModel>;
};

const CreateLendFormFields = ({ control }: EditLendFormFieldProps) => {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <TextField control={control} name="accountId" label="Account" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="itemId" label="Item" />
      </Grid2>
    </Grid2>
  );
};

export default CreateLendFormFields;
