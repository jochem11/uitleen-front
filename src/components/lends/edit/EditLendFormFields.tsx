import { Control } from "react-hook-form";
import editLendRequestModel from "../../../types/requests/editLendRequestModel";
import { Grid2 } from "@mui/material";
import TextField from "../../common/forms/TextField";
import DateTimePicker from "../../common/forms/DateTimePicker";

type EditLendFormFieldProps = {
  control: Control<editLendRequestModel>;
};

const EditLendFormFields = ({ control }: EditLendFormFieldProps) => {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={12}>
        <TextField control={control} name="accountId" label="Account" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="itemId" label="Item" />
      </Grid2>
      <Grid2 size={12}>
        <DateTimePicker control={control} name="lendDate" label="Lend date" />
      </Grid2>
      <Grid2 size={12}>
        <DateTimePicker control={control} name="returnDate" label="Return date" />
      </Grid2>
    </Grid2>
  );
};

export default EditLendFormFields;
