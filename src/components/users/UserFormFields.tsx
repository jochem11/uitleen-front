import { Control } from "react-hook-form";
import createUserRequestModel from "../../types/requests/createUserRequestModel";
import { Grid2 } from "@mui/material";
import TextField from "../common/forms/TextField";
import editUserRequestModel from "../../types/requests/editUserRequestModel";

type UserFormFieldsProps = {
  control: Control<createUserRequestModel | editUserRequestModel>;
};

const UserFormFields = ({ control }: UserFormFieldsProps) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <TextField control={control} name="courseId" label="Opleiding" />
      </Grid2>
      <Grid2 size={{ md: 6, xs: 12 }}>
        <TextField control={control} name="groupId" label="Klas" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="firstname" label="Voornaam" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="insertion" label="Tussenvoegsel" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="lastname" label="Achternaam" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="email" label="Email" />
      </Grid2>
      <Grid2 size={12}>
        <TextField control={control} name="cardNumber" label="Kaartnummer" />
      </Grid2>
    </Grid2>
  );
};

export default UserFormFields;