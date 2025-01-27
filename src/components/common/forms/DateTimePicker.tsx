import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
  //clock
  //   renderTimeViewClock,
} from "@mui/x-date-pickers";
import { format } from "date-fns";
import { FieldValues, useController } from "react-hook-form";

import { CommonOmit } from "../../../types/forms/CommonOmit";
import { ErrorOmit } from "../../../types/forms/ErrorOmit";
import { InputProps } from "../../../types/forms/InputProps";
import { RhfFieldOmit } from "../../../types/forms/RhfFieldOmit";
import React from "react";

type DateTimePickerProps<T extends FieldValues, TDate extends Date> = InputProps<T> & {
  required?: boolean;
  datePickerProps?: Omit<MuiDateTimePickerProps<TDate>, RhfFieldOmit | ErrorOmit | CommonOmit>;
};

const DateTimePicker = <T extends FieldValues, TDate extends Date>({
  control,
  name,
  label,
  required = false,
  datePickerProps,
}: DateTimePickerProps<T, TDate>) => {
  const {
    field,
    formState: {
      errors: { [name]: error },
    },
  } = useController({ name, control });

  const { onBlur, ref, onChange, value, ...restField } = field;

  const helperText =
    !!error && (typeof error.message === "string" || React.isValidElement(error.message)) ? error.message : "";

  return (
    <MuiDateTimePicker
      {...restField}
      //@ts-ignore
      value={value ? new Date(value) : null} // Ensure value is a Date object
      onChange={(data) => {
        if (data === null) {
          onChange(null);
          return;
        }

        //@ts-ignore
        onChange(format(data, "yyyy-MM-dd-HH:mm"));
      }}
      inputRef={ref}
      slotProps={{
        textField: {
          id: `${name}-date-picker`,
          name: name,
          onBlur: onBlur,
          error: !!error,
          helperText,
          InputProps: { required: required },
        },
      }}
      format="dd-MM-yy-HH:mm"
      label={label}
      //render clock
      // viewRenderers={{
      //   hours: renderTimeViewClock,
      //   minutes: renderTimeViewClock,
      //   seconds: renderTimeViewClock,
      // }}
      {...datePickerProps}
    />
  );
};

export default DateTimePicker;

