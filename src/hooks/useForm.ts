import { MouseEventHandler, ReactNode, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useForm as useFormInternal,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormProps,
  UseFormRegisterReturn,
  UseFormReturn,
} from "react-hook-form";
import * as yup from "yup";

type Field<TFieldValues extends FieldValues> = {
  field: (
    field: Path<TFieldValues>,
    options?: RegisterOptions<TFieldValues, Path<TFieldValues>>
  ) => UseFormRegisterReturn<Path<TFieldValues>> & {
    required: boolean;
    error: boolean;
    helperText: ReactNode;
  };
};

type UseFormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema extends yup.ObjectSchema<any, yup.AnyObject, any, ""> = any
> = UseFormProps<TFieldValues, TContext> & {
  schema: TSchema;
  fetchRequest: (data: TFieldValues) => Promise<void>;
  onSubmit?: (data: TFieldValues) => void;
};

type UseFormReturnProps<TFieldValues extends FieldValues> = UseFormReturn<TFieldValues> &
  Field<TFieldValues> & {
    isPending: boolean;
    onSubmit: MouseEventHandler<HTMLButtonElement>;
  };

const isRequired = (field: string, schema: yup.SchemaObjectDescription) => {
  if (!field.includes(".")) return schema.fields[field];

  const fieldBase = field.split(".").shift() || field;
  const fieldRest = field.split(".").slice(1).join(".");

  //@ts-ignore
  return isRequired(fieldRest, schema.fields[fieldBase]);
};

const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TSchema extends yup.ObjectSchema<any, yup.AnyObject, any, ""> = any
>(
  props: UseFormInputProps<TFieldValues, TContext, TSchema>
): UseFormReturnProps<TFieldValues> => {
  const formMethods = useFormInternal<TFieldValues>({
    defaultValues: props.defaultValues,
    resolver: yupResolver(props.schema),
  });

  const schemaDescription = useMemo(() => {
    return props.schema.describe();
  }, [props.schema]);

  const onSubmit = formMethods.handleSubmit(async (data) => {
    try {
      await props.fetchRequest(data);
      props.onSubmit?.(data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  });

  const isPending = formMethods.formState.isSubmitting;

  const field = (field: Path<TFieldValues>, options?: RegisterOptions<TFieldValues, Path<TFieldValues>>) => {
    const register = formMethods.register(field, options);
    const { error } = formMethods.getFieldState(field, formMethods.formState);
    //@ts-ignore
    const required = !isRequired(field, schemaDescription)?.optional;

    return {
      ...register,
      required,
      error: !!error,
      helperText: error && error.message,
    };
  };

  return {
    ...formMethods,
    isPending,
    onSubmit,
    field,
  };
};

export default useForm;
