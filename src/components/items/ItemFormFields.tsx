import { Control } from "react-hook-form";
import createItemRequestModel from "../../types/requests/createItemRequest";
import { Grid2 } from "@mui/material";
import TextField from "../common/forms/TextField";
import editItemRequestModel from "../../types/requests/editItemRequest";

type ItemFormFieldProps = {
  control: Control<createItemRequestModel | editItemRequestModel>;
};

const ItemFields = ({ control }: ItemFormFieldProps) => {
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <TextField control={control} name="itemStatusId" label="Item status" />
      </Grid2>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <TextField control={control} name="categoryId" label="Category" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="name" label="Name" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="description" label="Description" />
      </Grid2>
    </Grid2>
  );
};

export default ItemFields;