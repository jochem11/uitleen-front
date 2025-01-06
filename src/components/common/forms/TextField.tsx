import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { FieldValues, useController } from "react-hook-form";

import { CommonOmit } from "../../../types/forms/CommonOmit";
import { ErrorOmit } from "../../../types/forms/ErrorOmit";
import { InputProps } from "../../../types/forms/InputProps";
import { RhfFieldOmit } from "../../../types/forms/RhfFieldOmit";
import React from "react";

type TextFieldProps<T extends FieldValues> = InputProps<T> & {
  textFieldProps?: Omit<MuiTextFieldProps, RhfFieldOmit | ErrorOmit | CommonOmit>;
};

export default function TextField<T extends FieldValues>({ control, name, label, textFieldProps }: TextFieldProps<T>) {
  const {
    field,
    formState: {
      errors: { [name]: error },
    },
  } = useController({ name, control });

  const helperText =
    !!error && (typeof error.message === "string" || React.isValidElement(error.message)) ? error.message : "";

  return (
    <MuiTextField
      {...field}
      value={field.value === undefined || field.value === null || Number.isNaN(field.value) ? "" : field.value}
      id={`${name}-text-field`}
      error={!!error}
      label={label}
      helperText={helperText}
      {...textFieldProps}
    />
  );
}

